// After `next build`: add BreadcrumbList structured data from each page's visible breadcrumb,
// and audit every page's canonical and robots tags. Fails the build if a page is wrong.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://watchlender.co.uk").replace(/\/$/, "");
const NOINDEX_OK = new Set(["/404/", "/404.html", "/_not-found/", "/for-sale/none/"]);
const decode = (s) => s.replace(/<!--.*?-->/g, "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').trim();

function* pages(dir) {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) yield* pages(p);
    else if (f.endsWith(".html")) yield p;
  }
}

const errors = []; let crumbs = 0; let count = 0; const canonicals = new Map();
for (const file of pages(OUT)) {
  let html = readFileSync(file, "utf8");
  const rel = "/" + path.relative(OUT, file).replace(/\\/g, "/");
  const url = rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel === "/index.html" ? "/" : rel;
  count++;
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const robotsTags = (html.match(/<meta name="robots"/g) ?? []).length;
  if (robotsTags > 1) errors.push(`${url}: ${robotsTags} robots tags`);
  if (NOINDEX_OK.has(url) || /^\/google[0-9a-f]+\.html$/.test(url)) continue;
  if (noindex) errors.push(`${url}: unexpectedly noindex`);
  const canon = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  if (canon.length !== 1) errors.push(`${url}: ${canon.length} canonical tags`);
  else {
    if (canon[0] !== SITE + url) errors.push(`${url}: canonical is ${canon[0]}`);
    if (canonicals.has(canon[0])) errors.push(`${url}: shares canonical with ${canonicals.get(canon[0])}`);
    canonicals.set(canon[0], url);
  }
  if (!/<title>[^<]{10,}<\/title>/.test(html)) errors.push(`${url}: missing title`);
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) errors.push(`${url}: missing or short description`);

  const nav = html.match(/<nav class="crumbs"[^>]*>(.*?)<\/nav>/s);
  if (nav && !html.includes('"BreadcrumbList"')) {
    const items = [];
    const parts = nav[1].split(/\s\/\s|<!-- -->\/<!-- -->|(?<=<\/a>)\s*\/\s*/);
    for (const part of parts) {
      const a = part.match(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/s);
      const name = decode(a ? a[2] : part).replace(/^\/\s*/, "");
      if (!name) continue;
      const href = a ? a[1] : url;
      items.push({ "@type": "ListItem", position: items.length + 1, name, item: SITE + (href.endsWith("/") ? href : href + "/") });
    }
    if (items.length > 1) {
      const ld = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }).replace(/</g, "\\u003c");
      html = html.replace("</head>", `<script type="application/ld+json">${ld}</script></head>`);
      writeFileSync(file, html); crumbs++;
    }
  }
}
console.log(`postbuild: ${count} pages checked, breadcrumbs added to ${crumbs}`);
if (errors.length) { console.error(errors.slice(0, 40).join("\n")); console.error(`postbuild: ${errors.length} problem(s)`); process.exit(1); }
