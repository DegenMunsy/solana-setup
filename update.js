#!/usr/bin/env node
const { exec } = require("child_process");

async function update() {
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

  const updateCommands = {
    solana: "solana-install update",
    rust: "rustup update",
    anchor: "avm install latest && avm use latest",
    yarn: "yarn set version stable",
    typescript: "npm install -g typescript@latest",
  };

  inquirer.default
    .prompt([
      {
        type: "checkbox",
        name: "programs",
        message: `Which programs do you want to update?`,
        choices: Object.keys(updateCommands),
      },
    ])
    .then((programAnswers) => {
      programAnswers.programs.forEach((program) => {
        const command = updateCommands[program];
        if (command) {
          runCommand(command, function () {
            console.log(`${program} update complete`);
          });
        }
      });
    });
}

module.exports = { update };
