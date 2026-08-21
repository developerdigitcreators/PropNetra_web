import type { ReactNode } from "react";
import Link from "next/link";

export function AppShell({
  title,
  backHref,
  beige,
  children,
}: {
  title: ReactNode;
  backHref?: string;
  beige?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#f4f4f4]">
      <div
        className={`mx-auto min-h-dvh w-full max-w-[430px] shadow-[0_0_40px_rgba(0,0,0,0.06)] ${
          beige ? "bg-[#F7F4EE]" : "bg-white"
        }`}
      >
        <header className={`sticky top-0 z-20 flex items-center gap-3 px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] backdrop-blur ${beige ? "bg-[#F7F4EE]/95" : "bg-white/95"}`}>
          {backHref ? (
            <Link
              href={backHref}
              aria-label="Back"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#eee] bg-white text-[#222] shadow-sm"
            >
              <ChevronLeft />
            </Link>
          ) : (
            <div className="h-11 w-11 shrink-0" />
          )}
          <h1 className="min-w-0 flex-1 text-center text-[20px] font-bold leading-tight tracking-tight text-[#111]">
            {title}
          </h1>
          <div className="h-11 w-11 shrink-0" />
        </header>
        <main className="px-4 pb-[max(24px,env(safe-area-inset-bottom))]">{children}</main>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6 9 12l6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
