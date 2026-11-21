import Link from "next/link";
import { formatGBP, type Listing } from "@/lib/listings";
import WatchArt from "./WatchArt";

export default function ListingCard({ listing: l }: { listing: Listing }) {
  return (
    <Link href={l.url} className="card">
      <div className="card-art">
        {l.photos[0] ? <img src={l.photos[0].src} alt={l.photos[0].alt} className="photo" loading="lazy" /> : <WatchArt watch={l.watch} size={120} />}
      </div>
      <div className="card-body">
        <span className="card-brand">{l.watch.brand}</span>
        <span className="card-model">{l.watch.model}</span>
        <span className="card-ref">Ref. {l.watch.referenceDisplay}{l.year ? ` · ${l.year}` : ""}</span>
        <span className="card-meta">{l.condition} · {l.boxPapers} · {l.location}</span>
        <span className="card-price">{l.status === "sold" ? "Sold" : formatGBP(l.priceGBP)}</span>
      </div>
    </Link>
  );
}
