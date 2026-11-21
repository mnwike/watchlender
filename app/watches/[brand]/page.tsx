import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS, getBrand, watchesByBrand } from "@/lib/catalogue";
import { SITE } from "@/lib/site";
import WatchCard from "@/components/WatchCard";

type P = Promise<{ brand: string }>;
export const dynamicParams = false;
export const generateStaticParams = () => BRANDS.map((b) => ({ brand: b.slug }));

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const b = getBrand((await params).brand);
  if (!b) return {};
  return {
    title: `${b.name} watches: models and reference numbers`,
    description: `${b.name} models and reference numbers (${b.families.slice(0, 4).join(", ")}). Find your watch, then sell it, list it or borrow against it.`,
    alternates: { canonical: `/watches/${b.slug}/` },
  };
}

export default async function BrandPage({ params }: { params: P }) {
  const b = getBrand((await params).brand);
  if (!b) notFound();
  const watches = watchesByBrand(b.slug);
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/watches">Watches</Link> / {b.name}</nav>
      <div className="page-head">
        <h1>{b.name} watches and reference numbers</h1>
        <p>{b.count} {b.name} references in our catalogue. Choose your watch to sell it, list it or borrow against it, or go straight to <Link href={`/sell/${b.slug}`}>sell my {b.name}</Link>.</p>
      </div>
      {b.families.map((f) => (
        <section key={f} style={{ padding: "18px 0" }}>
          <h2>{b.name} {f}</h2>
          <div className="grid">{watches.filter((w) => w.family === f).map((w) => <WatchCard key={w.id} watch={w} />)}</div>
        </section>
      ))}
    </div>
  );
}
