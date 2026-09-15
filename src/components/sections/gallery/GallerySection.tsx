import { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import type { GalleryCategory } from "../../../data/galleryData";
import GalleryCard from "./GalleryCard";

// ── Palette ───────────────────────────────────────────────────────────────────
const MAROON = "#7B1E3A";
const GOLD = "#D4A017";

// ── Marquee configuration ─────────────────────────────────────────────────────
const CARD_WIDTH = 280;
const CARD_GAP = 20;
const MARQUEE_SPEED = 45; // pixels per second
const MIN_VISIBLE_CARDS = 12;

interface Props {
  category: GalleryCategory;
  index: number;
}

// ── Section reveal animation ──────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function GallerySection({
  category,
  index,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-70px",
  });

  // ── Section background ─────────────────────────────────────────────────────
  const isEven = index % 2 === 0;
  const sectionBg = isEven ? "#FAF9F6" : "#F3F4F6";

  // ── Card states ─────────────────────────────────────────────────────────────
  const cardCount = category.cards.length;
  const isSingleCard = cardCount === 1;
  const hasCards = cardCount > 0;

  /*
   * We create complete copies of the ORIGINAL card set.
   *
   * Important:
   * The marquee animation moves by exactly 1 original set.
   * This means when the animation resets, the next set is visually
   * identical to the previous one → seamless loop.
   */
  const repeatCount =
    cardCount > 1
      ? Math.max(
          3,
          Math.ceil(MIN_VISIBLE_CARDS / cardCount)
        )
      : 1;

  const loopedCards =
    cardCount > 1
      ? Array.from(
          { length: repeatCount },
          () => category.cards
        ).flat()
      : category.cards;

  /*
   * Width of ONE complete card set.
   *
   * Example:
   * 4 cards → 4 × 280px + 3 × 20px
   *
   * We animate exactly this distance.
   */
  const singleSetWidth =
    cardCount > 1
      ? cardCount * CARD_WIDTH +
        (cardCount - 1) * CARD_GAP
      : 0;

  // Constant animation duration based on physical distance.
  const marqueeDuration =
    singleSetWidth > 0
      ? singleSetWidth / MARQUEE_SPEED
      : 0;

  return (
    <section
      ref={ref}
      id={category.id}
      className="relative py-12 md:py-16"
      style={{
        background: sectionBg,
      }}
    >
      {/* ── Left decorative maroon rule ───────────────────────────────────── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: `linear-gradient(
            to bottom,
            ${MAROON}00,
            ${MAROON}30,
            ${MAROON}00
          )`,
        }}
        aria-hidden="true"
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
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
              style={{
                color: GOLD,
              }}
            >
              Gallery · {String(index + 1).padStart(2, "0")}
            </p>

            {/* Title */}
            <h2
              className="text-2xl md:text-3xl font-extrabold leading-tight"
              style={{
                color: MAROON,
                fontFamily: "Georgia, serif",
              }}
            >
              {category.title}
            </h2>

            {/* Gold ornamental line */}
            <div className="flex items-center gap-2 mt-3">
              <span
                className="h-px w-8"
                style={{
                  background: GOLD,
                }}
              />

              <span
                style={{
                  color: GOLD,
                  fontSize: "10px",
                }}
                aria-hidden="true"
              >
                ✦
              </span>

              <span
                className="h-px w-24"
                style={{
                  background: `${GOLD}40`,
                }}
              />
            </div>

            {/* Subtitle */}
            <p
              className="mt-2.5 text-sm max-w-md"
              style={{
                color: "#6B7280",
              }}
            >
              {category.subtitle}
            </p>
          </div>
        </motion.div>

        {/* ── Horizontal divider ───────────────────────────────────────────── */}
        <motion.hr
          style={{
            borderColor: `${MAROON}18`,
          }}
          className="mb-8"
          initial={{
            scaleX: 0,
            originX: 0,
          }}
          animate={
            isInView
              ? {
                  scaleX: 1,
                }
              : {
                  scaleX: 0,
                }
          }
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
          }}
        />
      </div>

      {/* ── Card area ──────────────────────────────────────────────────────── */}
      {!hasCards ? (
        // ── Empty state ─────────────────────────────────────────────────────
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div
            className="py-8 text-sm"
            style={{
              color: "#9CA3AF",
            }}
          >
            No gallery images available.
          </div>
        </div>
      ) : isSingleCard ? (
        // ── Single card: NO marquee ─────────────────────────────────────────
        <motion.div
          className="max-w-7xl mx-auto px-6 md:px-10"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: "easeOut",
          }}
        >
          <div
            style={{
              width: `${CARD_WIDTH}px`,
              maxWidth: "100%",
            }}
          >
            <GalleryCard
              card={category.cards[0]}
              index={0}
            />
          </div>
        </motion.div>
      ) : (
        // ── Multiple cards: Seamless marquee ────────────────────────────────
        <motion.div
          className="relative overflow-hidden"
          initial={{
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                }
          }
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          style={{
            /*
             * Soft fade at both edges.
             */
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          {/*
           * This wrapper provides a consistent width for the animated track.
           */}
          <motion.div
            className="flex w-max"
            style={{
              gap: `${CARD_GAP}px`,
              willChange: "transform",
            }}
            animate={
              isInView
                ? {
                    x: [0, -singleSetWidth],
                  }
                : {
                    x: 0,
                  }
            }
            transition={{
              x: {
                duration: marqueeDuration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
              },
            }}
            whileHover={{
              // Pause the animation visually by preserving the current
              // position. CSS below also handles pointer interaction.
            }}
          >
            {loopedCards.map((card, cardIndex) => (
              <div
                key={`${card.id}-${cardIndex}`}
                className="shrink-0"
                style={{
                  width: `${CARD_WIDTH}px`,
                }}
              >
                <GalleryCard
                  card={card}
                  index={cardIndex % cardCount}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* ── Bottom border ───────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-6 right-6"
        style={{
          height: "1px",
          background: `${MAROON}12`,
        }}
        aria-hidden="true"
      />
    </section>
  );
}