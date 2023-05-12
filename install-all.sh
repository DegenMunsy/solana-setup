#!/bin/bash

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.15.2/install)"

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add Rust to PATH
source $HOME/.cargo/env

# Install Anchor avm
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# Install Anchor Linux Dependencies
sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev

# Install Yarn
corepack enable
npm i -g corepack
corepack prepare yarn@stable --activate
corepack prepare yarn@3.5.1 --activate

# Add the TypeScript install command
npm install -g typescript

# Add the Metaplex install command
bash <(curl -sSf https://sugar.metaplex.com/install.sh)

# Add the Create JS project command
npm i -g create-js-project

# Add the Create React App command


# npm install -g typescript@latest
# npm install -g typescript

# npm publish --access public
# npm update -g solana-setup