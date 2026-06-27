"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";

/* ----------------------------- typewriter ----------------------------- */
const LINES = [
  'const developer = "Yadava H C";',
  "developer.turn(ideas).into(products);",
  "// let's build something great →",
];

function Typewriter() {
  const [line, setLine] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = LINES[line];
    let delay = deleting ? 35 : 60;

    if (!deleting && text === full) {
      delay = 1600; // pause at end of line
    } else if (deleting && text === "") {
      setDeleting(false);
      setLine((l) => (l + 1) % LINES.length);
      delay = 300;
    }

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else
        setText((cur) =>
          deleting ? full.slice(0, cur.length - 1) : full.slice(0, cur.length + 1)
        );
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, line]);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="glass-strong overflow-hidden rounded-2xl">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-rose-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-300/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-[11px] tracking-wide text-silver-500">
            yadava@portfolio: ~
          </span>
        </div>
        {/* body */}
        <div className="px-4 py-4 font-mono text-sm">
          <span className="text-silver-500">$ </span>
          <span className="text-silver-100">{text}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-0.5 inline-block h-4 w-[2px] -translate-y-[1px] bg-silver-gradient align-middle"
          />
        </div>
      </div>
    </div>
  );
}

/* --------------------------- drifting tokens --------------------------- */
const TOKENS = [
  { c: "</>", top: "12%", left: "8%", d: 0, dur: 9 },
  { c: "{ }", top: "62%", left: "14%", d: 1.5, dur: 11 },
  { c: "( ) =>", top: "26%", left: "82%", d: 0.8, dur: 10 },
  { c: ";", top: "70%", left: "88%", d: 2.2, dur: 8 },
  { c: "#", top: "44%", left: "4%", d: 1.1, dur: 12 },
  { c: "< />", top: "18%", left: "60%", d: 2.6, dur: 10 },
];

function CodeTokens() {
  return (
    <>
      {TOKENS.map((t, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute select-none font-mono text-lg text-silver-400/20"
          style={{ top: t.top, left: t.left }}
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: t.dur, delay: t.d, repeat: Infinity, ease: "easeInOut" }}
        >
          {t.c}
        </motion.span>
      ))}
    </>
  );
}

/* ------------------------------- stars -------------------------------- */
const STARS = Array.from({ length: 14 }, (_, i) => ({
  top: `${(i * 37) % 95}%`,
  left: `${(i * 53 + 7) % 96}%`,
  d: (i % 5) * 0.6,
  s: 1 + (i % 3),
}));

function Stars() {
  return (
    <>
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white"
          style={{ top: s.top, left: s.left, width: s.s, height: s.s }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 2.4, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

/* --------------------------- paper plane loop ------------------------- */
function PaperPlane() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-1/2 z-10 text-silver-200"
      initial={{ x: "-10vw", y: 40, opacity: 0, rotate: -18 }}
      animate={{
        x: ["-10vw", "55vw", "112vw"],
        y: [40, -60, -150],
        opacity: [0, 1, 0],
        rotate: [-18, -26, -34],
      }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
    >
      <span className="relative">
        {/* dashed trail */}
        <span className="absolute right-full top-1/2 mr-2 h-px w-24 -translate-y-1/2 bg-gradient-to-l from-silver-300/60 to-transparent [mask-image:repeating-linear-gradient(90deg,#000_0_4px,transparent_4px_8px)]" />
        <FiSend size={26} className="drop-shadow-[0_0_10px_rgba(210,210,216,0.5)]" />
      </span>
    </motion.div>
  );
}

/* ----------------------------- watermark ------------------------------ */
function Watermark() {
  const letters = "YADAVA".split("");
  return (
    <h3 className="flex select-none justify-center leading-none">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="silver-text-shimmer font-display text-[18vw] font-bold"
          style={{ animationDelay: `${i * 0.25}s` }}
        >
          {ch}
        </motion.span>
      ))}
    </h3>
  );
}

export default function FooterScene() {
  return (
    <div className="relative mt-20 overflow-hidden pb-2">
      <Stars />
      <CodeTokens />
      <PaperPlane />

      {/* coding terminal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 px-5"
      >
        <Typewriter />
      </motion.div>

      {/* animated giant name */}
      <div className="relative mt-12">
        <Watermark />
        {/* soft reflection glow under the name */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>
    </div>
  );
}
