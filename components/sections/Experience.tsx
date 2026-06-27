"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { FiExternalLink, FiBriefcase } from "react-icons/fi";
import { experiences, type Experience as Exp } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

function ExperienceItem({ exp, index }: { exp: Exp; index: number }) {
  const left = index % 2 === 0;

  // Card "unfolds" in 3D from its own side of the timeline.
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      x: left ? -70 : 70,
      rotateY: left ? 22 : -22,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const bullet: Variants = {
    hidden: { opacity: 0, x: -14 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      className={`relative flex sm:items-center ${
        left ? "sm:justify-start" : "sm:justify-end"
      }`}
      style={{ perspective: 1200 }}
    >
      {/* pulsing timeline node */}
      <span className="absolute left-[15px] top-3 z-10 grid -translate-x-1/2 place-items-center sm:left-1/2">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.9, 0.6], opacity: [0, 0.35, 0] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
          className="absolute h-5 w-5 rounded-full bg-silver-300/40"
        />
        <span className="h-4 w-4 rounded-full border border-white/30 bg-black" />
        <span className="absolute h-2 w-2 rounded-full bg-silver-gradient" />
      </span>

      {/* slow, gentle floating drift */}
      <div
        className="ml-8 w-full animate-float sm:ml-0 sm:w-[46%]"
        style={{ animationDuration: "8s", animationDelay: `${index * 1.6}s` }}
      >
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -6 }}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative w-full"
      >
        {/* animated accent glow on hover */}
        <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-white/15 to-transparent opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />

        <div className="glass overflow-hidden rounded-2xl p-6 transition-colors duration-300 group-hover:border-white/20">
          {/* header row */}
          <div className="flex items-start gap-4">
            {/* rotating company monogram */}
            <motion.span
              initial={{ rotate: -90, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-silver-gradient font-display text-lg font-bold text-black"
            >
              {exp.company.charAt(0)}
            </motion.span>

            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 text-silver-400">
                <FiBriefcase className="text-xs" />
                <span className="text-[11px] font-medium uppercase tracking-wider">
                  {exp.period}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-semibold text-white">
                  {exp.company}
                </h3>
                {exp.website && (
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${exp.company} website`}
                    className="text-silver-400 transition-colors hover:text-white"
                  >
                    <FiExternalLink size={15} />
                  </a>
                )}
              </div>
              <p className="mt-0.5 text-sm font-medium text-silver-300">
                {exp.role}
              </p>
            </div>
          </div>

          {/* staggered bullets */}
          <ul className="mt-5 space-y-2.5">
            {exp.points.map((p) => (
              <motion.li
                key={p}
                variants={bullet}
                className="flex gap-2.5 text-sm leading-relaxed text-silver-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-silver-gradient" />
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          label="Career"
          title="Experience & impact"
          subtitle="Hands-on full-stack work across product teams and social-impact organizations."
        />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-0">
          {/* timeline track */}
          <div className="absolute left-[15px] top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[15px] top-0 w-px bg-gradient-to-b from-white via-silver-300 to-transparent sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <ExperienceItem key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
