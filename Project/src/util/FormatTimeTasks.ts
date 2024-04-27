export function FormatTimeTasks(time: number): string {
  const hours = Math.floor(time / 3600000);
  if (hours > 0) {
    time = time % 3600000;
  }
  const minutes = Math.floor(time / 60000);
  if (minutes > 0) {
    time = time % 60000;
  }
  return `${hours > 0 ? hours + " " : ""}${
    hours > 1 ? "часов " : hours > 0 ? "час " : ""
  }${minutes > 0 ? minutes + " мин" : ""}`.trim();
}
