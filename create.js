#!/usr/bin/env node
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

// Define project types and corresponding commands
const projectTypes = {
  rust: "cargo new",
  ts: "tsc --init",
  js: "npm init -y",
  react: "npx create-solana-dapp",
  anchor: "anchor init",
};

// Define npm packages
const npmPackages = [
  "@project-serum/anchor",
  "@solana/web3.js",
  "@solana/spl-token",
  "@metaplex-foundation/mpl-token-metadata",
  // "@solana/wallet-adapter",
  //"@metaboss
];

// Define questions
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

async function create() {
  const inquirer = await import("inquirer");

  // Prompt user for inputs
  inquirer.default.prompt(questions).then((answers) => {
    // Create project directory and change into it
    if (answers.projectType !== "anchor" && answers.projectType !== "react") {
      fs.mkdirSync(answers.projectTitle, { recursive: true });
      shell.cd(answers.projectTitle);
    }

    // Initialize project
    let initCommand = projectTypes[answers.projectType];
    if (initCommand) {
      const result = shell.exec(`${initCommand} ${answers.projectTitle}`);
      // Check if command was successful
      if (result.code !== 0) {
        console.error("Failed to initialize project. Aborting...");
        process.exit(1);
      }

      // If the project type is Rust, change to the correct directory
      if (answers.projectType === "rust") {
        shell.cd(answers.projectTitle); // Enter the created Rust project directory
        shell.cd("src"); // Enter 'src' directory inside the Rust project directory
      }
    }

    // Determine where to create files based on project type
    let filePathPrefix;
    switch (answers.projectType) {
      case "anchor":
        filePathPrefix = path.join(
          answers.projectTitle,
          "programs",
          answers.projectTitle,
          "src"
        );
        break;
      case "react":
        filePathPrefix = path.join(
          answers.projectTitle,
          "app",
          "src",
          "components"
        );
        break;
      default:
        filePathPrefix = ".";
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
}

// Export the create function
module.exports = {
  create,
};
