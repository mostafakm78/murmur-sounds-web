'use client';

import { Slidertwo } from '@/components/ui/slidertwo';
import { cn } from '@/lib/utils';
import { SliderProps } from '@radix-ui/react-slider';
import { useDispatch, useSelector } from 'react-redux';
import { setVolume } from '@/app/store/soundSlice';
import { RootState } from '@/app/store';

// تعریف نوع پراپ‌ها برای این اسلایدر
type Props = {
  soundId: number; // شناسه‌ی صدایی که این اسلایدر مربوط به آن است
} & SliderProps;

export function SliderSounds({ soundId, className, ...props }: Props) {
  const dispatch = useDispatch();

  // گرفتن مقدار فعلی ولوم از استیت با استفاده از soundId
  const volume = useSelector((state: RootState) => state.sound.volumes[soundId] ?? 0);

  // هندل تغییر ولوم در اسلایدر
  const handleChange = (value: number[]) => {
    dispatch(setVolume({ id: soundId, volume: value[0] }));
  };

  return (
    <Slidertwo
      value={[volume]} // مقدار فعلی ولوم
      onValueChange={handleChange} // اجرای اکشن هنگام تغییر
      max={100} // حداکثر ولوم
      step={1} // گام هر بار حرکت اسلایدر
      className={cn('w-[70%]', className)} // ترکیب کلاس پیش‌فرض با کلاس دریافتی
      {...props} // سایر پراپ‌ها
    />
  );
}
