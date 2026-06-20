/** @type {import('next').NextConfig} */
const nextConfig = {
  // The builder + demo are served as static files from /public.
  // Make sure the service worker is served with the right scope/headers.
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default nextConfig;
