import * as vscode from "vscode";

export class ClockItem {
  private statusBarItem: vscode.StatusBarItem;
  private interval: NodeJS.Timeout | undefined;

  constructor(
    private timezone: string,
    alignment: vscode.StatusBarAlignment,
    priority: number
  ) {
    this.statusBarItem = vscode.window.createStatusBarItem(alignment, priority);
    this.updateTime();
  }

  // Update the status bar with the current date and time for the specified timezone
  private updateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString("en-US", {
      timeZone: this.timezone,
    });
    this.statusBarItem.text = `${this.timezone}: ${formattedDateTime}`;
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
