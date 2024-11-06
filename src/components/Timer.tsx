import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
      <Clock className="w-5 h-5 text-purple-400" />
      <span className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
        {timeLeft}s
      </span>
    </div>
  );
};
export default Timer;