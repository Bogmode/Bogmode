const nextConfig = {
  // The dynamic contact route reads its Keystatic content at runtime.
  outputFileTracingIncludes: {
    "/contact": ["./content/site.json"],
  },
  async headers() { return [{ source: "/:path*", headers: [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ] }]; },
};
export default nextConfig;
