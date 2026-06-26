"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowDownRight,
} from "react-icons/fi";
import { profile, socials } from "@/data/portfolio";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="silver-text-shimmer inline-block font-semibold"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  // Layered parallax depths
  const imgX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const imgY = useTransform(sy, [-0.5, 0.5], [18, -18]);
  const textX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const textY = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(sx, [-0.5, 0.5], [40, -40]);
  const glowY = useTransform(sy, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set(e.clientX / w - 0.5);
      my.set(e.clientY / h - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* gradient vignettes to blend scene + content */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-black to-transparent" />

      {/* moving glow following cursor */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,180,190,0.10),transparent_60%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pt-20">
        {/* ---------------- Text column ---------------- */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="order-2 lg:order-1 lg:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-silver-300 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            Available for opportunities · {profile.location}
          </motion.div>

          <h1 className="font-display text-[2.7rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="block"
            >
              Hi, I&apos;m{" "}
              <span className="silver-text">{profile.firstName}</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-1 block text-3xl sm:text-5xl lg:text-6xl"
            >
              <RoleRotator />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-silver-gradient px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.04] active:scale-95"
            >
              View my work
              <FiArrowDownRight className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.07]"
            >
              Get in touch
            </a>
          </motion.div>

          {/* socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-8 flex items-center gap-3"
          >
            {[
              { href: socials.github, icon: FiGithub, label: "GitHub" },
              { href: socials.linkedin, icon: FiLinkedin, label: "LinkedIn" },
              { href: socials.email, icon: FiMail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-silver-300 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------------- Profile image column (right, blended) ---------------- */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[22rem] w-[18rem] sm:h-[28rem] sm:w-[23rem] lg:h-[34rem] lg:w-[27rem]"
          >
            {/* rotating metallic rings */}
            <div className="absolute inset-0 -z-10 animate-spin-slow rounded-full border border-white/[0.06]" />
            <div
              className="absolute inset-6 -z-10 rounded-full border border-white/[0.05]"
              style={{ animation: "spin 30s linear infinite reverse" }}
            />
            {/* radial backlight */}
            <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(200,200,210,0.18),transparent_60%)] blur-2xl" />

            {/* the blended image: grayscale, masked into the dark theme */}
            <div className="group relative h-full w-full">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 27rem"
                className="select-none object-cover object-top grayscale contrast-[1.08] brightness-[0.92] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 [mask-image:radial-gradient(ellipse_75%_85%_at_50%_42%,#000_55%,transparent_92%)]"
              />
              {/* metallic duotone overlays for blending into theme */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 [mask-image:radial-gradient(ellipse_75%_85%_at_50%_42%,#000_55%,transparent_92%)]" />
              <div className="pointer-events-none absolute inset-0 mix-blend-overlay [mask-image:radial-gradient(ellipse_75%_85%_at_50%_42%,#000_55%,transparent_92%)] bg-[linear-gradient(135deg,rgba(190,190,200,0.25),transparent_40%,rgba(120,120,130,0.2))]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* floating stat chips */}
            <FloatingChip
              className="-left-4 top-10 sm:-left-8"
              value={profile.resumeHighlights[0].value}
              label={profile.resumeHighlights[0].label}
              delay={1.1}
            />
            <FloatingChip
              className="-right-2 bottom-24 sm:-right-6"
              value={profile.resumeHighlights[2].value}
              label="DSA Solved"
              delay={1.3}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-silver-500 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-8 w-5 justify-center rounded-full border border-silver-500/50">
          <motion.span
            animate={{ y: [3, 12, 3], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="mt-1.5 h-1.5 w-1 rounded-full bg-silver-300"
          />
        </span>
      </motion.a>
    </section>
  );
}

function FloatingChip({
  className,
  value,
  label,
  delay,
}: {
  className?: string;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`glass-strong absolute z-20 flex animate-float flex-col rounded-2xl px-4 py-2.5 shadow-xl shadow-black/40 ${className}`}
    >
      <span className="font-display text-xl font-bold silver-text">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-silver-400">
        {label}
      </span>
    </motion.div>
  );
}
