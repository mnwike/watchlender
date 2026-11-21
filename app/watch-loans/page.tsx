import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/site";

const waitlist = SITE.loansMode === "waitlist";
export const metadata: Metadata = {
  title: "Loans against luxury watches in London and the UK",
  description: `Use your luxury watch as security for a loan and keep ownership. ${waitlist ? "Register your interest." : "Start an enquiry."} ${SITE.area}.`,
  alternates: { canonical: "/watch-loans/" },
};

export default function Loans() {
  return (
    <div className="wrap">
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Loans against luxury watches</h1>
        <p>A loan secured on your watch lets you raise funds without selling it. {waitlist ? "We are not taking applications yet. Register your interest and we'll contact you when the service opens." : "Start an enquiry and we'll explain how it works before you commit to anything."}</p>
      </div>
      <div className="detail">
        <div className="prose">
          <h2>How a watch-backed loan works</h2>
          <p>Your watch is inspected and authenticated, and the amount available depends on its assessed value. The watch is held securely for the term of the loan and returned to you when the loan is repaid. If the loan is not repaid, the watch may be sold to settle it.</p>
          <h2>Before you decide</h2>
          <p>Borrowing against a watch is a credit agreement. Make sure you understand the cost and the terms, and consider whether <Link href="/sell-my-watch">selling the watch</Link> would suit you better.</p>
          {waitlist && <p className="note">Registering your interest is not an application for credit and no offer of credit is made on this page.</p>}
          {SITE.fcaStatement && <p>{SITE.fcaStatement}</p>}
        </div>
        <aside><LeadForm defaultIntent="loan" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
