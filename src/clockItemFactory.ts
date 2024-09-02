import * as vscode from "vscode";
import { ClockItem } from "./clockItem";
import Timezone from "./models/Timezone";
import { isValidTimezone } from "./utils";

let clockItems: ClockItem[] = [];

export function createClockItems(
  context: vscode.ExtensionContext,
  timezones: Timezone[],
  displaySeconds: boolean,
  displayClockTitle: boolean,
  is24Hour: boolean,
  alignment: vscode.StatusBarAlignment,
  priority: number
) {
  clockItems.forEach((item) => item.dispose());
  clockItems = [];

  timezones.forEach((timezone: Timezone, index: number) => {
    if (isValidTimezone(timezone.timezone)) {
      const clockItem = new ClockItem(
        timezone,
        displaySeconds,
        displayClockTitle,
        is24Hour,
        alignment,
        priority - index
      );

      clockItem.start();
      clockItems.push(clockItem);
      context.subscriptions.push(clockItem);
    }
  });
}
