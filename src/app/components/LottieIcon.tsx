"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

type LottieIconProps = {
  src: string;
  label: string;
  respectReducedMotion?: boolean;
};

export function LottieIcon({
  src,
  label,
  respectReducedMotion = true,
}: LottieIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let animation: AnimationItem | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let cancelled = false;

    const initLottie = async () => {
      try {
        const [lottieModule, animationData] = await Promise.all([
          import("lottie-web"),
          fetch(src, { cache: "force-cache" }).then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch animation: ${response.status}`);
            }
            return response.json();
          }),
        ]);
        const lottie = lottieModule.default || lottieModule;

        if (cancelled || !containerRef.current) {
          return;
        }

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: !respectReducedMotion || !prefersReducedMotion,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: false,
          },
        });

        if (respectReducedMotion && prefersReducedMotion) {
          animation.goToAndStop(15, true);
        }

        // Guard against the container having zero width/height at mount
        // (e.g. mobile sections briefly hidden via CSS during layout) by
        // forcing a resize once real dimensions are available.
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
              animation?.resize();
            }
          });
          resizeObserver.observe(containerRef.current);
        }
      } catch (err) {
        console.error("Failed to load lottie animation:", err);
        if (containerRef.current) {
          containerRef.current.dataset.error = "true";
        }
      }
    };

    initLottie();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      if (animation) {
        animation.destroy();
      }
    };
  }, [respectReducedMotion, src]);

  return (
    <div
      ref={containerRef}
      className="lottie-icon"
      aria-label={label}
      role="img"
    />
  );
}
