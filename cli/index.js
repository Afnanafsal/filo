#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Get the command line arguments (skipping node and script name)
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
    Usage: filo <path/to/file.ext>

    Description:
        A simple CLI tool to create a file along with its directory structure.

    Options:
        --help, -h    Show this help message and exit.
        --version, -v Show the version of the tool.

    Example:
        filo folder/subfolder/file.js
    `);
    process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
    console.log('filo version 1.0.0');
    console.log('created by afnan');
    process.exit(0);
}

// The file path argument
const filePath = args[0];

// Get current working directory
const cwd = process.cwd();

// Create the full path
const fullPath = path.join(cwd, filePath);

// Extract the directory part
const dirPath = path.dirname(fullPath);

// Function to create directory recursively
function createDirectoryRecursively(targetDir) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  
  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(parentDir, childDir);
    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
      console.log(`Created directory: ${path.relative(cwd, curDir)}`);
    }
    return curDir;
  }, initDir);
}

// Create the directory structure if it doesn't exist
try {
  createDirectoryRecursively(dirPath);
} catch (err) {
  console.error(`Error creating directories: ${err.message}`);
  process.exit(1);
}

// Check if file exists
if (fs.existsSync(fullPath)) {
  console.log(`File already exists: ${filePath}`);
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Do you want to overwrite it? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      try {
        fs.writeFileSync(fullPath, '', 'utf8');
        console.log(`Overwritten file: ${filePath}`);
      } catch (err) {
        console.error(`Error creating file: ${err.message}`);
      }
    } else {
      console.log('Operation cancelled.');
    }
    rl.close();
  });
} else {
  // Create the file
  try {
    fs.writeFileSync(fullPath, '', 'utf8');
    console.log(`Created file: ${filePath}`);
  } catch (err) {
    console.error(`Error creating file: ${err.message}`);
    process.exit(1);
  }
}