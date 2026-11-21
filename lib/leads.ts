export type LeadIntent = "sell" | "loan" | "list" | "buy" | "value";

export interface LeadInput {
  intent: LeadIntent;
  name: string;
  email: string;
  phone?: string;
  postcode?: string;
  watchId?: string;
  watchText?: string;
  condition?: string;
  boxPapers?: string;
  message?: string;
  askingPrice?: string;
  listingId?: string;
  consent: boolean;
  sourceUrl?: string;
}

export interface Lead extends LeadInput {
  id: string;
  createdAt: string;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function validateLead(body: Record<string, unknown>): { ok: true; lead: LeadInput } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const intent = (["sell", "loan", "list", "buy", "value"] as const).find((i) => i === body.intent) ?? null;
  if (!intent) errors.push("Choose what you would like to do.");
  const name = clean(body.name, 120);
  if (name.length < 2) errors.push("Enter your name.");
  const email = clean(body.email, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("Enter a valid email address.");
  const phone = clean(body.phone, 30);
  if (phone && !/^[0-9+() -]{7,}$/.test(phone)) errors.push("Enter a valid phone number.");
  const watchId = clean(body.watchId, 200);
  const watchText = clean(body.watchText, 200);
  const listingId = clean(body.listingId, 80);
  if (!watchId && !watchText && !listingId) errors.push("Tell us which watch you have.");
  const askingPrice = clean(body.askingPrice, 20).replace(/[£,\s]/g, "");
  if (intent === "list" && !/^\d{2,9}(\.\d{1,2})?$/.test(askingPrice)) errors.push("Enter your asking price in pounds.");
  if (body.consent !== true && body.consent !== "on" && body.consent !== "true") {
    errors.push("Please confirm we can contact you about your enquiry.");
  }
  if (errors.length || !intent) return { ok: false, errors };
  return {
    ok: true,
    lead: {
      intent,
      name,
      email,
      phone,
      postcode: clean(body.postcode, 12).toUpperCase(),
      watchId,
      watchText,
      condition: clean(body.condition, 40),
      boxPapers: clean(body.boxPapers, 40),
      message: clean(body.message, 2000),
      askingPrice,
      listingId,
      consent: true,
      sourceUrl: clean(body.sourceUrl, 300),
    },
  };
}
