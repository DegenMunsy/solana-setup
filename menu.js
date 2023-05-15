#!/usr/bin/env node
// Import the functions from install.js, update.js, and create.js
const { install } = require("./install");
const { update } = require("./update");
const { create } = require("./create");

import("inquirer").then((inquirer) => {
  inquirer.default.prompt([
    {
      type: "list",
      name: "program",
      message: "Which program do you want to run?",
      choices: ["Install", "Update", "Create"],
    },
  ])
  .then((answers) => {
    switch (answers.program) {
      case "Install":
        install();
        break;
      case "Update":
        update();
        break;
      case "Create":
        create();
        break;
      default:
        console.log("Invalid option.");
        break;
    }
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
});
