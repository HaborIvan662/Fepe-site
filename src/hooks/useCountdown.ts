import { useState, useEffect } from 'react';

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const useCountdown = (): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '30',
    seconds: '00'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const totalSeconds = parseInt(prevTime.minutes) * 60 + parseInt(prevTime.seconds);
        
        if (totalSeconds <= 0) {
          return {
            days: '00',
            hours: '00',
            minutes: '30',
            seconds: '00'
          };
        }

        const newTotalSeconds = totalSeconds - 1;
        const minutes = Math.floor(newTotalSeconds / 60);
        const seconds = newTotalSeconds % 60;

        return {
          days: '00',
          hours: '00',
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}; 