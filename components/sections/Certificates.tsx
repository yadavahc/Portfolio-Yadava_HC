"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { certificates } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="07"
          label="Credentials"
          title="Certifications earned"
          subtitle="Verified credentials across cloud, generative AI, and core web technologies."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title + i} delay={(i % 3) * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-black">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-800/90 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-silver-200 backdrop-blur">
                    <TbCertificate /> {cert.issuer}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-snug text-silver-400">
                    {cert.skills}
                  </p>

                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
                    >
                      <FiExternalLink /> View Certificate
                    </a>
                  ) : (
                    <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-silver-500">
                      Credential earned
                    </span>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
