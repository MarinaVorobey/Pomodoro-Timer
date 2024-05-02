const MILLISECONDS_IN_A_WEEK = 604800000;
const MILLISECONDS_IN_A_DAY = 86400000;

export function getWeekStart(
  date: Date,
  weekDay: number,
  weeksAgo: number
): Date {
  const startOfWeek =
    weekDay === 0
      ? MILLISECONDS_IN_A_DAY * 6
      : MILLISECONDS_IN_A_DAY * (weekDay - 1);
  return new Date(
    date.getTime() - (startOfWeek + MILLISECONDS_IN_A_WEEK * weeksAgo)
  );
}
