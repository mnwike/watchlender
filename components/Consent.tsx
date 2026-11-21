"use client";
import { useEffect, useState } from "react";

// Analytics only loads after the visitor accepts. Declining (or ignoring the banner) loads nothing.
const KEY = "wl_analytics";
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v: string) => { try { localStorage.setItem(KEY, v); } catch { /* storage unavailable */ } };

function loadTag(id: string) {
  const w = window as unknown as { dataLayer?: unknown[]; __wlTag?: boolean };
  if (w.__wlTag) return;
  w.__wlTag = true;
  w.dataLayer = w.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  function gtag(..._args: unknown[]) { w.dataLayer!.push(arguments); }
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

export default function Consent({ tagId }: { tagId: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!tagId) return;
    const v = read();
    if (v === "yes") loadTag(tagId);
    else if (v !== "no") setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener("wl-cookie-settings", reopen);
    return () => window.removeEventListener("wl-cookie-settings", reopen);
  }, [tagId]);
  if (!show || !tagId) return null;
  const choose = (yes: boolean) => { write(yes ? "yes" : "no"); if (yes) loadTag(tagId); setShow(false); };
  return (
    <div className="consent-bar" role="dialog" aria-label="Cookie choice">
      <p>We&apos;d like to use Google Analytics cookies to see how the site is used. They are off unless you accept. <a href="/privacy/">Privacy notice</a></p>
      <div><button className="btn" onClick={() => choose(false)}>Decline</button><button className="btn gold" onClick={() => choose(true)}>Accept</button></div>
    </div>
  );
}

export function CookieSettingsLink() {
  return <button type="button" className="linklike" onClick={() => window.dispatchEvent(new Event("wl-cookie-settings"))}>Cookie settings</button>;
}
