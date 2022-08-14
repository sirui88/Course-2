Leson 2:
Smart contracts are called programs in Solana
A transaction is either successful or not.
  In contact this probably means that something like a vesting contract has 2 transactions at least, 1 to try and establish it. and 1 to interact with an established contract.

Is it a spoiler that we are going to need `sendAndConfirmRawTransaction` cause we got an unused import hehe

Ah nice block hashes explained :) was wondering that after challenge 1.

Question:
`const connection = new Connection(clusterApiUrl("devnet"), "confirmed");`
Is it standard to have a connection be like a Singleton and have it stay allive throughout the whole lifespan of an applciation.
Or should we create a connection whenever we need a connection? For safety I've gone for the latter.


Note to self remember:
yarn init -y
yarn add @solana/web3.js
"scripts": {
  "start": "node index.js"
},


