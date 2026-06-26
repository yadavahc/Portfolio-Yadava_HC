"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Props = {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  index,
  label,
  title,
  subtitle,
  align = "center",
}: Props) {
  const alignCls =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignCls} max-w-3xl gap-4`}>
      <Reveal>
        <span className="section-label">
          <span className="text-silver-500">{index}</span>
          <span className="h-px w-8 bg-silver-500/60" />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          {title.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06 }}
            >
              {word === "—" ? (
                word
              ) : (
                <span className={i % 2 === 1 ? "silver-text" : ""}>{word}</span>
              )}
              &nbsp;
            </motion.span>
          ))}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="max-w-2xl text-base leading-relaxed text-silver-400 sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
