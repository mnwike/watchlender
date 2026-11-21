import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { ThreeWaysLinks } from "@/components/ThreeWays";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: `Answers about selling a watch, listing it for sale, borrowing against it, valuations, and selling gold and jewellery with ${SITE.name}.`,
  alternates: { canonical: "/faq/" },
};

const waitlist = SITE.loansMode === "waitlist";
const GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  { title: "Selling your watch", items: [
    { q: "How do I sell my watch?", a: "Find your watch in our catalogue or go to the sell page, tell us its condition and whether you have the box and papers, and send the form. We review the details and come back to you with an offer." },
    { q: "Is the offer final?", a: "Any figure given before we have seen the watch is provisional. It is confirmed once the watch has been inspected and authenticated." },
    { q: "Do I need the box and papers?", a: "No, but a complete set is easier to sell and is usually worth more. A watch without papers is authenticated on its own merits." },
    { q: "Which brands do you look at?", a: "Rolex, Omega, Patek Philippe, Audemars Piguet, Cartier, Tudor, Breitling, IWC and other luxury brands. If yours is not in the catalogue, describe it in the form." },
  ] },
  { title: "Listing your watch for sale", items: [
    { q: "What is the difference between selling to you and listing?", a: "Selling to us is quick and certain: we make an offer and buy the watch. Listing means you set an asking price and wait for a buyer, which may achieve more but takes longer and is not guaranteed." },
    { q: "How do I list my watch?", a: "Choose 'List for sale' on any enquiry form and give your asking price. We check the details with you and ask for photographs before anything is published." },
    { q: "Do you handle payment between buyer and seller?", a: "Not yet. We pass genuine buyer enquiries on, and the site says so on every listing." },
  ] },
  { title: "Borrowing against a watch or gold", items: [
    { q: "Can I borrow against my watch?", a: waitlist ? "We are preparing a loan service secured on watches, gold and jewellery. You can register your interest now. Registering is not an application for credit." : "Yes. Choose 'Borrow' on an enquiry form and we will explain how a loan secured on your watch would work before you commit to anything." },
    { q: "How does a loan against a watch work?", a: "The watch is inspected and valued, you are offered a loan for part of its value, and the watch is stored securely until you repay the loan and its charges. If the loan is not repaid, the watch can be sold to settle it." },
    { q: "Should I borrow or sell?", a: "Borrow only if you want the item back and are confident of repaying within the term. If not, selling avoids the cost of borrowing." },
  ] },
  { title: "Valuations", items: [
    { q: "How much is my watch worth?", a: "It depends on the exact reference, condition, box and papers, originality and current demand. Send us those details on the valuation page and a person will reply with an indicative figure." },
    { q: "Do you show watch prices on the site?", a: "No. Pre-owned prices change constantly and depend on the individual watch, so we give a figure for your watch on request." },
    { q: "Do I have to sell after a valuation?", a: "No. Once you have a figure you can sell, list, borrow or do nothing." },
  ] },
  { title: "Gold, silver and jewellery", items: [
    { q: "How do I work out what my gold is worth?", a: "Multiply its weight in grams by its purity and by the price of pure gold per gram. Our gold calculator does this for gold, silver and platinum." },
    { q: "Where do your gold prices come from?", a: "They are reference spot prices for the pure metal, shown with their date and source on each price page. They are not an offer to buy, and an offer will be below the spot value." },
    { q: "Do you buy broken or unhallmarked gold?", a: "Broken items are valued by weight. Unhallmarked items need to be tested to confirm their purity before any offer." },
  ] },
  { title: "About the site", items: [
    { q: `Is ${SITE.name} connected to any watch brand?`, a: `No. ${SITE.name} is independent and is not affiliated with or endorsed by any manufacturer. Brand and model names are used only to identify watches.` },
    { q: "Why do watch pages show an illustration rather than a photo?", a: "We only publish photographs we have the right to use. Where we do not yet have one, an illustration shows the case, dial and bezel colours for identification." },
    { q: "What do you do with my details?", a: "We use them only to respond to your enquiry. See the privacy notice for more." },
  ] },
];

export default function Faq() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: GROUPS.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / FAQ</nav>
      <div className="page-head">
        <h1>Frequently asked questions</h1>
        <p>Short answers about selling, listing, borrowing, valuations and gold. For more detail, see our <Link href="/guides">guides</Link>.</p>
      </div>
      <div className="prose faq" style={{ maxWidth: "52em" }}>
        {GROUPS.map((g) => (
          <section key={g.title} className="faq-group" style={{ padding: 0 }}>
            <h2>{g.title}</h2>
            {g.items.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        ))}
      </div>
      <h2>Ready to start?</h2>
      <ThreeWaysLinks />
    </div>
  );
}
