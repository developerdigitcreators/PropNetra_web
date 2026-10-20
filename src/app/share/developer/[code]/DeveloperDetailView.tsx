"use client";

import { useMemo, useState } from "react";
import { LocationTabs } from "./LocationTabs";

const RED = "#FF5A00";

export type DetailSlide =
  | { kind: "image"; uri: string }
  | { kind: "video"; uri: string; thumb: string | null };

export type DetailPlan = {
  name: string;
  imageUrl: string | null;
  bedrooms: number | null;
  priceLabel: string | null;
  area: string;
};

export type DetailAmenity = { value: string; label: string; iconUrl: string | null };

export function DeveloperDetailView({
  slides,
  logoUrl,
  reraNumber,
  photoCount,
  videoCount,
  titleMain,
  titleAccent,
  fullTitle,
  locationLabel,
  price,
  mapUrl,
  projectStatus,
  possession,
  about,
  specs,
  floorPlans,
  areaLabel,
  galleryImages,
  youtubeIds,
  amenities,
  locationTabs,
  geo,
}: {
  slides: DetailSlide[];
  logoUrl: string | null;
  reraNumber: string | null;
  photoCount: number;
  videoCount: number;
  titleMain: string;
  titleAccent: string;
  fullTitle: string;
  locationLabel: string;
  price: string;
  mapUrl: string | null;
  projectStatus: string;
  possession: string;
  about: string | null;
  specs: { label: string; value: string }[];
  floorPlans: DetailPlan[];
  areaLabel: string;
  galleryImages: string[];
  youtubeIds: string[];
  amenities: DetailAmenity[];
  locationTabs: { tab: string; places: unknown[] }[];
  geo: { lat: number; lng: number } | null;
}) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [planName, setPlanName] = useState(floorPlans[0]?.name || "");
  const plan = floorPlans.find((p) => p.name === planName) || floorPlans[0];
  const cover = youtubeIds[0]
    ? `https://img.youtube.com/vi/${youtubeIds[0]}/hqdefault.jpg`
    : galleryImages[0] || null;

  const amenityRows = useMemo(() => {
    if (!amenities.length) return [];
    const mid = Math.ceil(amenities.length / 2);
    return [amenities.slice(0, mid), amenities.slice(mid)].filter((row) => row.length);
  }, [amenities]);

  return (
    <div className="-mx-4 bg-[#F8FAFC] pb-8">
      <div className="relative h-[260px] overflow-hidden bg-[#0F172A]">
        <div
          className="h-full snap-y snap-mandatory overflow-y-auto"
          onScroll={(event) => {
            const next = Math.round(event.currentTarget.scrollTop / 260);
            setSlideIndex(Math.min(Math.max(next, 0), Math.max(slides.length - 1, 0)));
          }}
        >
          {slides.map((slide, i) => (
            <div key={`${slide.kind}-${i}`} className="relative h-[260px] w-full shrink-0 snap-start">
              {slide.kind === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.uri} alt="" className="h-full w-full object-cover" />
              ) : (
                <>
                  {slide.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={slide.thumb} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-[#0F172A]" />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#0F172A]/60 text-white">
                      ▶
                    </span>
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt=""
            className="absolute right-0 top-0 z-10 h-[50px] w-20 bg-white/60 object-contain"
          />
        ) : null}
        {slides.length > 1 ? (
          <div className="pointer-events-none absolute inset-y-0 right-3 z-10 flex flex-col items-center justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`w-2 rounded-full border border-white/90 ${i === slideIndex ? "h-6 bg-[#FF8A00]" : "h-2 bg-[#0F172A]/55"}`}
              />
            ))}
          </div>
        ) : null}
        <div className="pointer-events-none absolute inset-x-4 bottom-2.5 z-10 flex items-center justify-between">
          {reraNumber ? (
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-black">RERA</span>
          ) : (
            <span />
          )}
          <span className="flex items-center gap-2.5">
            {videoCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-black">
                ▶ {videoCount}
              </span>
            ) : null}
            {photoCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-black">
                ▣ {photoCount}
              </span>
            ) : null}
          </span>
        </div>
      </div>

      <div className="rounded-t-[32px] bg-[#F8FAFC] px-4 pt-5">
        <h1 className="text-[24px] font-bold leading-tight text-[#0F172A]">
          {titleMain}
          {titleAccent ? " " : ""}
          <span style={{ color: RED }}>{titleAccent}</span>
        </h1>
        <div className="mt-1 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {locationLabel ? (
              <p className="flex items-center gap-1 text-[14px] font-medium text-[#64748B]">
                <Pin />
                {locationLabel}
              </p>
            ) : null}
            <p className="mt-5 text-[18px] font-bold text-black">{price}</p>
            <p className="mt-0.5 text-[12px] text-[#94A3B8]">(Add. charges & Taxes Extra)</p>
          </div>
          {mapUrl ? (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-1 pt-1 text-[12px] text-black">
              <span className="text-[18px]">📍</span>
              View On Map
            </a>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-around rounded-2xl border border-[#9E9E9E]/40 py-2.5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#FDF7EE] text-[#B49164]">⌂</span>
            <div>
              <p className="text-[12px] font-medium text-[#94A3B8]">Status</p>
              <p className="text-[14px] font-bold text-black">{projectStatus || "—"}</p>
            </div>
          </div>
          <span className="h-8 w-px bg-[#9E9E9E]" />
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#FDF7EE] text-[#B49164]">◷</span>
            <div>
              <p className="text-[12px] font-medium text-[#94A3B8]">Possession</p>
              <p className="text-[14px] font-bold text-black">{possession || "—"}</p>
            </div>
          </div>
        </div>

        {about || specs.length ? (
          <section className="pt-5">
            <h2 className="text-[18px] font-bold text-black">
              <span style={{ color: RED }}>About</span> {fullTitle}
            </h2>
            <div className="mt-1 h-0.5 w-10 bg-black" />
            {about ? (
              <>
                <p className={`mt-2.5 text-[14px] leading-[22px] text-[#475569] ${aboutOpen ? "" : "line-clamp-4"}`}>
                  {about}
                </p>
                {about.length > 180 ? (
                  <button
                    type="button"
                    onClick={() => setAboutOpen((v) => !v)}
                    className="mt-2.5 w-[90px] rounded-[10px] border border-[#9E9E9E]/40 py-1.5 text-[13px] font-bold"
                    style={{ color: RED }}
                  >
                    {aboutOpen ? "Read Less" : "Read More"}
                  </button>
                ) : null}
              </>
            ) : null}
            {specs.length ? (
              <div className="mt-5 flex flex-wrap overflow-hidden rounded-2xl border border-[#9E9E9E]/15">
                {specs.map((s) => (
                  <div key={s.label} className="w-1/3 border border-[#9E9E9E]/15 p-3.5 text-center">
                    <p className="text-[12px] font-medium text-[#94A3B8]">{s.label}</p>
                    <p className="mt-1 text-[14px] font-bold text-black">{s.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {reraNumber ? (
          <div className="mt-4 overflow-hidden rounded-[10px] border border-[#9E9E9E]/15 p-4">
            <p className="text-[18px] font-bold text-black">Project Rera Number</p>
            <p className="mt-1 text-[14px] text-[#9E9E9E]">{reraNumber}</p>
          </div>
        ) : null}

        {plan ? (
          <section className="pt-5">
            <SectionHead lead="Floor" accent="Plan" />
            <div className="flex gap-3 overflow-x-auto pb-1">
              {floorPlans.map((item) => {
                const on = item.name === plan.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setPlanName(item.name)}
                    className={`shrink-0 rounded-xl border px-4 py-2 text-[12px] font-bold ${
                      on ? "border-black bg-black text-white" : "border-[#9E9E9E]/15 bg-transparent text-black"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div className="mt-1.5 rounded-[20px] border border-[#F1F5F9] bg-white p-4 shadow-sm">
              {plan.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={plan.imageUrl} alt={plan.name} className="h-[250px] w-full rounded-lg object-cover" />
              ) : null}
              <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] px-2 pt-2.5 text-center">
                <PlanStat label="Bedrooms" value={plan.bedrooms != null ? String(plan.bedrooms) : "—"} />
                <span className="h-8 w-px bg-[#F5F5F5]" />
                <PlanStat label="Price" value={plan.priceLabel ? plan.priceLabel.replace(/^₹\s*/, "₹ ") : "On request"} />
                <span className="h-8 w-px bg-[#F5F5F5]" />
                <PlanStat label={areaLabel} value={plan.area || "—"} />
              </div>
            </div>
          </section>
        ) : null}

        {cover || galleryImages.length ? (
          <section className="pt-5">
            <SectionHead lead="Videos &" accent="Photos" />
            {youtubeIds[0] ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeIds[0]}`}
                title="Project video"
                allowFullScreen
                className="h-[180px] w-full"
              />
            ) : cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" className="h-[180px] w-full object-cover" />
            ) : null}
            {galleryImages.length > 1 || youtubeIds.length > 1 ? (
              <div className="mt-2.5 flex gap-2 overflow-x-auto">
                {youtubeIds.slice(youtubeIds[0] ? 1 : 0).map((id) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={id}
                    src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                    alt=""
                    className="h-16 w-24 shrink-0 rounded-lg object-cover"
                  />
                ))}
                {galleryImages.slice(youtubeIds[0] ? 0 : 1).map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" className="h-16 w-24 shrink-0 rounded-lg bg-[#F5F5F5] object-cover" />
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {amenityRows.length ? (
          <section className="pt-5">
            <SectionHead lead="Ameneties" accent="Premium Lifestyle Features" />
            <div className="relative overflow-hidden bg-white py-2.5">
              {amenityRows.map((row, i) => (
                <div key={i} className="mb-2.5 overflow-hidden">
                  <div className={`flex w-max gap-2.5 ${i % 2 === 0 ? "animate-[amenity_28s_linear_infinite_reverse]" : "animate-[amenity_28s_linear_infinite]"}`}>
                    {[...row, ...row].map((a, n) => (
                      <span
                        key={`${a.value}-${n}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#9E9E9E] bg-white px-2.5 py-2 text-[12px] font-medium text-black"
                      >
                        {a.iconUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={a.iconUrl} alt="" className="h-4 w-4 object-contain" />
                        ) : null}
                        {a.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {locationTabs.length || geo ? (
          <section className="pt-2">
            <SectionHead lead="Location" accent="Advantage" />
            {geo ? (
              <iframe
                title="Project location"
                src={`https://maps.google.com/maps?q=${geo.lat},${geo.lng}&z=14&output=embed`}
                className="mb-5 h-[200px] w-[calc(100%+20px)] -mx-2.5 border-0"
              />
            ) : null}
            <LocationTabs tabs={locationTabs} />
          </section>
        ) : null}
      </div>
      <style>{`@keyframes amenity { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function SectionHead({ lead, accent }: { lead: string; accent: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[18px] font-bold text-black">
        {lead} <span style={{ color: RED }}>{accent}</span>
      </h2>
      <div className="mt-1 flex items-center gap-2">
        <span className="h-4 w-[3px]" style={{ backgroundColor: RED }} />
        <p className="text-[14px] text-[#9E9E9E]">Explore the house from inside</p>
      </div>
    </div>
  );
}

function PlanStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="truncate text-[12px] font-medium text-[#94A3B8]">{label}</p>
      <p className="text-[14px] font-bold text-black">{value}</p>
    </div>
  );
}

function Pin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#64748B" aria-hidden className="shrink-0">
      <path d="M12 2c-4.4 0-8 3.6-8 8 0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
}
