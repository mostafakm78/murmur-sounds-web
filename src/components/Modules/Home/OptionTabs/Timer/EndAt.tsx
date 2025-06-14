'use client';

import { RootState } from '@/app/store';
import { playSound, resetHasStarted, setEndAt, setGlobalPause, setHasStarted, setVolume } from '@/app/store/soundSlice';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export default function EndAt() {
  const dispatch = useDispatch();

  const endTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { endAt, hasStarted, volumes } = useSelector(
    (state: RootState) => ({
      endAt: state.sound.endAt,
      hasStarted: state.sound.hasStarted,
      playing: state.sound.playing,
      volumes: state.sound.volumes,
    }),
    shallowEqual
  );

  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);

  const isValidSound = useMemo(() => {
    return Object.entries(volumes).some(([id]) => (volumes[+id] ?? 0) > 0);
  }, [volumes]);

  const PlayMusic = useCallback(() => {
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
  }, [dispatch]);

  useEffect(() => {
    if (!endAt?.timestamp || hasStarted) return;

    const now = Date.now();
    const remaining = endAt.timestamp - now;

    if (remaining <= 0) {
      dispatch(setHasStarted());
      dispatch(setGlobalPause());
      toast({
        description: 'زمان پایان رسیده است. پخش صداها متوقف شد.',
      });
      return;
    }

    if (endTimeoutRef.current) {
      clearTimeout(endTimeoutRef.current);
      setHour(0);
      setMin(0);
    }

    endTimeoutRef.current = setTimeout(() => {
      dispatch(setGlobalPause());
      toast({
        description: 'زمان پایان رسیده است. پخش صداها متوقف شد.',
      });
    }, remaining);

    return () => {
      if (endTimeoutRef.current) {
        clearTimeout(endTimeoutRef.current);
      }
    };
  }, [endAt, dispatch, hasStarted]);

  const handleSave = useCallback(() => {
    if (hour < 0 || min < 0) {
      toast({
        description: 'مقادیر ساعت و دقیقه نمی‌توانند منفی باشند.',
      });
      return;
    }

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
      description: `صداها در ${titleHour}${titleMin} دیگر متوقف خواهند شد.`,
    });
  }, [hour, min, isValidSound, dispatch, PlayMusic]);

  const handleCancel = useCallback(() => {
    setHour(0);
    setMin(0);
    if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);

    dispatch(resetHasStarted());
    dispatch(setEndAt(null));
    dispatch(setGlobalPause());

    toast({
      description: 'تایمر پایان لغو شد.',
    });
  }, [dispatch]);

  return (
    <div className="w-full gap-4 flex h-full flex-col justify-center items-center">
      <div className="w-full xl:w-2/3 flex justify-around items-center">
        <input type="number" min={0} value={hour} onChange={(e) => setHour(Math.max(0, Number(e.target.value)))} id="hour" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg" />
        <label htmlFor="hour" className="md:text-lg font-medium">
          ساعت و
        </label>
        <input type="number" min={0} value={min} onChange={(e) => setMin(Math.max(0, Number(e.target.value)))} id="min" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg" />
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
