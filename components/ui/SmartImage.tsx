"use client";

import { useState } from "react";

/**
 * <img> with lazy loading, a graceful fallback when the file is missing, and
 * an "Illustration" label until the image is replaced with real photography.
 */
export function SmartImage({
  src,
  alt,
  className = "",
  illustration = true,
  priority = false,
  tagPosition = "top-3 left-3",
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  illustration?: boolean;
  priority?: boolean;
  tagPosition?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      {failed ? (
        <span role="img" aria-label={alt} className={`grid place-items-center bg-[radial-gradient(circle_at_50%_40%,#2a2216,#0e0e0c)] ${className}`}>
          <span className="font-serif text-2xl text-gold/50">HT</span>
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={className}
        />
      )}
      {illustration && <span className={`illustration-tag ${tagPosition}`}>Illustration</span>}
    </>
  );
}
