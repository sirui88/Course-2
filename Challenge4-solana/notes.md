Well straight of the bet this sounds like a lot to take it but let's go!

First of it's suggested to install RUST. and this is annotated as just 1 step. People don't read by general I'd split off the prerequisits that pop up in cmd
https://visualstudio.microsoft.com/visual-cpp-build-tools/
"Desktop development with C++"
And from individiual tab:
"MSVC - VS 2019 C++ x64/x86 build tools"
"Windows 10 SDK"
OR
https://visualstudio.microsoft.com/downloads/

BPF isn't available for windows, this should be communicated
https://docs.figment.io/network-documentation/extra-guides/solana-setup-for-windows

For windows:
make sure you got docker, wsl
install all the things again

What I did starting from the challenge 4 dir:
wsl
sudo apt install nodejs
sudo apt install npm`
sudo npm install -g yarn
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
sh -c "$(curl -sSfL https://release.solana.com/v1.10.32/install)"
There will probably be a path command at the end of this. enter it
not a command: delete node modules
sudo npm install
solana config set --url https://api.devnet.solana.com/

Upon building the program. It'll use the key as defined in the confiig/solana/id.json. So before you build the program. Make sure that you have a wallet. Use:
Optionally: If you got an existing account, remove the id.json if you were having issues before
solana-keygen new --force
solana aridrop 2

AND THEN
npm run build:program-rust
solana program deploy dist/program/helloworld.so
npm run start

It should all work till npm run start. Which ofcourse will require you to fill in the missing steps in src/client/hello_world.ts


For the code:
When we create the greetedPubKey we pass along the programId. This is done to allow this key to write ot the program.
- This is a bit confusing, does this mean that if I have the ID of a program I can mute it live? Wouldn't that be a huge vurnability to allow people to change it without redeploying?
- Isn't it more likely that this would allow the account to interact with the program? Which again doens't quite fit the picutre since by signing an approve you can interact with any program on chain I think?

Resources used to run a program is actually RENT not Gas Fee. getMinimumBalanceForRentException will return rent needed. uses program length to determine this
  - This is confusing to me. If we make an account which code does: for(var i = Number.MIN_SAFE_INTEGER; i < Number.MAX_SAFE_INTEGER; i++) { // something small }. My size would be small but the workload big. Do we not pay for this?
- Also using array parameters for your constructions and mapping them in the program would save a lot?

Observations of the create.tsx
First off, the create.tsx is way more expanded and complex then our code. it seems to be a feature packed framework that handles edge cases.
At the top we see a timout and retry interval. Meaning it'll probably retry a transaction upon failure.
the workerRPC is probably used for user feedback in a react application, where we used console for feedback
CreateTxPRovider doesn't do as expected quite, will console.log errors and return nothing if it hasn't got all required parameters. transaction result is probably sent over socket so probably a popup?
at the end a regular return is given with an XML so to visualize the result.
Important new parameters seemingly used to mainly track progress: blockhash, conformationCommitment, targetSlot, trackingId, extraWriteAccount
