import * as vscode from "vscode";
import { ClockItem } from "./clockItem";
import Timezone from "./models/Timezone";

export function createClockItems(
  timezones: Timezone[],
  displaySeconds: boolean,
  displayClockTitle: boolean,
  is24Hour: boolean,
  alignment: vscode.StatusBarAlignment,
  priority: number
): ClockItem[] {
  return timezones.map((timezone: Timezone, index: number) => {
    const clockItem = new ClockItem(
      timezone,
      displaySeconds,
      displayClockTitle,
      is24Hour,
      alignment,
      priority - index
    );
    clockItem.start();
    return clockItem;
  });
}
