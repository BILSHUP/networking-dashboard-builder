const APP_URL = "/networking-builder.html";
const DEMO_URL = "/networking-dashboard-demo.html";

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="nav">
        <div className="container row">
          <a className="brand" href="#top">
            <span className="mark" aria-hidden>
              <FootMark />
            </span>
            FootIn
          </a>
          <nav className="nav-links">
            <a className="hide-sm" href="#how">How it works</a>
            <a className="hide-sm" href="#pipeline">Pipeline</a>
            <a className="hide-sm" href="#features">Features</a>
            <a className="hide-sm" href="#faq">FAQ</a>
            <a className="btn btn-primary" href={APP_URL}>Launch app</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <span className="badge"><span className="dot" /> Built for business students · Free in beta</span>
            <h1>
              Get your <span className="grad-text">foot in the door</span>—before everyone else.
            </h1>
            <p className="sub">
              FootIn turns your LinkedIn network into a ranked pipeline of warm intros, AI-written
              outreach, and internship targets. The all-in-one dashboard for landing the job you
              want—or the one you didn&apos;t know you wanted.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href={APP_URL}>Launch FootIn free →</a>
              <a className="btn btn-ghost btn-lg" href={DEMO_URL}>See the demo</a>
            </div>
            <div className="trust">
              <span>🔒 <b>100% private</b> — runs on your own LinkedIn export</span>
              <span>⚡ <b>Ranks 500+ connections</b> in seconds</span>
              <span>🚫 No scraping</span>
            </div>

            {/* product mockup */}
            <div className="mock" aria-hidden>
              <div className="bar">
                <i /><i /><i />
                <span className="tabname">FootIn — My Network</span>
              </div>
              <div className="body">
                <div className="stat-row">
                  <div className="stat"><div className="n">512</div><div className="l">Connections ranked</div></div>
                  <div className="stat"><div className="n" style={{ color: "#4d7a5b" }}>47</div><div className="l">High-value</div></div>
                  <div className="stat"><div className="n">128</div><div className="l">In your fields</div></div>
                  <div className="stat"><div className="n">9</div><div className="l">Intros sent</div></div>
                </div>
                <Conn name="Priya Nair" role="VP, Audit · Deloitte" tier="High" />
                <Conn name="Marcus Bell" role="Summer Analyst · Goldman Sachs" tier="High" />
                <Conn name="Sara Kim" role="FP&A Manager · Honeywell" tier="Med" />
                <Conn name="Diego Torres" role="Consultant · Bain & Company" tier="Med" />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how">
          <div className="container center">
            <div className="eyebrow">How it works</div>
            <h2 className="h2">From contact list to career pipeline in 3 steps.</h2>
            <p className="lead">No scraping, no spreadsheets, no guessing who to message. FootIn does the ranking for you.</p>
            <div className="steps">
              <div className="step">
                <div className="num">1</div>
                <h3>Import your network</h3>
                <p>Drop in your LinkedIn “Connections” export. It&apos;s parsed instantly in your browser—your contacts never leave your device.</p>
              </div>
              <div className="step">
                <div className="num">2</div>
                <h3>See your real pipeline</h3>
                <p>FootIn scores every connection by seniority × your target fields, surfacing your warmest paths to a referral first.</p>
              </div>
              <div className="step">
                <div className="num">3</div>
                <h3>Reach out &amp; track</h3>
                <p>Generate tailored intros and résumé tweaks with AI, then track every conversation from first message to offer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PIPELINE — recommended warm connections */}
        <section id="pipeline" className="tinted">
          <div className="container">
            <div className="center">
              <div className="eyebrow">The pipeline</div>
              <h2 className="h2">Your warmest intros—found for you.</h2>
              <p className="lead">
                FootIn surfaces the people who already share your world—same university, business
                fraternity, or club—who now work where you want to. For each, you get exactly why
                you&apos;re connected, that they could refer you, and a ready-to-send opening note.
              </p>
            </div>
            <div className="reco-list">
              <Reco
                name="Maya Chen"
                role="Senior Associate, Audit · Deloitte"
                affs={["UNCW Alumni '22", "Beta Alpha Psi", "Accounting Society"]}
                note="Hi Maya — I'm a junior at UNCW and a Beta Alpha Psi member too, recruiting for audit. I saw you landed at Deloitte and would love 15 minutes to hear how you approached recruiting. Any advice would mean a lot — thank you!"
              />
              <Reco
                name="Jordan Ellis"
                role="Investment Banking Analyst · Truist"
                affs={["Same university", "Finance Club", "Class of '23"]}
                note="Hi Jordan — fellow Finance Club member here, currently exploring IB for Summer 2027. I'd really value 15 minutes to hear how your recruiting went and any tips you'd share with someone a couple years behind you. Thanks for considering!"
              />
              <Reco
                name="Priya Nair"
                role="Consultant · Bain & Company"
                affs={["Honors College", "Case Club", "Mentorship program"]}
                note="Hi Priya — we overlapped in the Case Club at school and I'm now recruiting for consulting. Bain is a dream firm of mine — could I ask you a few questions about your path and what stood out in your applications? Really appreciate it."
              />
            </div>
            <p className="lead center" style={{ marginTop: 28, fontSize: 15 }}>
              Every recommendation comes with a one-click opening note—personalized from your profile, ready to paste the moment you connect.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="center">
              <div className="eyebrow">Everything in one place</div>
              <h2 className="h2">One dashboard for getting hired.</h2>
              <p className="lead">Stop juggling LinkedIn tabs, Google Sheets, and cold-DM anxiety. FootIn is the whole recruiting workflow.</p>
            </div>
            <div className="features">
              <div className="fcard c1">
                <div className="ic"><IconPipeline /></div>
                <h3>A pipeline, not a contact list</h3>
                <p>Your 500+ connections, automatically ranked into the warmest paths to a referral—so you always know exactly who to talk to next.</p>
              </div>
              <div className="fcard c2">
                <div className="ic"><IconSpark /></div>
                <h3>AI that writes your outreach</h3>
                <p>Personalized connection notes, coffee-chat asks, thank-yous, and résumé tailoring—drafted from your profile in one click.</p>
              </div>
              <div className="fcard c3">
                <div className="ic"><IconTarget /></div>
                <h3>Find the role you didn&apos;t know you wanted</h3>
                <p>Tell FootIn your goals and it surfaces internship and full-time targets that fit—plus the people already inside who can get you in.</p>
              </div>
              <div className="fcard c4 wide">
                <div className="ic"><IconRadar /></div>
                <h3>Your whole LinkedIn, monitored</h3>
                <p>FootIn keeps tabs on your entire network—every connection ranked, every conversation tracked, every status (request sent → replied → met → referred) in one living dashboard. Nothing slips through the cracks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE BAND */}
        <section>
          <div className="container">
            <div className="band">
              <div className="eyebrow">Made for business school</div>
              <h2 className="h2">Built for business college students.</h2>
              <p className="lead">
                Recruiting for finance, accounting, consulting, and tech moves fast and runs on
                referrals. FootIn is tuned for it—weighting your network by the firms and roles
                that actually matter for your major, your timeline, and your dream companies.
              </p>
              <div className="tags">
                <span className="tag">Public Accounting</span>
                <span className="tag">Investment Banking</span>
                <span className="tag">Consulting</span>
                <span className="tag">Corporate Finance / FP&amp;A</span>
                <span className="tag">Wealth &amp; Asset Mgmt</span>
                <span className="tag">Tech &amp; Analytics</span>
              </div>
              <div className="cta-row" style={{ justifyContent: "flex-start", marginTop: 30 }}>
                <a className="btn btn-primary btn-lg" href={APP_URL} style={{ background: "#fff", color: "#0a0a12" }}>Build my pipeline →</a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="center">
              <div className="eyebrow">FAQ</div>
              <h2 className="h2">Questions, answered.</h2>
            </div>
            <div className="faq">
              <details open>
                <summary>Is it really free?</summary>
                <p>Yes—FootIn is free for students while we&apos;re in beta. Create your dashboard and use the AI tools at no cost.</p>
              </details>
              <details>
                <summary>Do I have to scrape LinkedIn?</summary>
                <p>Never. FootIn uses your own official LinkedIn data export (Settings → Data Privacy → Get a copy of your data → Connections). It&apos;s compliant by design—no scraping, no passwords.</p>
              </details>
              <details>
                <summary>Is my data safe?</summary>
                <p>Your connections are parsed and ranked entirely in your browser—they never leave your device. Only the short prompt for an AI tool (which you can preview) is ever sent to our server.</p>
              </details>
              <details>
                <summary>Who is FootIn for?</summary>
                <p>Business college students recruiting for internships and full-time roles—finance, accounting, consulting, and adjacent fields—who want to turn their network into actual interviews.</p>
              </details>
              <details>
                <summary>How is this different from just using LinkedIn?</summary>
                <p>LinkedIn shows you a feed. FootIn shows you a plan: who to contact, why they matter, what to say, and where every conversation stands—ranked and tracked in one place.</p>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final">
          <div className="container">
            <div className="panel">
              <h2>Get your foot in the door.</h2>
              <p>Turn the network you already have into the internship you want. Free while in beta.</p>
              <div className="cta-row">
                <a className="btn btn-primary btn-lg" href={APP_URL}>Launch FootIn free →</a>
                <a className="btn btn-ghost btn-lg" href={DEMO_URL}>See the demo</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container row">
          <span className="brand" style={{ fontSize: 16 }}>
            <span className="mark" aria-hidden style={{ width: 22, height: 22 }}><FootMark /></span>
            FootIn
          </span>
          <span>Compliant by design — your own LinkedIn export, no scraping. © {new Date().getFullYear()} FootIn.</span>
          <a href="https://github.com/BILSHUP/networking-dashboard-builder">GitHub</a>
        </div>
      </footer>
    </>
  );
}

