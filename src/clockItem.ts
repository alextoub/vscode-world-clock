/// <reference types="node" />
import * as vscode from "vscode";
import Timezone from "./models/Timezone";

export class ClockItem {
  private statusBarItem: vscode.StatusBarItem;
  private defaultColor: string | vscode.ThemeColor | undefined;
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
    this.defaultColor = this.statusBarItem.color;
    this.updateTime();
  }

  private formatTime(now: Date): string {
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
    if (!this.displayClockTitle) return "";
    const title = this.timezone.title || this.timezone.timezone;
    return title ? title + " " : "";
  }

  private getWindowColor(formatted: string): string | vscode.ThemeColor | undefined {
    let hour = parseInt(
        formatted.substring(0, formatted.indexOf(":")));
    // xxx: safe to check "PM" because we currently have a hardcoded locale, and
    // 24hour has no suffix at all
    if (formatted.endsWith("PM")) {
        hour += hour % 12;
    }
    // just take the first match; it's incumbent on the user to define ranges
    // correctly
    const window = this.timezone
        .windows?.find(w => w.start <= hour && w.end > hour);
    return window?.color || this.defaultColor;
  }

  private updateTime() {
    const now = new Date();
    const formattedDateTime = this.formatTime(now);
    const color = this.getWindowColor(formattedDateTime);
    const title = this.getDisplayTitle();

    this.statusBarItem.text = `${title}${formattedDateTime}`;
    this.statusBarItem.color = color;
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
