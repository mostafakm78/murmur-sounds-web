'use client';

import { RootState } from '@/app/store';
import { playSound, resetHasStarted, setEndAt, setGlobalPause, setHasStarted, setVolume } from '@/app/store/soundSlice';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EndAt() {
  const dispatch = useDispatch();

  // نگهداری رفرنس تایمر پایان
  const endTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // خواندن وضعیت‌ها از ریداکس
  const endAt = useSelector((state: RootState) => state.sound.endAt);
  const hasStarted = useSelector((state: RootState) => state.sound.hasStarted);
  const playing = useSelector((state: RootState) => state.sound.playing);
  const volumes = useSelector((state: RootState) => state.sound.volumes);

  // وضعیت داخلی ساعت و دقیقه برای ورودی‌های کاربر
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);

  // بررسی معتبر بودن حداقل یک صدای فعال با حجم بیشتر از صفر
  const isValidSound = Object.entries(playing).some(([id]) => volumes[+id] > 0);

  // تابع شروع پخش صداها از localStorage و تنظیم حجم‌ها
  const PlayMusic = () => {
    const saved = localStorage.getItem('activeSounds');
    const savedVolumes = localStorage.getItem('soundVolumes');

    if (saved) {
      const ids: number[] = JSON.parse(saved);
      const volumes: { [key: number]: number } = savedVolumes ? JSON.parse(savedVolumes) : {};

      ids.forEach((id) => {
        dispatch(playSound(id));
        if (volumes[id]) {
          dispatch(setVolume({ id, volume: volumes[id] }));
        }
      });

      toast({
        description: 'پخش صداهای انتخاب شده آغاز شد.',
      });
    } else {
      toast({
        description: 'هیچ صدایی انتخاب نشده است. لطفاً حداقل یک صدا را انتخاب کنید.',
      });
    }
  };

  // مدیریت تایمر پایان پخش صداها
  useEffect(() => {
    if (!endAt?.timestamp || hasStarted) return;

    const now = Date.now();
    const remaining = endAt.timestamp - now;

    if (remaining <= 0) {
      // اگر زمان پایان گذشته باشد، پخش را متوقف کن و اطلاع بده
      dispatch(setHasStarted());
      dispatch(setGlobalPause());
      toast({
        description: 'زمان پایان رسیده است. پخش صداها متوقف شد.',
      });
      return;
    }

    // پاک کردن تایمر قبلی در صورت وجود
    if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);

    // تنظیم تایمر جدید برای پایان پخش
    endTimeoutRef.current = setTimeout(() => {
      dispatch(setGlobalPause());
      toast({
        description: 'زمان پایان رسیده است. پخش صداها متوقف شد.',
      });
    }, remaining);

    // پاکسازی تایمر هنگام آن‌مونت شدن یا تغییر وابستگی‌ها
    return () => {
      if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
    };
  }, [endAt, dispatch, hasStarted]);

  // ذخیره و شروع تایمر پایان
  const handleSave = () => {
    if (hour === 0 && min === 0) {
      toast({
        description: 'لطفاً ساعت یا دقیقه را وارد کنید.',
      });
      return;
    }

    if (!isValidSound) {
      toast({
        description: 'لطفاً حداقل یک حجم صدا را انتخاب کنید.',
      });
      return;
    }

    dispatch(setEndAt({ hour, min }));

    PlayMusic();

    const titleHour = hour ? `${hour} ساعت و ` : '';
    const titleMin = min ? `${min} دقیقه` : '';

    toast({
      description: `صداها در ${titleHour} ${titleMin} دقیقه دیگر متوقف خواهند شد.`,
    });
  };

  // لغو تایمر پایان و توقف پخش
  const handleCancel = () => {
    setHour(0);
    setMin(0);
    if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);

    dispatch(resetHasStarted());
    dispatch(setEndAt(null));
    dispatch(setGlobalPause());

    toast({
      description: 'تایمر پایان لغو شد.',
    });
  };

  return (
    <div className="w-full gap-4 flex h-full flex-col justify-center items-center">
      {/* ورودی ساعت و دقیقه */}
      <div className="w-full xl:w-2/3 flex justify-around items-center">
        <input type="number" value={hour} onChange={(e) => setHour(Number(e.target.value))} id="hour" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" />
        <label htmlFor="hour" className="md:text-lg font-medium">
          ساعت و
        </label>
        <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} id="min" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" />
        <label htmlFor="min" className="md:text-lg font-medium">
          دقیقه
        </label>
      </div>

      {/* جداکننده بین ورودی‌ها و دکمه‌ها */}
      <Separator className="my-4 dark:bg-foreground/20" />

      {/* دکمه‌های انصراف و شروع */}
      <div className="flex items-center justify-between w-3/4">
        <button onClick={handleCancel} className="dark:bg-red-700 dark:text-foreground bg-red-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">
          انصراف
        </button>
        <button onClick={handleSave} className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">
          شروع
        </button>
      </div>
    </div>
  );
}
