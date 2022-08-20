import { Keypair, PublicKey } from "@solana/web3.js";

let loadedSecret: number[];

function readEnvSecret() {
  // No usecase for private key since requirement is to generate one upon button click.
}

export function createPrivateKey(keys?: number[]): Keypair {
  if (keys) {
    const array = new Uint8Array(keys);
    return Keypair.fromSecretKey(array);
  }
  else {
    return Keypair.generate();
  }
}

export function createPublicKeyFromSecret(keys: number[]): PublicKey {
  return createPrivateKey(keys).publicKey;
}

export function createPublicKey(pubKey?: string): PublicKey {
  if (pubKey) {
    return new PublicKey(pubKey);
  } else {
    return Keypair.generate().publicKey;
  }
}
