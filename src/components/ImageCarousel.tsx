"use client";

import { useState } from "react";

export function ImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const list = images.filter(Boolean);
  if (!list.length) {
    return (
      <div className="flex aspect-[16/11] items-center justify-center bg-[#ececec] text-sm font-medium text-[#9a9a9a]">
        No photo
      </div>
    );
  }

  const current = list[Math.min(index, list.length - 1)];

  return (
    <div className="relative aspect-[16/11] bg-[#ececec]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={current} alt={alt} className="h-full w-full object-cover" />
      {list.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => setIndex((i) => (i === 0 ? list.length - 1 : i - 1))}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => setIndex((i) => (i === list.length - 1 ? 0 : i + 1))}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {list.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full ${i === index ? "w-4 bg-white" : "w-1.5 bg-white/55"}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
