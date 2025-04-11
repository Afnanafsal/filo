import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  const cliPath = path.join(context.extensionPath, 'cli');
  const indexJsPath = path.join(cliPath, 'index.js');

  const outputChannel = vscode.window.createOutputChannel("Filo");
  outputChannel.show(true);
  outputChannel.appendLine("🔧 Activating Filo extension...");
  outputChannel.appendLine("🔍 Checking if 'filo' CLI is installed...");

  const checkCommand = process.platform === 'win32' ? 'where filo' : 'which filo';

  exec(checkCommand, (error, stdout) => {
    const installed = stdout && stdout.toLowerCase().includes('filo');

    if (!installed) {
      outputChannel.appendLine("❌ 'filo' not found. Installing...");

      try {
        fs.chmodSync(indexJsPath, 0o755);
        outputChannel.appendLine("🔐 Set CLI executable permission.");
      } catch (e) {
        outputChannel.appendLine(`⚠️ chmod failed: ${e}`);
      }

      exec(`npm install -g "${cliPath}"`, (err, out, errOut) => {
        if (err) {
          outputChannel.appendLine(`❌ Install failed: ${err.message}`);
          vscode.window.showErrorMessage("Filo CLI failed to install.");
        } else {
          outputChannel.appendLine("✅ Filo CLI installed globally.");

          // 🔁 Reload window silently on first install
          const firstRun = !context.globalState.get('filoFirstInstalled');
          if (firstRun) {
            context.globalState.update('filoFirstInstalled', true);
            outputChannel.appendLine("🔁 First-time setup complete. Reloading window...");
            vscode.commands.executeCommand('workbench.action.reloadWindow');
          }
        }
      });

    } else {
      outputChannel.appendLine("✅ 'filo' is already installed.");
    }
  });
}

export function deactivate() {}
