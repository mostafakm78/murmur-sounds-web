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

export default function FadeCountdown() {
  const fade = useSelector((state: RootState) => state.sound.fade);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!fade?.timestamp) {
      setRemainingTime(null);
      setVisible(true);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = fade.timestamp - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [fade?.timestamp]);

  useEffect(() => {
    if (remainingTime === 0) {
      const timeout = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [remainingTime]);

  if (remainingTime === null || !visible) return null;

  return <div className="text-center hidden lg:block font-medium text-sm text-foreground">{remainingTime > 0 ? `زمان باقی‌مانده تا توقف: ${formatRemainingTime(remainingTime)}` : 'صداها متوقف شدند'}</div>;
}
