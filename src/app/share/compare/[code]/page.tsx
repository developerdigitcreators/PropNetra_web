import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { fetchSharedCompare, type SharedCompareItem } from "@/lib/api";
import { listingShareMetadata } from "@/lib/seo";
import { resolveSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ code: string }>;
};

const UPPERCASE_WORDS = new Set([
  "bhk",
  "rk",
  "rera",
  "cctv",
  "ev",
  "lpg",
  "nri",
  "dg",
  "ups",
  "emi",
  "ac",
  "stp",
  "wtp",
  "bbq",
  "id",
  "oc",
  "cc",
  "noc",
]);
const WORD_OVERRIDES: Record<string, string> = {
  sqft: "Sq.ft",
  sqyd: "Sq.yd",
  sqm: "Sq.m",
  wifi: "Wi-Fi",
};

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
      if (WORD_OVERRIDES[lower]) return WORD_OVERRIDES[lower];
      if (UPPERCASE_WORDS.has(lower)) return lower.toUpperCase();
      if (word.length > 1 && word === word.toUpperCase() && /[A-Z]/.test(word))
        return word;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

const dash = (v: unknown) => (v == null || v === "" ? "—" : String(v));

type Row = {
  id: string;
  label: string;
  isAmenities?: boolean;
  value: (p: SharedCompareItem) => string | string[];
};

const ROWS: Row[] = [
  {
    id: "location",
    label: "LOCATION",
    value: (p) => dash(humanize(p.location)),
  },
  { id: "price", label: "PRICE", value: (p) => p.price || "Price On Request" },
  {
    id: "status",
    label: "STATUS",
    value: (p) => dash(humanize(p.projectStatus)),
  },
  {
    id: "possession",
    label: "POSSESSION",
    value: (p) => dash(humanize(p.possession)),
  },
  {
    id: "bhk",
    label: "BHK TYPES",
    value: (p) =>
      p.bhkTypes.length ? p.bhkTypes.map(humanize).join(", ") : "—",
  },
  { id: "area", label: "AREA", value: (p) => dash(humanize(p.area)) },
  { id: "units", label: "UNITS", value: (p) => dash(p.units) },
  { id: "towers", label: "TOWERS", value: (p) => dash(p.towers) },
  {
    id: "rera",
    label: "RERA",
    value: (p) => dash(p.reraNumber?.toUpperCase()),
  },
  {
    id: "amenities",
    label: "AMENITIES",
    isAmenities: true,
    value: (p) => p.amenities.slice(0, 6).map(humanize),
  },
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  const origin = await resolveSiteUrl();
  const path = `/v/${code}`;
  let titles: string[] = [];
  let image: string | null = null;
  try {
    const data = await fetchSharedCompare(code);
    const items = data.expired ? [] : data.items || [];
    titles = items.map((i) => i.title);
    image = items.find((i) => i.image)?.image || null;
  } catch {
    /* fall back to a generic card */
  }
  const title = titles.length
    ? `Compare: ${titles.join(" vs ")}`
    : "Compare Projects";
  return listingShareMetadata(
    {
      id: code,
      displayTitle: title,
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
      imageUrl: image,
      savedAt: "",
      showContact: false,
    },
    path,
    {
      title,
      description: "Side-by-side developer project comparison | Click more",
      imageUrl: image,
    },
    origin,
  );
}

/** Agent-shared developer project comparison on the client share host. */
export default async function ShareComparePage({ params }: PageProps) {
  const { code } = await params;
  const data = await fetchSharedCompare(code);

  const title = (
    <>
      Compare <span className="text-[#C8102E]">Projects</span>
    </>
  );

  const projects = data.items || [];
  if (data.expired || projects.length < 2) {
    return (
      <AppShell title={title}>
        <div className="mt-10 rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-[16px] font-bold text-[#0F172A]">
            Comparison unavailable
          </p>
          <p className="mt-2 text-[13px] leading-5 text-[#64748B]">
            {data.message ||
              "This comparison is no longer available. Ask the sender to share it again."}
          </p>
        </div>
      </AppShell>
    );
  }

  const gridCols = {
    gridTemplateColumns: `repeat(${projects.length}, minmax(130px, 1fr))`,
  };

  return (
    <AppShell title={title}>
      <div className="pb-5 pt-2 text-center">
        <p className="font-serif text-[18px] text-[#1A1A1A]">
          Selected <span className="font-bold text-[#C8102E]">Items</span>
        </p>
        <p className="mt-1 text-[12px] font-bold tracking-wider text-[#9CA3AF]">
          {projects.length} Developer Projects Side By Side
        </p>
      </div>

      <div className="-mx-1 overflow-x-auto pb-6">
        <div className="min-w-full overflow-scroll rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="grid" style={gridCols}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`flex flex-col items-center p-2.5 ${i !== projects.length - 1 ? "border-r border-[#F3F4F6]" : ""}`}
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="mb-2.5 aspect-square w-full rounded-lg bg-[#f0f0f0] object-cover"
                  />
                ) : (
                  <div className="mb-2.5 aspect-square w-full rounded-lg bg-[#f0f0f0]" />
                )}
                {p.developer?.name ? (
                  <p className="line-clamp-1 text-center text-[12px] font-bold uppercase text-[#C8102E]">
                    {p.developer.name}
                  </p>
                ) : null}
                <p className="line-clamp-2 text-center text-[12px] font-bold leading-[18px] text-[#1A1A1A]">
                  {p.title}
                </p>
              </div>
            ))}
          </div>

          {ROWS.map((row) => (
            <div key={row.id}>
              <div className="my-4 flex items-center px-4">
                <div className="h-px flex-1 bg-[#E5E7EB]" />
                <div className="flex w-[140px] items-center justify-center px-3">
                  <span className="text-[12px] font-bold tracking-wider text-[#0F172A]">
                    {row.label}
                  </span>
                </div>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>
              <div className="grid" style={gridCols}>
                {projects.map((p, i) => {
                  const value = row.value(p);
                  return (
                    <div
                      key={`${p.id}-${row.id}`}
                      className={`flex flex-col items-center px-2.5 pb-2.5 ${i !== projects.length - 1 ? "border-r border-[#F3F4F6]" : ""}`}
                    >
                      {row.isAmenities && Array.isArray(value) ? (
                        value.length ? (
                          <div className="flex w-full flex-col gap-1.5">
                            {value.map((a) => (
                              <span
                                key={a}
                                className="truncate rounded border border-[#E2E8F0] bg-[#F8FAFC] px-1.5 py-1 text-center text-[10px] font-bold text-[#64748B]"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[12px] text-[#1A1A1A]">—</span>
                        )
                      ) : (
                        <span className="line-clamp-2 text-center flex-wrap flex-row text-[12px] leading-[18px] text-[#1A1A1A]">
                          {String(value).replace(/\n/g, " ")}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="h-5" />
        </div>
      </div>
    </AppShell>
  );
}
