'use client';

import { useEffect, useRef, useState, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { playSound, resetHasStarted, setHasStarted, setStartAt, setVolume } from '@/app/store/soundSlice';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function StartAt() {
  const dispatch = useDispatch();

  const startAt = useSelector((state: RootState) => state.sound.startAt);
  const hasStarted = useSelector((state: RootState) => state.sound.hasStarted);
  const playing = useSelector((state: RootState) => state.sound.playing);
  const volumes = useSelector((state: RootState) => state.sound.volumes);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  // چک می‌کنیم حداقل یک صدای فعال با ولوم > 0 هست
  const isValidSound = Object.entries(playing).some(([id]) => (volumes[+id] ?? 0) > 0);

  // کنترل تغییر عددی ورودی‌ها با محدودیت روی عدد منفی
  const handleHourChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(0, Number(e.target.value));
    setHour(val);
  }, []);

  const handleMinChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(0, Number(e.target.value));
    setMin(val);
  }, []);

  const handleSave = useCallback(() => {
    if (hour === 0 && min === 0) {
      toast({ description: 'لطفاً ساعت یا دقیقه را وارد کنید.' });
      return;
    }
    if (!isValidSound) {
      toast({ description: 'لطفاً حداقل یک حجم صدا را انتخاب کنید.' });
      return;
    }

    dispatch(setStartAt({ hour, min }));

    toast({
      description: `صداها در ${hour ? `${hour} ساعت و ` : ''}${min ? `${min} دقیقه` : ''} دیگر پخش خواهند شد.`,
    });
  }, [hour, min, dispatch, isValidSound]);

  const handleCancel = useCallback(() => {
    setHour(0);
    setMin(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    dispatch(setStartAt(null));
    dispatch(resetHasStarted());
    toast({ description: 'تایمر لغو شد.' });
  }, [dispatch]);

  useEffect(() => {
    if (!startAt?.timestamp || hasStarted) return;

    const now = Date.now();
    const remaining = startAt.timestamp - now;

    const playSounds = () => {
      const saved = localStorage.getItem('activeSounds');
      const savedVolumes = localStorage.getItem('soundVolumes');

      if (saved) {
        const ids: number[] = JSON.parse(saved);
        const volumes: Record<number, number> = savedVolumes ? JSON.parse(savedVolumes) : {};

        ids.forEach((id) => {
          dispatch(playSound(id));
          if (volumes[id] !== undefined) dispatch(setVolume({ id, volume: volumes[id] }));
        });

        toast({ description: 'پخش صداهای انتخاب‌شده آغاز شد.' });
      } else {
        toast({ description: 'هیچ صدایی انتخاب نشده است. لطفاً حداقل یک صدا را انتخاب کنید.' });
      }
    };

    if (remaining <= 0) {
      dispatch(setHasStarted());
      playSounds();
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      dispatch(setHasStarted());
      playSounds();
    }, remaining);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startAt, hasStarted, dispatch]);

  return (
    <div className="w-full gap-4 flex h-full flex-col justify-center items-center">
      <div className="w-full xl:w-2/3 flex justify-around items-center">
        <input type="number" id="hour" min={0} value={hour} onChange={handleHourChange} className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" aria-label="ساعت" />
        <label htmlFor="hour" className="md:text-lg font-medium">
          ساعت و
        </label>
        <input type="number" id="min" min={0} value={min} onChange={handleMinChange} className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" aria-label="دقیقه" />
        <label htmlFor="min" className="md:text-lg font-medium">
          دقیقه
        </label>
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      <div className="flex items-center justify-between w-3/4">
        <button onClick={handleCancel} className="dark:bg-red-700 dark:text-foreground bg-red-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium" type="button" aria-label="لغو تایمر">
          انصراف
        </button>
        <button onClick={handleSave} className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium" type="button" aria-label="شروع تایمر">
          شروع
        </button>
      </div>
    </div>
  );
}
