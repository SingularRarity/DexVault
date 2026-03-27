"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-6 border-b border-ink/10 max-w-7xl mx-auto w-full sticky top-0 z-50 parchment-grain backdrop-blur-sm">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-sanguine">
            deployed_code
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            DexVault
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <Link
            href="/marketplace"
            className="hover:text-sanguine transition-colors"
          >
            Marketplace
          </Link>
          <Link
            href="/escrow"
            className="hover:text-sanguine transition-colors"
          >
            Escrow
          </Link>
          <Link
            href="/profile"
            className="hover:text-sanguine transition-colors"
          >
            Profile
          </Link>
          <Link href="/docs" className="hover:text-sanguine transition-colors">
            Docs
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <ConnectButton />
      </div>
    </header>
  );
}
