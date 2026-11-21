// Pulls metal prices from the public "WatchLender live prices" Google Sheet into data/metal-prices.json.
// Safe by design: on any problem it keeps the existing file and exits 0, so a bad day never breaks the site.
import { readFileSync, writeFileSync } from "node:fs";

const SHEET_ID = process.env.PRICE_SHEET_ID ?? "15684aIYSrajOfvBtkzo_cZByA9OuoDbJbfqSokIn1TE";
const URL_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const FILE = new URL("../data/metal-prices.json", import.meta.url);
const METALS = ["gold", "silver", "platinum"];
const MAX_MOVE = 0.25; // reject a price more than 25% away from the last accepted one

export function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/).map((line) => {
    const out = []; let cur = ""; let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (q) { if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
      else if (c === '"') q = true; else if (c === ",") { out.push(cur); cur = ""; } else cur += c;
    }
    out.push(cur); return out.map((x) => x.trim());
  });
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

export function mergePrices(current, rows) {
  const next = structuredClone(current);
  const problems = []; const dates = [];
  for (const metal of METALS) {
    const row = rows.find((r) => r.key?.toLowerCase() === metal);
    const value = Number(String(row?.gbp_per_troy_oz ?? "").replace(/[£,\s]/g, ""));
    if (!row || !Number.isFinite(value) || value <= 0) { problems.push(`${metal}: missing or invalid value`); continue; }
    const prev = current.perOzGBP[metal];
    if (prev && Math.abs(value - prev) / prev > MAX_MOVE) { problems.push(`${metal}: ${value} is more than ${MAX_MOVE * 100}% from ${prev}, ignored`); continue; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.as_of ?? "")) { problems.push(`${metal}: as_of must be YYYY-MM-DD`); continue; }
    next.perOzGBP[metal] = value; dates.push(row.as_of);
  }
  if (dates.length === METALS.length) next.asOf = dates.sort()[0]; // oldest of the three, so the date is never overstated
  return { next, problems };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const current = JSON.parse(readFileSync(FILE, "utf8"));
  try {
    const res = await fetch(URL_CSV, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (text.trimStart().startsWith("<")) throw new Error("sheet is not publicly readable");
    const { next, problems } = mergePrices(current, parseCsv(text));
    problems.forEach((p) => console.warn("price feed:", p));
    writeFileSync(FILE, JSON.stringify(next, null, 2) + "\n");
    console.log("price feed:", JSON.stringify(next.perOzGBP), "as of", next.asOf);
  } catch (err) {
    console.warn("price feed: keeping existing prices,", err.message);
  }
}
