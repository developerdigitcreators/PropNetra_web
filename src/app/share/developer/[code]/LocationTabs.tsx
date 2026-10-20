"use client";

import { useState } from "react";

type Place = {
  name?: string | null;
  address?: string | null;
  distanceKm?: number | null;
  distance?: string | null;
};

const PREVIEW = 4;

export function LocationTabs({
  tabs,
}: {
  tabs: { tab: string; places: unknown[] }[];
}) {
  const usable = tabs.filter((t) => t.tab && Array.isArray(t.places) && t.places.length);
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  if (!usable.length) return null;
  const current = usable[Math.min(active, usable.length - 1)];
  const places = (current.places as Place[]).filter((p) => p && p.name);
  const visible = showAll ? places : places.slice(0, PREVIEW);

  return (
    <div>
      <div className="mb-3 flex gap-2 overflow-x-auto rounded-xl bg-[#F8FAFC] p-1.5">
        {usable.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.tab}
              type="button"
              onClick={() => {
                setActive(i);
                setShowAll(false);
              }}
              className={`shrink-0 rounded-[10px] border bg-white px-3 py-2 text-[12px] ${
                on ? "border-black font-bold text-black" : "border-[#9E9E9E]/15 font-medium text-[#64748B]"
              }`}
            >
              {t.tab}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-1">
        {visible.map((p, i) => (
          <div key={`${p.name}-${i}`} className="flex items-center gap-3 py-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center text-[#FF5A00]">➤</span>
            <p className="min-w-0 flex-1 truncate text-[14px] text-black">{p.name}</p>
            <span className="shrink-0 text-[13px] text-[#64748B]">
              {p.distance ||
                (p.distanceKm != null && Number.isFinite(Number(p.distanceKm))
                  ? `${Number(p.distanceKm).toFixed(1)} km`
                  : "")}
            </span>
          </div>
        ))}
      </div>
      {places.length > PREVIEW ? (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-2 w-full rounded-2xl bg-black py-2.5 text-[14px] font-semibold text-white"
        >
          {showAll ? "View Less" : "View More"}
        </button>
      ) : null}
    </div>
  );
}
