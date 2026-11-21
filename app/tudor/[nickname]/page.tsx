import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNickname, nicknamesFor } from "@/data/nicknames";
import NicknameView, { nicknameMetadata } from "@/components/NicknameView";

type P = Promise<{ nickname: string }>;
export const dynamicParams = false;
export const generateStaticParams = () => nicknamesFor("Tudor").map((n) => ({ nickname: n.slug }));

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const n = getNickname((await params).nickname, "Tudor");
  return n ? nicknameMetadata(n) : {};
}

export default async function Page({ params }: { params: P }) {
  const n = getNickname((await params).nickname, "Tudor");
  if (!n) notFound();
  return <NicknameView n={n} />;
}
