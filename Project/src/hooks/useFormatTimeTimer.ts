export function useFormatTimeTimer(time: number): string {
  const minutes = Math.floor(time / 60000);
  if (minutes > 0) {
    time = time % 60000;
  }
  const seconds = Math.floor(time / 1000);
  return `${minutes < 10 ? 0 : ""}${minutes}:${
    seconds < 10 ? 0 : ""
  }${seconds}`;
}
