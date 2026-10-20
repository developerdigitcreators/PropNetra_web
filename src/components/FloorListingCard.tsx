"use client";

import { useState, type ReactNode } from "react";
import type { SharedFloorPrice, SharedPropertyCard } from "@/lib/types";
import { areaLabel } from "@/lib/format";

const PRIMARY = "#FF8A00";
const PRIMARY_RED = "#FF5A00";

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
}: {
  item: SharedPropertyCard;
  sharePath?: string;
}) {
  const images = (item.images?.length ? item.images : item.imageUrls?.length ? item.imageUrls : [item.imageUrl]).filter(
    (src): src is string => !!src,
  );
  const [expanded, setExpanded] = useState(false);
  const floors = floorRows(item.floorPricing || []);
  const area = item.areaLabel || areaLabel(item.area) || "—";
  const status = item.constructionStatus || item.furnishing || "—";

  return (
    <article className="overflow-hidden rounded-[18px] bg-white shadow-[0_4px_18px_rgba(40,30,10,0.08)]">
      <div className="relative">
        <div className="flex h-[180px] snap-x snap-mandatory overflow-x-auto">
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
          className="pointer-events-none absolute bottom-0 left-0 h-[45px] w-full"
          viewBox="0 0 500 30"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,30 L0,20 Q250,0 500,20 L500,30 Z" fill="#ffffff" />
        </svg>
        {item.propertyType ? (
          <span className="absolute left-[15px] top-[15px] inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-black">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PRIMARY }} />
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

        <div className={`mt-3 overflow-x-auto border-t border-[#f1f1f1] pt-3 ${expanded ? "border-b" : ""}`}>
          <div className="flex gap-5">
            <Spec icon={<MaximizeIcon />} label="Carpet Area" value={area} />
            <Spec icon={<ActivityIcon />} label="Status" value={status} />
            <Spec icon={<LayersIcon />} label="Floor" value={item.floor || "—"} />
          </div>
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse details" : "Expand details"}
          onClick={() => setExpanded((open) => !open)}
          className="mx-auto mt-1 flex p-1"
          style={{ color: PRIMARY }}
        >
          <Chevron open={expanded} />
        </button>

        {floors.length ? (
          <div className="mt-3 grid grid-cols-4 overflow-hidden rounded-lg border border-[#e8e8e8]">
            {floors.map((f, i) => (
              <div
                key={`${f.label}-${i}`}
                className={`px-1.5 py-2 text-center ${i % 4 !== 0 ? "border-l border-[#e8e8e8]" : ""} ${i >= 4 ? "border-t border-[#e8e8e8]" : ""}`}
              >
                <p className="text-[10px] text-[#8d8d8d]">{f.label}</p>
                <p
                  className="truncate text-[12px] font-bold text-[#111]"
                  style={f.isSold ? { color: PRIMARY_RED } : undefined}
                >
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="h-4" />
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
    <div className="flex shrink-0 items-center gap-2">
      <span className="text-[#666]">{icon}</span>
      <div>
        <p className="text-[11px] font-medium uppercase text-[#999]">{label}</p>
        <p className="text-[13px] font-bold text-[#111]">{value}</p>
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={open ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12h4l2-5 4 10 2-5h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 12l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
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

