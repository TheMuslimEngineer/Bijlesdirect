import Link from "next/link";
import Image from "next/image";
import brandIcon from "../../public/brand-icon.png";
import { cn } from "@/components/ui";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Bijlesdirect — naar de homepage"
      className={cn("flex items-center gap-2.5", className)}
    >
      <Image
        src={brandIcon}
        alt=""
        width={44}
        height={42}
        priority
        className="h-9 w-auto"
      />
      <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">
        Bijlesdirect
      </span>
    </Link>
  );
}
