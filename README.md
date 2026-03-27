# DexVault

**Trade like Renaissance masters — with unbreakable trust. Open source. Community powered.**

DexVault is a decentralized peer-to-peer marketplace for high-value secondhand electronics (Phase 1: GPU/CPU only) built on trustless escrow, on-chain reputation, and 3D product visualization.

## Features

- **3D Product Visualization**: Inspect products in 3D before purchasing using Three.js + React Three Fiber
- **Trustless Escrow**: Funds held safely in escrow until delivery confirmed via Castler EaaS
- **On-Chain Reputation**: Build verifiable seller reputation on-chain
- **Open Source**: Fully open-source under MIT License
- **Community Powered**: Transparent governance via DexVault Improvement Proposals (Phase 2)

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js + React Three Fiber + Three.js | 3D viewer; GLTF model loader |
| Smart Contracts | Solidity 0.8.28 + Hardhat | DexVaultReputation.sol; DexVaultEscrow.sol |
| Escrow | Castler EaaS API | Indian-regulated; Razorpay fallback |
| Backend | Python (FastAPI) | AI/ML Intelligence layer; Web3.py integration |
| Database | PostgreSQL | Off-chain listing metadata |
| Infra | Docker + GitHub Actions CI | Automated test and deploy pipeline |
| Chain | EVM-compatible Testnet (Phase 1) → Mainnet (Phase 2) | |

## Project Structure

```
/apps
  /web          ← Next.js frontend
/contracts      ← Solidity smart contracts
/packages
  /castler-sdk  ← Open-source Castler integration wrapper
  /ui           ← Component library
/docs           ← Architecture docs, API reference
CONTRIBUTING.md
SECURITY.md
.env.example
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/singularraritylabs/dexvault.git
cd dexvault

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test/file.test.ts

# Run tests in watch mode
npm run test:watch
```

## Revenue Model

1. **Transaction Fee (0.5–1.5% per completed trade)**: Deducted at escrow release
2. **Featured Listings (₹99–₹499/listing)**: Promoted placement in search results
3. **Seller Verification Badge (₹299 one-time)**: KYC-verified badge on profile
4. **Enterprise API Access (₹4,999–₹24,999/month)**: B2B tier for refurbishers

## Phase 1 Scope

- GPU and CPU listings only (no other categories)
- Castler EaaS escrow integration (Razorpay fallback during onboarding)
- 3D product viewer (Three.js + React Three Fiber; GLTF SKU library — top 10 GPU/CPU models)
- DexVaultReputation.sol — on-chain seller reputation
- Centralized admin dispute resolution (Phase 1 only)
- MIT open-source repo: CONTRIBUTING.md, SECURITY.md, .env.example, GitHub Actions CI
- Testnet go-live: March 14, 2026

## Phase 2 Roadmap

| Item | Target Date | Notes |
|------|-------------|-------|
| Professional smart contract audit | April 2026 | Hard gate for mainnet |
| Mainnet go-live | May 2026 | Post-audit only |
| Multi-category expansion (phones, laptops) | June 2026 | |
| DVT governance token design | May 2026 | Non-transferable soulbound for Phase 1 staking |
| Multisig arbitration + community arbiters | June 2026 | Per §14–15 |
| DIP governance framework | July 2026 | Open-source community proposals |
| Mobile app (React Native) | Q4 2026 | |
| Enterprise API tier | Q3 2026 | Per §6 revenue model |
| Bug bounty program (Immunefi) | May 2026 | Launch with mainnet |

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

Please read [SECURITY.md](SECURITY.md) for details on our security policy and how to report vulnerabilities.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Website**: dexvault.singularraritylabs.com
- **GitHub**: github.com/singularraritylabs/dexvault
- **Discord**: Join our community
- **Twitter**: @dexvault

## Acknowledgments

- Built by SingularRarity Labs
- Inspired by the need for trust in India's secondhand electronics market
- Powered by open-source community contributions
