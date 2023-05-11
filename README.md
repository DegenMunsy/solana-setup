# Solana Setup Tool
Solana Setup is a command-line tool designed to make it easier for Solana developers to install and update their development environment. With a single command, you can install or update Solana CLI, Rust, Anchor, and other necessary tools.


## Installation
To install Solana Setup, you'll need Node.js and npm (which comes with Node.js). You can download Node.js here.


Once you have Node.js and npm installed, you can install Solana Setup globally using the following command:


npm install -g solana-setup


## Usage
Installation of Programs
To install a program, use the install command followed by the program name. For example:

solana-setup install solana

solana-setup install solana

## You can install multiple programs at once by providing multiple program names:

solana-setup install solana rust anchor

solana-setup install solana rust anchor

The available programs for 'install' are solana, rust, anchor, anchor-dependencies, yarn, and typescript.


## Updating Programs
To update a program, use the update command followed by the program name. For example:

solana-setup update solana 

solana-setup update solana


Like with the install command, you can update multiple programs at once:

solana-setup update solana rust anchor

solana-setup update solana rust anchor

The available programs for 'update' are solana, rust, anchor, anchor-dependencies, yarn, and typescript.


Updating Solana Setup
To update the Solana Setup tool itself, use the following command:


npm update -g solana-setup


Contributing
If you're interested in contributing to Solana Setup, please feel free to submit a pull request on the GitHub repository.


License
Solana Setup is licensed under the ISC license.