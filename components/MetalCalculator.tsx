"use client";
import { useState } from "react";
import { METAL_NAME, PURITIES, TROY_OUNCE_G, gbp, meltValue, type Metal } from "@/lib/metals";

export default function MetalCalculator({ prices, asOf, sourceName, initial = "gold" }: { prices: Record<Metal, number>; asOf: string; sourceName: string; initial?: Metal }) {
  const [metal, setMetal] = useState<Metal>(initial);
  const [purity, setPurity] = useState(0);
  const [grams, setGrams] = useState("10");
  const [perOz, setPerOz] = useState<Record<Metal, string>>({ gold: String(prices.gold), silver: String(prices.silver), platinum: String(prices.platinum) });
  const p = PURITIES[metal][Math.min(purity, PURITIES[metal].length - 1)];
  const g = Number(grams);
  const price = Number(perOz[metal]);
  const ok = g > 0 && price > 0 && Number.isFinite(g) && Number.isFinite(price);
  const edited = price !== prices[metal];
  return (
    <div className="calc">
      <div className="intent three" role="tablist" aria-label="Metal">
        {(Object.keys(METAL_NAME) as Metal[]).map((m) => <button key={m} type="button" role="tab" aria-selected={metal === m} className={metal === m ? "on" : ""} onClick={() => { setMetal(m); setPurity(0); }}>{METAL_NAME[m]}</button>)}
      </div>
      <div className="calc-row">
        <label>Purity<select value={purity} onChange={(e) => setPurity(Number(e.target.value))}>{PURITIES[metal].map((x, i) => <option key={x.mark} value={i}>{x.label} ({x.mark})</option>)}</select></label>
        <label>Weight in grams<input inputMode="decimal" value={grams} onChange={(e) => setGrams(e.target.value)} /></label>
        <label>Spot price, £ per troy oz<input inputMode="decimal" value={perOz[metal]} onChange={(e) => setPerOz({ ...perOz, [metal]: e.target.value })} /></label>
      </div>
      <div className="calc-result" aria-live="polite">
        {ok ? (
          <>
            <span>Metal value at the spot price</span>
            <strong>{gbp(meltValue(g, p.fineness, price))}</strong>
            <small>{(g * p.fineness).toFixed(2)} g of pure {metal} at {gbp(price / TROY_OUNCE_G)} per gram</small>
          </>
        ) : <span>Enter a weight and a price to see the value.</span>}
      </div>
      <p className="calc-note">{edited ? "Using the price you entered." : `Reference price from ${sourceName}, ${asOf}. Prices move daily: enter today's price for an up-to-date figure.`} This is the value of the metal itself. A buyer&apos;s offer will be lower, to cover refining and their margin, and stones are valued separately.</p>
    </div>
  );
}
