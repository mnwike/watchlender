import type { Metadata } from "next";
import Link from "next/link";
import { liveListings } from "@/lib/listings";
import PageImage from "@/components/PageImage";
import ListingCard from "@/components/ListingCard";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Luxury watches for sale",
  description: `Pre-owned luxury watches listed for sale on ${SITE.name}. Every listing is reviewed before it appears.`,
  alternates: { canonical: "/for-sale/" },
};

export default function ForSale() {
  const listings = liveListings();
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>Watches for sale</h1>
        <p>Watches listed by their owners and reviewed by us before they appear. Enquire on any listing and we&apos;ll put you in touch.</p>
      </div>
      <PageImage name="list" />
      {listings.length === 0 ? (
        <div className="empty">
          <h2>No watches are listed yet</h2>
          <p>Listings have just opened. If you have a watch to sell, you can be among the first to list it.</p>
          <Link className="btn primary" href="/list-my-watch">List my watch</Link>
        </div>
      ) : (
        <div className="grid">{listings.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
      )}
    </div>
  );
}
