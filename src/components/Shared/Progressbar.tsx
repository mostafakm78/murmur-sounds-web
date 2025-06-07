'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    setProgress(0);
    setLoading(true);

    // شروع افزایش تدریجی درصد
    const step = () => {
      setProgress((prev) => {
        if (prev < 90) {
          const next = prev + Math.random() * 5;
          animationRef.current = requestAnimationFrame(step);
          return next;
        } else {
          return prev;
        }
      });
    };

    animationRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationRef.current!);
  }, [pathname]);

  // وقتی مسیر جدید رندر شد، نوار به 100% برود و محو شود
  useEffect(() => {
    if (loading) {
      const doneTimer = setTimeout(() => {
        setProgress(100);

        const hideTimer = setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 300);

        return () => clearTimeout(hideTimer);
      }, 500);

      return () => clearTimeout(doneTimer);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div dir='ltr' className="fixed top-0 right-0 w-full z-[9999]">
      <div className="h-[2px] bg-gradient-to-r from-blue-400 to-white dark:from-purple-500 dark:to-white transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}
