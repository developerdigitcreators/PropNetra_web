"use client";

import { useState } from "react";

type Place = {
  name?: string | null;
  address?: string | null;
  distanceKm?: number | null;
};

const PREVIEW = 4;

export function LocationTabs({
  tabs,
}: {
  tabs: { tab: string; places: unknown[] }[];
}) {
  const usable = tabs.filter((t) => t.tab && t.places.length);
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  if (!usable.length) return null;
  const current = usable[Math.min(active, usable.length - 1)];
  const places = (current.places as Place[]).filter((p) => p && p.name);
  const visible = showAll ? places : places.slice(0, PREVIEW);

  return (
    <div className="mt-3">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {usable.map((t, i) => (
          <button
            key={t.tab}
            type="button"
            onClick={() => {
              setActive(i);
              setShowAll(false);
            }}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold ${
              i === active
                ? "border-[#C8102E] bg-[#C8102E] text-white"
                : "border-[#E2E8F0] bg-white text-[#475569]"
            }`}
          >
            {t.tab}
          </button>
        ))}
      </div>
      <ul className="mt-3 divide-y divide-[#F1F5F9] rounded-xl border border-[#E2E8F0] bg-white">
        {visible.map((p, i) => (
          <li key={`${p.name}-${i}`} className="flex items-center justify-between gap-3 px-3.5 py-3">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-[#1A1A1A]">{p.name}</p>
              {p.address ? (
                <p className="truncate text-[11px] text-[#94A3B8]">{p.address}</p>
              ) : null}
            </div>
            {p.distanceKm != null && Number.isFinite(Number(p.distanceKm)) ? (
              <span className="shrink-0 text-[12px] font-bold text-[#C8102E]">
                {Number(p.distanceKm).toFixed(1)} km
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      {places.length > PREVIEW ? (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-2 text-[12px] font-bold text-[#C8102E]"
        >
          {showAll ? "Show less" : `View all ${places.length}`}
        </button>
      ) : null}
    </div>
  );
}
