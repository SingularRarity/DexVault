# DexVault

A decentralized peer-to-peer marketplace for secondhand electronics built on trustless escrow, on-chain reputation, and 3D product visualization.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js + React Three Fiber + Three.js | 3D viewer; GLTF model loader |
| Smart Contracts | Solidity 0.8.28 + Hardhat | DexVaultReputation.sol; DexVaultEscrow.sol |
| Escrow | Castler EaaS API | Razorpay fallback |
| Backend | Python (FastAPI) | AI/ML layer; Web3.py integration |
| Database | PostgreSQL | Off-chain listing metadata |
| Infra | Docker + GitHub Actions CI | Automated test and deploy pipeline |
| Chain | EVM-compatible (Testnet → Mainnet) | |

## Project Structure

```
/apps
  /web          ← Next.js frontend
/contracts      ← Solidity smart contracts
/packages
  /castler-sdk  ← Castler integration wrapper
  /ui           ← Component library
/docs           ← Architecture docs, API reference
CONTRIBUTING.md
SECURITY.md
.env.example
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker (optional)

### Installation

```bash
git clone https://github.com/SingularRarity/DexVault.git
cd DexVault

npm install

cp .env.example .env

npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test/file.test.ts

# Watch mode
npm run test:watch
```

## Smart Contracts

| Contract | Purpose |
|----------|---------|
| `DexVaultEscrow.sol` | Holds funds in escrow; releases on delivery confirmation |
| `DexVaultReputation.sol` | On-chain seller reputation tracking |

Deploy and test with Hardhat:

```bash
cd contracts
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.ts --network testnet
```

## Environment Variables

See [.env.example](.env.example) for all required variables. Key groups:

- `DATABASE_URL` — PostgreSQL connection string
- `CASTLER_*` — Castler EaaS API credentials
- `NEXT_PUBLIC_*` — Frontend public config
- `WEB3_*` — Chain RPC and contract addresses

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and code of conduct.

## Security

See [SECURITY.md](SECURITY.md) for the security policy and vulnerability reporting process.

## License

MIT — see [LICENSE](LICENSE).
