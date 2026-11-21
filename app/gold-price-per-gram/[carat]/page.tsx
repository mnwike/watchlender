import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CARATS, CaratPage, caratPrice, getCarat } from "@/components/GoldExtras";
import { gbp, priceDate } from "@/lib/metals";

export const dynamicParams = false;
export const generateStaticParams = () => CARATS.map((c) => ({ carat: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ carat: string }> }): Promise<Metadata> {
  const { carat } = await params;
  const c = getCarat(carat);
  if (!c) return {};
  return {
    title: `${c.label} gold price per gram UK (${c.mark})`,
    description: `${c.label} gold price per gram: ${gbp(caratPrice(carat))} of gold per gram at the spot price on ${priceDate()}, with values by weight and a calculator for your own items.`,
    alternates: { canonical: `/gold-price-per-gram/${c.slug}/` },
  };
}

export default async function Page({ params }: { params: Promise<{ carat: string }> }) {
  const { carat } = await params;
  if (!getCarat(carat)) notFound();
  return <CaratPage slug={carat} />;
}
