import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsappIcon from "../components/ui/WhatsappIcon";
import GalleryHero from "../components/sections/gallery/GalleryHero";
import GallerySection from "../components/sections/gallery/GallerySection";
import GalleryNav from "../components/sections/gallery/GalleryNav";
import { galleryCategories } from "../data/galleryData";

// ── Palette ────────────────────────────────────────────────────────────────────
const MAROON = "#7B1E3A";
const GOLD   = "#D4A017";

export default function GalleryPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    galleryCategories[0].id
  );

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // ── Smooth-scroll to section on nav click ──────────────────────────
  const handleNavSelect = useCallback((id: string) => {
    setActiveCategoryId(id);
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // ── Intersection observer — keep nav pill in sync with scroll ──────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    galleryCategories.forEach((cat) => {
      const el = sectionRefs.current[cat.id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategoryId(cat.id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Handle reaching the bottom of the page ─────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      // If we are at the very bottom of the page (within 10px to account for rounding)
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setActiveCategoryId(galleryCategories[galleryCategories.length - 1].id);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      <main style={{ background: "#FAF9F6" }}>
        {/* Hero */}
        <GalleryHero />

        {/* Sticky category nav */}
        <GalleryNav
          activeCategoryId={activeCategoryId}
          onSelect={handleNavSelect}
        />

        {/* All gallery category sections */}
        {galleryCategories.map((category, i) => (
          <div
            key={category.id}
            ref={(el) => { sectionRefs.current[category.id] = el; }}
          >
            <GallerySection category={category} index={i} />
          </div>
        ))}

        {/* ── Footer CTA ─────────────────────────────────────────────────── */}
        <motion.div
          className="relative py-16 text-center overflow-hidden"
          style={{ background: MAROON }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Subtle diagonal stripe overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                #fff 0px, #fff 1px,
                transparent 1px, transparent 22px
              )`,
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto px-6">
            {/* Gold ornament */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10" style={{ background: GOLD }} />
              <span style={{ color: GOLD }}>✦</span>
              <span className="h-px w-10" style={{ background: GOLD }} />
            </div>

            <h3
              className="text-2xl md:text-3xl font-extrabold text-white mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              More memories are being made every day.
            </h3>
            <p className="text-sm md:text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
              Stay tuned as we continue to capture the spirit of our campus
              through every event, milestone, and moment.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
      <WhatsappIcon />
    </>
  );
}
