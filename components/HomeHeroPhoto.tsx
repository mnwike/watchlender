"use client";

import { useState } from "react";

/**
 * Switches to the owner's supplied homepage image as soon as it is present at
 * /public/images/watchlender-homepage-hero.jpg. Until then, show the existing
 * attributed Rolex photo rather than an empty/broken hero.
 */
export default function HomeHeroPhoto() {
  const [fallback, setFallback] = useState(false);
  return (
    <div className="hero-art" style={{ flexDirection: "column", alignItems: "center", gap: 8 }}>
      <img
        src={fallback ? "/watch-photos/rolex-submariner.jpg" : "/images/watchlender-homepage-hero.jpg"}
        alt={fallback
          ? "Illustrative Rolex Submariner photograph"
          : "Luxury stainless-steel diving watch in a pale watch presentation box"}
        className="hero-photo"
        width={1600}
        height={1009}
        fetchPriority="high"
        style={{
          objectFit: fallback ? "contain" : "cover",
          objectPosition: "center",
          backgroundColor: "#f1efe7",
        }}
        onError={() => { if (!fallback) setFallback(true); }}
      />
      {fallback && (
        <small style={{ fontSize: ".72rem", color: "#d7e4dc" }}>
          Rolex Submariner photograph:{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Rolex-Submariner.jpg"
            style={{ color: "#e9dcbc" }} rel="noopener noreferrer" target="_blank">
            FrankWilliams
          </a>
          {" · "}Public domain
        </small>
      )}
    </div>
  );
}
