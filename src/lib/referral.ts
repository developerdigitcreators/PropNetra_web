export const REF_STORAGE_KEY = 'propnetra_ref';
export const REF_COOKIE = 'propnetra_ref';

export function persistReferralCode(code: string) {
  const v = String(code || '').trim().toUpperCase();
  if (!v || typeof window === 'undefined') return;
  try {
    localStorage.setItem(REF_STORAGE_KEY, v);
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${REF_COOKIE}=${encodeURIComponent(v)};path=/;max-age=${60 * 60 * 24 * 90};SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function readReferralCodeFromBrowser(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery =
      params.get('ref') ||
      params.get('referId') ||
      params.get('refer') ||
      params.get('referralCode');
    if (fromQuery?.trim()) {
      const v = fromQuery.trim().toUpperCase();
      persistReferralCode(v);
      return v;
    }
  } catch {
    /* ignore */
  }
  try {
    const ls = localStorage.getItem(REF_STORAGE_KEY);
    if (ls?.trim()) return ls.trim().toUpperCase();
  } catch {
    /* ignore */
  }
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${REF_COOKIE}=([^;]*)`),
    );
    if (match?.[1]) return decodeURIComponent(match[1]).trim().toUpperCase();
  } catch {
    /* ignore */
  }
  return null;
}
