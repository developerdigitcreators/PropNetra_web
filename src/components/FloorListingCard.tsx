"use client";

import type { SharedFloorPrice, SharedPropertyCard } from "@/lib/types";
import { areaLabel, formatUpdated } from "@/lib/format";

const ordinalFloor = (n: number) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th Floor`;
  switch (n % 10) {
    case 1:
      return `${n}st Floor`;
    case 2:
      return `${n}nd Floor`;
    case 3:
      return `${n}rd Floor`;
    default:
      return `${n}th Floor`;
  }
};

const normStatus = (s?: string | null) =>
  String(s || "").toLowerCase().trim().replace(/\s+/g, "_");

const isOnRequest = (st: string) => st === "price_on_request" || st === "por" || st === "on_request";

/** Same floor label / value rules as the app's `mapListingToBuilderFloorCard`. */
function floorRows(rows: SharedFloorPrice[]) {
  return rows
    .filter((row) => {
      const st = normStatus(row.status);
      if (row.isSold || st === "sold" || isOnRequest(st)) return true;
      const price = row.price == null ? null : Number(row.price);
      return price != null && Number.isFinite(price) && price > 0;
    })
    .map((row, index) => {
      const st = normStatus(row.status);
      const isSold = Boolean(row.isSold) || st === "sold";
      const n = Number(row.floorNumber ?? 0);
      const price = row.price == null ? null : Number(row.price);
      let value: string;
      if (isSold) value = "Sold";
      else if (isOnRequest(st) || price == null || !Number.isFinite(price) || price <= 0) value = "On request";
      else if (price >= 10000000) value = `₹${(price / 10000000).toFixed(2)} Cr`;
      else if (price >= 100000) value = `₹${(price / 100000).toFixed(2)} L`;
      else value = `₹${price.toLocaleString("en-IN")}`;
      return {
        label: ordinalFloor(Number.isFinite(n) && n > 0 ? n : index + 1),
        value,
        isSold,
      };
    });
}

/** Direct Builder Floor listing card, mirroring the app's `BuilderFloorListingCard`. */
export function FloorListingCard({
  item,
  sharePath,
}: {
  item: SharedPropertyCard;
  sharePath?: string;
}) {
  const images = (item.images?.length ? item.images : item.imageUrls?.length ? item.imageUrls : [item.imageUrl]).filter(
    (src): src is string => !!src,
  );
  const floors = floorRows(item.floorPricing || []);
  const area = item.areaLabel || areaLabel(item.area) || "—";
  const status = item.constructionStatus || item.furnishing || "—";
  const updated = formatUpdated(item.updatedAt || item.savedAt);
  const path = sharePath || `/l/${item.shareCode || item.id}`;

  return (
    <article className="overflow-hidden rounded-[18px] bg-white shadow-[0_4px_18px_rgba(40,30,10,0.08)]">
      <div className="relative">
        <div className="flex h-[200px] snap-x snap-mandatory overflow-x-auto">
          {images.length ? (
            images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${src}-${i}`}
                src={src}
                alt={`${item.displayTitle} ${i + 1}`}
                className="h-full w-full shrink-0 snap-center bg-[#f0f0f0] object-cover"
              />
            ))
          ) : (
            <div className="h-full w-full bg-[#f0f0f0]" />
          )}
        </div>
        <svg
          className="pointer-events-none absolute bottom-0 left-0 h-[40px] w-full"
          viewBox="0 0 500 30"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,30 L0,20 Q250,0 500,20 L500,30 Z" fill="#ffffff" />
        </svg>
        {item.propertyType ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#111]">
            <span className="h-2 w-2 rounded-full bg-[#F26A21]" />
            {item.propertyType}
          </span>
        ) : null}
        {images.length ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[11px] font-semibold text-white">
            <ImageIcon />
            {images.length}+
          </span>
        ) : null}
      </div>

      <div className="px-4 pt-1">
        <h2 className="text-[18px] font-extrabold leading-tight text-[#111]">{item.displayTitle}</h2>
        {item.locationLine ? <p className="mt-1 text-[13px] text-[#8d8d8d]">{item.locationLine}</p> : null}
        {updated ? (
          <span className="mt-2 inline-block rounded-md bg-[#FFF4EC] px-2 py-1 text-[11px] text-[#7a4a2a]">
            Updated On: <span className="font-bold">{updated}</span>
          </span>
        ) : null}

        <div className="mt-3 grid grid-cols-3 gap-1 border-t border-[#f1f1f1] pt-3">
          <Spec label="CARPET AREA" value={area} />
          <Spec label="STATUS" value={status} />
          <Spec label="FLOOR" value={item.floor || "—"} />
        </div>

        {floors.length ? (
          <div className="mt-3 grid grid-cols-4 overflow-hidden rounded-lg border border-[#e8e8e8]">
            {floors.map((f, i) => (
              <div
                key={`${f.label}-${i}`}
                className={`px-1.5 py-2 text-center ${i % 4 !== 0 ? "border-l border-[#e8e8e8]" : ""} ${i >= 4 ? "border-t border-[#e8e8e8]" : ""}`}
              >
                <p className="text-[10px] text-[#8d8d8d]">{f.label}</p>
                <p className={`truncate text-[12px] font-bold ${f.isSold ? "text-[#C8102E]" : "text-[#111]"}`}>
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2.5 px-4 pb-4 pt-3">
        <button
          type="button"
          aria-label="Save"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e4e4e4] bg-white text-[#333]"
        >
          <BookmarkIcon />
        </button>
        <button
          type="button"
          aria-label="Share"
          onClick={() => {
            const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
            if (navigator.share) {
              void navigator.share({ title: item.displayTitle, url });
              return;
            }
            void navigator.clipboard?.writeText(url);
          }}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e4e4e4] bg-white text-[#333]"
        >
          <ShareIcon />
        </button>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#9a9a9a]">{label}</p>
      <p className="truncate text-[13px] font-bold text-[#111]">{value}</p>
    </div>
  );
}

function ImageIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="2" />
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
