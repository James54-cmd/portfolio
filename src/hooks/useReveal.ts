"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Reliable IntersectionObserver: callback ref ensures we observe after mount.
 */
export function useReveal(threshold = 0.15) {
  const [node, setNode] = useState<Element | null>(null);
  const [visible, setVisible] = useState(false);

  const ref = useCallback((el: Element | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [node, threshold]);

  return [ref, visible] as const;
}
