import { PublicKey, Transaction } from "@solana/web3.js";
import { AppEvent } from "./app.event";

type DisplayEncoding = "utf8" | "hex";

type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

// create a provider interface (hint: think of this as an object) to store the Phantom Provider
export interface PhantomProvider {
  publicKey?: PublicKey;
  isConnected?: boolean;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
  signMessage(
    message: Uint8Array | string,
    display?: DisplayEncoding
  ): Promise<any>;
  connect(opts?: Partial<ConnectOpts>): Promise<{ publicKey: PublicKey }>;
  disconnect(): Promise<void>;
  on(event: AppEvent, handler: (args: any) => void): void;
  request(method: PhantomRequestMethod, params: any): Promise<unknown>;
}

/**
 * @description gets Phantom provider, if it exists
 */
export function getProvider(): PhantomProvider | undefined {
  if ("solana" in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) {
      return provider as PhantomProvider;
    }
  }
};

