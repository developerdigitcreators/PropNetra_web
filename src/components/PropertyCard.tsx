"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { SharedFloorPrice, SharedPropertyCard } from "@/lib/types";
import { areaLabel } from "@/lib/format";

const PRIMARY_RED = "#FF5A00";

function formatFloorPrice(row: SharedFloorPrice) {
  const status = String(row.status || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");
  const sold = Boolean(row.isSold) || status === "sold";
  if (sold) return { text: "Sold", sold: true };
  const price = row.price == null ? null : Number(row.price);
  const onRequest =
    status === "price_on_request" ||
    status === "por" ||
    status === "on_request" ||
    price == null ||
    !Number.isFinite(price) ||
    price <= 0;
  if (onRequest) return { text: "On request", sold: false };
  if (price >= 10000000) return { text: `₹${(price / 10000000).toFixed(2)} Cr`, sold: false };
  if (price >= 100000) return { text: `₹${(price / 100000).toFixed(2)} L`, sold: false };
  return { text: `₹${price.toLocaleString("en-IN")}`, sold: false };
}

export function PropertyCard({
  item,
  href,
}: {
  item: SharedPropertyCard;
  href?: string | null;
  sharePath?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const area = item.areaLabel || areaLabel(item.area) || "—";
  const status = item.furnishing || item.constructionStatus || item.statusLabel || "—";
  const bhk = item.bhkLabel || item.bhk;
  const tags = [item.postedByBadge, item.buildingType].filter(
    (value): value is string => !!value,
  );
  const floors = item.floorPricing || [];
  const gradient = item.isVerified
    ? "linear-gradient(to bottom, rgba(232, 193, 114, 0.35), rgba(255, 255, 255, 0))"
    : "linear-gradient(to bottom, rgba(192, 192, 192, 0.35), rgba(255, 255, 255, 0))";

  const info = (
    <>
      <h2 className="text-[18px] font-bold leading-tight text-black">{item.displayTitle}</h2>
      {item.locationLine ? (
        <p className="mt-1 text-[14px] font-medium text-[#666]">{item.locationLine}</p>
      ) : null}
      {bhk || item.priceLabel ? (
        <p className="mt-1 flex min-w-0 items-center text-[14px] font-medium text-[#666]">
          {bhk ? <span className="min-w-0 truncate">{bhk}</span> : null}
          {item.priceLabel ? (
            <span className="min-w-0 truncate">
              {bhk ? "  |  " : ""}
              <span className="font-bold text-black">{item.priceLabel}</span>
            </span>
          ) : null}
        </p>
      ) : null}
    </>
  );

  return (
    <article className="relative overflow-hidden rounded-[15px] border border-[#F0E0B0] bg-[#FFFBF5] p-[15px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[120px]"
        style={{ background: gradient }}
      />

      <div className="relative">
        {item.propertyType ? (
          <div className="mb-2.5 flex items-start justify-between gap-2.5">
            <span
              className="rounded border bg-white px-2.5 py-1 text-[12px] font-bold"
              style={{ borderColor: PRIMARY_RED, color: PRIMARY_RED }}
            >
              {item.propertyType}
            </span>
          </div>
        ) : null}

        {href ? (
          <Link href={href} className="mb-3 block">
            {info}
          </Link>
        ) : (
          <div className="mb-3">{info}</div>
        )}

        <div className="mb-2.5 border-y border-[#F0E0B0] pb-2 pt-3">
          <div className="flex gap-5 overflow-x-auto">
            <Spec icon={<MaximizeIcon />} label="Carpet Area" value={area} />
            <Spec icon={<ActivityIcon />} label="Status" value={status} />
            <Spec icon={<LayersIcon />} label="Floor" value={item.floor || "—"} />
          </div>

          <button
            type="button"
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse details" : "Expand details"}
            onClick={() => setExpanded((open) => !open)}
            className="mx-auto mt-1.5 flex p-1"
            style={{ color: PRIMARY_RED }}
          >
            <Chevron open={expanded} />
          </button>

          {expanded && floors.length > 0 ? (
            <div className="mt-2 border-t border-[#F0E0B0] pt-2">
              <p className="mb-0.5 text-[12px] font-bold text-black">Floor-wise pricing</p>
              {floors.map((row, index) => {
                const price = formatFloorPrice(row);
                const n = row.floorNumber ?? index + 1;
                return (
                  <div
                    key={`floor-${n}-${index}`}
                    className="flex items-center justify-between gap-3 py-0.5"
                  >
                    <span className="text-[12px] font-medium text-[#888]">Floor {n}</span>
                    <span
                      className="text-[12px] font-semibold"
                      style={{ color: price.sold ? PRIMARY_RED : "#000" }}
                    >
                      {price.text}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-3 py-1.5 text-[12px] font-medium text-black"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#2ecc71]" />
                {tag}
              </span>
            ))}
          </div>
        ) : null}
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
    <div className="flex shrink-0 items-center gap-2">
      <span className="text-[#666]">{icon}</span>
      <div>
        <p className="text-[11px] font-medium uppercase text-[#999]">{label}</p>
        <p className="text-[12px] font-bold text-black">{value}</p>
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12h4l2-5 4 10 2-5h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 12l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
