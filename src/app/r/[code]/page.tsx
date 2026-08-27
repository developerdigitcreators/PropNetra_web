'use client';

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { persistReferralCode } from '@/lib/referral';

const APP_SCHEME = 'propnetra';
const ANDROID_PACKAGE =
  process.env.NEXT_PUBLIC_ANDROID_PACKAGE || 'com.propnetra';
const PLAY_STORE =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;
const APP_STORE =
  process.env.NEXT_PUBLIC_APP_STORE_URL ||
  'https://apps.apple.com/app/propnetra/id0000000000';

const APP_TRY_MS = 1800;

function isAndroid() {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
}

function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function buildAppDeepLink(code: string) {
  return `${APP_SCHEME}://r/${encodeURIComponent(code)}`;
}

function buildAndroidIntent(code: string, webFallback: string) {
  const path = `r/${encodeURIComponent(code)}`;
  const fallback = encodeURIComponent(webFallback);
  return `intent://${path}#Intent;scheme=${APP_SCHEME};package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;
}

type Phase = 'saving' | 'trying_app' | 'choose';

function ReferralLandingInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const forceWeb = searchParams.get('web') === '1';

  const code = useMemo(() => {
    const raw = params?.code;
    const v = Array.isArray(raw) ? raw[0] : raw;
    return (v || '').toString().trim().toUpperCase();
  }, [params]);

  const signupHref = code ? `/signup?ref=${encodeURIComponent(code)}` : '/signup';
  const [phase, setPhase] = useState<Phase>('saving');
  const cancelledRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goWebSignup = useCallback(() => {
    cancelledRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    router.replace(signupHref);
  }, [router, signupHref]);

  const tryOpenApp = useCallback(() => {
    if (!code) {
      goWebSignup();
      return;
    }
    setPhase('trying_app');
    const deepLink = buildAppDeepLink(code);
    const absoluteSignup =
      typeof window !== 'undefined'
        ? `${window.location.origin}${signupHref}`
        : signupHref;

    if (isAndroid()) {
      window.location.href = buildAndroidIntent(code, absoluteSignup);
      timerRef.current = setTimeout(() => {
        if (!cancelledRef.current) setPhase('choose');
      }, APP_TRY_MS + 400);
      return;
    }

    const start = Date.now();
    const onHide = () => {
      cancelledRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    const onVisibility = () => {
      if (document.hidden) onHide();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onHide);

    window.location.href = deepLink;

    timerRef.current = setTimeout(() => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onHide);
      if (cancelledRef.current) return;
      if (Date.now() - start >= APP_TRY_MS - 50) {
        goWebSignup();
      }
    }, APP_TRY_MS);
  }, [code, goWebSignup, signupHref]);

  useEffect(() => {
    cancelledRef.current = false;
    if (!code) {
      setPhase('choose');
      return;
    }
    persistReferralCode(code);

    if (forceWeb) {
      setPhase('choose');
      return;
    }

    const t = setTimeout(() => tryOpenApp(), 150);
    return () => {
      cancelledRef.current = true;
      clearTimeout(t);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [code, forceWeb, tryOpenApp]);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: 360, width: '100%', textAlign: 'center' }}>
        {phase === 'saving' || phase === 'trying_app' ? (
          <>
            <div
              style={{
                width: 36,
                height: 36,
                margin: '0 auto 16px',
                border: '3px solid #334155',
                borderTopColor: '#38bdf8',
                borderRadius: '50%',
                animation: 'pnspin 0.8s linear infinite',
              }}
            />
            <p style={{ fontSize: 15, margin: 0, opacity: 0.9 }}>
              {phase === 'saving' ? 'Saving invite…' : 'Opening PropNetra…'}
            </p>
            <p style={{ fontSize: 12, marginTop: 10, opacity: 0.5 }}>
              {code ? `Invite ${code}` : ''}
            </p>
            <button
              type="button"
              onClick={goWebSignup}
              style={{
                marginTop: 28,
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: 13,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Continue on web instead
            </button>
          </>
        ) : (
          <>
            <p
              style={{
                fontSize: 12,
                letterSpacing: 1,
                opacity: 0.6,
                marginBottom: 8,
              }}
            >
              PROPNETRA INVITE
            </p>
            <h1 style={{ fontSize: 22, margin: '0 0 8px', fontWeight: 700 }}>
              Open app or continue on web
            </h1>
            <p style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5, marginBottom: 24 }}>
              We&apos;ll apply your invite automatically
              {code ? (
                <>
                  {' '}
                  (<strong>{code}</strong>)
                </>
              ) : null}
              .
            </p>
            <button
              type="button"
              onClick={tryOpenApp}
              style={{
                display: 'block',
                width: '100%',
                padding: '14px 16px',
                borderRadius: 10,
                border: 'none',
                background: '#fff',
                color: '#0f172a',
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                marginBottom: 10,
              }}
            >
              Open app
            </button>
            <button
              type="button"
              onClick={goWebSignup}
              style={{
                display: 'block',
                width: '100%',
                padding: '14px 16px',
                borderRadius: 10,
                border: '1px solid #475569',
                background: 'transparent',
                color: '#f8fafc',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                marginBottom: 20,
              }}
            >
              Continue signup on web
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={PLAY_STORE}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #334155',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: 13,
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
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #334155',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: 13,
                }}
              >
                App Store
              </a>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes pnspin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}

export default function ReferralLandingPage() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: '100vh',
            background: '#0f172a',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Opening…
        </main>
      }
    >
      <ReferralLandingInner />
    </Suspense>
  );
}
