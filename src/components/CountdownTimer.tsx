// components/CountdownTimer.tsx
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): { days: number; hours: number; minutes: number; seconds: number } => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div>
      <p>{`${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}</p>
    </div>
  );
};

export default CountdownTimer;
