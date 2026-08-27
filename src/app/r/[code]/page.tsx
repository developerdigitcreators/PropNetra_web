'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  REF_COOKIE,
  REF_STORAGE_KEY,
  persistReferralCode,
} from '@/lib/referral';

const PLAY_STORE =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  'https://play.google.com/store/apps/details?id=com.propnetra.app';
const APP_STORE =
  process.env.NEXT_PUBLIC_APP_STORE_URL ||
  'https://apps.apple.com/app/propnetra/id0000000000';

export default function ReferralLandingPage() {
  const params = useParams();
  const code = useMemo(() => {
    const raw = params?.code;
    const v = Array.isArray(raw) ? raw[0] : raw;
    return (v || '').toString().trim().toUpperCase();
  }, [params]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!code) return;
    persistReferralCode(code);
    // Also set cookie for SSR / multi-tab
    document.cookie = `${REF_COOKIE}=${encodeURIComponent(code)};path=/;max-age=${60 * 60 * 24 * 90};SameSite=Lax`;
    try {
      localStorage.setItem(REF_STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [code]);

  const signupHref = code ? `/signup?ref=${encodeURIComponent(code)}` : '/signup';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0ea5e9 120%)',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: '100%',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 16,
          padding: '32px 28px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p style={{ opacity: 0.8, fontSize: 13, letterSpacing: 1, marginBottom: 8 }}>
          PROPNETRA INVITE
        </p>
        <h1 style={{ fontSize: 28, margin: '0 0 12px', fontWeight: 700 }}>
          You&apos;re invited
        </h1>
        <p style={{ opacity: 0.9, lineHeight: 1.5, marginBottom: 24 }}>
          Join PropNetra with your friend&apos;s invite
          {code ? (
            <>
              {' '}
              (<strong>{code}</strong>)
            </>
          ) : null}
          . Your referral is applied automatically — you won&apos;t need to enter a code.
        </p>

        <Link
          href={signupHref}
          style={{
            display: 'block',
            textAlign: 'center',
            background: '#fff',
            color: '#0f172a',
            fontWeight: 700,
            padding: '14px 18px',
            borderRadius: 10,
            textDecoration: 'none',
            marginBottom: 16,
          }}
        >
          Continue signup
        </Link>

        <p style={{ fontSize: 13, opacity: 0.75, marginBottom: 12, textAlign: 'center' }}>
          Already signed up? Get the app
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href={PLAY_STORE}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              minWidth: 140,
              textAlign: 'center',
              padding: '12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            Google Play
          </a>
          <a
            href={APP_STORE}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              minWidth: 140,
              textAlign: 'center',
              padding: '12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            App Store
          </a>
        </div>

        {!ready && code ? (
          <p style={{ fontSize: 12, opacity: 0.5, marginTop: 16, textAlign: 'center' }}>
            Saving invite…
          </p>
        ) : null}
      </div>
    </main>
  );
}
