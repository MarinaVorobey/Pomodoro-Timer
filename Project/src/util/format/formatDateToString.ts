export function formatDateToString(date: Date): string {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1).toString()
  }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;
}
