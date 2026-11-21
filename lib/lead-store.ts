// Server-side lead storage for a future self-hosted version (not used by the static site).
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Lead, LeadInput } from "./leads";

/** Postgres when DATABASE_URL is set; otherwise a local JSONL file for development. */
export async function saveLead(input: LeadInput): Promise<Lead> {
  const lead: Lead = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
  if (process.env.DATABASE_URL) {
    const { Pool } = await import("pg");
    const g = globalThis as unknown as { __pool?: InstanceType<typeof Pool> };
    g.__pool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
    await g.__pool.query(
      `insert into lead (id, intent, name, email, phone, postcode, watch_ref_key, watch_text, condition, box_papers, message, consent_at, source_url)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,now(),$12)`,
      [lead.id, lead.intent, lead.name, lead.email, lead.phone, lead.postcode, lead.watchId, lead.watchText, lead.condition, lead.boxPapers, lead.message, lead.sourceUrl],
    );
  } else {
    const dir = process.env.LEADS_DIR ?? path.join(process.cwd(), "var");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n", { mode: 0o600 });
  }
  return lead;
}

// Small in-memory limiter: enough to blunt form spam on a single instance.
const hitsByIp = new Map<string, number[]>();
export function rateLimited(ip: string, max = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hitsByIp.set(ip, recent);
  return recent.length > max;
}
