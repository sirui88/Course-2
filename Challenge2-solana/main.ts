import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";


// Okay simple enough use my created wallet
const WALLET_SECRET = new Uint8Array(
  [
    250, 220, 228, 163, 155, 114, 77, 136, 234, 13, 204,
    160, 245, 82, 150, 238, 107, 218, 1, 160, 59, 220,
    132, 254, 148, 135, 109, 117, 236, 107, 75, 88, 232,
    32, 122, 217, 14, 59, 91, 78, 16, 55, 242, 123,
    10, 149, 221, 60, 197, 188, 92, 172, 177, 190, 81,
    177, 36, 3, 226, 28, 112, 56, 239, 6
  ]
);

function keyPairFromSecretKey(secret: Uint8Array): Keypair {
  return Keypair.fromSecretKey(secret);
}

// Step 1: by default drop 2 sol to my sender so I never run dry and so test cases will differ
async function airdropSOL(publicKey: string, amount: number = 2) {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    console.debug(`Airdropping ${amount} SOL to ${publicKey}`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(publicKey),
      amount * LAMPORTS_PER_SOL
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
  } catch (e) {
    console.error(e);
    throw new Error("Failed to Airdrop SOL");
  }
}

// Step 2: get the SOL balance of sender after the air drop
async function getSOLBalance(publicKey: PublicKey): Promise<number> {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Make a wallet (keypair) from privateKey and get its balance
    const walletBalance = await connection.getBalance(publicKey);

    // Return the wallet ballance in lamports
    return walletBalance;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get wallet ballance");
  }
}

// Step 3: Fork over the SOL to a random public wallet
async function transferSOL(from: Keypair, to: PublicKey, amountLamports: number): Promise<string> {
  // Connect to the Devnet
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Send money from "from" wallet and into "to" wallet
  var transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: amountLamports
    })
  );

  // Sign transaction
  var signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [from]
  );

  return signature;
}


async function run() {
  const from = keyPairFromSecretKey(WALLET_SECRET);
  // Presumably we'll never know the secret side of target. Program shouldn't keep track of that
  const to = Keypair.generate().publicKey;

  await airdropSOL(from.publicKey.toString(), 2);

  const currentBalance = await getSOLBalance(from.publicKey);
  const half = currentBalance / 2;

  console.log(`Starting to transfer ${half / LAMPORTS_PER_SOL} SOL of the ${currentBalance / LAMPORTS_PER_SOL} over to the random address`)

  const transaction = await transferSOL(from, to, half);
  const balanceTarget = await getSOLBalance(to);

  console.log(`Target now has ${balanceTarget / LAMPORTS_PER_SOL} SOL, transaction was ${transaction}`)
}

run();
