// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get the wallet balance from a given private key
const getWalletBalance = async (privateKey) => {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // console.log("Connection object is:", connection);

    // Make a wallet (keypair) from privateKey and get its balance
    const walletBalance = await connection.getBalance(
      new PublicKey(publicKey)
    );
    console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async (publicKey, amount = 2) => {
  try {
    if (publicKey) {
      console.log(`Received wallet: ${publicKey}`)
    } else {
      throw new Error(`Called method airDropSol without providing a wallet address`);
    }

    if (amount > 2 || amount < 0) {
      throw new Error(`Desired amount for airdrop was invallid. Expected value between 0-2 but received ${amount}`);
    }

    // Request airdrop of 2 SOL to the wallet
    console.log(`Airdropping ${amount} SOL to my wallet!`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(publicKey),
      amount * LAMPORTS_PER_SOL
    );

    /**
     * Method was deprewcated I used:
     *
     * https://stackoverflow.com/questions/72330340/solana-web3-confirmtransaction-deprecated-using-a-transactionconfirmationconfig
     *
     * This method seems more comples and raises questions on it's own.
     * What I think it would do is prevent a deadlock maybe? where a transaction never appears but because the latest block hash may be updated
     * by a different transaction we'd not continously wait? No clue
     */
    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: fromAirDropSignature,
    });

    console.log("Airdropp successful");
  } catch (err) {
    console.log(err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  let args = process.argv.slice(2);

  // Can't use getWalletBalance since with the code above we'd require a private key.
  // I don't know how to fetch it from a node like SolScan yet.
  //await getWalletBalance();
  if (args.length > 2) {
    console.log(`Expected only 1 or 2 arguments but received ${args.length}, the wallet you want to drop to and optionally the amount of SOL you want to drop.`)
  } else {
    await airDropSol(...args);
  }

  //await getWalletBalance();
}

mainFunction();
