// Original illustrations for the gold, silver and jewellery pages. Drawn for identification, not photographs.
const GOLD = { a: "#f3dc9a", b: "#c9a44c", c: "#8f6f25", ink: "#5b4514" };
const SILVER = { a: "#f4f6f7", b: "#c3c9cd", c: "#858d93", ink: "#434a4f" };
type Tone = "gold" | "silver";

function Frame({ id, tone, label, children }: { id: string; tone: Tone; label: string; children: React.ReactNode }) {
  const t = tone === "gold" ? GOLD : SILVER;
  return (
    <svg className="metal-art" viewBox="0 0 640 220" role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0f4a38" /><stop offset="1" stopColor="#082a20" /></linearGradient>
        <linearGradient id={`${id}-m`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={t.a} /><stop offset=".55" stopColor={t.b} /><stop offset="1" stopColor={t.c} /></linearGradient>
      </defs>
      <rect width="640" height="220" rx="8" fill={`url(#${id}-bg)`} />
      {children}
    </svg>
  );
}

/** A UK hallmark as it appears stamped on metal: maker's mark, fineness, assay office. */
export function HallmarkArt({ mark, metal }: { mark: string; metal: Tone }) {
  const id = `hm${mark}`; const t = metal === "gold" ? GOLD : SILVER;
  const fine = metal === "gold"
    ? <polygon points="262,78 290,62 350,62 378,78 378,122 350,138 290,138 262,122" fill="none" stroke={t.ink} strokeWidth="3" />
    : <ellipse cx="320" cy="100" rx="60" ry="38" fill="none" stroke={t.ink} strokeWidth="3" />;
  return (
    <Frame id={id} tone={metal} label={`Illustration of a UK hallmark: a maker's mark, the number ${mark} and an assay office symbol`}>
      <rect x="110" y="40" width="420" height="120" rx="14" fill={`url(#${id}-m)`} />
      <rect x="150" y="66" width="76" height="68" rx="6" fill="none" stroke={t.ink} strokeWidth="3" />
      <text x="188" y="111" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fontWeight="700" fill={t.ink}>AB</text>
      {fine}
      <text x="320" y="112" textAnchor="middle" fontFamily="Georgia, serif" fontSize="34" fontWeight="700" fill={t.ink}>{mark}</text>
      <path d="M414 66h76v44l-38 26-38-26z" fill="none" stroke={t.ink} strokeWidth="3" />
      <g stroke={t.ink} strokeWidth="3.5" fill="none" strokeLinecap="round">
        <circle cx="452" cy="80" r="5" /><path d="M452 85v34M440 93h24M436 108c3 10 9 13 16 13s13-3 16-13" />
      </g>
      <g fontFamily="system-ui, sans-serif" fontSize="14" fill="#d9e6df" textAnchor="middle">
        <text x="188" y="190">Maker&apos;s mark</text><text x="320" y="190">Fineness: {mark}</text><text x="452" y="190">Assay office</text>
      </g>
    </Frame>
  );
}

export function BarArt() {
  const t = GOLD;
  return (
    <Frame id="bar" tone="gold" label="Illustration of a fine gold bar">
      <polygon points="190,60 450,60 490,160 150,160" fill="url(#bar-m)" />
      <polygon points="190,60 450,60 440,48 200,48" fill={t.a} />
      <polygon points="150,160 490,160 478,176 162,176" fill={t.c} />
      <rect x="236" y="82" width="168" height="56" rx="4" fill="none" stroke={t.ink} strokeWidth="2.5" />
      <text x="320" y="106" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fontWeight="700" fill={t.ink} letterSpacing="2">FINE GOLD</text>
      <text x="320" y="128" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fontWeight="700" fill={t.ink} letterSpacing="2">999.9</text>
    </Frame>
  );
}

export function CoinArt({ tone = "gold", text = "1 oz" }: { tone?: Tone; text?: string }) {
  const id = `coin-${tone}`; const t = tone === "gold" ? GOLD : SILVER;
  const coin = (cx: number, cy: number, r: number, label?: string) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-m)`} />
      <circle cx={cx} cy={cy} r={r - 3} fill="none" stroke={t.ink} strokeWidth="1.5" strokeDasharray="2 3" />
      <circle cx={cx} cy={cy} r={r - 12} fill="none" stroke={t.ink} strokeWidth="2" />
      {label && <text x={cx} y={cy + 9} textAnchor="middle" fontFamily="Georgia, serif" fontSize={r * 0.42} fontWeight="700" fill={t.ink}>{label}</text>}
    </g>
  );
  return (
    <Frame id={id} tone={tone} label={`Illustration of ${tone} coins`}>
      {coin(230, 118, 62)}{coin(410, 118, 62)}{coin(320, 108, 78, text)}
    </Frame>
  );
}

export function RingArt() {
  const t = GOLD;
  return (
    <Frame id="ring" tone="gold" label="Illustration of a gold ring set with a diamond">
      <ellipse cx="320" cy="138" rx="78" ry="56" fill="none" stroke="url(#ring-m)" strokeWidth="16" />
      <path d="M296 70h48l14 16-38 40-38-40z" fill="#eef6fb" stroke="#9fb7c6" strokeWidth="2" />
      <path d="M282 86h76M296 70l12 16 12-16 12 16 12-16M308 86l12 40 12-40" fill="none" stroke="#9fb7c6" strokeWidth="1.5" />
      <path d="M288 92l10 14M352 92l-10 14" stroke={t.c} strokeWidth="5" strokeLinecap="round" />
    </Frame>
  );
}

export function JewelleryArt({ tone = "gold" }: { tone?: Tone }) {
  const id = `jw-${tone}`;
  return (
    <Frame id={id} tone={tone} label={`Illustration of a ${tone} chain and ring`}>
      <g fill="none" stroke={`url(#${id}-m)`} strokeWidth="7">
        {Array.from({ length: 11 }, (_, i) => <ellipse key={i} cx={120 + i * 30} cy={i % 2 ? 96 : 104} rx="20" ry="11" transform={`rotate(${i % 2 ? 18 : -18} ${120 + i * 30} 100)`} />)}
        <circle cx="500" cy="118" r="44" strokeWidth="13" />
      </g>
    </Frame>
  );
}
