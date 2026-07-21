import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import type { GalleryCategory } from "../../../data/galleryData";
import GalleryCard from "./GalleryCard";

// ── Palette ───────────────────────────────────────────────────────────────────
const MAROON = "#7B1E3A";
const GOLD   = "#D4A017";

interface Props {
  category: GalleryCategory;
  index: number;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// Ensure we have enough duplicate sets for a seamless loop even with few cards (e.g. 2 cards)
// Minimum 12 cards total ensures it covers most ultra-wide screens.
const MIN_CARDS_TOTAL = 12;

export default function GallerySection({ category, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-70px" });

  // Alternate section backgrounds for visual rhythm
  const isEven = index % 2 === 0;
  const sectionBg = isEven ? "#FAF9F6" : "#F3F4F6";

  // Dynamic loop calculation: Ensure at least MIN_CARDS_TOTAL for a seamless loop
  const LOOP_SETS = Math.max(3, Math.ceil(MIN_CARDS_TOTAL / Math.max(1, category.cards.length)));

  // Duplicate cards for a seamless infinite loop
  const loopedCards = Array.from({ length: LOOP_SETS }, () => category.cards).flat();

  // Scroll direction alternates per section for visual variety
  const scrollDirection = isEven ? "marquee-ltr" : "marquee-rtl";

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16"
      id={category.id}
      style={{ background: sectionBg }}
    >
      {/* ── Left maroon rule (decorative) ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: `linear-gradient(to bottom, ${MAROON}00, ${MAROON}30, ${MAROON}00)` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-8"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div>
            {/* Index label */}
            <p
              className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
              style={{ color: GOLD }}
            >
              Gallery · {String(index + 1).padStart(2, "0")}
            </p>

            {/* Title */}
            <h2
              className="text-2xl md:text-3xl font-extrabold leading-tight"
              style={{ color: MAROON, fontFamily: "Georgia, serif" }}
            >
              {category.title}
            </h2>

            {/* Gold ornamental line */}
            <div className="flex items-center gap-2 mt-3">
              <span className="h-px w-8" style={{ background: GOLD }} />
              <span style={{ color: GOLD, fontSize: "10px" }}>✦</span>
              <span className="h-px w-24" style={{ background: `${GOLD}40` }} />
            </div>

            {/* Subtitle */}
            <p className="mt-2.5 text-sm max-w-md" style={{ color: "#6B7280" }}>
              {category.subtitle}
            </p>
          </div>
        </motion.div>

        {/* ── Horizontal rule ────────────────────────────────────────────── */}
        <motion.hr
          style={{ borderColor: `${MAROON}18` }}
          className="mb-8"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      {/* ── Infinite scrolling marquee ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative overflow-hidden"
        style={{
          /* Fade edges for a polished look */
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className={`flex gap-5 ${scrollDirection}`}
          style={{ width: "max-content" }}
        >
          {loopedCards.map((card, i) => (
            <div
              key={`${card.id}-${i}`}
              style={{ width: "280px", flexShrink: 0 }}
            >
              <GalleryCard card={card} index={i % category.cards.length} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom border ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-6 right-6"
        style={{ height: "1px", background: `${MAROON}12` }}
        aria-hidden="true"
      />

      {/* ── Keyframe styles injected locally ────────────────────────────── */}
      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${100 / LOOP_SETS}%); }
        }
        @keyframes marquee-rtl {
          0%   { transform: translateX(-${100 / LOOP_SETS}%); }
          100% { transform: translateX(0); }
        }
        .marquee-ltr {
          animation: marquee-ltr ${category.cards.length * 4}s linear infinite;
        }
        .marquee-rtl {
          animation: marquee-rtl ${category.cards.length * 4}s linear infinite;
        }

      `}</style>
    </section>
  );
}
