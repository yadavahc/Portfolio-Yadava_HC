"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(srx, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(sry, [-0.5, 0.5], ["-9deg", "9deg"]);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rx.set((e.clientY - rect.top) / rect.height - 0.5);
    ry.set((e.clientX - rect.left) / rect.width - 0.5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="perspective group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60"
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"
          style={{
            background: `radial-gradient(60% 60% at 50% 0%, ${project.accent}, transparent)`,
          }}
        />

        {/* image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/30 to-transparent" />

          {/* top-right action icons */}
          <div
            className="absolute right-4 top-4 flex gap-2"
            style={{ transform: "translateZ(40px)" }}
          >
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
        <div className="p-6" style={{ transform: "translateZ(24px)" }}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold text-white">
              {project.title}
            </h3>
            <FiArrowUpRight className="mt-1 shrink-0 text-silver-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
          <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-silver-500">
            {project.stack}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-silver-300">
            {project.description}
          </p>

          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-2 text-sm text-silver-300"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-silver-gradient" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
              >
                <FiGithub /> Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-silver-gradient px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
              >
                <FiExternalLink /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        index="03"
        label="Selected work"
        title="Projects that ship & win"
        subtitle="Award-winning, production-grade AI products — each solving a real problem end to end."
        align="left"
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
