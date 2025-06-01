'use client';

import { playSound, resetHasStarted, setHasStarted, setStartAt, setVolume } from '@/app/store/soundSlice';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export default function StartAt() {
  const dispatch = useDispatch();
  const startAt = useSelector((state: RootState) => state.sound.startAt);
  const hasStarted = useSelector((state: RootState) => state.sound.hasStarted);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);

  const handleSave = () => {
    if (hour === 0 && min === 0) {
      toast({
        description: 'لطفاً ساعت یا دقیقه را وارد کنید.',
      });
      return;
    }

    dispatch(setStartAt({ hour, min }));

    toast({
      description: `صداها در ${hour} ساعت و ${min} دقیقه دیگر پخش خواهند شد.`,
    });
  };

  const handleCancel = () => {
    setHour(0);
    setMin(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    dispatch(setStartAt(null));
    dispatch(resetHasStarted());

    toast({
      description: 'تایمر لغو شد.',
    });
  };

  useEffect(() => {
    if (!startAt || !startAt.timestamp || hasStarted) return;

    const now = Date.now();
    const remaining = startAt.timestamp - now;

    const playFromStorageOrRandom = () => {
      const saved = localStorage.getItem('activeSounds');
      const savedVolumes = localStorage.getItem('soundVolumes');

      if (saved) {
        const ids: number[] = JSON.parse(saved);
        const volumes: { [key: number]: number } = savedVolumes ? JSON.parse(savedVolumes) : {};
        ids.forEach((id) => {
          dispatch(playSound(id));
          if (volumes[id] !== undefined) {
            dispatch(setVolume({ id, volume: volumes[id] }));
          }
        });

        toast({ description: 'پخش صداهای انتخاب‌شده آغاز شد.' });
      } else {
        toast({ description: 'هیچ صدایی انتخاب نشده است. لطفاً حداقل یک صدا را انتخاب کنید.' });
      }
    };

    if (remaining <= 0) {
      dispatch(setHasStarted());
      playFromStorageOrRandom();
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      playFromStorageOrRandom();
    }, remaining);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startAt, dispatch , hasStarted]);

  return (
    <div className="w-full gap-4 flex h-full flex-col justify-center items-center">
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
      <Separator className="my-4 dark:bg-foreground/20" />
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
