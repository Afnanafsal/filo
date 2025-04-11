const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the path to the CLI directory
const cliPath = path.join(__dirname, '..', 'cli');

// Make sure the CLI script is executable
try {
  const indexJsPath = path.join(cliPath, 'index.js');
  fs.chmodSync(indexJsPath, '755');
} catch (err) {
  console.warn('Could not make CLI script executable:', err.message);
}

// Install the CLI globally
console.log('Installing Filo CLI globally...');
exec('npm install -g .', { cwd: cliPath }, (error, stdout, stderr) => {
  if (error) {
    console.error('Failed to install CLI globally:', error.message);
    console.error('You may need to run this command manually:');
    console.error(`cd "${cliPath}" && npm install -g .`);
    return;
  }
  
  if (stderr) {
    console.error(stderr);
  }
  
  console.log(stdout);
  console.log('Filo CLI installed successfully!');
});