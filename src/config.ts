import * as vscode from "vscode";
import Timezone from "./models/Timezone";

export function getConfiguration() {
  const configuration = vscode.workspace.getConfiguration("world-clock");

  return {
    timezones: configuration.get<Timezone[]>("timezones") || [
      { timezone: "UTC" },
    ],
    position: configuration.get<string>("position") || "right",
    displaySeconds: configuration.get<boolean>("displaySeconds", false),
    displayClockTitle: configuration.get<boolean>("displayClockTitle", false),
    priority: configuration.get<number>("priority") || 100,
    is24Hour: configuration.get<boolean>("is24Hour", false),
  };
}
