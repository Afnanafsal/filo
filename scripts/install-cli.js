import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';
import * as fs from 'fs';

export function activate(context) {
  const cliPath = path.join(context.extensionPath, 'cli');
  const indexJsPath = path.join(cliPath, 'index.js');

  // Make sure it's executable (for Unix)
  try {
    fs.chmodSync(indexJsPath, 0o755);
  } catch (e) {
    console.warn('Could not chmod CLI file:', e.message);
  }

  // Install the CLI globally
  exec(`npm install -g "${cliPath}"`, (error, stdout, stderr) => {
    if (error) {
      vscode.window.showErrorMessage(`❌ Filo CLI install failed: ${error.message}`);
      return;
    }
    vscode.window.showInformationMessage(`✅ Filo CLI installed globally! Use 'filo' in your terminal.`);
  });

  // Optional command in VS Code
  const disposable = vscode.commands.registerCommand('filo.createFiles', async () => {
    const input = await vscode.window.showInputBox({
      prompt: 'Enter folder/file to create (e.g. src/utils/helper.ts)',
    });

    if (input) {
      exec(`filo "${input}"`, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(`Filo Error: ${error.message}`);
        } else {
          vscode.window.showInformationMessage(stdout.trim() || '✅ File created');
        }
      });
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
