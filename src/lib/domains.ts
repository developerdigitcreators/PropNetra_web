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

function configuredSiteHosts() {
  return [
    process.env.NEXT_PUBLIC_SITE_HOST,
    process.env.STAGING_HOST,
    ...(process.env.NEXT_PUBLIC_SITE_HOSTS || "").split(","),
  ]
    .map((value) => normalizeHost(value))
    .filter(Boolean);
}

/** Local / unset lock: allow all hosts. Production sets SITE_HOST(+S). */
export function isAllowedSiteHost(host?: string | null) {
  const normalized = normalizeHost(host);
  if (!normalized) return false;
  if (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1"
  ) {
    return true;
  }

  const allowed = configuredSiteHosts();
  if (allowed.length === 0) return true;
  if (allowed.includes(normalized)) return true;
  if (isShareHost(normalized)) return true;
  return false;
}
