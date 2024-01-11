// components/CountdownTimer.tsx
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  initialTargetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTargetDate }) => {
  const calculateTimeLeft = (targetDate: Date): { days: number; hours: number; minutes: number; seconds: number; } => {
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(initialTargetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(initialTargetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTargetDate]);

  return (
    <div className="flex justify-center items-center flex-wrap gap-4 my-8">
      <div className="all-font flex flex-col items-center">
        <p className="font-semibold text-gray-500  md:font-extrabold md:text-5xl ">{timeLeft.days}</p>
        <p className="text-xs text-gray-600  uppercase font-bold">Days</p>
      </div>
      <div className="all-font flex flex-col items-center">
        <p className="font-semibold text-gray-500  md:font-extrabold md:text-5xl ">{timeLeft.hours}</p>
        <p className="text-xs text-gray-600  uppercase font-bold">Hours</p>
      </div>
      <div className="all-font flex flex-col items-center">
        <p className="font-semibold text-gray-500  md:font-extrabold md:text-5xl">{timeLeft.minutes}</p>
        <p className="text-xs text-gray-600  uppercase font-bold">Minutes</p>
      </div>
      <div className="all-font flex flex-col items-center">
        <p className="font-semibold text-gray-500  md:font-extrabold md:text-5xl">{timeLeft.seconds}</p>
        <p className="text-xs text-gray-600  uppercase font-bold">Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
