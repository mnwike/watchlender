import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HALLMARKS, HallmarkPage, getHallmark, hallmarkPrice } from "@/components/GoldExtras";
import { gbp, priceDate } from "@/lib/metals";

export const dynamicParams = false;
export const generateStaticParams = () => HALLMARKS.map((h) => ({ mark: h.slug }));

export async function generateMetadata({ params }: { params: Promise<{ mark: string }> }): Promise<Metadata> {
  const { mark } = await params;
  const h = getHallmark(mark);
  if (!h) return {};
  return {
    title: `${h.mark} ${h.metal}: what the hallmark means and what it is worth`,
    description: `${h.mark} on ${h.metal} means ${(h.fineness * 100).toFixed(1)}% pure (${h.name}). Worth ${gbp(hallmarkPrice(mark))} per gram in ${h.metal} at spot on ${priceDate()}. How to check the mark and what to do with it.`,
    alternates: { canonical: `/hallmarks/${h.slug}/` },
  };
}

export default async function Page({ params }: { params: Promise<{ mark: string }> }) {
  const { mark } = await params;
  if (!getHallmark(mark)) notFound();
  return <HallmarkPage slug={mark} />;
}
