export const DEFAULT_SHARE_DOMAIN = "share.propnetra.com";

export function normalizeHost(host?: string | null) {
  return (host || "")
    .split(":")[0]
    .toLowerCase()
    .replace(/^www\./, "")
    .trim();
}

export function shareHosts() {
  const configured = [
    process.env.NEXT_PUBLIC_SHARE_DOMAIN,
    ...(process.env.NEXT_PUBLIC_SHARE_DOMAINS || "").split(","),
  ]
    .map((value) => normalizeHost(value))
    .filter(Boolean);

  return new Set([
    DEFAULT_SHARE_DOMAIN,
    "share.localhost",
    "propnetra-client-share.vercel.app",
    ...configured,
  ]);
}

export function isShareHost(host?: string | null) {
  const normalized = normalizeHost(host);
  if (!normalized) return false;
  if (shareHosts().has(normalized)) return true;
  return normalized.startsWith("share.");
}
