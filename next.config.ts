import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Let a phone on the same Wi-Fi use the dev server (http://<this computer's IP>:3000).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  partialPrefetching: true,
  // Hide the floating "N" dev badge: it covers text on phones. Errors still show.
  devIndicators: false,
};

export default nextConfig;
