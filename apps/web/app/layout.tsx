import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "DexVault — Trade hardware with unbreakable trust",
  description:
    "The open-source marketplace for GPU and CPU hardware. Secured by smart contracts, verified on-chain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="parchment-grain font-display text-primary min-h-screen selection:bg-sanguine/30">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
