# Solana Setup Tool
Solana Setup is a command-line tool designed to make it easier for Solana developers to install and update their development environment or create a project. With a single command, you can install or update Solana CLI, Rust, Anchor, Yarn, TypeScript, and some essential npm packages such as @solana/web3.js, @project-serum/anchor, and @solana/spl-token, or create a project and install your desired dependencies.

## Installation
To install Solana Setup, you'll need Node.js and npm (which comes with Node.js). You can download Node.js [here](https://nodejs.org/en/download/).

Once you have Node.js and npm installed, you can install Solana Setup globally using the following command:


`npm install -g solana-setup`


## Usage
Usage
Simply run solana-setup in your terminal and follow the interactive prompts to specify the operation you want to perform.

You can perform the following operations:

### Installation of Programs
To install a program or npm package, choose the 'install' option and then select the desired programs or packages. For example:
`solana-setup`

#### Updating Programs
To update a program or npm package, choose the 'update' option and then select the desired programs or packages. For example:
`solana-setup`

#### Creating a New Project
To create a new project, choose the 'create' option and then follow the prompts to specify the project details. For example:
`solana-setup`


The available programs for 'install' are solana, rust, anchor, anchor-dependencies, yarn, typescript, and the following npm packages: @solana/web3.js, @project-serum/anchor, @solana/spl-token.

the available programs for 'update' are solana, rust, yarn, anchor, and typescript and the following npm packages: @solana/web3.js, @project-serum/anchor, @solana/spl-token.

the available programs for 'create' are anchor, rust, react, typescript, and javascript and the following npm packages can be added: @solana/web3.js, @project-serum/anchor, @solana/spl-token.

### You can run locally
`node ./indexjs or ./create.js`

## Updating Solana Setup
To update the Solana Setup tool itself, use the following command:
`npm update -g solana-setup`

### Contributing
If you're interested in contributing to Solana Setup, please feel free to submit a pull request on the GitHub repository [here](https://github.com/DegenMunsy/solana-setup).

### Creator
@cashmunsy

License
Solana Setup is licensed under the ISC license.