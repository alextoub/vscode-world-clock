interface Window {
  /// color override to apply during the window, a six-character hex string
  color: string;
  /// when the window begins, inclusive, an hour (0-23)
  start: number;
  /// when the window ends, exclusive, an hour (1-24)
  end: number;
}

export default Window;
