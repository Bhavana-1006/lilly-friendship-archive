import { useState, useEffect } from 'react';
import { calculateFriendshipDuration, padZero } from '../utils/dateCounter';

export function useFriendshipCounter(startDateString) {
  const [duration, setDuration] = useState(() => 
    calculateFriendshipDuration(startDateString)
  );

  useEffect(() => {
    // Initial compute
    setDuration(calculateFriendshipDuration(startDateString));

    // Update every second
    const interval = setInterval(() => {
      setDuration(calculateFriendshipDuration(startDateString));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateString]);

  return {
    ...duration,
    formattedHours: padZero(duration.hours),
    formattedMinutes: padZero(duration.minutes),
    formattedSeconds: padZero(duration.seconds)
  };
}
