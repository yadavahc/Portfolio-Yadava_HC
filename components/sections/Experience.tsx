"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiExternalLink, FiBriefcase } from "react-icons/fi";
import { experiences } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

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
          {/* center line (desktop) / left line (mobile) */}
          <div className="absolute left-[15px] top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[15px] top-0 w-px bg-gradient-to-b from-white via-silver-300 to-transparent sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={exp.company}
                  className={`relative flex sm:items-center ${
                    left ? "sm:justify-start" : "sm:justify-end"
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-[15px] top-2 z-10 grid -translate-x-1/2 place-items-center sm:left-1/2">
                    <span className="h-4 w-4 rounded-full border border-white/30 bg-black" />
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="absolute h-2 w-2 rounded-full bg-silver-gradient"
                    />
                  </span>

                  <Reveal
                    delay={i * 0.05}
                    className={`w-full sm:w-[46%] ${left ? "" : ""}`}
                  >
                    <div className="group glass ml-8 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 sm:ml-0">
                      <div className="mb-3 flex items-center gap-2 text-silver-400">
                        <FiBriefcase />
                        <span className="text-xs font-medium uppercase tracking-wider">
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
                      <ul className="mt-4 space-y-2">
                        {exp.points.map((p) => (
                          <li
                            key={p}
                            className="flex gap-2.5 text-sm leading-relaxed text-silver-300"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-silver-gradient" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
