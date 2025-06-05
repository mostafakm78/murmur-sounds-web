import { useEffect, useState } from 'react';

// ساختار هر میکس ذخیره‌شده
export interface SavedMix {
  name: string; // نام میکس
  sounds: { [key: number]: number }; // صدای هر ترک با کلید عددی و مقدار ولوم
  createdAt: number; // تاریخ ساخت به صورت timestamp
}

// هوک برای مدیریت میکس‌های ذخیره شده در localStorage
export default function useSavedMixes() {
  // استیت برای نگهداری آرایه میکس‌ها
  const [mixes, setMixes] = useState<SavedMix[]>([]);

  // بارگذاری میکس‌ها از localStorage هنگام mount کامپوننت
  useEffect(() => {
    const saved = localStorage.getItem('savedMixes');
    if (saved) {
      try {
        setMixes(JSON.parse(saved));
      } catch (err) {
        console.error('Invalid JSON in savedMixes', err);
        setMixes([]); // اگر JSON نامعتبر بود، لیست را خالی کن
      }
    }
  }, []);

  // تابع افزودن میکس جدید به آرایه و ذخیره در localStorage
  const addMix = (newMix: SavedMix) => {
    const updated = [...mixes, newMix];
    localStorage.setItem('savedMixes', JSON.stringify(updated));
    setMixes(updated);
  };

  // تابع حذف یک میکس بر اساس ایندکس و به‌روزرسانی localStorage
  const deleteMix = (index: number) => {
    const updated = mixes.filter((_, i) => i !== index);
    localStorage.setItem('savedMixes', JSON.stringify(updated));
    setMixes(updated);
  };

  // تابع پاک‌کردن کامل لیست میکس‌ها و حذف از localStorage
  const clearMixes = () => {
    localStorage.removeItem('savedMixes');
    setMixes([]);
  };

  // بازگشت داده‌ها و توابع مدیریت میکس‌ها
  return { mixes, addMix, deleteMix, clearMixes };
}
