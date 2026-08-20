"use client";

import { useState } from "react";
import { ReviewCard } from "@/components/sections";
import type { Review } from "@/lib/site";

const INITIAL = 9;
const STEP = 9;

/**
 * Toont eerst de beste reviews; de rest staat wél in de HTML (goed voor Google)
 * maar is verborgen tot de bezoeker op "Toon meer" klikt.
 */
export function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  const [visible, setVisible] = useState(INITIAL);
  const remaining = reviews.length - visible;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <div key={`${review.name}-${i}`} className={i < visible ? "h-full" : "hidden"}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(v + STEP, reviews.length))}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-transparent px-6 py-3.5 text-base font-semibold text-ink transition-all duration-150 hover:-translate-y-0.5 hover:border-ink"
          >
            Toon meer reviews
            <span className="text-muted">({remaining})</span>
          </button>
        </div>
      )}
    </>
  );
}
