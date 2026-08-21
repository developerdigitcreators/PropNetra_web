"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { SharedPropertyCard } from "@/lib/types";
import { areaLabel, formatUpdated } from "@/lib/format";

export function PropertyCard({
  item,
  href,
}: {
  item: SharedPropertyCard;
  href?: string | null;
}) {
  const area = item.areaLabel || areaLabel(item.area);
  const updated = formatUpdated(item.updatedAt || item.savedAt);
  const pills = [
    item.isVerified ? "Verified" : null,
    item.postedByBadge,
    item.buildingType,
  ].filter((value): value is string => !!value);
  const sharePath = href || `/share/listings/${item.id}`;
  const bodyClass = "block px-4 pt-4";
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        {item.propertyType ? (
          <span className="rounded-md border border-[#F26A21] px-2.5 py-1 text-[12px] font-semibold text-[#F26A21]">
            {item.propertyType}
          </span>
        ) : (
          <span />
        )}
        {item.isVerified ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-[#e6e6e6] bg-white px-2 py-1 text-[11px] font-medium text-[#222]">
            <Star />
            Verified Listing
          </span>
        ) : null}
      </div>

      <h2 className="mt-3 text-[22px] font-extrabold leading-tight text-[#111]">
        {item.displayTitle}
      </h2>
      {item.locationLine ? (
        <p className="mt-1 text-[13px] text-[#8d8d8d]">{item.locationLine}</p>
      ) : null}

      <div className="mt-4 border-y border-[#efe8d8] py-3">
        <div className="grid grid-cols-3 gap-1">
          <Spec icon={<AreaIcon />} label="Carpet Area" value={area || "—"} />
          <Spec
            icon={<PulseIcon />}
            label="Status"
            value={item.furnishing || item.constructionStatus || item.statusLabel || "—"}
          />
          <Spec icon={<FloorIcon />} label="Floor" value={item.floor || "—"} />
        </div>
        <div className="mt-2 flex justify-center text-[#F26A21]">
          <ChevronDown />
        </div>
      </div>

      {pills.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e4e4e4] bg-white px-2.5 py-1 text-[12px] text-[#333]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2ecc71]" />
              {pill}
            </span>
          ))}
        </div>
      ) : null}

      {updated ? (
        <p className="mt-3 text-[12px] text-[#9a9a9a]">Updated: {updated}</p>
      ) : null}
    </>
  );

  return (
    <article className="overflow-hidden rounded-[22px] bg-[#FBF6EA] shadow-[0_4px_18px_rgba(40,30,10,0.06)]">
      {href ? (
        <Link href={href} className={bodyClass}>
          {body}
        </Link>
      ) : (
        <div className={bodyClass}>{body}</div>
      )}

      <div className="flex items-center gap-2.5 px-4 pb-4 pt-3">
        <IconButton label="Save" />
        <ShareButton title={item.displayTitle} path={sharePath} />
      </div>
    </article>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[#888]">{icon}</div>
      <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-[#9a9a9a]">
        {label}
      </p>
      <p className="truncate text-[13px] font-bold text-[#111]">{value}</p>
    </div>
  );
}

function ShareButton({ title, path }: { title: string; path: string }) {
  return (
    <button
      type="button"
      aria-label="Share"
      onClick={() => {
        const url =
          typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
        if (navigator.share) {
          void navigator.share({ title, url });
          return;
        }
        void navigator.clipboard?.writeText(url);
      }}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e4e4e4] bg-white text-[#333]"
    >
      <ShareIcon />
    </button>
  );
}

function IconButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e4e4e4] bg-white text-[#333]"
    >
      <BookmarkIcon />
    </button>
  );
}

function Star() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F26A21" aria-hidden>
      <path d="M12 3.6 14.5 9l5.9.7-4.4 4 1.2 5.8L12 16.8 6.8 19.5l1.2-5.8-4.4-4 5.9-.7L12 3.6Z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" stroke="#888" strokeWidth="1.8" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12h4l2-5 4 10 2-5h6" stroke="#888" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function FloorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19h14M7 15h10M9 11h6M11 7h2" stroke="#888" strokeWidth="1.8" strokeLinecap="round" />
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
