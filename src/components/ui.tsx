import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Star } from "@/components/icons";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>{children}</div>
  );
}

type ButtonVariant = "primary" | "ghost" | "white";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-green text-white hover:bg-green-deep",
  ghost: "bg-transparent text-ink border border-line hover:border-ink",
  white: "bg-white text-green-deep hover:bg-sand",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-base px-6 py-3.5 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2";

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={cn(buttonBase, buttonStyles[variant], className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(buttonBase, buttonStyles[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "text-[13px] font-semibold uppercase tracking-[0.12em] text-green",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        center && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3.5 text-[clamp(1.9rem,3.6vw,2.875rem)] text-ink">{title}</h2>
      {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
    </div>
  );
}

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-label={`${count} van de 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-[18px] w-[18px]", i < count ? "text-gold" : "text-sand-2")} />
      ))}
    </span>
  );
}

/**
 * Kruimelpad boven een programmapagina.
 *
 * Doet twee dingen tegelijk: de bezoeker kan terug naar het overzicht, en elke
 * programmapagina verwijst zo aantoonbaar terug naar de homepage.
 */
export function Kruimelpad({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Kruimelpad" className="mb-6 text-[14px] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-green hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-soft">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
