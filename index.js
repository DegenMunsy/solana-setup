const { exec } = require('child_process');

// Function to execute a shell script
function runScript(scriptPath, callback) {
    const process = exec(`bash ${scriptPath}`);

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

// Get command line arguments
const args = process.argv.slice(2);

// Run the appropriate script based on the command line argument
if (args[0] === 'install') {
    runScript('./install-all.sh', function() {
        console.log('Installation complete');
    });
} else if (args[0] === 'update') {
    runScript('./update-all.sh', function() {
        console.log('Update complete');
    });
} else {
    console.log('Invalid command. Use "install" or "update".');
}
