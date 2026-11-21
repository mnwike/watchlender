"use client";
import { useState } from "react";
import { validateLead } from "@/lib/leads";
import { sendLead, trackLead } from "@/lib/send";

export default function BuyForm({ listingId, title, endpoint }: { listingId: string; title: string; endpoint: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (data.company) return setState("done");
    const check = validateLead({ ...data, intent: "buy", listingId, watchText: title, consent: data.consent === "on", sourceUrl: location.pathname });
    if (!check.ok) return setErrors(check.errors);
    if (!endpoint) return setErrors(["Online enquiries are not switched on yet."]);
    setState("sending");
    setErrors([]);
    try {
      await sendLead(endpoint, { ...check.lead, _subject: `Buyer enquiry: ${title} (${listingId})` });
      trackLead("buy");
      try { sessionStorage.setItem("wl_lead_sent", "1"); } catch { /* storage unavailable */ }
      setState("done");
    } catch {
      setErrors(["We couldn't send your enquiry. Please try again."]);
      setState("idle");
    }
  }

  if (state === "done") return <div className="lead-form done" role="status"><h3>Thank you. We have your enquiry.</h3><p>We&apos;ll be in touch about this watch.</p></div>;
  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <h3>Enquire about this watch</h3>
      <label>Your name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Phone <em>(optional)</em><input name="phone" type="tel" autoComplete="tel" /></label>
      <label>Message <em>(optional)</em><textarea name="message" rows={3} /></label>
      <label className="hp" aria-hidden="true">Leave this empty<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input type="checkbox" name="consent" required /> <span>I agree to be contacted about this enquiry. See our <a href="/privacy/">privacy notice</a>.</span></label>
      {errors.length > 0 && <ul className="errors" role="alert">{errors.map((e) => <li key={e}>{e}</li>)}</ul>}
      <button className="btn primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}
