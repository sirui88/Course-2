
// importfunctionalities
import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { getProvider, PhantomProvider } from './lib/phantom.provider';
import { createPrivateKey, createPublicKey } from './lib/keyPairs';
import { airdropSOL, getSOLBalance, transferSOL } from './lib/wallet';
import { Keypair } from '@solana/web3.js';
import { convertToLamports } from './lib/lamport';
// Magical statement copied from MinG#7128, long may he reign
// this fixes the `ReferenceError: Buffer is not defined` when transferring SOL
window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  // create state variable for the provider
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );

  // create state for Private wallet
  const [keyPair, setKeyPair] = useState<Keypair | undefined>(
    undefined
  );

  // create state variable for the wallet key
  const [connectedWallet, setWalletKey] = useState<string | undefined>(
    undefined
  );

  // this is the function that runs whenever the component updates (e.g. render, refresh)
  useEffect(() => {
    const provider = getProvider();

    // if the phantom provider exists, set this as the provider
    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);

  /**
   * @description create a new KeyPair and airdrop it 2 SOL
   */
  async function createFrom() {
    try {
      const wallet = createPrivateKey();

      await airdropSOL(wallet);

      setKeyPair(wallet)
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @description prompts user to connect wallet if it exists.
   * This function is called when the connect wallet button is clicked
   */
  async function connectWallet() {
    // @ts-ignore
    const { solana } = window;

    // checks if phantom wallet exists
    if (solana) {
      try {
        // connects wallet and returns response which includes the wallet public key
        const response = await solana.connect();
        console.log(`wallet account ${response.publicKey.toString()}`);
        // update walletKey to be the public key
        setWalletKey(response.publicKey);
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  }

  /**
   * @description Transfers the SOL from wallet A to wallet B. Opted to transfer 1.95 instead of 2 due to gas fees
   * Also removes the emptied pub wallet since it's nearly empty now
   */
  async function moveFunds() {
    try {
      const from = keyPair;
      const to = createPublicKey(connectedWallet);

      if (from && to) {
        await transferSOL(from, to, convertToLamports(1.9));

        let amount = await getSOLBalance(to);
        console.log(`Phantom wallet now has: ${convertToLamports(amount)} SOL`)

        setKeyPair(undefined);
      } else {
        console.log("One of the expected wallets is missing");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function disconnectWallet() {
    // @ts-ignore
    const { solana } = window;

    // checks if phantom wallet exists
    if (solana) {
      try {
        // connects wallet and returns response which includes the wallet public key
        console.log(`disconnecting wallet account`);
        await getProvider()?.disconnect();
        // update walletKey to be the public key
        setWalletKey(undefined);
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  }

  // HTML code for the app
  return (
    <div className="App">
      <header className="App-header">
        <h2>Challenge 5</h2>
      </header>
      {provider && !keyPair && (
        <button
          style={{
            fontSize: "16px",
            padding: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
          onClick={createFrom}
        >
          Generate Wallet
        </button>
      )}
      {provider && keyPair && !connectedWallet && (
        <button
          style={{
            fontSize: "16px",
            padding: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
      {provider && keyPair && connectedWallet && (
        <button
          style={{
            fontSize: "16px",
            padding: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
          onClick={moveFunds}
        >
          Move Assets
        </button>
      )}
      {provider && connectedWallet && (
        <button
          style={{
            fontSize: "16px",
            padding: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
            top: "0",
            right: "0",
            position: "absolute"
          }}
          onClick={disconnectWallet}
        >
          Disconnect Wallet
        </button>
      )}
      {!provider && (
        <p>
          No provider found. Install{" "}
          <a href="https://phantom.app/">Phantom Browser extension</a>
        </p>
      )}
    </div>
  );
}

export default App;
