// Business details live here so nothing on the site is invented. Fill in before launch.
export const SITE = {
  name: "WatchLender",
  domain: "watchlender.co.uk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://watchlender.co.uk",
  tagline: "Sell now, list or borrow, in one place",
  area: "London and across the UK",
  // TODO(owner): legal entity, registered address, phone, email, ICO registration.
  legalName: "",
  phone: "",
  email: "",
  // Loan enquiries: "waitlist" only registers interest. Switch to "live" once FCA
  // authorisation (or an authorised lending partner) and compliant wording are in place.
  loansMode: (process.env.NEXT_PUBLIC_LOANS_MODE === "live" ? "live" : "waitlist") as "live" | "waitlist",
  fcaStatement: process.env.NEXT_PUBLIC_FCA_STATEMENT ?? "",
  // Where enquiry forms are sent (a form service or your own endpoint that accepts JSON).
  // Empty = forms show "not switched on yet" instead of pretending to send.
  // GA4 measurement ID for the "WatchLender website" stream. Loaded only after cookie consent.
  googleTagId: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "G-Y3PPV27CSF",
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "",
};
