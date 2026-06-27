"use client";

import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { TbCode } from "react-icons/tb";
import { profile, socials } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const links = [
  { label: "GitHub", href: socials.github, icon: FiGithub },
  { label: "LinkedIn", href: socials.linkedin, icon: FiLinkedin },
  { label: "LeetCode", href: socials.leetcode, icon: SiLeetcode },
  { label: "GeeksforGeeks", href: socials.gfg, icon: SiGeeksforgeeks },
  { label: "TakeUForward", href: socials.tuf, icon: TbCode },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] bg-ink-900/60 pt-24 sm:pt-32"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,200,210,0.12),transparent_65%)] blur-2xl" />

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="section-label justify-center">
            <span className="text-silver-500">09</span>
            <span className="h-px w-8 bg-silver-500/60" />
            Contact
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Let&apos;s build something{" "}
            <span className="silver-text">remarkable</span> together.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-base text-silver-300 sm:text-lg">
            Open to internships, full-time roles, and ambitious collaborations.
            Drop a message.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={socials.email}
              className="group inline-flex items-center gap-2 rounded-full bg-silver-gradient px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
            >
              <FiMail /> {profile.email}
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
            >
              <FiPhone /> {profile.phone}
            </a>
          </div>
        </Reveal>

        {/* contact meta */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-silver-400">
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              </span>
          </div>
        </Reveal>

        {/* social grid */}
        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm text-silver-300 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
              >
                <Icon className="text-base" />
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* giant watermark name */}
      <div className="relative mt-20 select-none overflow-hidden">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-center font-display text-[18vw] font-bold leading-none text-transparent"
        >
          YADAVA
        </motion.h3>
      </div>

      <footer className="border-t border-white/[0.06]"><center>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-7 text-sm text-silver-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Yadava H C. All rights reserved.</p>
        </div></center>
      </footer>
    </section>
  );
}
