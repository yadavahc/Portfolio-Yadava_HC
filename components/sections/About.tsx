"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiAward } from "react-icons/fi";
import { TbSchool } from "react-icons/tb";
import { about, profile } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        index="01"
        label="About"
        title="The developer behind the work"
        align="left"
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Intro + stats */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-lg leading-relaxed text-silver-200">
              {about.intro}
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {profile.resumeHighlights.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div className="glass group rounded-2xl p-4 transition-colors hover:border-white/20">
                  <div className="font-display text-3xl font-bold silver-text">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-silver-400">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education timeline with scroll-progress line */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="mb-7 flex items-center gap-3 text-silver-300">
              <TbSchool className="text-xl" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Education
              </span>
            </div>
          </Reveal>

          <div className="relative pl-8">
            {/* track */}
            <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-white/10" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-white via-silver-300 to-transparent"
            />

            <div className="space-y-8">
              {about.education.map((ed, i) => (
                <Reveal key={ed.school} delay={i * 0.1}>
                  <div className="group relative">
                    {/* node */}
                    <span className="absolute -left-[34px] top-1.5 grid h-4 w-4 place-items-center">
                      <span className="h-4 w-4 rounded-full border border-white/30 bg-black" />
                      <span className="absolute h-1.5 w-1.5 rounded-full bg-silver-gradient transition-all group-hover:scale-150" />
                    </span>

                    <div className="glass rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/20">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {ed.school}
                        </h3>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-silver-300">
                          {ed.duration}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-silver-300">{ed.degree}</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                        <FiAward className="text-silver-300" />
                        {ed.score}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
