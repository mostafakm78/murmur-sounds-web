'use client';

import { cn } from '@/lib/utils'; // تابع ترکیب کلاس‌ها (className) با قابلیت merge
import { Slider } from '../ui/slider'; // اسلایدر UI آماده (احتمالاً از shadcn)
import { useDispatch, useSelector } from 'react-redux'; // هوک‌های ریداکس
import { RootState } from '@/app/store'; // تایپ وضعیت کلی استور
import { setGlobalVolume } from '@/app/store/soundSlice'; // اکشن برای تغییر حجم صدای کلی

// تعریف نوع پراپ‌هایی که به اسلایدر داده می‌شن
type SliderProps = React.ComponentProps<typeof Slider>;

// کامپوننت اسلایدر برای تنظیم حجم کلی صدا در هدر
export function SliderHeader({ className, ...props }: SliderProps) {
  const dispatch = useDispatch(); // مقداردهی به دیسپچ برای ارسال اکشن
  const globalVolume = useSelector((state: RootState) => state.sound.globalVolume); // دریافت مقدار حجم صدا از استیت

  // تابع هندل تغییر مقدار اسلایدر
  const handleChange = (value: number[]) => {
    dispatch(setGlobalVolume(value[0])); // ارسال مقدار جدید به ریداکس
  };

  return (
    <Slider
      value={[globalVolume]} // مقدار فعلی اسلایدر
      onValueChange={handleChange} // تابع هنگام تغییر
      max={100} // حداکثر مقدار
      step={1} // فاصله بین قدم‌ها
      className={cn('w-[60%]', className)} // ترکیب کلاس پایه و کلاس‌های اضافی
      {...props} // سایر پراپ‌های دریافت شده
    />
  );
}
