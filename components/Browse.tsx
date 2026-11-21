"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BRANDS, WATCHES } from "@/lib/catalogue";
import { searchWatches } from "@/lib/search";
import WatchCard from "./WatchCard";

// The full catalogue is rendered into the HTML; searching and filtering then run in the browser.
export default function Browse() {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setQ(p.get("q") ?? "");
    setBrand(p.get("brand") ?? "");
  }, []);
  useEffect(() => {
    const p = new URLSearchParams({ ...(q ? { q } : {}), ...(brand ? { brand } : {}) }).toString();
    history.replaceState(null, "", p ? `?${p}` : location.pathname);
  }, [q, brand]);

  const activeBrand = BRANDS.find((b) => b.slug === brand);
  const hits = searchWatches(q, { brand: activeBrand?.slug });
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>{q ? `Results for “${q}”` : "All watches"}</h1>
        <p>{hits.length} of {WATCHES.length} references{activeBrand ? ` in ${activeBrand.name}` : ""}. Exact reference matches are shown first.</p>
        <form className="search large" role="search" onSubmit={(e) => e.preventDefault()}>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand, model or reference, e.g. 126610LN" aria-label="Search watches" />
          <button className="btn primary">Search</button>
        </form>
      </div>
      <div className="filters">
        <button className={`chip ${!activeBrand ? "on" : ""}`} onClick={() => setBrand("")}>All brands</button>
        {BRANDS.map((b) => <button key={b.slug} className={`chip ${brand === b.slug ? "on" : ""}`} onClick={() => setBrand(b.slug)}>{b.name}</button>)}
      </div>
      {hits.length === 0 ? (
        <div className="prose">
          <h2>We couldn&apos;t find that watch</h2>
          <p>Our catalogue is still growing. You can still <Link href="/sell-my-watch/">tell us about your watch</Link> and we&apos;ll take it from there.</p>
        </div>
      ) : (
        <div className="grid">{hits.map((h) => <WatchCard key={h.watch.id} watch={h.watch} />)}</div>
      )}
    </div>
  );
}
