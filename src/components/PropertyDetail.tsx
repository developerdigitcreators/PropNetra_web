"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { SharedPropertyDetail } from "@/lib/types";
import { splitDetailTitle } from "@/lib/format";

export function PropertyDetail({
  item,
  backHref,
}: {
  item: SharedPropertyDetail;
  backHref: string;
}) {
  const images = item.imageUrls?.length
    ? item.imageUrls
    : item.imageUrl
      ? [item.imageUrl]
      : [];
  const { lead, accent } = splitDetailTitle(item.displayTitle);
  const [aboutOpen, setAboutOpen] = useState(false);
  const about = item.about || null;
  const aboutPreview =
    about && !aboutOpen && about.length > 180 ? `${about.slice(0, 180).trim()}…` : about;

  return (
    <div className="bg-white">
      <Hero images={images} alt={item.displayTitle} backHref={backHref} item={item} />

      <div className="px-4 pt-4 pb-28">
        <h1 className="text-[26px] font-extrabold leading-tight">
          <span className="text-[#1a1a1a]">{lead}</span>
          {accent ? <span className="text-[#F26A21]"> {accent}</span> : null}
        </h1>
        {item.locationLine ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-[#8d8d8d]">
            <Pin />
            {item.locationLine}
          </p>
        ) : null}

        {item.mapUrl ? (
          <div className="mt-4 flex justify-end">
            <a
              href={item.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] font-semibold text-[#F26A21]"
            >
              View On Map
            </a>
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-[#ececec]">
          <Highlight
            icon={<HomeIcon />}
            label="Status"
            value={item.constructionStatus || item.furnishing || item.statusLabel || "—"}
          />
          <div className="border-l border-[#ececec]">
            <Highlight
              icon={<ClockIcon />}
              label="Possession"
              value={item.possession || item.floor || "—"}
            />
          </div>
        </div>

        {about ? (
          <section className="mt-7">
            <h2 className="text-[20px] font-extrabold">
              <span className="border-b-[3px] border-[#F26A21] pb-0.5 text-[#F26A21]">About</span>{" "}
              <span className="text-[#111]">{item.displayTitle}</span>
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#6b6b6b]">{aboutPreview}</p>
            {about.length > 180 ? (
              <button
                type="button"
                onClick={() => setAboutOpen((open) => !open)}
                className="mt-4 rounded-md border border-[#F26A21] px-4 py-1.5 text-[14px] font-semibold text-[#F26A21]"
              >
                {aboutOpen ? "Read Less" : "Read More"}
              </button>
            ) : null}
          </section>
        ) : item.specs?.length ? (
          <section className="mt-7">
            <h2 className="text-[20px] font-extrabold">
              <span className="border-b-[3px] border-[#F26A21] pb-0.5 text-[#F26A21]">About</span>
            </h2>
            <div className="mt-4 divide-y divide-[#f0f0f0] overflow-hidden rounded-2xl border border-[#f0f0f0]">
              {item.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 px-4 py-3">
                  <span className="text-[13px] text-[#8b8b8b]">{spec.label}</span>
                  <span className="text-right text-[13px] font-semibold text-[#222]">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-[#eee] bg-white px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around text-[#333]">
          <BarItem icon={<BookmarkIcon />} label="Shortlist" />
          <ShareBarItem title={item.displayTitle} />
          <BarItem icon={<DownloadIcon />} label="Brochure" />
        </div>
      </div>
    </div>
  );
}

function Hero({
  images,
  alt,
  backHref,
  item,
}: {
  images: string[];
  alt: string;
  backHref: string;
  item: SharedPropertyDetail;
}) {
  const [index, setIndex] = useState(0);
  const current = images[index] || null;

  return (
    <div className="relative aspect-[4/3] bg-[#ddd]">
      {current ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={current} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-[#888]">No photo</div>
      )}
      <Link
        href={backHref}
        aria-label="Back"
        className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white"
      >
        ‹
      </Link>
      {item.rera ? (
        <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[12px] font-semibold">
          RERA
        </span>
      ) : null}
      <div className="absolute bottom-3 right-3 flex gap-2">
        {item.videoCount ? (
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-semibold">
            ▶ {item.videoCount}
          </span>
        ) : null}
        <span className="rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-semibold">
          🖼 {item.imageCount || images.length}
        </span>
      </div>
      {images.length > 1 ? (
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-1.5">
          {images.slice(0, 6).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-[#F26A21]" : "bg-white/70"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Highlight({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F8E8D8] text-[#F26A21]">
        {icon}
      </div>
      <div>
        <p className="text-[12px] text-[#8d8d8d]">{label}</p>
        <p className="text-[15px] font-bold text-[#111]">{value}</p>
      </div>
    </div>
  );
}

function BarItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-[11px]">
      {icon}
      {label}
    </div>
  );
}

function ShareBarItem({ title }: { title: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        if (navigator.share) void navigator.share({ title, url });
      }}
      className="flex flex-col items-center gap-1 text-[11px]"
    >
      <ShareIcon />
      Share
    </button>
  );
}

function Pin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-6.2 7-11.2A7 7 0 1 0 5 9.8C5 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 4h10a1 1 0 0 1 1 1v16l-6-3-6 3V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11.2 16 6.4M8 12.8 16 17.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4v10M8 10l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