/* ---------- small components ---------- */
function Conn({ name, role, tier }: { name: string; role: string; tier: "High" | "Med" | "Low" }) {
  const cls = tier === "High" ? "high" : tier === "Med" ? "med" : "low";
  return (
    <div className="conn">
      <div className="who">
        <div className="av" />
        <div>
          <div className="nm">{name}</div>
          <div className="rl">{role}</div>
        </div>
      </div>
      <span className={`chip ${cls}`}>{tier === "High" ? "High value" : tier}</span>
    </div>
  );
}

function Reco({ name, role, affs, note }: { name: string; role: string; affs: string[]; note: string }) {
  return (
    <div className="reco">
      <div className="top">
        <div className="who">
          <div className="av" />
          <div>
            <div className="nm">{name}</div>
            <div className="rl">{role}</div>
          </div>
        </div>
        <span className="referral">Can refer you ↑</span>
      </div>
      <div className="affs">
        {affs.map((a) => (
          <span className="aff" key={a}>{a}</span>
        ))}
      </div>
      <div className="note">
        <div className="lbl">
          <span>Opening note</span>
          <span className="copy">Copy ⧉</span>
        </div>
        <div className="msg">{note}</div>
      </div>
    </div>
  );
}

/* ---------- inline icons (currentColor / white) ---------- */
function FootMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <ellipse cx="9" cy="14.5" rx="5.5" ry="6.5" />
      <circle cx="16.5" cy="6" r="2.1" />
      <circle cx="19.5" cy="9" r="1.8" />
      <circle cx="19.7" cy="12.6" r="1.6" />
      <circle cx="18" cy="15.6" r="1.4" />
    </svg>
  );
}
function IconPipeline() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="5" cy="6" r="2.4" /><circle cx="5" cy="18" r="2.4" /><circle cx="19" cy="12" r="2.4" />
      <path d="M7.4 6H13l3.8 5M7.4 18H13l3.8-5" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2L12 2z" />
      <circle cx="19" cy="4" r="1.6" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}
function IconRadar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19.07 4.93a10 10 0 1 0 1.4 12.6" /><path d="M15.5 8.5a5 5 0 1 0 1.2 5.2" />
      <path d="M12 12L20 4" /><circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </svg>
  );
}
