import { LAMPORTS_PER_SOL } from "@solana/web3.js";


export function convertFromLamports(amountInLamports: number) {
  return amountInLamports / LAMPORTS_PER_SOL;
}

export function convertToLamports(amount: number) {
  return amount * LAMPORTS_PER_SOL
}
