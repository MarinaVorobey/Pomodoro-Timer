export function formatTimeTasks(time: number): string {
  const hours = Math.floor(time / 3600000);
  if (hours > 0) {
    time = time % 3600000;
  }
  let minutes = Math.floor(time / 60000);
  if (minutes === 0 && Math.ceil(time / 60000) === 1) {
    minutes = 1;
  }
  return `${hours > 0 ? hours + " " : ""}${
    hours > 1 ? "часов " : hours > 0 ? "час " : ""
  }${minutes > 0 ? minutes + " мин" : ""}`.trim();
}
