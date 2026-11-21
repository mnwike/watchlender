// Guides for watch owners. General information only: no prices, no invented statistics.
export interface Guide {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "sell-list-or-borrow",
    title: "Sell now, list or borrow: which is right for your watch?",
    description: "The three ways to release the value in a luxury watch, what each one costs you, and how to choose between them.",
    intro: "A good watch gives you three choices when you need money from it: sell it to a buyer who pays now, list it and wait for the right private buyer, or keep it and borrow against it. They suit different situations, and the right one depends on how quickly you need the money and whether you want the watch back.",
    sections: [
      { h: "Sell now", p: ["You sell the watch to a trade buyer. The buyer checks the watch, makes an offer and pays you. It is the quickest and most certain route, and there is nothing left for you to manage afterwards.", "The trade-off is price. A trade buyer has to resell the watch and carries the risk until they do, so an offer is usually lower than the price a private buyer might eventually pay."] },
      { h: "List it for sale", p: ["You set an asking price and the watch is advertised to buyers. If the right buyer comes along you may achieve more than a trade offer.", "The trade-off is time and certainty. A listing can sit for weeks, buyers negotiate, and there is no guarantee it sells at all. You also need good photographs and an accurate description."] },
      { h: "Borrow against it", p: ["The watch is held as security for a loan. You receive funds now and get the watch back when the loan and its charges are repaid. It suits owners who need short-term funds but do not want to part with the watch.", "The trade-off is cost and risk. Borrowing is not free, and if the loan is not repaid the lender can sell the watch to recover what is owed. Loans secured on a watch are regulated credit agreements in the UK, so read the terms and costs before agreeing to one."] },
      { h: "How to choose", list: ["If you need the money within days and do not want the watch back, sell now.", "If you are in no hurry and want to try for a higher price, list it.", "If you want to keep the watch and can repay within the term, consider borrowing.", "If you are unsure what it is worth, start with a valuation and decide afterwards."] },
      { h: "You can change route", p: ["The three options are not exclusive. Some owners list first and take a trade offer if the listing does not sell. Others ask for an offer and a loan figure together and compare them. Having all three in one place makes that comparison easier."] },
    ],
  },
  {
    slug: "what-affects-watch-value",
    title: "What affects how much your watch is worth",
    description: "The factors buyers and lenders look at when valuing a pre-owned luxury watch, from reference and condition to box and papers.",
    intro: "Two watches of the same model can be worth quite different amounts. Buyers and lenders look at the same handful of things, and knowing them helps you describe your watch accurately and judge an offer.",
    sections: [
      { h: "The exact reference", p: ["The reference number identifies the precise version: case size, metal, bezel and often dial. Small differences in reference can mean large differences in demand, so it is the first thing a buyer asks for."] },
      { h: "Condition", p: ["Scratches, dents, a stretched bracelet and worn bezel edges all count. So does polishing: heavy polishing softens the original case lines, and many collectors pay more for an unpolished watch with honest wear than for one that has been refinished."] },
      { h: "Box and papers", p: ["The original warranty card or certificate helps confirm the watch is genuine and shows when and where it was sold. The box, spare links, hang tags and booklets complete the set. A full set is easier to sell and is usually worth more than the watch alone."] },
      { h: "Originality", p: ["Replacement dials, hands, bezels and aftermarket stones or bracelets generally reduce value, even when the work is well done. Service parts fitted by the manufacturer are accepted more readily, but collectors of older watches often prize original parts."] },
      { h: "Service history", p: ["A recent service by the manufacturer or a recognised watchmaker, with paperwork, reassures a buyer that the movement is healthy. A watch that is not running, or is running poorly, will be valued with the cost of repair in mind."] },
      { h: "Age and demand", p: ["Demand for particular models rises and falls. Discontinued references can become more sought after, and some current models trade above or below their retail price. This is why any figure given before inspection is provisional, and why figures change over time."] },
    ],
  },
  {
    slug: "find-your-watch-reference-number",
    title: "How to find your watch's reference number",
    description: "Where to look for the reference and serial numbers on a luxury watch, and why buyers ask for them.",
    intro: "The reference number tells a buyer exactly which watch you have. It is different from the serial number, which is unique to your individual watch. You will usually be asked for the reference first.",
    sections: [
      { h: "Start with the paperwork", p: ["The warranty card or certificate is the easiest place to look. It normally shows the reference (sometimes labelled model or style number) and the serial number, along with the date of sale."] },
      { h: "On the watch itself", list: ["Case back: many brands engrave the reference and serial on the outside of the case back.", "Between the lugs: on many Rolex watches the reference is engraved on the case between the lugs at 12 o'clock, hidden by the bracelet. On newer ones the serial is engraved on the inner bezel ring.", "Inside the case back: some brands mark numbers inside, which only a watchmaker should open."] },
      { h: "Do not force anything", p: ["Removing a bracelet or opening a case without the right tools can scratch the watch and reduce its value. If the numbers are not visible and you have no papers, describe the watch and send clear photographs instead."] },
      { h: "Reference formats differ by brand", p: ["Rolex references are mostly five or six digits, sometimes followed by letters describing the bezel. Omega uses a long dotted number. Patek Philippe and Audemars Piguet use a number followed by letters for the case metal. Our catalogue search accepts any of these, with or without the punctuation."] },
    ],
  },
  {
    slug: "box-and-papers",
    title: "Box and papers: do they matter when you sell a watch?",
    description: "What counts as box and papers, why buyers care, and what to do if you no longer have them.",
    intro: "You will be asked whether your watch comes with box and papers almost as soon as you say you want to sell it. Here is what that means and how much it matters.",
    sections: [
      { h: "What the phrase covers", p: ["Papers means the original warranty card or certificate issued when the watch was first sold. Box means the presentation box it came in. A full set also includes anything else supplied new: booklets, hang tags, spare bracelet links and, for some brands, a certificate of origin."] },
      { h: "Why buyers care", p: ["Papers support authenticity and show the watch's history. A complete set is also simply easier to resell, so buyers will usually pay more for it. The difference tends to be greater for modern, collectable models than for older everyday watches."] },
      { h: "If you have lost them", p: ["A watch without papers can still be sold, listed or used as security. It will be authenticated on its own merits when inspected. Some manufacturers will issue an archive extract or service paperwork confirming details of the watch, which can help, though it is not the same as the original papers."] },
      { h: "What to gather before you enquire", list: ["The warranty card or certificate, if you have it.", "Service receipts and any manufacturer service card.", "Spare links removed from the bracelet.", "The box and anything that came inside it."] },
    ],
  },
  {
    slug: "how-watch-loans-work",
    title: "How loans against watches work",
    description: "How borrowing against a luxury watch works in the UK, what it costs you, and the questions to ask before you agree to one.",
    intro: "Borrowing against a watch lets you raise money without selling it. The watch is the security, so the lender looks mainly at the watch and less at your credit history. It is still borrowing, and it needs the same care as any other loan.",
    sections: [
      { h: "The basic steps", list: ["The watch is inspected, authenticated and valued.", "The lender offers a loan for a proportion of that value.", "If you accept, you sign a credit agreement and hand over the watch, which is stored securely.", "You repay the loan and its charges within the term and the watch is returned."] },
      { h: "What it costs", p: ["You pay interest and sometimes fees on the amount borrowed. The agreement must set out the total cost and the term before you sign. Compare that total with the alternative of selling the watch and, if you wish, buying another later."] },
      { h: "If you cannot repay", p: ["If the loan is not repaid by the end of the agreed term, the lender can sell the watch to recover what is owed. The rules on notice and on any surplus from the sale are set out in the agreement and in consumer credit law."] },
      { h: "Questions to ask a lender", list: ["Are you authorised by the Financial Conduct Authority for this kind of lending?", "What is the total amount I will repay, and by when?", "Can I repay early, and what would that cost?", "Where is my watch stored and is it insured while you hold it?", "What happens, step by step, if I miss the repayment date?"] },
      { h: "Is it the right choice?", p: ["A loan suits someone who is confident of repaying within the term and wants the watch back. If you do not expect to repay, selling is usually the better option because you avoid the cost of borrowing."] },
    ],
  },
  {
    slug: "how-to-sell-a-luxury-watch",
    title: "How to sell a luxury watch safely",
    description: "A practical checklist for selling a pre-owned luxury watch: preparing it, describing it honestly and avoiding common risks.",
    intro: "Selling a valuable watch is straightforward if you prepare properly. Most problems come from vague descriptions, poor photographs or handing a watch over before payment is secure.",
    sections: [
      { h: "Prepare the watch", list: ["Find the reference number and gather the box, papers and service history.", "Clean it gently with a soft cloth. Do not polish it: polishing can lower its value.", "Note honestly anything that is wrong: marks, a non-original part, timekeeping problems."] },
      { h: "Photograph it clearly", p: ["Use daylight and a plain background. Take the dial straight on, both sides of the case, the case back, the clasp, and the papers. Clear pictures of the flaws build more trust than hiding them."] },
      { h: "Choose how to sell", p: ["A trade buyer gives speed and certainty. A listing may achieve more but takes longer. If you would rather keep the watch, borrowing against it is the third option. Our guide to selling, listing or borrowing compares them."] },
      { h: "Protect yourself", list: ["Do not hand over or post the watch until you are certain how and when you will be paid.", "Be wary of buyers who overpay and ask for a refund, or who want to move the conversation to an unusual payment method.", "If you send the watch anywhere, use insured, tracked delivery and keep the proof.", "Keep a record of the serial number and your photographs."] },
    ],
  },
  {
    slug: "do-rolex-watches-hold-their-value",
    title: "Do Rolex and Tudor watches hold their value?",
    description: "Why some luxury watches keep their value better than others, what that means for Rolex and Tudor owners, and what it does not guarantee.",
    intro: "Rolex has a reputation for holding value better than almost any other watch brand, and Tudor, its sister brand, is often mentioned in the same breath. The reputation is broadly deserved, but it varies a great deal by model, and it is not a promise about any individual watch.",
    sections: [
      { h: "Why some watches hold value", p: ["Value retention comes from demand outstripping supply over a long period. Brands that are widely recognised, produce consistent designs and limit how many watches reach the market tend to see stronger pre-owned prices."] },
      { h: "Rolex", p: ["Steel sports models such as the Submariner, GMT-Master II and Daytona have historically been the strongest performers, at times trading above their retail price. Dress models, two-tone and precious metal watches usually lose more from retail, though they still tend to do better than comparable watches from many other brands."] },
      { h: "Tudor", p: ["Tudor watches cost less new and generally lose a larger share of their retail price than the most sought-after Rolex models. Popular references such as the Black Bay 58 tend to hold up better than less well-known ones."] },
      { h: "What changes the answer for your watch", list: ["The exact reference and dial: small differences matter.", "Condition, and whether the case has been polished.", "Box, papers and service history.", "Whether the model is current or discontinued, and how demand has moved since you bought it."] },
      { h: "What it does not mean", p: ["Past performance is not a guarantee. Pre-owned prices for many models fell from their peak in recent years after a sharp rise. A watch is worth what a buyer will pay now, which is why a current valuation matters more than what you paid or what a model sold for at its peak."] },
    ],
  },
  {
    slug: "how-to-spot-a-fake-rolex",
    title: "How to spot a fake Rolex: checks you can do yourself",
    description: "Practical checks for telling a genuine Rolex from a counterfeit, their limits, and why professional authentication still matters.",
    intro: "Counterfeit Rolex watches range from obvious to very convincing. A few simple checks will catch the poor ones. The best fakes can only be ruled out by a watchmaker opening the case, which is why any serious buyer or lender will insist on inspection.",
    sections: [
      { h: "Checks you can do without tools", list: ["Weight: a genuine Rolex feels solid. Many fakes are noticeably light.", "Seconds hand: on a mechanical Rolex it sweeps smoothly rather than ticking once a second.", "Text and printing: dial text should be crisp and evenly spaced, with no smudging or misalignment.", "Date magnification: the Cyclops lens on date models should enlarge the date clearly and sit centred over it.", "Crown and case back: most Rolex models have a plain, solid case back with no engraving or glass window.", "Bracelet and clasp: links should be tight and well finished, and the clasp engraving sharp."] },
      { h: "Reference and serial numbers", p: ["The reference and serial should be finely and cleanly engraved, and should match the paperwork. The reference should also match the watch in front of you: the right metal, bezel and dial for that number. Our catalogue lists the specifications for each reference."] },
      { h: "Paperwork is not proof", p: ["Boxes and warranty cards are counterfeited too. Papers support a watch's history, but they do not replace examining the watch itself."] },
      { h: "The limits of checking it yourself", p: ["High-quality counterfeits can pass every external check. So can genuine watches fitted with non-original dials, bezels or movement parts, which affects value. Only inspection of the movement by someone qualified settles the question."] },
      { h: "If you are selling or borrowing", p: ["Expect the watch to be authenticated before any offer is confirmed. That protects you as well: it means the figure you are given is based on what the watch really is."] },
    ],
  },
  {
    slug: "sea-dweller-vs-submariner",
    title: "Rolex Sea-Dweller vs Submariner: the differences",
    description: "How the Rolex Sea-Dweller and Submariner differ in size, depth rating and features, and how to tell which one you have.",
    intro: "The Sea-Dweller began as a deeper-diving development of the Submariner, and the two still look alike at a glance. The differences are in size, depth rating and one valve on the side of the case.",
    sections: [
      { h: "Size", p: ["The current Submariner has a 41 mm case. The current Sea-Dweller is 43 mm and thicker, and the Deepsea is larger again at 44 mm. On the wrist the Sea-Dweller is the noticeably heavier watch."] },
      { h: "Depth rating", p: ["The Submariner is rated to 300 metres. The Sea-Dweller is rated to 1,220 metres and the Deepsea to 3,900 metres. Few owners will ever need the difference, but it explains the thicker case and crystal."] },
      { h: "Helium escape valve", p: ["The Sea-Dweller and Deepsea have a helium escape valve, a small circular valve set into the left side of the case, designed for saturation diving. The Submariner does not have one. It is the quickest way to tell the two apart."] },
      { h: "References to look for", list: ["Submariner: 124060 (no date) and 126610LN (date) are the current steel references.", "Sea-Dweller: 126600 in steel and 126603 in steel and yellow gold.", "Deepsea: 136660, and 136668LB in yellow gold."] },
      { h: "Which is worth more?", p: ["It depends on the reference, condition and demand at the time, not simply on which model is higher in the range. Send us the details of yours for a current indicative figure."] },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
