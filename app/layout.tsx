import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE } from "@/lib/site";
import { BRANDS } from "@/lib/catalogue";
import { SearchBar } from "@/components/WatchCard";
import EnquiryPopup from "@/components/EnquiryPopup";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: `Sell your luxury watch now, list it at your own price, or borrow against it, all in one place. Serving ${SITE.area}.`,
  openGraph: { siteName: SITE.name, type: "website", locale: "en_GB" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <div className="top"><div className="wrap"><span>Sell now, list or borrow, in one place</span><span>Serving {SITE.area}</span></div></div>
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="brand-logo" aria-label="WatchLender home"><img src="/branding/watchlender-wordmark-white.svg" alt="WatchLender" width={250} height={47} /></Link>
            <SearchBar />
            <nav className="nav" aria-label="Main">
              <Link href="/sell-my-watch">Sell</Link>
              <Link href="/list-my-watch">List</Link>
              <Link href="/watch-loans">Borrow</Link>
              <Link href="/watch-valuation">Valuation</Link>
              <Link href="/sell-gold">Gold</Link>
              <Link href="/for-sale">For sale</Link>
              <Link href="/guides">Guides</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="wrap">
            <div className="cols">
              <div>
                <Link href="/" className="footer-brand-logo" aria-label="WatchLender home"><img src="/branding/watchlender-wordmark-white.svg" alt="WatchLender" width={230} height={43} /></Link>
                <p>An independent catalogue of luxury watches for owners who want to sell, list or borrow against their watch, and for buyers looking for one. {SITE.area}.</p>
              </div>
              <div>
                <h3>Sell by brand</h3>
                {BRANDS.slice(0, 6).map((b) => <Link key={b.slug} href={`/sell/${b.slug}`}>Sell my {b.name}</Link>)}
              </div>
              <div>
                <h3>Services</h3>
                <Link href="/sell-my-watch">Sell my watch</Link>
                <Link href="/list-my-watch">List your watch for sale</Link>
                <Link href="/for-sale">Watches for sale</Link>
                <Link href="/watch-loans">Loans against watches</Link>
                <Link href="/pawn-my-watch">Pawn my watch</Link>
                <Link href="/sell-gold">Sell gold</Link>
                <Link href="/gold-price-calculator">Gold calculator</Link>
                <Link href="/gold-price-per-gram">Gold price per gram</Link>
                <Link href="/sell-jewellery">Sell jewellery</Link>
                <Link href="/gold-loans">Gold loans</Link>
                <Link href="/rolex-nicknames">Rolex nicknames</Link>
                <Link href="/watch-valuation">Watch valuation</Link>
                <Link href="/sell-my-watch-london">Sell my watch in London</Link>
                <Link href="/guides">Guides</Link>
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
        <EnquiryPopup endpoint={SITE.leadEndpoint} />
      </body>
    </html>
  );
}
