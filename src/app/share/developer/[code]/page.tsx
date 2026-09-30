import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import {
  fetchSharedDeveloperProject,
  type SharedDeveloperProjectCard,
} from "@/lib/api";
import { listingShareMetadata } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";
import { LocationTabs } from "./LocationTabs";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ code: string }>;
};

const UPPERCASE_WORDS = new Set(["bhk", "rk", "rera", "cctv", "ev", "lpg", "dg", "ups", "ac", "stp", "bbq"]);

/** Same display formatting as the app's `humanize`. */
function humanize(raw: unknown): string {
  let text = String(raw ?? "").trim();
  if (!text) return "";
  if (/^[A-Z0-9]+(_[A-Z0-9]+)+$/.test(text)) text = text.toLowerCase();
  text = text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_+/g, " ")
    .replace(/\s+/g, " ");
  return text
    .split(" ")
    .map((word) => {
      const lower = word.toLowerCase();
      const unit = lower.match(/^(\d+(?:\.\d+)?)(bhk|rk)$/);
      if (unit) return `${unit[1]} ${unit[2].toUpperCase()}`;
      if (UPPERCASE_WORDS.has(lower)) return lower.toUpperCase();
      if (word.length > 1 && word === word.toUpperCase() && /[A-Z]/.test(word)) return word;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function possessionLabel(raw: string | null): string {
  if (!raw) return "—";
  const d = new Date(`${raw.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(d.getTime())) return humanize(raw);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i,
  );
  return m ? m[1] : null;
}

function splitTitle(title: string): [string, string] {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return [title, ""];
  return [words.slice(0, -1).join(" "), words[words.length - 1]];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const origin = await resolveSiteUrl();
  let og = { title: "Developer Project", description: "View project details | Click more", imageUrl: null as string | null };
  try {
    const data = await fetchSharedDeveloperProject(code);
    if (!data.expired && data.og) {
      og = {
        title: data.og.title,
        description: data.og.description ? `${data.og.description} | Click more` : og.description,
        imageUrl: data.og.imageUrl,
      };
    }
  } catch {
    /* fall back to a generic card */
  }
  return listingShareMetadata(
    {
      id: code,
      displayTitle: og.title,
      statusLabel: "",
      category: null,
      buildingType: null,
      propertyType: null,
      location: null,
      micromarket: null,
      city: null,
      locationLine: "",
      bhk: null,
      bhkLabel: null,
      area: { size: null, unit: null },
      imageUrl: og.imageUrl,
      savedAt: "",
      showContact: false,
    },
    `/d/${code}`,
    og,
    origin,
  );
}

function SectionTitle({ lead, accent }: { lead: string; accent: string }) {
  return (
    <h2 className="text-[18px] font-bold text-[#1A1A1A]">
      {lead} <span className="text-[#C8102E]">{accent}</span>
    </h2>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section className="mt-6 border-t border-[#F1F5F9] pt-5">{children}</section>;
}

function ProjectCards({ items }: { items: SharedDeveloperProjectCard[] }) {
  return (
    <div className="-mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
      {items.map((p) => {
        const card = (
          <>
            {p.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.imageUrl} alt={p.title} className="h-[120px] w-full rounded-t-xl bg-[#f0f0f0] object-cover" />
            ) : (
              <div className="h-[120px] w-full rounded-t-xl bg-[#f0f0f0]" />
            )}
            <div className="p-2.5">
              {p.developerName ? (
                <p className="line-clamp-1 text-[10px] font-bold uppercase text-[#C8102E]">{p.developerName}</p>
              ) : null}
              <p className="line-clamp-1 text-[13px] font-bold text-[#1A1A1A]">{p.title}</p>
              {p.location ? <p className="line-clamp-1 text-[11px] text-[#64748B]">{p.location}</p> : null}
              <p className="mt-1 text-[12px] font-bold text-[#1A1A1A]">{p.priceLabel || "Price On Request"}</p>
            </div>
          </>
        );
        const cls = "w-[200px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#E2E8F0] bg-white";
        return p.shareCode ? (
          <a key={p.id} href={`/d/${p.shareCode}`} className={cls}>
            {card}
          </a>
        ) : (
          <div key={p.id} className={cls}>
            {card}
          </div>
        );
      })}
    </div>
  );
}

/** Shared developer project on the client share host; mirrors the app's project page without contacts. */
export default async function ShareDeveloperProjectPage({ params }: PageProps) {
  const { code } = await params;
  const data = await fetchSharedDeveloperProject(code);
  const p = data.item;

  if (data.expired || !p) {
    return (
      <AppShell title={<>Developer <span className="text-[#C8102E]">Project</span></>}>
        <div className="mt-10 rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-[16px] font-bold text-[#0F172A]">Project unavailable</p>
          <p className="mt-2 text-[13px] leading-5 text-[#64748B]">
            {data.message || "This project is no longer available. Ask the sender to share it again."}
          </p>
        </div>
      </AppShell>
    );
  }

  const developerName = p.developer?.companyName || p.developer?.name || null;
  const logo = p.developer?.companyLogoUrl || p.developer?.profilePhotoUrl || null;
  const [titleMain, titleAccent] = splitTitle(p.title);
  const price =
    p.priceRange.minLabel && p.priceRange.maxLabel && p.priceRange.minLabel !== p.priceRange.maxLabel
      ? `${p.priceRange.minLabel} - ${p.priceRange.maxLabel}`
      : p.priceRange.minLabel || p.priceRange.maxLabel || "Price On Request";
  const headerImages = p.header.images.length ? p.header.images : p.gallery.images.slice(0, 1);
  const mapUrl = p.geo
    ? `https://www.google.com/maps/search/?api=1&query=${p.geo.lat},${p.geo.lng}`
    : p.location.label
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.location.label)}`
      : null;
  const specs = [
    { label: "BHK Types", value: p.stats.bhkTypes.map(humanize).join(", ") },
    { label: "Area", value: p.stats.area != null ? humanize(p.stats.area) : "" },
    { label: "Units", value: p.stats.units != null ? String(p.stats.units) : "" },
    { label: "Towers", value: p.stats.towers != null ? String(p.stats.towers) : "" },
    { label: "Open Space", value: p.stats.openSpace != null ? humanize(p.stats.openSpace) : "" },
    { label: "Property Type", value: humanize(p.propertyType) },
  ].filter((s) => s.value);
  const youtube = [...p.gallery.youtube, ...p.header.youtube]
    .map(youtubeId)
    .filter((id): id is string => !!id);
  const videos = [...p.gallery.videos, ...p.header.videos];
  const hasMedia = p.gallery.images.length > 0 || youtube.length > 0 || videos.length > 0;
  const similar = p.similarProjects.items;

  return (
    <AppShell title={<>Project <span className="text-[#C8102E]">Details</span></>}>
      {headerImages.length ? (
        <div className="-mx-4 flex snap-x snap-mandatory overflow-x-auto">
          {headerImages.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              src={src}
              alt={`${p.title} ${i + 1}`}
              className="h-[240px] w-full shrink-0 snap-center bg-[#f0f0f0] object-cover"
            />
          ))}
        </div>
      ) : null}
      {headerImages.length > 1 ? (
        <p className="mt-1 text-right text-[11px] text-[#94A3B8]">{headerImages.length} photos · swipe</p>
      ) : null}

      <div className="mt-4">
        {developerName ? (
          <div className="flex items-center gap-2">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={developerName} className="h-8 w-8 rounded-full border border-[#E2E8F0] bg-white object-contain" />
            ) : null}
            <p className="text-[12px] font-bold uppercase tracking-wide text-[#C8102E]">{developerName}</p>
          </div>
        ) : null}
        <h1 className="mt-2 text-[22px] font-bold leading-tight text-[#1A1A1A]">
          {titleMain}
          {titleAccent ? " " : ""}
          <span className="text-[#C8102E]">{titleAccent}</span>
        </h1>
        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {p.location.label ? <p className="text-[13px] text-[#64748B]">{p.location.label}</p> : null}
            <p className="mt-1 text-[18px] font-bold text-[#1A1A1A]">{price}</p>
            <p className="text-[11px] text-[#94A3B8]">(Add. charges &amp; Taxes Extra)</p>
          </div>
          {mapUrl ? (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg border border-[#E2E8F0] px-3 py-2 text-[12px] font-semibold text-[#1A1A1A]"
            >
              View On Map
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 divide-x divide-[#E2E8F0] rounded-xl border border-[#E2E8F0] bg-white">
        <div className="p-3">
          <p className="text-[11px] text-[#94A3B8]">Status</p>
          <p className="text-[14px] font-bold text-[#1A1A1A]">{humanize(p.projectStatus) || "—"}</p>
        </div>
        <div className="p-3">
          <p className="text-[11px] text-[#94A3B8]">Possession</p>
          <p className="text-[14px] font-bold text-[#1A1A1A]">{possessionLabel(p.possession)}</p>
        </div>
      </div>

      {p.about || specs.length ? (
        <Section>
          <h2 className="text-[18px] font-bold text-[#1A1A1A]">
            <span className="text-[#C8102E]">About</span> {p.title}
          </h2>
          {p.about ? (
            <p className="mt-2 whitespace-pre-line text-[13px] leading-6 text-[#475569]">{p.about}</p>
          ) : null}
          {specs.length ? (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {specs.map((s) => (
                <div key={s.label} className="rounded-lg bg-[#F8FAFC] p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">{s.label}</p>
                  <p className="text-[13px] font-semibold text-[#1A1A1A]">{s.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </Section>
      ) : null}

      {p.reraNumber ? (
        <Section>
          <SectionTitle lead="Project Rera" accent="Number" />
          <p className="mt-2 rounded-lg bg-[#F8FAFC] p-3 text-[14px] font-bold tracking-wide text-[#1A1A1A]">
            {String(p.reraNumber).toUpperCase()}
          </p>
        </Section>
      ) : null}

      {p.floorPlans.length ? (
        <Section>
          <SectionTitle lead="Floor" accent="Plans" />
          <div className="-mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
            {p.floorPlans.map((f, i) => (
              <div key={`${f.name}-${i}`} className="w-[220px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
                {f.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.imageUrl} alt={f.name} className="h-[140px] w-full bg-[#f8f8f8] object-contain" />
                ) : (
                  <div className="h-[140px] w-full bg-[#f8f8f8]" />
                )}
                <div className="p-2.5">
                  <p className="text-[13px] font-bold text-[#1A1A1A]">{humanize(f.name) || "Plan"}</p>
                  <p className="text-[11px] text-[#64748B]">
                    {[f.bedrooms != null ? `${f.bedrooms} Bedrooms` : null, f.area != null ? humanize(f.area) : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="mt-1 text-[13px] font-bold text-[#C8102E]">{f.priceLabel || "Price On Request"}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {hasMedia ? (
        <Section>
          <SectionTitle lead="Videos &" accent="Gallery" />
          <div className="-mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
            {youtube.map((id) => (
              <iframe
                key={id}
                src={`https://www.youtube.com/embed/${id}`}
                title="Project video"
                allowFullScreen
                className="h-[160px] w-[280px] shrink-0 snap-start rounded-xl"
              />
            ))}
            {videos.map((src) => (
              <video key={src} src={src} controls preload="metadata" className="h-[160px] w-[280px] shrink-0 snap-start rounded-xl bg-black" />
            ))}
            {p.gallery.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={`${src}-${i}`} src={src} alt={`Gallery ${i + 1}`} className="h-[160px] w-[240px] shrink-0 snap-start rounded-xl bg-[#f0f0f0] object-cover" />
            ))}
          </div>
        </Section>
      ) : null}

      {p.amenities.length ? (
        <Section>
          <SectionTitle lead="Ameneties" accent="" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {p.amenities.map((a) => (
              <div key={a.value} className="flex flex-col items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white p-2.5 text-center">
                {a.iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.iconUrl} alt="" className="h-7 w-7 object-contain" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDECEE] text-[12px] font-bold text-[#C8102E]">
                    {a.label.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="line-clamp-2 text-[11px] font-semibold text-[#475569]">{a.label}</span>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {p.locationAdvantage.length || mapUrl ? (
        <Section>
          <SectionTitle lead="Location" accent="Advantage" />
          {p.location.label ? <p className="mt-1 text-[13px] text-[#64748B]">{p.location.label}</p> : null}
          <LocationTabs tabs={p.locationAdvantage} />
        </Section>
      ) : null}

      {p.otherProjects.length ? (
        <Section>
          <SectionTitle lead="Other Projects By" accent={developerName || "Developer"} />
          <ProjectCards items={p.otherProjects} />
        </Section>
      ) : null}

      {similar.length ? (
        <Section>
          <SectionTitle lead={`Similiar Projects${p.location.city ? " in" : ""}`} accent={p.location.city || ""} />
          <ProjectCards items={similar} />
        </Section>
      ) : null}

      <Section>
        <p className="text-[13px] font-bold text-[#64748B]">* Disclaimer</p>
        <p className="mt-1 text-[11px] leading-[18px] text-[#94A3B8]">
          Images shown are for representation purposes only. Actual project may vary. All information is subject to
          change as per RERA guidelines.
        </p>
      </Section>
    </AppShell>
  );
}
