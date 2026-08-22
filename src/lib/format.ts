export function areaLabel(
  area?: { size: number | null; unit: string | null } | null,
) {
  if (!area?.size) return null;
  const unit = String(area.unit || "sqft")
    .replace(/_/g, ".")
    .replace(/^sq\.?ft$/i, "sq.ft")
    .replace(/^sq\.?yd$/i, "sq.yd");
  return `${Number(area.size).toLocaleString("en-IN")} ${unit}`;
}

export function formatUpdated(value?: string | Date | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function splitDetailTitle(title: string) {
  const parts = title.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 3) return { lead: title, accent: "" };
  return {
    lead: parts.slice(0, -2).join(" "),
    accent: parts.slice(-2).join(" "),
  };
}
