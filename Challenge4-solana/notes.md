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
