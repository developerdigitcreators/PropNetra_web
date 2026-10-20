import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { fetchSharedDeveloperProject } from "@/lib/api";
import { listingShareMetadata } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";
import { DeveloperDetailView, type DetailSlide } from "./DeveloperDetailView";

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

function formatBhkLine(types: string[]): string {
  const nums: string[] = [];
  const others: string[] = [];
  for (const raw of types) {
    const text = String(raw ?? "").trim();
    if (!text) continue;
    const m = text.replace(/_/g, "+").match(/^(\d+(?:\.\d+)?\+?)\s*bhk$/i);
    if (m) {
      if (!nums.includes(m[1])) nums.push(m[1]);
    } else {
      const h = humanize(text);
      if (h && !others.includes(h)) others.push(h);
    }
  }
  const order = (s: string) => parseFloat(s) + (s.endsWith("+") ? 0.5 : 0);
  nums.sort((a, b) => order(a) - order(b));
  const bhk = nums.length ? `${nums.join("/")} BHK` : "";
  return [bhk, ...others].filter(Boolean).join(", ");
}

function minAreaLabel(raw: unknown): string {
  const s = raw == null ? "" : humanize(raw);
  const m = s.match(/^([\d.,]+)\s*[-–—]\s*[\d.,]+\s*(.*)$/);
  if (!m) return s;
  return m[2] ? `${m[1]} ${m[2]}` : m[1];
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

/** Shared developer project. UI matches the app detail through Location Advantage. */
export default async function ShareDeveloperProjectPage({ params }: PageProps) {
  const { code } = await params;
  const data = await fetchSharedDeveloperProject(code);
  const p = data.item;

  if (data.expired || !p) {
    return (
      <AppShell title={<>Developer <span className="text-[#FF5A00]">Project</span></>}>
        <div className="mt-10 rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-[16px] font-bold text-[#0F172A]">Project unavailable</p>
          <p className="mt-2 text-[13px] leading-5 text-[#64748B]">
            {data.message || "This project is no longer available. Ask the sender to share it again."}
          </p>
        </div>
      </AppShell>
    );
  }

  const logo = p.developer?.companyLogoUrl || p.developer?.profilePhotoUrl || null;
  const [titleMain, titleAccent] = splitTitle(p.title);
  const locationLabel = [p.location.name, p.location.city].filter(Boolean).join(", ");
  const mapQuery = p.geo
    ? `${p.geo.lat},${p.geo.lng}`
    : locationLabel;
  const mapUrl = mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
    : null;
  const images = p.header.images.length ? p.header.images : p.gallery.images;
  const youtube = [...p.header.youtube, ...p.gallery.youtube]
    .map(youtubeId)
    .filter((id): id is string => !!id);
  const slides: DetailSlide[] = [
    ...images.map((uri) => ({ kind: "image" as const, uri })),
    ...youtube.map((id) => ({
      kind: "video" as const,
      uri: `https://www.youtube.com/watch?v=${id}`,
      thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    })),
    ...[...p.header.videos, ...p.gallery.videos].map((uri) => ({
      kind: "video" as const,
      uri,
      thumb: null,
    })),
  ];
  const specs = [
    { label: "Category", value: humanize(p.propertyType || p.buildingType) },
    { label: "Units", value: p.stats.units != null ? String(p.stats.units) : "" },
    {
      label: "Towers",
      value: p.stats.towers != null ? String(p.stats.towers).padStart(2, "0") : "",
    },
    { label: "Open Space", value: p.stats.openSpace != null ? humanize(p.stats.openSpace) : "" },
    { label: "BHK Types", value: formatBhkLine(p.stats.bhkTypes) },
    { label: "Area", value: minAreaLabel(p.stats.area) },
  ].filter((s) => s.value);

  return (
    <AppShell title={<>Project <span className="text-[#FF5A00]">Details</span></>}>
      <DeveloperDetailView
        slides={slides.length ? slides : []}
        logoUrl={logo}
        reraNumber={p.reraNumber ? String(p.reraNumber).toUpperCase() : null}
        photoCount={images.length}
        videoCount={youtube.length + p.header.videos.length + p.gallery.videos.length}
        titleMain={titleMain}
        titleAccent={titleAccent}
        fullTitle={p.title}
        locationLabel={locationLabel}
        mapUrl={mapUrl}
        projectStatus={humanize(p.projectStatus)}
        possession={possessionLabel(p.possession)}
        about={p.about}
        specs={specs}
        floorPlans={p.floorPlans.map((f) => ({
          name: humanize(f.name) || "Plan",
          imageUrl: f.imageUrl,
          bedrooms: f.bedrooms,
          priceLabel: f.priceLabel,
          area: f.area != null ? humanize(f.area) : "",
        }))}
        areaLabel="Carpet Area"
        galleryImages={p.gallery.images}
        youtubeIds={youtube}
        amenities={p.amenities}
        locationTabs={p.locationAdvantage}
        geo={p.geo}
      />
    </AppShell>
  );
}
