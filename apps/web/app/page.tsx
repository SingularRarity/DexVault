"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ProductViewer } from "@/components/product-viewer";

const stats = [
  { value: "₹4.2Cr", label: "Transacted" },
  { value: "247", label: "Sellers Trusted" },
  { value: "89", label: "Active Listings" },
];

const steps = [
  {
    n: "1",
    title: "Review",
    desc: "Verify hardware specs and seller on-chain reputation score before committing.",
  },
  {
    n: "2",
    title: "Pay",
    desc: "Funds held in Castler escrow. No risk of rug-pulls or scams.",
  },
  {
    n: "3",
    title: "Confirm",
    desc: "Once delivered and verified, funds release to the seller automatically.",
  },
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Hero left */}
        <section className="lg:col-span-7 flex flex-col justify-center gap-8">
          <div className="relative">
            <span className="marginalia absolute -top-8 left-0 uppercase tracking-widest">
              Codex DV-01 // Secure Protocol
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-8xl font-bold leading-[0.9] text-primary"
            >
              Trade hardware with{" "}
              <span className="text-sanguine">zero risk</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg max-w-md text-ink leading-relaxed"
          >
            The open-source marketplace for GPU and CPU hardware. Secured by
            smart contracts, verified by the community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link
              href="/marketplace/new"
              className="bg-sanguine text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all relative group"
            >
              List Your Hardware
              <div className="absolute -bottom-2 left-2 right-2 h-[2px] bg-ink opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/marketplace"
              className="border-2 border-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary hover:text-parchment transition-all"
            >
              Explore Marketplace
            </Link>
          </motion.div>
        </section>

        {/* Hero right – 3D viewer */}
        <section className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full"
          >
            <ProductViewer />
          </motion.div>
          <div className="absolute bottom-4 -right-4 p-4 bg-parchment chalk-border max-w-[180px]">
            <p className="marginalia">
              &ldquo;GPU tested, on-chain verified.&rdquo;
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="lg:col-span-12 py-12 border-y border-ink/10 flex flex-wrap justify-between items-center gap-8 font-mono">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-4xl font-bold text-primary"
              >
                {s.value}
              </motion.span>
              <span className="text-sm uppercase tracking-tighter text-ink/60">
                {s.label}
              </span>
            </div>
          ))}
          <div className="hidden lg:block italic text-sanguine text-sm max-w-xs">
            *Verified through on-chain reputation scores and DexVaultReputation.sol
          </div>
        </section>

        {/* How it works */}
        <section className="lg:col-span-12 py-16">
          <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
            <span className="material-symbols-outlined text-sanguine">
              history_edu
            </span>
            How it Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="flex flex-col gap-4 relative"
              >
                <div className="w-12 h-12 rounded-full border-2 border-sanguine flex items-center justify-center font-bold text-sanguine bg-white">
                  {step.n}
                </div>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <p className="text-ink/80 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="h-[2px] bg-ink/20 absolute top-6 left-12 right-0 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
