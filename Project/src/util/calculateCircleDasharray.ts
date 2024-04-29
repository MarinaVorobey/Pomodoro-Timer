export function calculateCircleDasharray(
  timeLeft: number,
  timePassed: number
): string {
  const total: number = timePassed + timeLeft;
  const rawTimeFraction: number = timeLeft / total;
  const timeFraction: number =
    rawTimeFraction - (1 / total) * (1 - rawTimeFraction);
  return `${(timeFraction * 283).toFixed(0)} 283`;
}
