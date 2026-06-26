"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { TbFlag, TbTrophy } from "react-icons/tb";
import { dsaJourney, dsaTotal } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SkillIcon from "@/components/ui/SkillIcon";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to, mv]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function DsaJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 70%"],
  });
  const pathFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="dsa"
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        index="06"
        label="Problem solving"
        title="The DSA roadmap"
        subtitle="A consistent climb across platforms — strengthening data structures, algorithms and competitive problem solving."
      />

      {/* Total counter banner */}
      <Reveal>
        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-2 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent px-8 py-8 text-center">
          <span className="section-label">Total problems conquered</span>
          <div className="font-display text-6xl font-bold silver-text sm:text-7xl">
            <CountUp to={dsaTotal} suffix="+" />
          </div>
          <p className="text-sm text-silver-400">
            and counting — across TUF, GeeksforGeeks &amp; LeetCode
          </p>
        </div>
      </Reveal>

      {/* Roadmap */}
      <div ref={ref} className="relative mx-auto mt-20 max-w-4xl">
        {/* start flag */}
        <div className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-silver-200">
            <TbFlag /> Start
          </span>
        </div>

        {/* vertical track */}
        <div className="absolute left-1/2 top-16 h-[calc(100%-9rem)] w-[3px] -translate-x-1/2 rounded-full bg-white/10" />
        <motion.div
          style={{ height: pathFill }}
          className="absolute left-1/2 top-16 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-silver-300 to-silver-500"
        />

        <div className="space-y-12">
          {dsaJourney.map((node, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={node.platform}
                className={`relative flex flex-col items-center sm:flex-row ${
                  left ? "sm:justify-start" : "sm:justify-end"
                }`}
              >
                {/* milestone node on the line */}
                <span className="absolute left-1/2 top-6 z-10 grid -translate-x-1/2 place-items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black">
                    <SkillIcon
                      name={node.icon}
                      className="text-2xl text-silver-100"
                    />
                  </span>
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute -z-10 h-12 w-12 rounded-full bg-[radial-gradient(circle,rgba(210,210,216,0.4),transparent_70%)] blur-md"
                  />
                </span>

                <Reveal delay={i * 0.05} className="w-full pt-20 sm:w-[45%] sm:pt-0">
                  <a
                    href={node.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/5">
                      <Image
                        src={node.image}
                        alt={node.platform}
                        fill
                        sizes="(max-width:768px) 100vw, 400px"
                        className="object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-800 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {node.platform}
                        </h3>
                        <FiExternalLink className="text-silver-400 transition-colors group-hover:text-white" />
                      </div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="font-display text-4xl font-bold silver-text">
                          <CountUp to={node.count} suffix="+" />
                        </span>
                        <span className="text-sm text-silver-400">solved</span>
                      </div>
                      {/* progress bar */}
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.min(100, (node.count / 130) * 100)}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-silver-gradient"
                        />
                      </div>
                      <p className="mt-3 text-sm leading-snug text-silver-300">
                        {node.note}
                      </p>
                    </div>
                  </a>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* finish trophy */}
        <div className="mt-14 flex justify-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-silver-gradient px-5 py-2.5 text-sm font-semibold text-black"
          >
            <TbTrophy /> Levelling up, every single day
          </motion.span>
        </div>
      </div>
    </section>
  );
}
