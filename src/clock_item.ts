import * as vscode from "vscode";
import { Timezone } from "./extension";

export class ClockItem {
  private statusBarItem: vscode.StatusBarItem;
  private interval: NodeJS.Timeout | undefined;

  constructor(
    private timezone: Timezone,
    private displaySeconds: boolean,
    private displayClockTitle: boolean,
    private is24Hour: boolean,
    alignment: vscode.StatusBarAlignment,
    priority: number
  ) {
    this.statusBarItem = vscode.window.createStatusBarItem(alignment, priority);
    this.updateTime();
  }

  // Update the status bar with the current date and time for the specified timezone
  private updateTime() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: this.timezone.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: this.displaySeconds ? "2-digit" : undefined,
      hour12: !this.is24Hour,
    };

    const formattedDateTime = now.toLocaleString("en-US", options);
    const title = this.displayClockTitle
      ? this.timezone.title
        ? this.timezone.title
        : this.timezone.timezone
      : null;
    this.statusBarItem.text = `${title ? title + " " : ""}${formattedDateTime}`;
    this.statusBarItem.show();
  }

  // Start the interval to update the time every second
  public start() {
    this.updateTime();
    this.interval = setInterval(() => this.updateTime(), 1000);
  }

  // Dispose of the status bar item and clear the interval
  public dispose() {
    this.statusBarItem.dispose();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
