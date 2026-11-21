import Link from "next/link";
import type { Watch } from "@/lib/catalogue";
import WatchArt from "./WatchArt";

export default function WatchCard({ watch }: { watch: Watch }) {
  return (
    <Link href={watch.url} className="card">
      <div className="card-art"><WatchArt watch={watch} size={120} /></div>
      <div className="card-body">
        <span className="card-brand">{watch.brand}</span>
        <span className="card-model">{watch.model}</span>
        <span className="card-ref">Ref. {watch.referenceDisplay}</span>
        <span className="card-meta">{[watch.sizeMm ? `${watch.sizeMm} mm` : null, watch.material, `${watch.dial} dial`].filter(Boolean).join(" · ")}</span>
      </div>
    </Link>
  );
}

export function SearchBar({ defaultValue = "", large = false }: { defaultValue?: string; large?: boolean }) {
  return (
    <form action="/watches/" method="get" className={`search ${large ? "large" : ""}`} role="search">
      <input type="search" name="q" defaultValue={defaultValue} placeholder="Search brand, model or reference, e.g. 126610LN" aria-label="Search watches" />
      <button className="btn primary">Search</button>
    </form>
  );
}
