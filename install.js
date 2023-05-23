#!/usr/bin/env node
const { exec } = require("child_process");



async function install() {
  const inquirer = await import("inquirer");

  
  function runCommand(command, callback) {
    const process = exec(command);

    process.stdout.on("data", function (data) {
      console.log(data);
    });

    process.stderr.on("data", function (data) {
      console.error(data);
    });

    process.on("exit", function () {
      callback();
    });
  }

  const installCommands = {
    Solana_CLI: 'sh -c "$(curl -sSfL https://release.solana.com/v1.15.2/install)"',
    Sugar_CLI: "bash <(curl -sSf https://sugar.metaplex.com/install.sh)",
    Rust: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
    Anchor:
      "cargo install --git https://github.com/coral-xyz/anchor avm --locked --force",
    "anchor-dependencies":
      "sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev",
    Yarn: "corepack enable && npm i -g corepack && corepack prepare yarn@stable --activate && corepack prepare yarn@3.5.1 --activate",
    Typescript: "npm install -g typescript",
    Metaboss: "bash <(curl -sSf https://raw.githubusercontent.com/samuelvanderwaal/metaboss/main/scripts/install.sh)",
  };

  inquirer.default
    .prompt([
      {
        type: "checkbox",
        name: "programs",
        message: `Which programs do you want to install?`,
        choices: Object.keys(installCommands), 
      },
    ])
    .then((programAnswers) => {
      programAnswers.programs.forEach((program) => {
        const command = installCommands[program];
        if (command) {
          runCommand(command, function () {
            console.log(`${program} install complete`);
          });
        }
      });
    });
}

module.exports = { install };
