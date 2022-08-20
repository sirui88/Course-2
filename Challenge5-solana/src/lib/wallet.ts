import { Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { getConnection } from "./connection";
import { convertFromLamports, convertToLamports } from "./lamport";

function getPublicKey(key: PublicKey | Keypair): PublicKey {
  if (!key) {
    throw new Error("Received Key undefined");
  }

  if (key instanceof PublicKey) {
    return key;
  } else {
    return key.publicKey;
  }
}

export async function getSOLBalance(key: PublicKey | Keypair): Promise<number> {
  const publicKey = getPublicKey(key);
  try {
    // Connect to the Devnet
    const connection = getConnection();

    // Make a wallet (keypair) from privateKey and get its balance
    const walletBalance = await connection.getBalance(publicKey);

    // Return the wallet ballance in lamports
    console.debug(`Wallet ${publicKey} has a ballance of ${convertFromLamports(walletBalance)}`);
    return walletBalance;
  } catch (e) {
    console.error(e);
    throw new Error(`Failed getting ballance for: ${publicKey}`);
  }
}

export async function airdropSOL(key: PublicKey | Keypair, amount: number = convertToLamports(2), inLamports = true) {
  const publicKey = getPublicKey(key);
  if (!inLamports) {
    amount = convertToLamports(amount)
  }
  if (amount <= 0 || amount > convertToLamports(2)) {
    throw new Error(`Can only airdrop between 0 and 2 SOL but tried to airdrop ${convertFromLamports(amount)} SOL`);
  }
  try {
    const connection = getConnection();

    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      amount
    );

    // Latest blockhash (unique identifer of the block) of the cluster
    let latestBlockHash = await connection.getLatestBlockhash();

    // Confirm transaction using the last valid block height (refers to its time)
    // to check for transaction expiration
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: fromAirDropSignature
    });

    console.debug(`Airdropped ${convertFromLamports(amount)} SOL to ${publicKey}`);
  } catch (e) {
    console.error(e);
    throw new Error(`Failed airdropping ${convertFromLamports(amount)} to ${publicKey}`);
  }
}

export async function transferSOL(from: Keypair, to: PublicKey | Keypair, amountInLamports: number) {
  if (!from || !from.publicKey) {
    throw new Error("From wallet was undefined")
  }
  const toPublickey = getPublicKey(to);
  if (amountInLamports <= 0) {
    throw new Error("Tried transferring a negative or 0 lamports of SOL")
  }
  try {
    const connection = getConnection();

    // Send money from "from" wallet and into "to" wallet
    var transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: toPublickey,
        lamports: amountInLamports
      })
    );

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [from]
    );

    return signature;
  } catch (e) {
    console.error(e);
    throw new Error(`Failed transfering ${convertFromLamports(amountInLamports)} SOL from ${from.publicKey.toBase58()} to ${toPublickey.toBase58()}`);
  }
}
