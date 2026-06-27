"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

const AUTOPLAY = 5000;

const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 80, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 80, scale: 0.97 }),
};

const content: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  exit: { opacity: 0 },
};
const item: Variants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

export default function Projects() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const n = projects.length;
  const project = projects[index];

  const paginate = (d: number) =>
    setState(([i]) => [(i + d + n) % n, d]);
  const goTo = (i: number) =>
    setState(([cur]) => [i, i > cur ? 1 : -1]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setState(([i]) => [(i + 1) % n, 1]), AUTOPLAY);
    return () => clearInterval(t);
  }, [paused, n, index]);

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        index="03"
        label="Selected work"
        title="Projects that ship & win"
        subtitle="Award-winning, production-grade AI products — each solving a real problem end to end."
        align="left"
      />

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative mt-14"
      >
        {/* stage */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60">
          {/* accent glow follows the active project */}
          <motion.div
            key={`glow-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            className="pointer-events-none absolute -inset-px -z-10 rounded-3xl blur-2xl"
            style={{
              background: `radial-gradient(60% 70% at 30% 0%, ${project.accent}, transparent)`,
            }}
          />

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              {/* image with slow Ken Burns drift */}
              <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[460px]">
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: [1.04, 1.14] }}
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/20 to-transparent lg:bg-gradient-to-r" />

                <div className="absolute right-4 top-4 flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white hover:text-black"
                    >
                      <FiGithub size={17} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live site`}
                      className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white hover:text-black"
                    >
                      <FiExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>

              {/* content */}
              <motion.div
                variants={content}
                className="relative flex flex-col justify-center p-7 sm:p-10"
              >
                <motion.span
                  variants={item}
                  className="font-display text-6xl font-bold text-white/[0.06]"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <motion.h3
                  variants={item}
                  className="mt-1 font-display text-3xl font-semibold text-white sm:text-4xl"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  variants={item}
                  className="mt-2 text-xs font-medium uppercase tracking-wider text-silver-500"
                >
                  {project.stack}
                </motion.p>
                <motion.p
                  variants={item}
                  className="mt-4 max-w-lg leading-relaxed text-silver-300"
                >
                  {project.description}
                </motion.p>
                <motion.ul variants={item} className="mt-4 space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm text-silver-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-silver-gradient" />
                      {h}
                    </li>
                  ))}
                </motion.ul>
                <motion.div variants={item} className="mt-7 flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
                    >
                      <FiGithub /> Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-silver-gradient px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
                    >
                      <FiExternalLink /> Live Demo
                      <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* slow auto-progress bar */}
          {!paused && (
            <motion.div
              key={`bar-${index}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTOPLAY / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-silver-gradient"
            />
          )}
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous project"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-silver-200 transition-all hover:-translate-x-0.5 hover:border-white/30 hover:text-white"
          >
            <FiChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => goTo(i)}
                aria-label={`Go to ${p.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-silver-gradient"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next project"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-silver-200 transition-all hover:translate-x-0.5 hover:border-white/30 hover:text-white"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
