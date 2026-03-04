"use client";
import React, { useState } from "react";
import { QuoteModal } from "@/components/QuoteModal";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import logoAnimation from "@/public/Logos/hourglasslogo-animate.json";

const QUICK_QUOTE_QR_SRC = "/QR-WA.jpg?v=2";
const QUICK_QUOTE_QR_VALUE =
  "https://wa.me/918939000230?text=Hi%20Ellora%20Press%2C%20I%20need%20a%20quick%20quote.";

const suggestions = [
  "Packaging recommendations by budget",
  "Paper stock and finish guidance",
  "Color matching and proofing workflow",
  "Lead time for bulk production",
  "Technical publication print specs",
  "Sampling and quality control process",
];

const contactFaqs = [
  {
    question: "What is your minimum order quantity (MOQ)?",
    answer:
      "MOQ depends on product type and finishing. Share your specs and we will suggest the most cost-efficient run size for offset production.",
  },
  {
    question: "Can you match exact brand colors (Pantone)?",
    answer:
      "Yes. We support Pantone-based color control and production checks to keep brand consistency across repeat runs.",
  },
  {
    question: "Do you provide samples before full production?",
    answer:
      "Yes. We can arrange design proofs and physical sample checks before bulk print, especially for packaging and technical publications.",
  },
  {
    question: "How quickly can you deliver bulk orders?",
    answer:
      "Turnaround depends on quantity, substrate, and finishing. We will give a realistic production and dispatch timeline after reviewing your brief.",
  },
  {
    question: "Can you handle confidential print projects?",
    answer:
      "Yes. We support NDA-based workflows for sensitive product launches, manuals, and internal publication jobs.",
  },
  {
    question: "Do you support technical publication projects?",
    answer:
      "Yes. We handle high-volume manuals and technical documentation with controlled pagination, binding accuracy, and quality checks.",
  },
];

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
    website: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formFeedback, setFormFeedback] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
    if (formStatus !== "idle") {
      setFormStatus("idle");
      setFormFeedback("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === "submitting") return;

    setFormStatus("submitting");
    setFormFeedback("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          result && typeof result.error === "string"
            ? result.error
            : "Unable to send right now. Please try again.";
        setFormStatus("error");
        setFormFeedback(message);
        return;
      }

      if (result && result.message === "Request accepted.") {
        setFormStatus("error");
        setFormFeedback("Please retry once after clearing autofill. If it still fails, contact us directly.");
        return;
      }

      setFormStatus("success");
      setFormFeedback("Message sent. We will get back to you shortly.");
      setFormValues({
        fullName: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
        website: "",
      });
    } catch {
      setFormStatus("error");
      setFormFeedback("Unable to send right now. Please try again.");
    }
  };

  return (
    <main className="bg-background text-foreground transition-colors duration-500 selection:bg-foreground selection:text-background">
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section className="px-6 pb-6 pt-32 md:px-14 lg:min-h-screen lg:pt-40">
        <div className="mx-auto flex h-full max-w-6xl flex-col">
          <div className="mb-10 flex flex-col gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-500">
                Contact // 04
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                Send Us A Message
              </h1>
              <p className="mt-2 max-w-xl text-base text-neutral-600 dark:text-neutral-400">
                Tell us what you need and we will map the right print workflow, timeline, and quality path for your project.
              </p>
            </div>
          </div>

          <div className="relative left-1/2 h-px w-screen -translate-x-1/2 bg-black/10 dark:bg-white/10" />

          <div className="mt-10 grid flex-1 gap-5 [--contact-cards-h:38rem] lg:h-[var(--contact-cards-h)] lg:grid-cols-3 lg:items-stretch">
            <div className="flex flex-col gap-5 lg:col-span-1 lg:h-full">
            <div className="rounded-[2rem] border border-black/10 bg-white/60 p-5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/50 md:p-6 lg:min-h-0 lg:flex-1">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">What You Can Ask</h2>
                <ul className="mt-3 grid gap-2">
                  {suggestions.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-black/10 bg-white/70 px-3 py-1 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white/60 p-5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/50 md:p-6 lg:min-h-0 lg:flex-1">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Contact Information</h2>
                <div className="mt-3 space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                  <p className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    19, Mayor Chittibabu St, Triplicane, Chennai
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0" />
                    solutions@ellorapress.com
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0" />
                    +91 89390 00230
                  </p>
                </div>

                <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
                  <div className="mt-1 flex items-center gap-4">
                    <a
                      href={QUICK_QUOTE_QR_VALUE}
                      aria-label="Open WhatsApp quick quote"
                      className="rounded-xl border border-white/10 bg-white p-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={QUICK_QUOTE_QR_SRC}
                        alt="Tap for a Quick Quote QR"
                        width={80}
                        height={80}
                        sizes="80px"
                        unoptimized
                        className="h-20 w-20 object-contain"
                      />
                    </a>
                    <p className="max-w-[8rem] text-sm leading-tight text-neutral-500">
                      Tap for a
                      <br />
                      Quick Quote
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-black/10 bg-white/60 p-5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/50 md:p-10 lg:col-span-2 lg:h-full">
              <form
                className="flex h-full flex-col gap-5"
                onSubmit={handleSubmit}
                aria-busy={formStatus === "submitting"}
              >
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-2xl">
                    Project Details
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Share your requirements and we will respond with the right production plan.
                  </p>
                </div>

                <input
                  type="text"
                  name="company_code"
                  value={formValues.website}
                  onChange={(event) =>
                    setFormValues((previous) => ({ ...previous, website: event.target.value }))
                  }
                  autoComplete="new-password"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden opacity-0"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-3">
                    <span className="relative -top-1 -right-2 text-sm text-neutral-700 dark:text-neutral-300">Full Name</span>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Your name"
                      value={formValues.fullName}
                      onChange={handleInputChange}
                      autoComplete="name"
                      required
                      className="h-12 w-full rounded-xl border border-black/10 bg-white/60 px-4 text-sm text-neutral-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </label>
                  <label className="space-y-3">
                    <span className="relative -top-1 -right-2 text-sm text-neutral-700 dark:text-neutral-300">Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formValues.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      inputMode="email"
                      required
                      className="h-12 w-full rounded-xl border border-black/10 bg-white/60 px-4 text-sm text-neutral-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-3">
                    <span className="relative -top-1 -right-2 text-sm text-neutral-700 dark:text-neutral-300">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91"
                      value={formValues.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                      inputMode="tel"
                      className="h-12 w-full rounded-xl border border-black/10 bg-white/60 px-4 text-sm text-neutral-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </label>
                  <label className="space-y-3">
                    <span className="relative -top-1 -right-2 text-sm text-neutral-700 dark:text-neutral-300">Project Type</span>
                    <input
                      type="text"
                      name="projectType"
                      placeholder="Brochure / Carton / Manual..."
                      value={formValues.projectType}
                      onChange={handleInputChange}
                      className="h-12 w-full rounded-xl border border-black/10 bg-white/60 px-4 text-sm text-neutral-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </label>
                </div>

                <label className="space-y-3">
                  <span className="relative -top-1 -right-2 text-sm text-neutral-700 dark:text-neutral-300">Message</span>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Share quantity, size, timeline, and any special print requirements."
                    value={formValues.message}
                    onChange={handleInputChange}
                    aria-describedby={formFeedback ? "contact-form-feedback" : undefined}
                    required
                    className="w-full resize-none rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </label>

                <div className="mt-auto">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="h-11 w-full rounded-xl border border-black/15 bg-neutral-900 px-6 text-sm font-semibold tracking-wide text-white transition hover:bg-neutral-800 dark:border-white/15"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                  {formFeedback ? (
                    <p
                      id="contact-form-feedback"
                      role={formStatus === "error" ? "alert" : "status"}
                      aria-live={formStatus === "error" ? "assertive" : "polite"}
                      className={`mt-2 text-sm ${
                        formStatus === "success"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {formFeedback}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>

          <div className="relative left-1/2 mt-10 h-px w-screen -translate-x-1/2 bg-black/10 dark:bg-white/10" />
          
        </div>
      </section>

      <section className="px-6 pb-16 pt-6 md:px-14 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-500">Support // FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
            Contact FAQs
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
            Quick answers for common offset printing, packaging, and technical publication questions.
          </p>

          <div className="mt-8 border-t border-black/10 dark:border-white/10">
            {contactFaqs.map((faq, index) => (
              <div
                key={faq.question}
                className="grid gap-3 border-b border-black/10 py-5 dark:border-white/10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white md:text-lg">
                    {faq.question}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-[15px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 md:px-14">
        <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-black/10 bg-white/60 px-5 py-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/50 md:px-7 md:py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-neutral-900 dark:text-white">
              <span className="relative h-9 w-9 overflow-hidden">
                <Lottie
                  animationData={logoAnimation}
                  loop
                  className="absolute inset-0 scale-[1.45]"
                />
              </span>
              <span className="text-xl font-bold tracking-tighter">Ellora</span>
              <span className="text-xl tracking-tighter">Press</span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <Link href="/about" className="transition hover:text-neutral-900 dark:hover:text-white">
                About
              </Link>
              <Link href="/products" className="transition hover:text-neutral-900 dark:hover:text-white">
                Products
              </Link>
              <Link href="/contact" className="transition hover:text-neutral-900 dark:hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-3 border-t border-black/10 pt-3 dark:border-white/10">
            <p className="text-xs text-neutral-500">© 2026 Ellora Press. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
