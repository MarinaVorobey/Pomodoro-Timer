export function formatTimeStatsMain(time: number) {
  const hours = Math.floor(time / 3600000);
  if (hours > 0) {
    time = time % 3600000;
  }

  let minutes = Math.floor(time / 60000);
  if (minutes == 0 && Math.ceil(time / 60000) == 1) {
    minutes = 1;
  }
  const strMinutes = minutes.toString();

  return `${hours > 0 ? hours + " " : ""}${
    hours > 1 ? "часов " : hours > 0 ? "часа " : ""
  }${minutes > 0 ? minutes + " " : ""}${
    strMinutes[strMinutes.length - 1] === "1" ? "минуты" : "минут"
  }`.trim();
}
