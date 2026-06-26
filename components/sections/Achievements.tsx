"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiAward, FiStar } from "react-icons/fi";
import { achievements, achievementBadges } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

function Card({
  item,
}: {
  item: { title: string; detail: string; image: string };
}) {
  return (
    <div className="group relative w-[300px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 sm:w-[360px]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="360px"
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-silver-200 backdrop-blur">
          <FiAward className="text-amber-200/90" /> Achievement
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-lg font-semibold text-white">
          {item.title}
        </h3>
        <p className="mt-1 text-sm leading-snug text-silver-300">
          {item.detail}
        </p>
      </div>
    </div>
  );
}

export default function Achievements() {
  const doubled = [...achievements, ...achievements];

  return (
    <section
      id="achievements"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          label="Recognition"
          title="Achievements & wins"
          subtitle="National hackathons, awards, and competitions — proof of consistent, high-impact building."
        />
      </div>

      {/* infinite marquee gallery */}
      <div className="group relative mt-14 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-5 pr-5 group-hover:[animation-play-state:paused]">
          {doubled.map((a, i) => (
            <Card key={`${a.title}-${i}`} item={a} />
          ))}
        </div>
      </div>

      {/* text-only honors */}
      <div className="mx-auto mt-12 max-w-4xl px-5 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {achievementBadges.map((b, i) => (
            <Reveal key={b} delay={i * 0.08}>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-silver-gradient text-black">
                  <FiStar size={15} />
                </span>
                <p className="text-sm leading-snug text-silver-200">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
