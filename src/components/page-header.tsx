import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-sand">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-3 text-[clamp(2.25rem,4.6vw,3.5rem)] text-ink">{title}</h1>
          {intro && <p className="mt-5 text-[clamp(1.05rem,1.6vw,1.25rem)] text-ink-soft">{intro}</p>}
          {children && <div className="mt-7 flex flex-wrap gap-3.5">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
