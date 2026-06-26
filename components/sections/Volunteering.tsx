"use client";

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { volunteering } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Volunteering() {
  return (
    <section
      id="volunteering"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        index="08"
        label="Beyond code"
        title="Volunteering & community"
        subtitle="Giving back through education, mentorship, entrepreneurship, and culture."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {volunteering.map((v, i) => (
          <Reveal key={v.org} delay={(i % 2) * 0.08} className="h-full">
            <div className="group flex h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
              <div className="relative w-2/5 shrink-0 overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.org}
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-800/80" />
              </div>
              <div className="flex-1 p-5">
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-silver-400">
                  <FiHeart className="text-rose-300/80" /> {v.role}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {v.org}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {v.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2 text-sm leading-snug text-silver-300"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-silver-gradient" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
