#!/bin/bash

# Update Rust
rustup update

# Update Solana
solana-install update

# Update Anchor
avm install latest
avm use latest

# Update Yarn
yarn set version stable
