export function formatSplitTime(time: number): [number, number] {
  const minutes = Math.floor(time / 60000);
  const seconds = (time % 60000) / 1000;
  return [minutes, seconds];
}
