export function parseShowPrice(raw?: string | string[] | null) {
  const value = (Array.isArray(raw) ? raw[0] : raw) || "";
  return ["1", "true", "yes"].includes(value.trim().toLowerCase());
}

export function withPriceQuery(path: string, showPrice: boolean) {
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const joiner = withoutHash.includes("?") ? "&" : "?";
  return `${withoutHash}${joiner}price=${showPrice ? "1" : "0"}${hash}`;
}
