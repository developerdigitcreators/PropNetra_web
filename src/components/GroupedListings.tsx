"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { withPriceQuery } from "@/lib/price";
import type { ListingGroup } from "@/lib/types";

export function GroupedListings({
  clientId,
  groups,
  showPrice = false,
}: {
  clientId: string;
  groups: ListingGroup[];
  showPrice?: boolean;
}) {
  const visible = useMemo(
    () => groups.filter((group) => group.count > 0),
    [groups],
  );
  const [active, setActive] = useState(visible[0]?.key || groups[0]?.key || "");

  const selected = groups.find((group) => group.key === active) || visible[0];

  if (!visible.length) {
    return (
      <p className="rounded-2xl bg-white px-4 py-8 text-center text-[14px] text-[#8b8b8b]">
        No live properties on this list right now.
      </p>
    );
  }

  return (
    <div>
      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {groups
          .filter((group) => group.count > 0 || ["residential", "commercial", "pre-leased"].includes(group.key))
          .map((group) => {
            const on = group.key === selected?.key;
            return (
              <button
                key={group.key}
                type="button"
                onClick={() => setActive(group.key)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold ${
                  on
                    ? "border-[#F26A21] bg-[#F26A21] text-white"
                    : "border-[#e4dcc8] bg-white text-[#333]"
                }`}
              >
                {group.label}
                <span className={`ml-1.5 ${on ? "text-white/80" : "text-[#8b8b8b]"}`}>
                  {group.count}
                </span>
              </button>
            );
          })}
      </div>

      {selected?.items.length ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-[16px] font-extrabold text-[#111]">{selected.label}</h2>
          {selected.items.map((item) => (
            <PropertyCard
              key={item.id}
              item={item}
              href={withPriceQuery(`/share/clients/${clientId}/${item.id}`, showPrice)}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-white px-4 py-8 text-center text-[14px] text-[#8b8b8b]">
          No {selected?.label.toLowerCase()} properties on this list.
        </p>
      )}
    </div>
  );
}
