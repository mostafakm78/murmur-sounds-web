'use client';

import { useCallback, useMemo, useState, useRef, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

import { playSound, setVolume, setFade, resetHasStarted, setHasStarted } from '@/app/store/soundSlice';

import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { toast } from '@/hooks/use-toast';
import { defaultMixes } from '@/lib/defaultMixes';
import useSavedMixes from '@/hooks/useSavedMixes';

type MixVolumes = { [id: number]: number };

const volumesFromMixName = (name: string, allMixes: { name: string; sounds: MixVolumes }[]): MixVolumes => allMixes.find((m) => `mix-${m.name}` === name)?.sounds ?? {};

export default function FadeTimer() {
  const dispatch = useDispatch();

  const volumes = useSelector((state: RootState) => state.sound.volumes);
  const { mixes } = useSavedMixes();
  const allMixes = useMemo(() => [...defaultMixes, ...mixes], [mixes]);

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  const [startSel, setStartSel] = useState<string>('current');
  const [endSel, setEndSel] = useState<string>('silent');

  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const isValidSound = useMemo(() => {
    return Object.entries(volumes).some(([id]) => (volumes[+id] ?? 0) > 0);
  }, [volumes]);

  // اجرای فید ولوم‌ها به صورت تدریجی با قابلیت لغو
  const fadeVolumesOverTime = useCallback(
    (startVolumes: MixVolumes, endVolumes: MixVolumes, durationMs: number) => {
      if (fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
      }

      const startTime = Date.now();
      const interval = 100;

      const allIds = Array.from(new Set([...Object.keys(startVolumes), ...Object.keys(endVolumes)]));

      fadeTimerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        allIds.forEach((idStr) => {
          const id = +idStr;
          const from = startVolumes[id] ?? 0;
          const to = endVolumes[id] ?? 0;
          const current = Math.round(from + (to - from) * progress);
          dispatch(setVolume({ id, volume: current }));
        });

        if (progress === 1) {
          clearInterval(fadeTimerRef.current!);
          fadeTimerRef.current = null;
          dispatch(setHasStarted());
          setHour(0);
          setMin(0);
          toast({
            description: 'زمان پایان رسیده است. پخش صداها متوقف شد.',
          });
        }
      }, interval);
    },
    [dispatch]
  );

  const onSave = useCallback(() => {
    if (hour === 0 && min === 0) {
      toast({ description: 'لطفاً ساعت یا دقیقه را وارد کنید.' });
      return;
    }

    if (startSel === endSel) {
      toast({ description: 'حالت شروع و پایان نمی‌تواند یکسان باشد.' });
      return;
    }

    let startVolumes: MixVolumes = {};
    let endVolumes: MixVolumes = {};

    if (endSel === 'current' && !isValidSound && !isMobile) {
      toast({ description: 'لطفاً حداقل یک حجم صدا را برای حالت فعلی انتخاب کنید.' });
      return;
    } else if (startSel === 'current' && !isValidSound && !isMobile) {
      toast({ description: 'لطفاً حداقل یک حجم صدا را برای حالت فعلی انتخاب کنید.' });
      return;
    }

    if (startSel === 'current') {
      const saved = localStorage.getItem('soundVolumes');
      startVolumes = saved ? JSON.parse(saved) : {};
    } else if (startSel.startsWith('mix-')) {
      startVolumes = volumesFromMixName(startSel, allMixes);
    } else if (startSel === 'silent') {
      const endVols = endSel.startsWith('mix-') ? volumesFromMixName(endSel, allMixes) : volumes;
      Object.keys(endVols).forEach((id) => {
        startVolumes[+id] = 0;
      });
    }

    if (endSel === 'current') {
      endVolumes = volumes;
    } else if (endSel.startsWith('mix-')) {
      endVolumes = volumesFromMixName(endSel, allMixes);
    } else if (endSel === 'silent') {
      Object.keys(startVolumes).forEach((id) => {
        endVolumes[+id] = 0;
      });
    }

    const allIds = Array.from(new Set([...Object.keys(startVolumes), ...Object.keys(endVolumes)]));

    allIds.forEach((idStr) => {
      const id = +idStr;
      dispatch(playSound(id));
      dispatch(setVolume({ id, volume: startVolumes[id] ?? 0 }));
    });

    const durationMs = (hour * 3600 + min * 60) * 1000;

    fadeVolumesOverTime(startVolumes, endVolumes, durationMs);

    dispatch(setFade({ hour, min, from: startSel, to: endSel }));

    toast({
      description: `فید صدا از "${startSel}" به "${endSel}" در ${hour ? `${hour} ساعت` : ''} ${min ? `${min} دقیقه` : ''} آغاز شد.`,
    });
  }, [dispatch, hour, min, startSel, endSel, allMixes, volumes, fadeVolumesOverTime, isValidSound, isMobile]);

  const onCancel = useCallback(() => {
    setHour(0);
    setMin(0);

    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    dispatch(resetHasStarted());
    dispatch(setFade(null));

    toast({ description: 'تایمر فید لغو شد.' });
  }, [dispatch]);

  return (
    <section aria-labelledby="fade-timer-heading" className="w-full flex flex-col gap-4 items-center">
      <h2 id="fade-timer-heading" className="sr-only">
        تنظیم زمان‌بندی فید صداها
      </h2>

      <div className="flex items-center justify-around w-full">
        <fieldset>
          <legend className="text-sm font-light mb-1">نقطه شروع:</legend>
          <Select value={startSel} onValueChange={setStartSel}>
            <SelectTrigger className="lg:w-44 w-28">
              <SelectValue placeholder="شروع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="silent">بی‌صدا</SelectItem>
              <SelectItem value="current">وضعیت فعلی</SelectItem>
              {allMixes.map((m, i) => (
                <SelectItem key={`s-${i}`} value={`mix-${m.name}`}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </fieldset>

        <span className="text-sm hidden md:block font-medium" aria-hidden="true">
          ← فید →
        </span>

        <fieldset>
          <legend className="text-sm font-light mb-1">نقطه پایان:</legend>
          <Select value={endSel} onValueChange={setEndSel}>
            <SelectTrigger className="lg:w-44 w-28">
              <SelectValue placeholder="پایان" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="silent">بی‌صدا</SelectItem>
              <SelectItem value="current">وضعیت فعلی</SelectItem>
              {allMixes.map((m, i) => (
                <SelectItem key={`e-${i}`} value={`mix-${m.name}`}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </fieldset>
      </div>

      <div className="flex items-center justify-around w-full">
        <label htmlFor="fade-hour" className="sr-only">
          ساعت
        </label>
        <input id="fade-hour" type="number" value={hour} min={0} max={23} onChange={(e: ChangeEvent<HTMLInputElement>) => setHour(Math.min(23, Math.max(0, +e.target.value)))} className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg" aria-label="ساعت" />
        <span className="mx-1">ساعت</span>

        <label htmlFor="fade-min" className="sr-only">
          دقیقه
        </label>
        <input id="fade-min" type="number" value={min} min={0} max={59} onChange={(e: ChangeEvent<HTMLInputElement>) => setMin(Math.min(59, Math.max(0, +e.target.value)))} className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg" aria-label="دقیقه" />
        <span className="mx-1">دقیقه</span>
      </div>

      <Separator className="my-4" />

      <div className="flex w-3/4 justify-between">
        <button onClick={onCancel} className="dark:bg-red-700 dark:text-foreground bg-red-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium" aria-label="لغو تایمر فید" type="button">
          انصراف
        </button>
        <button onClick={onSave} className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium" aria-label="شروع تایمر فید" type="button">
          شروع
        </button>
      </div>
    </section>
  );
}
