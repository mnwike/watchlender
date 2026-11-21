import Image from "next/image";
import type { Watch } from "@/lib/catalogue";
import { getWatchPhoto } from "@/lib/watch-photos";
import WatchArt from "./WatchArt";

export default function WatchPhoto({ watch, size = 120 }: { watch: Watch; size?: number }) {
  const photo = getWatchPhoto(watch.brandSlug, watch.referenceNormalized);
  if (!photo) return <WatchArt watch={watch} size={size} />;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={size}
      height={size}
      unoptimized
      style={{ objectFit: "contain", width: "auto", height: size, maxWidth: "100%" }}
    />
  );
}

export function WatchPhotoCredit({ watch }: { watch: Watch }) {
  const photo = getWatchPhoto(watch.brandSlug, watch.referenceNormalized);
  if (!photo) return <small>Illustration for identification only, not a photograph of this model.</small>;
  return (
    <small>
      Illustrative photograph; appearance may vary by variant. Image:{" "}
      <a href={photo.sourceUrl} rel="nofollow noopener noreferrer" target="_blank">{photo.credit}</a>
      {" · "}{photo.license}. Not proof of reference or authenticity.
    </small>
  );
}
