import * as vscode from "vscode";
import Timezone from "./models/Timezone";

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
    this.statusBarItem.command = "extension.openWorldClockSettings";
    this.statusBarItem.tooltip = "Click to open settings";
    this.updateTime();
  }

  private formatTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: this.timezone.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: this.displaySeconds ? "2-digit" : undefined,
      hour12: !this.is24Hour,
    };

    return now.toLocaleString("en-US", options);
  }

  private getDisplayTitle(): string | null {
    if (!this.displayClockTitle) return null;
    return this.timezone.title || this.timezone.timezone;
  }

  private updateTime() {
    const formattedDateTime = this.formatTime();
    const title = this.getDisplayTitle();

    this.statusBarItem.text = `${title ? title + " " : ""}${formattedDateTime}`;
  }

  // Start the interval to update the time every second
  public start() {
    this.updateTime();
    this.statusBarItem.show();
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
