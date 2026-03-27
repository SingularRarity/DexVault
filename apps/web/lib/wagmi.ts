import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia, hardhat } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "DexVault",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "dexvault",
  chains: [mainnet, sepolia, hardhat],
  ssr: true,
});
