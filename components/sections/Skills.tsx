"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { skillGroups } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SkillIcon from "@/components/ui/SkillIcon";

// A continuously scrolling marquee row of skill chips.
function MarqueeRow({
  skills,
  reverse,
}: {
  skills: { name: string; icon: string }[];
  reverse?: boolean;
}) {
  const doubled = [...skills, ...skills];
  return (
    <div className="group relative flex overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={`flex shrink-0 gap-3 pr-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-silver-200 transition-colors hover:border-white/30 hover:text-white"
          >
            <SkillIcon name={s.icon} className="text-lg" />
            <span className="text-sm font-medium">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const allSkills = skillGroups.flatMap((g) => g.skills);
  const half = Math.ceil(allSkills.length / 2);

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Capabilities"
          title="Technical skills & stack"
          subtitle="A versatile toolkit spanning languages, full-stack frameworks, cloud, and core CS fundamentals."
          align="left"
        />
      </div>

      {/* marquee rows */}
      <div className="mt-12 space-y-3">
        <MarqueeRow skills={allSkills.slice(0, half)} />
        <MarqueeRow skills={allSkills.slice(half)} reverse />
      </div>

      {/* interactive category explorer */}
      <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-8 flex flex-wrap gap-2">
            {skillGroups.map((g, i) => (
              <button
                key={g.category}
                onClick={() => setActive(i)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === i
                    ? "text-black"
                    : "text-silver-300 hover:text-white"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-silver-gradient"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative font-medium">{g.category}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          key={active}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {skillGroups[active].skills.map((s) => (
            <motion.div
              key={s.name}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -6 }}
              className="group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 text-center"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(210,210,216,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <SkillIcon
                name={s.icon}
                className="text-4xl text-silver-200 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
              />
              <span className="text-xs font-medium text-silver-300 transition-colors group-hover:text-white sm:text-sm">
                {s.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
