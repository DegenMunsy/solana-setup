#!/usr/bin/env node
import("inquirer").then((inquirer) => {
  const { exec } = require("child_process");
  const shell = require("shelljs");
  const fs = require("fs");
  const path = require("path");

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

  const installCommands = {
    solana: 'sh -c "$(curl -sSfL https://release.solana.com/v1.15.2/install)"',
    rust: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
    anchor:
      "cargo install --git https://github.com/coral-xyz/anchor avm --locked --force",
    "anchor-dependencies":
      "sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev",
    yarn: "corepack enable && npm i -g corepack && corepack prepare yarn@stable --activate && corepack prepare yarn@3.5.1 --activate",
    typescript: "npm install -g typescript",
    metaplex: "bash <(curl -sSf https://sugar.metaplex.com/install.sh)",
  };

  const projectTypes = {
    rust: "cargo new",
    ts: "tsc --init",
    js: "npm init -y",
    react: "npx create-solana-dapp",
    anchor: "anchor init",
  };

  const npmPackages = [
    "@project-serum/anchor",
    "@solana/web3.js",
    "@solana/spl-token",
    "@metaplex-foundation/mpl-token-metadata",
  ];

  const questions = [
    {
      type: "input",
      name: "projectTitle",
      message: "Enter your project title:",
    },
    {
      type: "list",
      name: "projectType",
      message: "What type of project would you like to create?",
      choices: Object.keys(projectTypes),
    },
    {
      type: "input",
      name: "createFiles",
      message: "Enter file names you want to create separated by comma:",
    },
    {
      type: "checkbox",
      name: "packages",
      message: "Which npm packages would you like to install?",
      choices: npmPackages,
    },
  ];

  inquirer.default
    .prompt([
      {
        type: "list",
        name: "operation",
        message: "Do you want to install, update, or create a project?",
        choices: ["install", "update", "create"],
      },
    ])
    .then((operationAnswer) => {
      switch (operationAnswer.operation) {
        case "install":
        case "update":
          const commands =
            operationAnswer.operation === "install"
              ? installCommands
              : updateCommands;
          inquirer
            .prompt([
              {
                type: "checkbox",
                name: "programs",
                message: `Which programs do you want to ${operationAnswer.operation} on?`,
                choices: Object.keys(commands),
              },
            ])
            .then((programAnswers) => {
              programAnswers.programs.forEach((program) => {
                const command = commands[program];
                if (command) {
                  runCommand(command, function () {
                    console.log(
                      `${program} ${operationAnswer.operation} complete`
                    );
                  });
                }
              });
            });
          break;
        case "create":
          inquirer.default.prompt(questions).then((answers) => {
            let initCommand = projectTypes[answers.projectType];
            if (initCommand) {
              if (answers.projectType === "rust") {
                // Create project directory
                fs.mkdirSync(answers.projectTitle, { recursive: true });

                // Switch to project directory
                shell.cd(answers.projectTitle);

                initCommand = `${initCommand} ${answers.projectTitle}`; // Add project title to the command
                shell.exec(initCommand); // Initialize rust project
              } else if (answers.projectType === "anchor") {
                initCommand = `${initCommand} ${answers.projectTitle}`; // Add project title to the command for anchor as well
                shell.exec(initCommand); // Initialize anchor project

                // Switch to project directory
                shell.cd(answers.projectTitle);
              } else if (answers.projectType === "react") {
                // Add this block
                initCommand = `${initCommand} ${answers.projectTitle}`; // Add project title to the command for react as well
                shell.exec(initCommand); // Initialize react project

                // Switch to project directory
                shell.cd(answers.projectTitle);
              } else {
                // Create project directory
                fs.mkdirSync(answers.projectTitle, { recursive: true });

                // Switch to project directory
                shell.cd(answers.projectTitle);

                shell.exec(initCommand);
              }
            }

            // Determine where to create files based on project type
            let filePathPrefix = ".";
            if (["react", "js", "ts"].includes(answers.projectType)) {
              if (answers.projectType === "react") {
                filePathPrefix = path.join("app", "src", "components");
              } else {
                filePathPrefix = "src";
              }
            } else if (answers.projectType === "anchor") {
              filePathPrefix = path.join(
                "programs",
                answers.projectTitle,
                "src"
              );
            }

            // Create files
            const files = answers.createFiles.split(",");
            files.forEach((file) => {
              let filePath;
              switch (answers.projectType) {
                case "anchor":
                  filePath = path.join(filePathPrefix, `${file.trim()}.rs`);
                  break;
                case "react":
                  filePath = path.join(filePathPrefix, `${file.trim()}.tsx`);
                  break;
                case "ts":
                  filePath = path.join(filePathPrefix, `${file.trim()}.ts`);
                  break;
                case "js":
                  filePath = path.join(filePathPrefix, `${file.trim()}.js`);
                  break;
                case "rust":
                  filePath = path.join(filePathPrefix, `${file.trim()}.rs`);
                  break;
                default:
                  filePath = path.join(filePathPrefix, file.trim());
              }

              const dirPath = path.dirname(filePath);
              if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
              }
              if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, "", "utf8");
              }
            });

            // Install npm packages
            if (answers.packages && answers.packages.length > 0) {
              shell.exec(`npm install ${answers.packages.join(" ")}`);
            }
          });
          break;

        default:
          console.log("Invalid operation");
      }
    });
});
