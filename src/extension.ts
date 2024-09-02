import * as vscode from "vscode";
import { activateExtension } from "./activateLogic";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.openWorldClockSettings",
    () => {
      vscode.commands.executeCommand(
        "workbench.action.openSettings",
        "@ext:AlexandreToubiana.vscode-world-clock"
      );
    }
  );
  context.subscriptions.push(disposable);

  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("world-clock")) {
      activateExtension(context);
    }
  });

  activateExtension(context);
}

export function deactivate() {}
