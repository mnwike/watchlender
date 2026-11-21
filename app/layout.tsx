import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE } from "@/lib/site";
import { BRANDS } from "@/lib/catalogue";
import { SearchBar } from "@/components/WatchCard";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: `Sell your luxury watch or register for a loan against it. Search our catalogue by brand, model or reference. Serving ${SITE.area}.`,
  openGraph: { siteName: SITE.name, type: "website", locale: "en_GB" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <div className="top"><div className="wrap"><span>Serving {SITE.area}</span><span>Every watch inspected before any offer is final</span></div></div>
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="logo">Watch<b>Lender</b></Link>
            <SearchBar />
            <nav className="nav" aria-label="Main">
              <Link href="/watches">All watches</Link>
              <Link href="/for-sale">For sale</Link>
              <Link href="/sell-my-watch">Sell my watch</Link>
              <Link href="/watch-loans">Watch loans</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="wrap">
            <div className="cols">
              <div>
                <h3>{SITE.name}</h3>
                <p>An independent catalogue of luxury watches for owners who want to sell, list or borrow against their watch, and for buyers looking for one. {SITE.area}.</p>
              </div>
              <div>
                <h3>Popular brands</h3>
                {BRANDS.slice(0, 6).map((b) => <Link key={b.slug} href={`/watches/${b.slug}`}>{b.name}</Link>)}
              </div>
              <div>
                <h3>Services</h3>
                <Link href="/sell-my-watch">Sell my watch</Link>
                <Link href="/list-my-watch">List your watch for sale</Link>
                <Link href="/for-sale">Watches for sale</Link>
                <Link href="/watch-loans">Loans against watches</Link>
                <Link href="/watches">Browse all watches</Link>
                <Link href="/privacy">Privacy notice</Link>
              </div>
            </div>
            <p className="legal">
              {SITE.name} is independent and is not affiliated with, or endorsed by, any watch manufacturer. Brand and model names are used only to identify watches.
              {SITE.fcaStatement ? ` ${SITE.fcaStatement}` : ""}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
