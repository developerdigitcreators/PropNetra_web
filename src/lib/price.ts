const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function wordsUnderThousand(n: number): string {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (hundred) parts.push(`${ONES[hundred]} Hundred`);
  if (rest < 20) {
    if (rest) parts.push(ONES[rest]);
  } else {
    const ten = TENS[Math.floor(rest / 10)];
    const one = ONES[rest % 10];
    parts.push(one ? `${ten} ${one}` : ten);
  }
  return parts.join(" ");
}

/** Indian grouping: 22000000 → "Two Crore Twenty Lakh". */
export function rupeeWords(amount: number): string {
  const n = Math.round(Number(amount));
  if (!Number.isFinite(n) || n <= 0) return "";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (crore) parts.push(`${wordsUnderThousand(crore)} Crore`);
  if (lakh) parts.push(`${wordsUnderThousand(lakh)} Lakh`);
  if (thousand) parts.push(`${wordsUnderThousand(thousand)} Thousand`);
  if (rest) parts.push(wordsUnderThousand(rest));
  return parts.join(" ");
}

export function withRupee(label: string | null | undefined): string {
  const text = String(label ?? "").trim();
  if (!text) return "";
  if (/^₹/.test(text)) return text.replace(/^₹\s*/, "₹ ");
  return `₹ ${text}`;
}

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
