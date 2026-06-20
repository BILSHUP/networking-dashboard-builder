import Anthropic from "@anthropic-ai/sdk";

// Run on the Node.js runtime (the Anthropic SDK needs it) and allow up to 30s.
export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";

const SYSTEM = [
  "You are an assistant embedded in a student networking dashboard.",
  "The user's message is a complete instruction that may already include their resume and profile.",
  "Follow it exactly and return ONLY the requested content — no preamble, no explanation of your reasoning, no meta-commentary, and no follow-up questions.",
  "Never invent experience, employers, or facts about the user; use only what they provided. If something is missing, work with what you have.",
].join(" ");

// Cap the prompt so a single request can't run up a huge bill.
const MAX_PROMPT_CHARS = 24000;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Server is not configured: ANTHROPIC_API_KEY is missing." },
      { status: 500 },
    );
  }

  let prompt: unknown;
  try {
    ({ prompt } = await req.json());
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof prompt !== "string" || !prompt.trim()) {
    return Response.json({ error: "Missing 'prompt'." }, { status: 400 });
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    return Response.json(
      { error: "That request is too long. Shorten your resume or profile and try again." },
      { status: 413 },
    );
  }

  const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });

    if (message.stop_reason === "refusal") {
      return Response.json(
        { error: "The request was declined. Try rephrasing it." },
        { status: 422 },
      );
    }

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    if (!text) {
      return Response.json({ error: "The AI returned an empty response. Try again." }, { status: 502 });
    }

    return Response.json({ text });
  } catch (err: unknown) {
    const status =
      err && typeof err === "object" && "status" in err && Number.isInteger((err as { status: number }).status)
        ? (err as { status: number }).status
        : 500;
    // Log server-side detail; return a safe message to the browser.
    console.error("/api/ai error:", err instanceof Error ? err.message : err);
    if (status === 429) {
      return Response.json({ error: "Rate limited — wait a moment and try again." }, { status: 429 });
    }
    if (status === 401 || status === 403) {
      return Response.json({ error: "The server's API key is invalid or lacks access." }, { status: 502 });
    }
    return Response.json({ error: "AI request failed. Please try again." }, { status: 502 });
  }
}
