// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { ClockItem } from "./clock_item";

export type Timezone = {
  timezone: string;
  title?: string;
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const configuration = vscode.workspace.getConfiguration("world-clock");

  const timezones: Timezone[] = configuration.get<Timezone[]>("timezones") || [
    { timezone: "UTC" },
  ];
  const position = configuration.get<string>("position") || "right";
  const displaySeconds: boolean = configuration.get("displaySeconds", false);

  const alignment =
    position === "right"
      ? vscode.StatusBarAlignment.Right
      : vscode.StatusBarAlignment.Left;
  const clockItems: ClockItem[] = [];

  // Create and start a ClockItem for each timezone
  timezones.forEach((timezone: Timezone, index) => {
    const clockItem = new ClockItem(
      timezone,
      displaySeconds,
      alignment,
      100 - index
    );
    clockItem.start();
    clockItems.push(clockItem);
    context.subscriptions.push(clockItem);
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
