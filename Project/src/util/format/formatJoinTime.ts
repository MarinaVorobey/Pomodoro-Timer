export function formatJoinTime(min: number, sec: number): number {
  return min * 60000 + sec * 1000;
}
