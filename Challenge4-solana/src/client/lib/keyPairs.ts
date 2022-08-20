import { Keypair, PublicKey } from "@solana/web3.js";

let loadedSecret: number[];

function readEnvSecret() {
  if (!loadedSecret) {
    let key = process.env.PRIVATE_KEY;
    if (key) {
      loadedSecret = Array.from(key, (x) => Number(x));
    } else {
      throw new Error("No valid PRIVATE_KEY was found in the .env config");
    }
  }
  return loadedSecret;
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

export function createPublicKeyFromSecret(keys: number[] = readEnvSecret()): PublicKey {
  return createPrivateKey(keys).publicKey;
}

export function createPublicKey(pubKey?: string): PublicKey {
  if (pubKey) {
    return new PublicKey(pubKey);
  } else {
    return Keypair.generate().publicKey;
  }
}
