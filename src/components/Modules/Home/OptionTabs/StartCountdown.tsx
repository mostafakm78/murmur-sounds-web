'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useState } from 'react';

function formatRemainingTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function StartCountdown() {
  const startAt = useSelector((state: RootState) => state.sound.startAt);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    if (!startAt?.timestamp) return setRemainingTime(null);

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = startAt.timestamp - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startAt?.timestamp]);

  if (remainingTime === null) return null;

  return (
    <div className="text-center font-medium text-sm text-foreground">
      {remainingTime > 0
        ? `زمان باقی‌مانده: ${formatRemainingTime(remainingTime)}`
        : 'پخش صداها آغاز شد'}
    </div>
  );
}
