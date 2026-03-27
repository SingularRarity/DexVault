import { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";
import { ethers } from "hardhat";

// Hardhat configuration for DexVault — compilation working (DV-19)
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    evmVersion: "cancun", // For mcopy opcode (DV-24)
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: process.env.ALCHEMY_URL || "https://eth-goerli.g.alchemy.com/v2/your-api-key",
        blockNumber: 18500000,
      },
    },
    localhost: {
      url: "http://localhost:8545",
    },
    goerli: {
      url: process.env.ALCHEMY_URL || "https://eth-goerli.g.alchemy.com/v2/your-api-key",
      accounts: [process.env.PRIVATE_KEY || "your-private-key"],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  namedAccounts: {
    deployer: 0,
  },
};

export default config;

// Tasks
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();
//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// task("balance", "Prints an account's balance")
//   .addPositionalParam("account", "The account's address")
//   .setAction(async (taskArgs, hre) => {
//     const account = await hre.ethers.provider.getBalance(taskArgs.account);
//     console.log(hre.ethers.utils.formatEther(account));
//   });

// task("deploy", "Deploys the contracts")
//   .setAction(async (taskArgs, hre) => {
//     const DexVaultReputation = await hre.ethers.getContractFactory("DexVaultReputation");
//     const dexVaultReputation = await DexVaultReputation.deploy("0xYourAdminAddress");
//     await dexVaultReputation.deployed();
//     console.log("DexVaultReputation deployed to:", dexVaultReputation.address);

//     const DexVaultEscrow = await hre.ethers.getContractFactory("DexVaultEscrow");
//     const dexVaultEscrow = await DexVaultEscrow.deploy("0xYourAdminAddress");
//     await dexVaultEscrow.deployed();
//     console.log("DexVaultEscrow deployed to:", dexVaultEscrow.address);
//   });
