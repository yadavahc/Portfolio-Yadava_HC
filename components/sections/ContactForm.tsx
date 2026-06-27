"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { profile } from "@/data/portfolio";

type Status = "idle" | "loading" | "success" | "error";

const RAW_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "").trim();
// Treat the placeholder / empty value as "not configured yet".
const ACCESS_KEY = RAW_KEY.startsWith("YOUR_") ? "" : RAW_KEY;

const fieldBase =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-11 py-3.5 text-sm text-white placeholder:text-silver-500 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill hidden fields; humans don't.
    if ((data.get("botcheck") as string)?.length) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError(
        "Form isn't configured yet. Please email me directly at " +
          profile.email +
          "."
      );
      return;
    }

    setStatus("loading");
    setError("");

    const payload = {
      access_key: ACCESS_KEY,
      subject: `Portfolio message from ${data.get("name")}`,
      from_name: "Yadava H C — Portfolio",
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(json.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't send your message. Please try again."
      );
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass-strong mx-auto mt-12 w-full max-w-2xl rounded-3xl p-6 text-left sm:p-8"
    >
      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          icon={<FiUser />}
          name="name"
          type="text"
          placeholder="Full name"
          required
          autoComplete="name"
        />
        <Field
          icon={<FiMail />}
          name="email"
          type="email"
          placeholder="Email address"
          required
          autoComplete="email"
        />
      </div>

      <div className="mt-4">
        <Field
          icon={<FiPhone />}
          name="phone"
          type="tel"
          placeholder="Phone number (optional)"
          autoComplete="tel"
        />
      </div>

      <div className="relative mt-4">
        <span className="pointer-events-none absolute left-4 top-4 text-silver-500">
          <FiMessageSquare />
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Your message…"
          className={`${fieldBase} resize-none`}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-silver-gradient px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <FiLoader className="animate-spin" /> Sending…
            </>
          ) : status === "success" ? (
            <>
              <FiCheckCircle /> Message sent
            </>
          ) : (
            <>
              <FiSend className="transition-transform group-hover:translate-x-0.5" />{" "}
              Send message
            </>
          )}
        </button>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 text-sm text-emerald-300"
            >
              <FiCheckCircle /> Thanks! I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 text-sm text-rose-300"
            >
              <FiAlertCircle /> {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}

function Field({
  icon,
  ...props
}: {
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-silver-500">
        {icon}
      </span>
      <input {...props} className={fieldBase} />
    </div>
  );
}
