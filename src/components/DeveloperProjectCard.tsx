import Link from "next/link";
import type { SharedPropertyCard } from "@/lib/types";

export function isDeveloperListCard(item: SharedPropertyCard) {
  return (
    item.developerProject === true ||
    String(item.cardStyle || "").toLowerCase() === "developer"
  );
}

export function DeveloperProjectCard({
  item,
  href,
}: {
  item: SharedPropertyCard;
  href: string;
}) {
  const meta = [item.bhkLabel || item.bhk, item.possession].filter(Boolean).join("  ·  ");
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_16px_rgba(0,0,0,0.12)]">
      <Link href={href} className="block">
        <div className="relative h-[180px] bg-[#F1F5F9]">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
          ) : null}
          <svg
            className="absolute inset-x-0 bottom-0 h-[30px] w-full"
            viewBox="0 0 500 30"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0,30 L0,22 Q250,-5 500,22 L500,30 Z" fill="#fff" />
          </svg>
          {item.statusLabel ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-black">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A00]" />
              {item.statusLabel}
            </span>
          ) : null}
        </div>
        <div className="px-4 pb-4 pt-1">
          <h2 className="truncate text-[16px] font-bold text-black">{item.displayTitle}</h2>
          <div className="mt-1 h-[3px] w-[70px] bg-gradient-to-r from-[#FF8A00]/40 to-transparent" />
          {item.priceLabel ? (
            <p className="mt-2 text-[16px] font-bold text-black">{item.priceLabel}</p>
          ) : null}
          {meta ? <p className="mt-1 truncate text-[13px] text-[#64748B]">{meta}</p> : null}
          {item.locationLine ? (
            <p className="mt-1.5 truncate text-[13px] text-[#64748B]">{item.locationLine}</p>
          ) : null}
          <span className="mt-3 flex h-11 items-center justify-center rounded-xl bg-black text-[14px] font-bold text-white">
            Explore
          </span>
        </div>
      </Link>
    </article>
  );
}
