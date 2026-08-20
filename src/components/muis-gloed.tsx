"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/components/ui";

/**
 * Volgt de muisaanwijzer en zet de positie als CSS-variabelen op het element.
 *
 * De opmaak gebeurt volledig in CSS (zie `.gloed` in globals.css), zodat er bij
 * het bewegen niets opnieuw hoeft te renderen. De positie wordt hoogstens één
 * keer per beeldverversing bijgewerkt.
 *
 * Werkt alleen op apparaten met een echte aanwijzer; op touch blijft het vlak
 * onveranderd. Dat is bewust: een gloed die bij een tik blijft hangen leest als
 * een fout, niet als een effect.
 */
export function Gloed({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const gepland = useRef(false);

  const opBeweging = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || gepland.current) return;
    gepland.current = true;
    const { clientX, clientY } = e;

    requestAnimationFrame(() => {
      gepland.current = false;
      const el = ref.current;
      if (!el) return;
      const vlak = el.getBoundingClientRect();
      el.style.setProperty("--muis-x", `${clientX - vlak.left}px`);
      el.style.setProperty("--muis-y", `${clientY - vlak.top}px`);
    });
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLElement>}
      onPointerMove={opBeweging}
      className={cn("gloed", className)}
    >
      {children}
    </Tag>
  );
}
