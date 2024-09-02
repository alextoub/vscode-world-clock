import * as vscode from "vscode";
import { getConfiguration } from "./config";
import { createClockItems } from "./clockItemFactory";

export function activateExtension(context: vscode.ExtensionContext) {
  const {
    timezones,
    position,
    displaySeconds,
    displayClockTitle,
    priority,
    is24Hour,
  } = getConfiguration();

  const alignment =
    position === "right"
      ? vscode.StatusBarAlignment.Right
      : vscode.StatusBarAlignment.Left;

  createClockItems(
    context,
    timezones,
    displaySeconds,
    displayClockTitle,
    is24Hour,
    alignment,
    priority
  );
}
