"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { certificates } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Certificates() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardW, setCardW] = useState(320);
  const wrapRef = useRef<HTMLDivElement>(null);
  const n = certificates.length;

  // Responsive card width.
  useEffect(() => {
    const measure = () => {
      const w = wrapRef.current?.offsetWidth ?? 1000;
      setCardW(Math.max(240, Math.min(360, w * 0.7)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-advance through the cards.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 3000);
    return () => clearInterval(t);
  }, [paused, n]);

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  // shortest signed distance from active (so it wraps both ways)
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const spacing = cardW * 0.62;

  return (
    <section
      id="certificates"
      className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="07"
          label="Credentials"
          title="Certifications earned"
          subtitle="Verified credentials across cloud, generative AI, and core web technologies."
        />
      </div>

      {/* coverflow stage */}
      <div
        ref={wrapRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative mx-auto mt-16 flex h-[420px] max-w-6xl items-center justify-center px-4 sm:h-[460px]"
        style={{ perspective: "1600px" }}
      >
        {certificates.map((cert, i) => {
          const off = offsetOf(i);
          const isActive = off === 0;
          const hidden = Math.abs(off) > 2;
          return (
            <motion.article
              key={cert.title + i}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-3xl border border-white/10 bg-ink-800/80 shadow-2xl shadow-black/50"
              style={{ width: cardW, transformStyle: "preserve-3d" }}
              animate={{
                x: off * spacing - cardW / 2,
                y: "-50%",
                rotateY: off * -34,
                scale: isActive ? 1 : 0.82,
                opacity: hidden ? 0 : isActive ? 1 : 0.55,
                zIndex: 50 - Math.abs(off),
                filter: isActive ? "blur(0px)" : "blur(2px)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
              onClick={() => !isActive && setActive(i)}
            >
              {/* image */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-black">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="360px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-silver-200 backdrop-blur">
                  <TbCertificate /> {cert.issuer}
                </span>
                {/* sheen sweep on the active card */}
                {isActive && (
                  <motion.span
                    className="pointer-events-none absolute inset-0"
                    initial={{ x: "-120%" }}
                    animate={{ x: "120%" }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
                    }}
                  />
                )}
              </div>

              {/* content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-white">
                  {cert.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-snug text-silver-400">
                  {cert.skills}
                </p>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={isActive ? 0 : -1}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
                  >
                    <FiExternalLink /> View Certificate
                  </a>
                ) : (
                  <span className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-silver-500">
                    Credential earned
                  </span>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* controls */}
      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous certificate"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-silver-200 transition-all hover:-translate-x-0.5 hover:border-white/30 hover:text-white"
        >
          <FiChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {certificates.map((c, i) => (
            <button
              key={c.title + i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${c.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 bg-silver-gradient"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next certificate"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-silver-200 transition-all hover:translate-x-0.5 hover:border-white/30 hover:text-white"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
