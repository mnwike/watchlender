"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { validateLead } from "@/lib/leads";
import { sendLead } from "@/lib/send";

const DELAY_MS = 10_000;
const SNOOZE_DAYS = 7;
const KEY = "wl_popup_closed";
const SENT = "wl_lead_sent";

const store = {
  get(k: string) { try { return localStorage.getItem(k) ?? sessionStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string, session = false) { try { (session ? sessionStorage : localStorage).setItem(k, v); } catch { /* storage unavailable */ } },
};

/** General enquiry pop-up: appears once after 10 seconds, then stays away for a week once closed. */
export default function EnquiryPopup({ endpoint }: { endpoint: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const dialog = useRef<HTMLDivElement>(null);
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current || pathname.startsWith("/privacy")) return;
    const closedAt = Number(store.get(KEY) ?? 0);
    if (store.get(SENT) || Date.now() - closedAt < SNOOZE_DAYS * 86_400_000) return;
    let timer: ReturnType<typeof setTimeout>;
    const tryOpen = () => {
      // Don't interrupt someone who is already filling in a form on the page.
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) { timer = setTimeout(tryOpen, 5000); return; }
      if (store.get(SENT)) return;
      shown.current = true;
      setOpen(true);
    };
    timer = setTimeout(tryOpen, DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    dialog.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true });
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    store.set(KEY, String(Date.now()));
    setOpen(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (data.company) return setState("done");
    const check = validateLead({ ...data, intent: "general", consent: data.consent === "on", sourceUrl: location.pathname });
    if (!check.ok) return setErrors(check.errors);
    if (!endpoint) return setErrors(["Online enquiries are not switched on yet."]);
    setState("sending");
    setErrors([]);
    try {
      await sendLead(endpoint, { ...check.lead, _subject: `General enquiry from ${check.lead.name}` });
      store.set(SENT, "1", true);
      store.set(KEY, String(Date.now()));
      setState("done");
    } catch {
      setErrors(["We couldn't send your enquiry. Please try again."]);
      setState("idle");
    }
  }

  if (!open) return null;
  return (
    <div className="popup-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title" ref={dialog}>
        <button className="popup-close" onClick={close} aria-label="Close">×</button>
        <div className="popup-head">
          <PopupClock />
          <span className="eyebrow">Sell now · List · Borrow</span>
          <h2 id="popup-title">How can we help with your watch?</h2>
          <p>Leave your details and one of our team will be in touch.</p>
        </div>
        {state === "done" ? (
          <div className="popup-body popup-done" role="status">
            <h3>Thank you. We have your enquiry.</h3>
            <p>We&apos;ll be in touch using the details you gave us.</p>
            <button className="btn primary" onClick={close}>Close</button>
          </div>
        ) : (
          <form className="popup-body" onSubmit={onSubmit} noValidate>
            <label>Name<input name="name" required autoComplete="name" /></label>
            <div className="popup-row">
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" /></label>
              <label>Email address<input name="email" type="email" required autoComplete="email" /></label>
            </div>
            <label>Your enquiry<textarea name="message" rows={3} placeholder="Tell us a little about what you need" /></label>
            <label className="hp" aria-hidden="true">Leave this empty<input name="company" tabIndex={-1} autoComplete="off" /></label>
            <label className="popup-consent"><input type="checkbox" name="consent" required /> <span>I agree to be contacted about my enquiry. See our <a href="/privacy/">privacy notice</a>.</span></label>
            {errors.length > 0 && <ul className="errors" role="alert">{errors.map((er) => <li key={er}>{er}</li>)}</ul>}
            <button className="btn gold popup-submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send my enquiry"}</button>
            <button type="button" className="popup-later" onClick={close}>No thanks</button>
          </form>
        )}
      </div>
    </div>
  );
}

/** Small live clock: the second hand ticks once a second, the minute and hour hands creep round. Starts at the real time. */
function PopupClock() {
  const now = new Date();
  const s = now.getSeconds();
  const m = now.getMinutes() * 60 + s;
  const h = (now.getHours() % 12) * 3600 + m;
  return (
    <svg className="popup-clock" viewBox="0 0 48 48" width="52" height="52" aria-hidden="true">
      <circle cx="24" cy="24" r="22" className="pc-rim" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="24" y1={i % 3 === 0 ? 4.5 : 5.5} x2="24" y2={i % 3 === 0 ? 9 : 7.5} className={i % 3 === 0 ? "pc-mark major" : "pc-mark"} transform={`rotate(${i * 30} 24 24)`} />
      ))}
      <line x1="24" y1="24" x2="24" y2="13.5" className="pc-hour" style={{ animationDelay: `-${h}s` }} />
      <line x1="24" y1="24" x2="24" y2="8.5" className="pc-minute" style={{ animationDelay: `-${m}s` }} />
      <line x1="24" y1="27.5" x2="24" y2="6.5" className="pc-second" style={{ animationDelay: `-${s}s` }} />
      <circle cx="24" cy="24" r="1.8" className="pc-pin" />
    </svg>
  );
}
