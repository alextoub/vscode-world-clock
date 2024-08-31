# World Clock VSCode Extension

## Purpose

The World Clock VSCode Extension adds a customizable clock to your Visual Studio Code status bar. It allows you to display the current time in different timezones, with options to show seconds, use a 24-hour format, and customize the display format. This extension is useful for developers working across multiple timezones or who need to keep track of time in different regions.

## Features

- Display the current time for multiple timezones.
- Customizable display options including:
  - Show/hide seconds
  - Use 12-hour or 24-hour format
  - Custom time format
- Optionally display a title for each clock in the status bar.
- Configure the position of the clock (left or right) in the status bar.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for "World Clock" and install the extension.

## Configuration

You can configure the extension using the following settings in your `settings.json` file:

```json
{
  "world-clock.timezones": [
    { "timezone": "UTC", "title": "UTC" },
    { "timezone": "America/New_York", "title": "NY" },
    { "timezone": "Europe/Paris" },
    { "timezone": "Asia/Tokyo", "title": "Tokyo" }
  ],
  "world-clock.position": "left", // Options: "left" or "right"
  "world-clock.displaySeconds": true, // Whether to show seconds
  "world-clock.displayClockTitle": true, // Whether to show the title
  "world-clock.priority": 100, // Priority for status bar items (lower numbers are higher priority)
  "world-clock.is24Hour": false, // Whether to use 24-hour format
  "world-clock.customTimeFormat": "" // Custom time format string (e.g., "HH:mm:ss")
}
```

## Example

To display clocks for New York and Tokyo on the right side of the status bar, with seconds shown and using 24-hour format:

```json
{
  "world-clock.timezones": [
    { "timezone": "America/New_York", "title": "NY" },
    { "timezone": "Asia/Tokyo", "title": "Tokyo" }
  ],
  "world-clock.position": "right",
  "world-clock.displaySeconds": true,
  "world-clock.displayClockTitle": true,
  "world-clock.is24Hour": true
}
```

## Contributing

Contributions are welcome!
To contribute:

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page on GitHub to create your own copy of the repository.
2. **Clone your fork**: Clone your forked repository to your local machine (`git clone https://github.com/alextoub/vscode-world-clock.git`).
3. **Create a new branch**: Create a new branch for your feature or fix (`git checkout -b feature/your-feature-name`).
4. **Make your changes**: Implement your changes or new features.
5. **Commit your changes**: Commit your changes with a descriptive message (`git commit -am 'Add new feature'`).
6. **Push to your fork**: Push your changes to your forked repository (`git push origin feature/your-feature-name`).
7. **Create a Pull Request**: Open a Pull Request on the original repository, describing your changes and why they should be merged.

Please make sure to follow the coding style used in the project and include tests for any new features or bug fixes.
