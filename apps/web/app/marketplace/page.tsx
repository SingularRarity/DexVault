"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

type Category = "all" | "gpu" | "cpu";

interface Listing {
  id: number;
  title: string;
  model_name: string;
  category: string;
  price: number;
  seller_address: string;
  status: string;
}

// Placeholder cards for the UI shell
const PLACEHOLDER_LISTINGS: Listing[] = [
  {
    id: 1,
    title: "RTX 4090 Founders Edition",
    model_name: "RTX 4090",
    category: "gpu",
    price: 120000,
    seller_address: "0x742d35Cc6634C0532925a3b8D4C3f58bDbf1F4C",
    status: "active",
  },
  {
    id: 2,
    title: "AMD RX 7900 XTX",
    model_name: "RX 7900 XTX",
    category: "gpu",
    price: 75000,
    seller_address: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    status: "active",
  },
  {
    id: 3,
    title: "Intel Core i9-13900K",
    model_name: "i9-13900K",
    category: "cpu",
    price: 45000,
    seller_address: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    status: "active",
  },
];

function shortenAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function MarketplacePage() {
  const [category, setCategory] = useState<Category>("all");

  const filtered =
    category === "all"
      ? PLACEHOLDER_LISTINGS
      : PLACEHOLDER_LISTINGS.filter((l) => l.category === category);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="marginalia uppercase tracking-widest">
              Codex MKT-01 // Hardware Exchange
            </span>
            <h1 className="text-4xl font-bold text-primary mt-2">
              Marketplace
            </h1>
          </div>

          <Link
            href="/marketplace/new"
            className="bg-sanguine text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:shadow-xl transition-all"
          >
            + List Hardware
          </Link>
        </div>

        {/* Category filter */}
        <div className="flex gap-4 mb-8 font-mono text-sm uppercase tracking-widest">
          {(["all", "gpu", "cpu"] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded border-2 transition-all ${
                category === c
                  ? "border-primary bg-primary text-parchment"
                  : "border-ink/20 hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Listing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="chalk-border p-4 bg-white/50 flex flex-col gap-4 relative group"
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-sanguine text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                  {listing.category}
                </span>
              </div>

              <div className="w-full aspect-[4/3] overflow-hidden rounded hatching flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-primary/30">
                  {listing.category === "gpu" ? "memory" : "developer_board"}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-lg">{listing.title}</h5>
                  <p className="text-sm text-ink/60">
                    {shortenAddress(listing.seller_address)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="font-mono text-xl font-bold text-primary">
                  ₹{listing.price.toLocaleString("en-IN")}
                </span>
                <Link
                  href={`/marketplace/${listing.id}`}
                  className="bg-primary text-parchment px-4 py-2 rounded text-sm font-bold hover:bg-primary/90 transition-all"
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
