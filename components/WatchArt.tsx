import type { Watch } from "@/lib/catalogue";

// Original generic illustration coloured from the watch's specs. It is a placeholder used
// until a licensed photograph exists for the reference; it does not depict any brand's design.
const METAL: [RegExp, string, string][] = [
  [/yellow gold/i, "#d9b76a", "#a8853a"],
  [/rose gold/i, "#dba88f", "#b07a62"],
  [/white gold|platinum/i, "#e3e6e8", "#a9afb5"],
  [/titanium/i, "#a3a6a8", "#6f7376"],
  [/ceramic/i, "#2b2d2f", "#111213"],
];
const COLOUR: Record<string, string> = {
  black: "#15171a", blue: "#1d3f73", green: "#0f5a3c", white: "#f4f2ec", silver: "#d9dbdd", grey: "#70757b",
  champagne: "#d8c08a", brown: "#5a3a26", cream: "#efe6d2", "ice blue": "#a9d3e0", turquoise: "#59c2c0",
  pink: "#e6c3c6", skeleton: "#3a3d42",
};
const colour = (name: string | null | undefined, fallback: string) => (name && COLOUR[name.toLowerCase()]) || fallback;

export default function WatchArt({ watch, size = 220 }: { watch: Pick<Watch, "material" | "dial" | "bezel" | "brand" | "model">; size?: number }) {
  const parts = watch.material.split(/ and /i);
  const twoTone = parts.length > 1;
  const pick = (m: string) => METAL.find(([re]) => re.test(m)) ?? [null, "#cfd3d6", "#8d9398"];
  const [, metal, metalDark] = pick(parts[0]);
  const accent = twoTone ? pick(parts[1])[1] : metal;
  const dial = colour(watch.dial, "#15171a");
  const bezel = watch.bezel ? colour(watch.bezel, metal) : twoTone ? accent : metal;
  const light = ["white", "silver", "champagne", "cream", "ice blue", "pink"].includes(watch.dial.toLowerCase());
  const ink = light ? "#1c1e21" : "#f3f1ea";
  const id = `g${Math.abs(hash(watch.model + watch.dial + watch.material))}`;
  return (
    <svg viewBox="0 0 200 240" width={size} height={size * 1.2} role="img" aria-label={`Illustration of a ${watch.dial.toLowerCase()} dial ${watch.material.toLowerCase()} watch`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={metal} />
          <stop offset="1" stopColor={metalDark} />
        </linearGradient>
      </defs>
      <rect x="62" y="0" width="76" height="62" rx="6" fill={`url(#${id})`} />
      <rect x="62" y="178" width="76" height="62" rx="6" fill={`url(#${id})`} />
      {twoTone && (<><rect x="88" y="0" width="24" height="62" fill={accent} opacity=".9" /><rect x="88" y="178" width="24" height="62" fill={accent} opacity=".9" /></>)}
      <rect x="170" y="112" width="12" height="16" rx="3" fill={metalDark} />
      <circle cx="100" cy="120" r="76" fill={`url(#${id})`} />
      <circle cx="100" cy="120" r="70" fill={bezel} />
      <circle cx="100" cy="120" r="57" fill={dial} stroke={metalDark} strokeWidth="1.5" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        const major = i % 3 === 0;
        const r1 = major ? 42 : 46;
        return <line key={i} x1={100 + Math.sin(a) * r1} y1={120 - Math.cos(a) * r1} x2={100 + Math.sin(a) * 51} y2={120 - Math.cos(a) * 51} stroke={ink} strokeWidth={major ? 4 : 2.2} strokeLinecap="round" />;
      })}
      <line x1="100" y1="120" x2="76" y2="100" stroke={ink} strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="120" x2="131" y2="88" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="100" cy="120" r="4" fill={ink} />
    </svg>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
