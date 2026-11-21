import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/data/watch-photo-gallery";

export const metadata: Metadata = {
  title: "Watch photo gallery",
  alternates: { canonical: "/watch-photo-gallery/" },
  description: "An attributed gallery of watch photographs, with source and licence information. Pictures illustrate watch models, not watches offered for sale.",
};

export default function WatchPhotoGallery() {
  return (
    <main className="wrap">
      <div className="page-head">
        <h1>Watch photo gallery</h1>
        <p>Explore watch photographs from openly licensed collections. These are illustrative examples, not watches listed for sale or independently authenticated references. Exact reference matching is stated only where recorded in the source.</p>
        <p><Link href="/watches">Browse our watch reference catalogue</Link></p>
      </div>
      <div className="grid">
        {GALLERY_PHOTOS.map((p) => (
          <article key={p.slug} className="card">
            <div className="card-art" style={{ minHeight: 210, alignItems: "center", padding: 16 }}>
              <Image src={p.image} alt={p.imageAlt} width={260} height={190} unoptimized
                style={{ display: "block", maxWidth: "100%", width: "auto", height: 190, objectFit: "contain" }} />
            </div>
            <div className="card-body">
              <span className="card-brand">{p.brand}</span>
              <strong className="card-model">{p.model}</strong>
              <span className="card-ref">{p.reference && p.specificity === "reference-stated-by-source" ? `Source reference: ${p.reference}` : "Model family shown; exact reference unverified"}</span>
              <span className="card-meta">
                Photo: <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer">{p.author}</a>
                {" · "}
                {p.licenceUrl ? <a href={p.licenceUrl} target="_blank" rel="noopener noreferrer">{p.licence}</a> : p.licence}
              </span>
            </div>
          </article>
        ))}
      </div>
      <p style={{ margin: "24px 0", color: "var(--muted)", fontSize: ".9rem" }}>
        Images sourced from Wikimedia Commons via a GitHub demo collection. Licences and credits are documented with each image.
        These photos do not indicate availability, market value, authenticity or endorsement by watch brands.
      </p>
    </main>
  );
}
