// Posts an enquiry to the lead endpoint. Sent as text/plain so the browser makes a simple request
// (the Google Apps Script endpoint cannot answer a CORS preflight). The endpoint always answers 200,
// so success is read from the JSON body.
export async function sendLead(endpoint: string, payload: Record<string, unknown>): Promise<void> {
  const sourceUrl = typeof location !== "undefined" ? location.origin + location.pathname : undefined;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ sourceUrl, ...payload }),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(String(res.status));
  const data = await res.json().catch(() => null);
  if (data && data.ok === false) throw new Error(data.error ?? "rejected");
}

/** Records a lead in Google Analytics, only if the visitor accepted analytics (the tag is loaded). */
export function trackLead(intent: string): void {
  try {
    const w = window as unknown as { __wlTag?: boolean; dataLayer?: unknown[] };
    if (!w.__wlTag || !w.dataLayer) return;
    // eslint-disable-next-line prefer-rest-params
    (function gtag(..._a: unknown[]) { w.dataLayer!.push(arguments); })("event", "generate_lead", { lead_type: intent, page_path: location.pathname });
  } catch { /* analytics is optional */ }
}
