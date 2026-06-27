"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiMongodb,
} from "react-icons/si";
import type { IconType } from "react-icons";

/* token colors (muted, theme-friendly) */
const kw = "text-[#a7b0d0]";
const str = "text-[#b6cdb6]";
const prop = "text-silver-100";
const fn = "text-[#d8cda8]";
const pn = "text-silver-500";

type Tok = { t: string; c?: string };

// The code, broken into colored tokens. "\n" tokens start a new line.
const TOKENS: Tok[] = [
  { t: "const", c: kw }, { t: " " }, { t: "dev", c: prop }, { t: " = {", c: pn }, { t: "\n" },
  { t: "  " }, { t: "name", c: prop }, { t: ": ", c: pn }, { t: '"Yadava H C"', c: str }, { t: ",", c: pn }, { t: "\n" },
  { t: "  " }, { t: "role", c: prop }, { t: ": ", c: pn }, { t: '"Full-Stack Dev"', c: str }, { t: ",", c: pn }, { t: "\n" },
  { t: "  " }, { t: "stack", c: prop }, { t: ": [", c: pn }, { t: '"Next.js"', c: str }, { t: ", ", c: pn }, { t: '"AI"', c: str }, { t: "],", c: pn }, { t: "\n" },
  { t: "  " }, { t: "focus", c: prop }, { t: ": ", c: pn }, { t: '"AI products"', c: str }, { t: ",", c: pn }, { t: "\n" },
  { t: "};", c: pn }, { t: "\n" },
  { t: "\n" },
  { t: "dev", c: prop }, { t: ".", c: pn }, { t: "build", c: fn }, { t: "();", c: pn }, { t: "  // shipping…", c: pn },
];

const FULL_LEN = TOKENS.reduce((a, t) => a + t.t.length, 0);

function TypeCode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < FULL_LEN) {
      const t = setTimeout(() => setCount((c) => c + 1), 42);
      return () => clearTimeout(t);
    }
    // finished — hold, then restart the typing loop
    const t = setTimeout(() => setCount(0), 4500);
    return () => clearTimeout(t);
  }, [count]);

  // build the revealed, colored output up to `count` characters
  let remaining = count;
  let typed = "";
  const out: React.ReactNode[] = [];
  for (let i = 0; i < TOKENS.length && remaining > 0; i++) {
    const tok = TOKENS[i];
    const slice = tok.t.slice(0, remaining);
    typed += slice;
    out.push(
      tok.t === "\n" ? (
        <br key={i} />
      ) : (
        <span key={i} className={tok.c}>
          {slice}
        </span>
      )
    );
    remaining -= tok.t.length;
  }

  const lineCount = typed.split("\n").length;

  return (
    <div className="relative flex gap-3 bg-ink-900 p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
      {/* gutter */}
      <div className="flex flex-col text-right text-silver-600">
        {Array.from({ length: lineCount }).map((_, i) => (
          <span key={i} className="w-3 select-none">
            {i + 1}
          </span>
        ))}
      </div>
      {/* code */}
      <div className="whitespace-pre-wrap break-words">
        {out}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-silver-gradient"
        />
      </div>

      {/* scanline */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-white/[0.06] to-transparent"
        animate={{ y: ["-10%", "120%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

type Orbit = { Icon: IconType; cls: string; style: React.CSSProperties; dur: number; delay: number };
const orbiters: Orbit[] = [
  { Icon: SiReact, cls: "text-[#bcdfe6]", style: { top: "2%", left: "6%" }, dur: 6, delay: 0 },
  { Icon: SiNextdotjs, cls: "text-white", style: { top: "8%", right: "4%" }, dur: 7, delay: 0.6 },
  { Icon: SiNodedotjs, cls: "text-[#cfe0c0]", style: { top: "44%", left: "-2%" }, dur: 6.5, delay: 1.1 },
  { Icon: SiPython, cls: "text-[#d8d2b0]", style: { bottom: "26%", right: "-2%" }, dur: 7.5, delay: 0.3 },
  { Icon: SiJavascript, cls: "text-[#e0d8a8]", style: { bottom: "8%", left: "8%" }, dur: 6.8, delay: 1.4 },
  { Icon: SiMongodb, cls: "text-[#c6e0c2]", style: { top: "30%", right: "8%" }, dur: 8, delay: 0.9 },
];

export default function CodingScene() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(200,200,210,0.14),transparent_60%)] blur-2xl" />

      {/* floating tech-stack icons */}
      {orbiters.map(({ Icon, cls, style, dur, delay }, i) => (
        <motion.span
          key={i}
          className="absolute z-30 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-ink-800/70 backdrop-blur"
          style={style}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 1 + i * 0.12, duration: 0.5 },
            scale: { delay: 1 + i * 0.12, type: "spring", stiffness: 200 },
            y: { duration: dur, delay, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon className={`text-xl ${cls}`} />
        </motion.span>
      ))}

      {/* ---------------- realistic 3D laptop ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[92%] max-w-[24rem]"
        style={{ perspective: "1100px" }}
      >
        <div style={{ transformStyle: "preserve-3d", transform: "rotateX(6deg)" }}>
          {/* screen / lid */}
          <div className="relative rounded-[14px] border border-white/15 bg-gradient-to-b from-[#1a1a1f] to-[#0c0c10] p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="mx-auto mb-1 h-1 w-1 rounded-full bg-white/25" />
            {/* display */}
            <div className="relative overflow-hidden rounded-[8px] border border-black/60 bg-ink-900">
              <div className="flex items-center gap-2 border-b border-white/10 bg-ink-800/80 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-[10px] text-silver-500">developer.ts</span>
              </div>
              {/* min height so the box doesn't jump while typing */}
              <div className="min-h-[148px]">
                <TypeCode />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07]" />
            </div>
          </div>

          {/* keyboard base laid flat in perspective */}
          <div
            className="relative mx-auto"
            style={{ transformOrigin: "center top", transform: "rotateX(46deg)" }}
          >
            <div className="mx-auto h-24 w-[112%] -translate-x-[5.4%] rounded-b-[16px] rounded-t-[6px] border border-white/10 bg-gradient-to-b from-[#23232a] via-[#17171c] to-[#0e0e12] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="space-y-[5px]">
                {[11, 11, 10, 8].map((cols, r) => (
                  <div
                    key={r}
                    className="mx-auto flex justify-center gap-[5px]"
                    style={{ width: `${92 - r * 4}%` }}
                  >
                    {Array.from({ length: cols }).map((_, c) => (
                      <motion.span
                        key={c}
                        className="h-3 flex-1 rounded-[3px] bg-white/[0.08] shadow-[inset_0_-1px_0_rgba(0,0,0,0.4)]"
                        animate={{
                          backgroundColor: [
                            "rgba(255,255,255,0.08)",
                            "rgba(255,255,255,0.28)",
                            "rgba(255,255,255,0.08)",
                          ],
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          repeatDelay: 1.4,
                          delay: ((r * 11 + c) % 9) * 0.16,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-2 h-4 w-1/3 rounded-md border border-white/5 bg-white/[0.04]" />
            </div>
          </div>
        </div>

        {/* desk shadow */}
        <div className="mx-auto mt-2 h-7 w-[78%] rounded-[100%] bg-black/70 blur-lg" />
      </motion.div>
    </div>
  );
}
