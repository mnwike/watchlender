// Licensed stock photography (iStock standard licence, web-size copies only).
const ALT: Record<string, string> = {
  home: "Close-up of a man's wrist wearing a rose gold watch with a blue dial",
  sell: "A buyer in white gloves examining a steel watch at a desk",
  valuation: "Gloved hands inspecting a gold watch with a loupe",
  guides: "A watch with a tan leather strap in its presentation box",
  london: "Aerial view of the London skyline and the Thames at sunrise",
  borrow: "A man choosing a watch from a watch box",
  list: "Watches on display stands on a jeweller's counter",
};

export type ImageKey = "home" | "sell" | "valuation" | "guides" | "london" | "borrow" | "list";

export default function PageImage({ name, className = "page-image", priority = false, position }: { name: ImageKey; className?: string; priority?: boolean; position?: string }) {
  return (
    <img
      className={className}
      src={`/images/${name}.jpg`}
      srcSet={`/images/${name}-800.jpg 800w, /images/${name}.jpg 1600w`}
      sizes="(max-width: 820px) 100vw, 1140px"
      alt={ALT[name]}
      width={1600}
      height={1067}
      loading={priority ? "eager" : "lazy"}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
