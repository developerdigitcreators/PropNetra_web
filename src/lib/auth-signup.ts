/**
 * Client helper for PropNetra signup APIs.
 * Pass `referId` (short code or UUID) on step2 — never show in UI.
 */
const apiBase = () =>
  (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    'http://localhost:3000/api/v1'
  ).replace(/\/$/, '');

async function postJson<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '1',
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new Error(json?.error?.message || `Request failed (${res.status})`);
  }
  return json.data as T;
}

export async function signupStep1(payload: {
  name: string;
  email: string;
  contact: string;
}) {
  return postJson<{ signupSessionId: string }>('/auth/signup/step1', payload);
}

export async function signupStep2(payload: {
  signupSessionId: string;
  emailOtp: string;
  contactOtp: string;
  /** Hidden referral code or UUID — optional */
  referId?: string | null;
}) {
  return postJson('/auth/signup/step2', {
    signupSessionId: payload.signupSessionId,
    emailOtp: payload.emailOtp,
    contactOtp: payload.contactOtp,
    ...(payload.referId ? { referId: payload.referId } : {}),
  });
}

export async function signupStep3(payload: Record<string, unknown>) {
  return postJson('/auth/signup/step3', payload);
}

export async function signupComplete(payload: {
  signupSessionId: string;
  password: string;
  confirmPassword: string;
}) {
  return postJson('/auth/signup/complete', payload);
}

export type SignupCity = { id: string; name: string };

/** Active cities from admin location catalog (public). */
export async function fetchSignupCities(): Promise<SignupCity[]> {
  const res = await fetch(`${apiBase()}/cities`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'ngrok-skip-browser-warning': '1',
    },
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.error?.message || `Failed to load cities (${res.status})`);
  }
  const payload = json?.data ?? json;
  const raw: unknown[] = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.items)
      ? payload.items
      : [];
  return raw
    .map((row: any): SignupCity | null => {
      const id = String(row?.id ?? row?.cityId ?? '').trim();
      const name = String(row?.name ?? row?.cityName ?? '').trim();
      if (!id || !name) return null;
      return { id, name };
    })
    .filter((row): row is SignupCity => row != null);
}
