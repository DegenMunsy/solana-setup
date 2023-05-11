#!/usr/bin/env node

const { exec } = require('child_process');

function runCommand(command, callback) {
    const process = exec(command);

    process.stdout.on('data', function(data) {
        console.log(data);
    });

    process.stderr.on('data', function(data) {
        console.error(data);
    });

    process.on('exit', function() {
        callback();
    });
}

const updateCommands = {
    'rust': 'rustup update',
    'solana': 'solana-install update',
    'anchor': 'avm install latest && avm use latest',
    'yarn': 'yarn set version stable',
    'typescript': 'npm install -g typescript@latest'
};

const installCommands = {
    'solana': 'sh -c "$(curl -sSfL https://release.solana.com/v1.15.2/install)"',
    'rust': 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh',
    'anchor': 'cargo install --git https://github.com/coral-xyz/anchor avm --locked --force',
    'anchor-dependencies': 'sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev',
    'yarn': 'corepack enable && npm i -g corepack && corepack prepare yarn@stable --activate && corepack prepare yarn@3.5.1 --activate',
    'typescript': 'npm install -g typescript'
};

const args = process.argv.slice(2);

if (args[0] === 'install') {
    args.slice(1).forEach(arg => {
        const command = installCommands[arg];

        if (command) {
            runCommand(command, function() {
                console.log(`${arg} install complete`);
            });
        } else {
            console.log(`Invalid program: ${arg}. Available programs: ${Object.keys(installCommands).join(', ')}`);
        }
    });
} else if (args[0] === 'update') {
    args.slice(1).forEach(arg => {
        const command = updateCommands[arg];

        if (command) {
            runCommand(command, function() {
                console.log(`${arg} update complete`);
            });
        } else {
            console.log(`Invalid program: ${arg}. Available programs: ${Object.keys(updateCommands).join(', ')}`);
        }
    });
} else {
    console.log('Invalid command. Use "update".');
}
