// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title DexVaultEscrow
 * @dev State machine escrow for DexVault trades. Refactored for OZ v5 (DV-20).
 */
contract DexVaultEscrow is AccessControl, ReentrancyGuard {
    bytes32 public constant ESCROW_ROLE = keccak256("ESCROW_ROLE");
    bytes32 public constant ARBITRATOR_ROLE = keccak256("ARBITRATOR_ROLE");

    enum EscrowState {
        CREATED,        // Initial state
        FUNDED,         // Funds deposited
        DISPUTED,       // Dispute raised
        RESOLVED,       // Dispute resolved
        COMPLETED,      // Trade completed successfully
        CANCELLED       // Trade cancelled
    }

    struct Escrow {
        uint256 id;
        address buyer;
        address seller;
        uint256 amount;
        uint256 deadline;
        EscrowState state;
        address arbitrator;
        string metadata;
    }

    uint256 public escrowCount;
    mapping(uint256 => Escrow) public escrows;
    mapping(address => uint256[]) public userEscrows;

    event EscrowCreated(uint256 id, address buyer, address seller, uint256 amount);
    event EscrowFunded(uint256 id);
    event EscrowDisputed(uint256 id, address arbitrator);
    event EscrowResolved(uint256 id, bool inFavorOfSeller);
    event EscrowCompleted(uint256 id);
    event EscrowCancelled(uint256 id);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ESCROW_ROLE, admin);
        _grantRole(ARBITRATOR_ROLE, admin);
    }

    /**
     * @dev Create a new escrow
     */
    function createEscrow(address buyer, address seller, uint256 amount, uint256 deadline, string memory metadata) external onlyRole(ESCROW_ROLE) returns (uint256) {
        escrowCount++;
        escrows[escrowCount] = Escrow({
            id: escrowCount,
            buyer: buyer,
            seller: seller,
            amount: amount,
            deadline: deadline,
            state: EscrowState.CREATED,
            arbitrator: address(0),
            metadata: metadata
        });
        
        userEscrows[buyer].push(escrowCount);
        userEscrows[seller].push(escrowCount);
        
        emit EscrowCreated(escrowCount, buyer, seller, amount);
        return escrowCount;
    }

    /**
     * @dev Fund an escrow
     */
    function fundEscrow(uint256 id) external payable onlyRole(ESCROW_ROLE) {
        Escrow storage escrow = escrows[id];
        require(escrow.state == EscrowState.CREATED, "Escrow not in CREATED state");
        require(msg.value == escrow.amount, "Incorrect amount");
        
        escrow.state = EscrowState.FUNDED;
        emit EscrowFunded(id);
    }

    /**
     * @dev Dispute an escrow
     */
    function disputeEscrow(uint256 id, address arbitrator) external onlyRole(ESCROW_ROLE) {
        Escrow storage escrow = escrows[id];
        require(escrow.state == EscrowState.FUNDED, "Escrow not in FUNDED state");
        
        escrow.state = EscrowState.DISPUTED;
        escrow.arbitrator = arbitrator;
        emit EscrowDisputed(id, arbitrator);
    }

    /**
     * @dev Resolve a disputed escrow
     */
    function resolveEscrow(uint256 id, bool inFavorOfSeller) external onlyRole(ARBITRATOR_ROLE) {
        Escrow storage escrow = escrows[id];
        require(escrow.state == EscrowState.DISPUTED, "Escrow not in DISPUTED state");
        
        escrow.state = EscrowState.RESOLVED;
        
        if (inFavorOfSeller) {
            Address.sendValue(payable(escrow.seller), escrow.amount);
        } else {
            Address.sendValue(payable(escrow.buyer), escrow.amount);
        }
        
        emit EscrowResolved(id, inFavorOfSeller);
    }

    /**
     * @dev Complete an escrow (seller confirms delivery)
     */
    function completeEscrow(uint256 id) external onlyRole(ESCROW_ROLE) {
        Escrow storage escrow = escrows[id];
        require(escrow.state == EscrowState.FUNDED, "Escrow not in FUNDED state");
        
        escrow.state = EscrowState.COMPLETED;
        Address.sendValue(payable(escrow.seller), escrow.amount);
        emit EscrowCompleted(id);
    }

    /**
     * @dev Cancel an escrow (buyer cancels before funding)
     */
    function cancelEscrow(uint256 id) external onlyRole(ESCROW_ROLE) {
        Escrow storage escrow = escrows[id];
        require(escrow.state == EscrowState.CREATED, "Escrow not in CREATED state");
        
        escrow.state = EscrowState.CANCELLED;
        emit EscrowCancelled(id);
    }

    /**
     * @dev Get escrow state
     */
    function getEscrowState(uint256 id) external view returns (EscrowState) {
        return escrows[id].state;
    }

    /**
     * @dev Get escrow details
     */
    function getEscrowDetails(uint256 id) external view returns (
        address buyer,
        address seller,
        uint256 amount,
        uint256 deadline,
        EscrowState state,
        address arbitrator,
        string memory metadata
    ) {
        Escrow storage escrow = escrows[id];
        return (
            escrow.buyer,
            escrow.seller,
            escrow.amount,
            escrow.deadline,
            escrow.state,
            escrow.arbitrator,
            escrow.metadata
        );
    }

    /**
     * @dev Get user escrows
     */
    function getUserEscrows(address user) external view returns (uint256[] memory) {
        return userEscrows[user];
    }

    /**
     * @dev Get escrow count
     */
    function getEscrowCount() external view returns (uint256) {
        return escrowCount;
    }
}