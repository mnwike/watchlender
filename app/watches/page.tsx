import type { Metadata } from "next";
import Browse from "@/components/Browse";

export const metadata: Metadata = {
  title: "Browse all luxury watches",
  description: "Search every watch in our catalogue by brand, model or reference number, then sell it or borrow against it.",
  alternates: { canonical: "/watches/" }, // search-result URLs (?q=) all canonicalise here
};

export default function WatchesPage() {
  return <Browse />;
}
