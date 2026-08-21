export const DEFAULT_SHARE_DOMAIN = "share.propnetra.com";
export const DEFAULT_PROPNETRA_DOMAIN = "propnetra.devsol.in";
export const DEFAULT_MERGED_DOMAIN = "168-144-88-78.sslip.io";

export function normalizeHost(host?: string | null) {
  return (host || "")
    .split(":")[0]
    .toLowerCase()
    .replace(/^www\./, "")
    .trim();
}

function splitHosts(value?: string | null) {
  return (value || "")
    .split(",")
    .map((item) => normalizeHost(item))
    .filter(Boolean);
}

export function shareHosts() {
  const configured = [
    process.env.NEXT_PUBLIC_SHARE_DOMAIN,
    ...splitHosts(process.env.NEXT_PUBLIC_SHARE_DOMAINS),
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

export function isLocalHost(host?: string | null) {
  const normalized = normalizeHost(host);
  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1"
  );
}

export function propnetraHosts() {
  return new Set(
    [
      DEFAULT_PROPNETRA_DOMAIN,
      normalizeHost(process.env.NEXT_PUBLIC_SITE_HOST),
    ].filter(Boolean)
  );
}

export function mergedHosts() {
  return new Set(
    [
      DEFAULT_MERGED_DOMAIN,
      "merged.localhost",
      normalizeHost(process.env.STAGING_HOST),
      ...splitHosts(process.env.NEXT_PUBLIC_SITE_HOSTS),
    ].filter(Boolean)
  );
}

export function isPropnetraHost(host?: string | null) {
  return propnetraHosts().has(normalizeHost(host));
}

export function isMergedHost(host?: string | null) {
  const normalized = normalizeHost(host);
  if (!normalized) return false;
  if (mergedHosts().has(normalized)) return true;
  return normalized.endsWith(".sslip.io");
}

/** Marketing site paths served only on propnetra.devsol.in */
const PROPNETRA_PREFIXES = [
  "/blogs",
  "/careers",
  "/contact",
  "/faqs",
  "/pricing",
  "/login",
  "/signin",
  "/signup",
  "/real-estate-agents",
  "/maps",
];

export function isMergedPath(pathname: string) {
  return pathname === "/agent" || pathname.startsWith("/agent/");
}

export function isPropnetraPath(pathname: string) {
  if (pathname === "/") return true;
  return PROPNETRA_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function isSharedPath(pathname: string) {
  return (
    pathname.startsWith("/api/") ||
    pathname === "/api" ||
    pathname.startsWith("/share")
  );
}

function configuredSiteHosts() {
  return [
    process.env.NEXT_PUBLIC_SITE_HOST,
    process.env.STAGING_HOST,
    ...splitHosts(process.env.NEXT_PUBLIC_SITE_HOSTS),
  ]
    .map((value) => normalizeHost(value))
    .filter(Boolean);
}

/** Local / unset lock: allow all hosts. Production allows live + merged + share. */
export function isAllowedSiteHost(host?: string | null) {
  const normalized = normalizeHost(host);
  if (!normalized) return false;
  if (isLocalHost(normalized)) return true;
  if (isPropnetraHost(normalized) || isMergedHost(normalized)) return true;
  if (isShareHost(normalized)) return true;

  const allowed = configuredSiteHosts();
  if (allowed.length === 0) return true;
  return allowed.includes(normalized);
}
