/**
 * Castler EaaS SDK wrapper for DexVault
 * Castler provides regulated escrow-as-a-service for Indian marketplaces.
 */

export interface CastlerEscrowConfig {
  apiKey: string;
  baseUrl: string;
  merchantId: string;
}

export interface CreateEscrowParams {
  buyerEmail: string;
  sellerEmail: string;
  amount: number;
  currency: "INR";
  orderId: string;
  description: string;
  callbackUrl: string;
}

export interface EscrowStatus {
  escrowId: string;
  orderId: string;
  status: "created" | "funded" | "released" | "refunded" | "disputed";
  amount: number;
  currency: string;
  createdAt: string;
}

export class CastlerClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly merchantId: string;

  constructor(config: CastlerEscrowConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
    this.merchantId = config.merchantId;
  }

  private headers(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "X-Api-Key": this.apiKey,
      "X-Merchant-Id": this.merchantId,
    };
  }

  async createEscrow(params: CreateEscrowParams): Promise<EscrowStatus> {
    const response = await fetch(`${this.baseUrl}/v1/escrow/create`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Castler createEscrow failed: ${err}`);
    }

    return response.json() as Promise<EscrowStatus>;
  }

  async getEscrow(escrowId: string): Promise<EscrowStatus> {
    const response = await fetch(
      `${this.baseUrl}/v1/escrow/${escrowId}`,
      { headers: this.headers() }
    );

    if (!response.ok) {
      throw new Error(`Castler getEscrow failed for ${escrowId}`);
    }

    return response.json() as Promise<EscrowStatus>;
  }

  async releaseEscrow(escrowId: string): Promise<EscrowStatus> {
    const response = await fetch(
      `${this.baseUrl}/v1/escrow/${escrowId}/release`,
      { method: "POST", headers: this.headers() }
    );

    if (!response.ok) {
      throw new Error(`Castler releaseEscrow failed for ${escrowId}`);
    }

    return response.json() as Promise<EscrowStatus>;
  }

  async refundEscrow(escrowId: string): Promise<EscrowStatus> {
    const response = await fetch(
      `${this.baseUrl}/v1/escrow/${escrowId}/refund`,
      { method: "POST", headers: this.headers() }
    );

    if (!response.ok) {
      throw new Error(`Castler refundEscrow failed for ${escrowId}`);
    }

    return response.json() as Promise<EscrowStatus>;
  }
}
