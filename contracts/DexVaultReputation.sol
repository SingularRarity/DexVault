// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title DexVaultReputation
 * @dev On-chain reputation for sellers. Refactored for OZ v5 (DV-20).
 */
contract DexVaultReputation is AccessControl, ReentrancyGuard {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    struct Reputation {
        uint256 score; // 0-1000 base
        uint256 successfulTrades;
        uint256 lastUpdate;
    }

    mapping(address => Reputation) public sellerReputation;

    event ReputationUpdated(address indexed seller, uint256 newScore);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function updateScore(address seller, uint256 newScore) external onlyRole(VERIFIER_ROLE) {
        _updateReputation(seller, newScore);
    }

    /**
     * @dev Internal function to handle logic (DV-22)
     */
    function _updateReputation(address seller, uint256 newScore) internal {
        require(newScore <= 1000, "Invalid score");
        sellerReputation[seller].score = newScore;
        sellerReputation[seller].lastUpdate = block.timestamp;
        emit ReputationUpdated(seller, newScore);
    }

    /**
     * @dev Get reputation score
     */
    function getReputation(address seller) external view returns (uint256) {
        return sellerReputation[seller].score;
    }

    /**
     * @dev Get successful trades count
     */
    function getSuccessfulTrades(address seller) external view returns (uint256) {
        return sellerReputation[seller].successfulTrades;
    }

    /**
     * @dev Increment successful trades
     */
    function incrementSuccessfulTrades(address seller) external onlyRole(VERIFIER_ROLE) {
        sellerReputation[seller].successfulTrades++;
    }

    /**
     * @dev Reset reputation (admin only)
     */
    function resetReputation(address seller) external onlyRole(DEFAULT_ADMIN_ROLE) {
        sellerReputation[seller] = Reputation({
            score: 500,
            successfulTrades: 0,
            lastUpdate: block.timestamp
        });
    }
}