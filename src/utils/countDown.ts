import { differenceInMilliseconds, formatDuration, intervalToDuration } from 'date-fns'

export const calculateTimeLeft = () => {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 30);

  const difference = differenceInMilliseconds(futureDate, currentDate);
  const duration = intervalToDuration({start: 0, end: difference})

  const activeDate = {
    days: duration.days || 0,
    hours: duration.hours || 0,
    minutes: duration.minutes || 0,
    seconds: duration.seconds || 0,
  }
  return activeDate;
}