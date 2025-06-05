'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useState } from 'react';

// نوع تایمرهای مجاز به عنوان پراپ
type CountdownType = 'start' | 'fade' | 'end';

// تابع کمکی برای فرمت میلی‌ثانیه به "دقیقه:ثانیه"
function formatRemainingTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// تعریف نوع پراپ‌ها برای کامپوننت
interface CountdownProps {
  type: CountdownType;
}

export default function CombinedCountdown({ type }: CountdownProps) {
  /**
   * بر اساس نوع تایمر، مقدار timestamp مربوطه را از redux store انتخاب می‌کنیم
   * هر timestamp نمایانگر زمانی است که شمارش معکوس به آن می‌رسد
   */
  const timestamp: number | undefined = useSelector((state: RootState) => {
    switch (type) {
      case 'start':
        return state.sound.startAt?.timestamp;
      case 'fade':
        return state.sound.fade?.timestamp;
      case 'end':
        return state.sound.endAt?.timestamp;
      default:
        return undefined;
    }
  });

  // وضعیت باقی‌مانده زمان (ms) تا رسیدن به timestamp
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  // وضعیت نمایش کامپوننت (برای محو شدن بعد از پایان شمارش)
  const [visible, setVisible] = useState<boolean>(true);

  // به‌روزرسانی باقی‌مانده زمان هر ثانیه
  useEffect(() => {
    // اگر timestamp وجود نداشته باشد، مقداردهی اولیه انجام شود
    if (!timestamp) {
      setRemainingTime(null);
      setVisible(true);
      return;
    }

    // تنظیم یک interval برای بروزرسانی هر ثانیه
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = timestamp - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(diff);
      }
    }, 1000);

    // پاکسازی interval هنگام unmount یا تغییر timestamp
    return () => clearInterval(interval);
  }, [timestamp]);

  // وقتی شمارش معکوس به صفر رسید، بعد از 2 ثانیه کامپوننت محو شود
  useEffect(() => {
    if (remainingTime === 0) {
      const timeout = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [remainingTime]);

  // اگر هیچ تایمری فعال نیست یا کامپوننت مخفی است، چیزی نمایش داده نمی‌شود
  if (remainingTime === null || !visible) return null;

  // متن نمایشی متناسب با نوع تایمر و وضعیت باقی‌مانده زمان
  let displayText: string;
  if (remainingTime > 0) {
    displayText = type === 'start' ? `زمان باقی‌مانده: ${formatRemainingTime(remainingTime)}` : `زمان باقی‌مانده تا توقف: ${formatRemainingTime(remainingTime)}`;
  } else {
    displayText = type === 'start' ? 'پخش صداها آغاز شد' : 'صداها متوقف شدند';
  }

  return (
    <div className="text-center hidden lg:block font-medium text-sm text-foreground" aria-live="polite" role="status">
      {displayText}
    </div>
  );
}
