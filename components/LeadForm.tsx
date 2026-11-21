"use client";
import { useState } from "react";
import { validateLead } from "@/lib/leads";

type Intent = "sell" | "loan" | "list" | "value";

export default function LeadForm({
  watchId,
  watchLabel,
  defaultIntent = "sell",
  loansMode,
  endpoint,
}: {
  watchId?: string;
  watchLabel?: string;
  defaultIntent?: Intent;
  loansMode: "live" | "waitlist";
  endpoint: string;
}) {
  const [intent, setIntent] = useState<Intent>(defaultIntent);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (data.company) return setState("done"); // honeypot
    const payload = { ...data, intent, watchId, watchText: data.watchText ?? watchLabel, consent: data.consent === "on", sourceUrl: location.pathname };
    const check = validateLead(payload);
    if (!check.ok) return setErrors(check.errors);
    if (!endpoint) return setErrors(["Online enquiries are not switched on yet."]);
    setState("sending");
    setErrors([]);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ ...check.lead, year: data.year, watch: watchLabel ?? check.lead.watchText, _subject: `${intent === "sell" ? "Sell" : intent === "list" ? "Listing" : intent === "value" ? "Valuation" : "Loan"} enquiry: ${watchLabel ?? check.lead.watchText}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setErrors(["We couldn't send your enquiry. Please try again."]);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="lead-form done" role="status">
        <h3>Thank you. We have your enquiry.</h3>
        <p>We&apos;ll be in touch using the details you gave us.</p>
      </div>
    );
  }

  const loanWaitlist = intent === "loan" && loansMode === "waitlist";
  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      {defaultIntent !== "value" && <div className="intent three" role="tablist" aria-label="What would you like to do?">
        <button type="button" role="tab" aria-selected={intent === "sell"} className={intent === "sell" ? "on" : ""} onClick={() => setIntent("sell")}>Sell to us</button>
        <button type="button" role="tab" aria-selected={intent === "list"} className={intent === "list" ? "on" : ""} onClick={() => setIntent("list")}>List for sale</button>
        <button type="button" role="tab" aria-selected={intent === "loan"} className={intent === "loan" ? "on" : ""} onClick={() => setIntent("loan")}>Borrow</button>
      </div>}
      {intent === "value" && <p className="note">Tell us about your watch and we&apos;ll reply with an indicative figure. It is provisional until the watch has been inspected.</p>}
      {intent === "list" && (
        <>
          <p className="note">We review every listing before it appears on the site. We do not handle payment between buyers and sellers yet.</p>
          <div className="row">
            <label>Asking price (£)<input name="askingPrice" inputMode="decimal" required /></label>
            <label>Year <em>(optional)</em><input name="year" inputMode="numeric" /></label>
          </div>
        </>
      )}
      {loanWaitlist && (
        <p className="note">We are not taking loan applications yet. Leave your details to register your interest and we&apos;ll contact you when the service opens. This is not an offer of credit.</p>
      )}
      {watchLabel ? (
        <p className="watch-line"><span>Your watch</span><strong>{watchLabel}</strong></p>
      ) : (
        <label>Which watch do you have?<input name="watchText" required placeholder="Brand, model and reference if you know it" /></label>
      )}
      <div className="row">
        <label>Condition<select name="condition" defaultValue=""><option value="" disabled>Select</option><option>Unworn</option><option>Excellent</option><option>Good</option><option>Worn</option><option>Needs repair</option></select></label>
        <label>Box and papers<select name="boxPapers" defaultValue=""><option value="" disabled>Select</option><option>Box and papers</option><option>Papers only</option><option>Box only</option><option>Neither</option></select></label>
      </div>
      <label>Your name<input name="name" required autoComplete="name" /></label>
      <div className="row">
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label>Phone <em>(optional)</em><input name="phone" type="tel" autoComplete="tel" /></label>
      </div>
      <label>Postcode <em>(optional)</em><input name="postcode" autoComplete="postal-code" /></label>
      <label>Anything else we should know? <em>(optional)</em><textarea name="message" rows={3} /></label>
      <label className="hp" aria-hidden="true">Leave this empty<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input type="checkbox" name="consent" required /> <span>I agree to be contacted about this enquiry. See our <a href="/privacy">privacy notice</a>.</span></label>
      {errors.length > 0 && <ul className="errors" role="alert">{errors.map((e) => <li key={e}>{e}</li>)}</ul>}
      <button className="btn primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : loanWaitlist ? "Register my interest" : intent === "sell" ? "Get my offer" : intent === "list" ? "Submit my listing" : intent === "value" ? "Request my valuation" : "Start my enquiry"}</button>
    </form>
  );
}
