import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy notice", alternates: { canonical: "/privacy/" } };

// DRAFT. Must be reviewed and completed (controller identity, lawful basis, retention, ICO
// registration) before the site takes live enquiries.
export default function Privacy() {
  return (
    <div className="wrap prose" style={{ paddingBlock: 30 }}>
      <h1>Privacy notice</h1>
      <p><strong>Draft, to be completed before launch.</strong></p>
      <p>When you send an enquiry we collect your name, contact details, and the details of the watch you tell us about. We use them only to respond to your enquiry.</p>
      <p>We do not sell your details. You can ask us to delete them at any time{SITE.email ? ` by emailing ${SITE.email}` : ""}.</p>
    </div>
  );
}
