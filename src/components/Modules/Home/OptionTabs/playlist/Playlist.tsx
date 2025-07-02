'use client';

import { playSound, setVolume } from '@/app/store/soundSlice';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import useSavedMixes, { SavedMix } from '@/hooks/useSavedMixes';
import { FaCheck, FaTrash } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import { JSX, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { defaultMixes } from '@/lib/defaultMixes';
import { soundsData } from '@/lib/Sounds';

export default function Playlist(): JSX.Element | null {
  const dispatch = useDispatch();

  const { mixes, addMix, deleteMix } = useSavedMixes();
  const [mixName, setMixName] = useState<string>('');
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // حذف تأیید هنگام کلیک بیرون از دکمه
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setConfirmIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
    const trimmedName = mixName.trim();
    if (!trimmedName) return;

    const saved = localStorage.getItem('activeSounds');
    const volumes = localStorage.getItem('soundVolumes');

    if (mixes.some((mix) => mix.name.toLowerCase() === trimmedName.toLowerCase())) {
      toast({ description: 'این نام ترکیب قبلاً استفاده شده است.' });
      return;
    }

    let parsedSaved: number[] = [];
    let parsedVolumes: { [key: number]: number } = {};

    try {
      parsedSaved = saved ? JSON.parse(saved) : [];
    } catch {
      toast({ description: 'خطا در خواندن داده‌های ذخیره‌شده. لطفاً دوباره تلاش کنید.' });
      return;
    }

    try {
      parsedVolumes = volumes ? JSON.parse(volumes) : {};
    } catch {
      toast({ description: 'خطا در خواندن حجم صدای ذخیره‌شده. لطفاً دوباره تلاش کنید.' });
      return;
    }

    if (parsedSaved.length === 0 || Object.keys(parsedVolumes).length === 0) {
      toast({ description: 'لطفاً حداقل یک صدارو انتخاب کنید.' });
      return;
    }

    const sounds: { [key: number]: number } = {};
    parsedSaved.forEach((id) => {
      sounds[id] = parsedVolumes[id] ?? 1;
    });

    const newMix: SavedMix = {
      name: trimmedName,
      createdAt: Date.now(),
      sounds,
    };

    addMix(newMix);
    setMixName('');
    toast({ description: `ترکیب «${trimmedName}» ذخیره شد.` });
  };

  const playMix = (mix: SavedMix) => {
    if (!mix.sounds || typeof mix.sounds !== 'object' || Object.keys(mix.sounds).length === 0) {
      toast({ description: 'ترکیب صدا نامعتبر است.' });
      return;
    }

    Object.entries(mix.sounds).forEach(([id, volume]) => {
      const soundId = Number(id);
      dispatch(playSound(soundId));
      dispatch(setVolume({ id: soundId, volume }));
    });

    toast({ description: `میکس «${mix.name}» در حال پخش است.` });
  };

  const handleRandom = () => {
    const RANDOM_SOUND_COUNT = Math.floor(Math.random() * 5) + 1;
    const shuffled = [...soundsData].sort(() => Math.random() - 0.5);
    const randomSounds = shuffled.slice(0, RANDOM_SOUND_COUNT);

    randomSounds.forEach((sound) => {
      const randomVolume = Math.floor(Math.random() * (80 - 30 + 1)) + 30;
      dispatch(playSound(sound.id));
      dispatch(setVolume({ id: sound.id, volume: randomVolume }));
    });

    toast({ description: 'پخش صداهای تصادفی آغاز شد.' });
  };

  return (
    <div ref={containerRef} className="lg:w-2/4 md:w-3/4 h-[400px] relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-6 flex-col justify-around items-center">
      <BorderBeam size={200} initialOffset={20} className="dark:from-white dark:via-blue-500 dark:to-transparent from-black via-purple-700 to-transparent" />

      <div className="flex items-center justify-around w-full">
        <div className="w-full gap-4 flex items-center justify-center bg-background rounded-sm">
          <input
            type="text"
            value={mixName}
            onChange={(e) => setMixName(e.target.value)}
            placeholder="اسم ترکیب جدید"
            className="w-3/4 outline-none focus:outline-none bg-transparent border border-foreground rounded-sm py-2 px-2 mr-2 placeholder:text-sm placeholder:font-light"
            aria-label="نام ترکیب جدید"
          />
          <button
            title="ذخیره"
            aria-label={`ذخیره ترکیب`}
            onClick={handleSave}
            className="relative w-1/4 font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
            type="button"
          >
            ذخیره
          </button>
        </div>
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      <div className="w-full flex gap-3 px-3 flex-col overflow-y-auto justify-around items-center">
        {defaultMixes.map((mix, index) => (
          <div key={`default-${index}`} className="w-full md:gap-4 gap-2 flex items-center justify-between bg-background rounded-sm">
            <button
              title="اجرا"
              aria-label={`اجرای ترکیب ${mix.name}`}
              onClick={() => playMix(mix)}
              className="relative w-full font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
              type="button"
            >
              {mix.name}
            </button>
          </div>
        ))}

        {mixes.map((mix, index) => (
          <div key={`custom-${index}`} className="w-full md:gap-4 gap-2 flex items-center justify-between bg-background rounded-sm">
            <button
              title="اجرا"
              aria-label={`اجرای ترکیب ${mix.name}`}
              onClick={() => playMix(mix)}
              className="relative w-3/4 font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
              type="button"
            >
              {mix.name}
            </button>

            <button
              title="حذف"
              aria-label={`حذف ترکیب ${mix.name}`}
              className={`font-medium w-1/5 duration-300 hover:opacity-85 h-full py-2 md:px-3 px-2 border border-foreground flex
        ${confirmIndex === index ? 'justify-between items-center w-2/5' : 'items-center justify-center'} rounded-sm`}
              onClick={() => {
                if (confirmIndex === index) return;
                setConfirmIndex(index);
              }}
              type="button"
            >
              {confirmIndex === index ? (
                <>
                  <FaCheck
                    role="img"
                    aria-label="تأیید حذف"
                    className="hover:text-green-500 focus:text-green-500 text-green-700 w-6 h-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMix(index);
                      setConfirmIndex(null);
                    }}
                    tabIndex={0}
                  />
                  <IoCloseSharp
                    role="img"
                    aria-label="لغو حذف"
                    className="hover:text-red-500 focus:text-red-500 text-red-700 w-6 h-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmIndex(null);
                    }}
                    tabIndex={0}
                  />
                </>
              ) : (
                <FaTrash role="img" aria-label="حذف" />
              )}
            </button>
          </div>
        ))}
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      <div className="flex items-center justify-center w-3/4">
        <button onClick={handleRandom} className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium" type="button">
          ترکیب تصادفی
        </button>
      </div>
    </div>
  );
}
