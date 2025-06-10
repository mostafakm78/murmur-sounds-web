'use client';

import { playSound, setVolume } from '@/app/store/soundSlice';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import useSavedMixes, { SavedMix } from '@/hooks/useSavedMixes';
import { FaCheck, FaTrash } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import { JSX, useState } from 'react';
import { useDispatch } from 'react-redux';
import { defaultMixes } from '@/lib/defaultMixes';
import { soundsData } from '@/lib/Sounds';

export default function Playlist(): JSX.Element | null {
  const dispatch = useDispatch();

  const { mixes, addMix, deleteMix } = useSavedMixes();
  const [mixName, setMixName] = useState<string>('');
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  // ذخیره‌سازی میکس جدید
  const handleSave = () => {
    const saved = localStorage.getItem('activeSounds');
    const volumes = localStorage.getItem('soundVolumes');

    if (!mixName.trim()) return;

    if (mixes.some((mix) => mix.name.toLowerCase() === mixName.trim().toLowerCase())) {
      toast({ description: 'این نام ترکیب قبلاً استفاده شده است.' });
      return;
    }

    let parsedSaved: number[] = [];
    let parsedVolumes: { [key: number]: number } = {};

    try {
      parsedSaved = saved ? JSON.parse(saved) : [];
    } catch {
      parsedSaved = [];
    }

    try {
      parsedVolumes = volumes ? JSON.parse(volumes) : {};
    } catch {
      parsedVolumes = {};
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
      name: mixName,
      createdAt: Date.now(),
      sounds,
    };

    addMix(newMix);
    setMixName('');
  };

  // پخش یک میکس ذخیره‌شده
  const playMix = (mix: SavedMix) => {
    if (!mix.sounds || typeof mix.sounds !== 'object' || Object.keys(mix.sounds).length === 0) {
      toast({ description: 'ترکیب صدا نامعتبر است.' });
      return;
    }

    const sounds = mix.sounds;

    Object.entries(sounds).forEach(([id, volume]) => {
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
    const randomVolumes = Math.floor(Math.random() * (80 - 30 + 1)) + 30;

    randomSounds.forEach((sound) => {
      dispatch(playSound(sound.id));
      dispatch(setVolume({ id: sound.id, volume: randomVolumes }));
    });

    toast({ description: 'پخش صداهای تصادفی آغاز شد.' });
  };

  return (
    <div className="lg:w-2/4 md:w-3/4 h-[400px] relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-6 flex-col justify-around items-center">
      {/* انیمیشن افکت نوری دور کامپوننت */}
      <BorderBeam size={200} initialOffset={20} className="dark:from-white dark:via-blue-500 dark:to-transparent from-black via-purple-700 to-transparent" />

      {/* فرم ذخیره میکس جدید */}
      <div className="flex items-center justify-around w-full">
        <div className="w-full gap-4 flex items-center justify-center bg-background rounded-sm">
          <input type="text" value={mixName} onChange={(e) => setMixName(e.target.value)} placeholder="اسم ترکیب جدید" className="w-3/4 outline-none focus:outline-none bg-transparent border border-foreground rounded-sm py-2 px-2 mr-2 placeholder:text-sm placeholder:font-light" />
          <button
            title="ذخیره"
            aria-label={`ذخیره ترکیب`}
            onClick={handleSave}
            className="relative w-1/4 font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
          >
            ذخیره
          </button>
        </div>
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      {/* لیست میکس‌های ذخیره‌شده */}
      <div className="w-full flex gap-3 px-3 flex-col overflow-y-auto justify-around items-center">
        {/* میکس‌های پیش‌فرض */}
        {defaultMixes.map((mix, index) => (
          <div key={`default-${index}`} className="w-full md:gap-4 gap-2 flex items-center justify-between bg-background rounded-sm">
            <button
              title="اجرا"
              aria-label="اجرای ترکیب"
              onClick={() => playMix(mix)}
              className="relative w-3/4 font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
            >
              {mix.name}
            </button>
            {/* دکمه حذف برای میکس‌های پیش‌فرض نمایش داده نمی‌شود */}
          </div>
        ))}

        {/* میکس‌های ساخته‌شده توسط کاربر */}
        {mixes.map((mix, index) => (
          <div key={`custom-${index}`} className="w-full md:gap-4 gap-2 flex items-center justify-between bg-background rounded-sm">
            <button
              title="اجرا"
              aria-label="اجرای ترکیب"
              onClick={() => playMix(mix)}
              className="relative w-3/4 font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
            >
              {mix.name}
            </button>

            <button
              title="حذف"
              aria-label={`حذف ترکیب ${mix.name}`}
              className={`font-medium w-1/5 duration-300 hover:opacity-85 h-full py-2 md:px-3 px-1 border border-foreground flex
        ${confirmIndex === index ? 'justify-between items-center' : 'items-center justify-center'} rounded-sm`}
              onClick={() => {
                if (confirmIndex === index) return; // اگر تایید فعال است، کلیک روی همین دکمه کاری نکند (برای جلوگیری از رفتار ناخواسته)
                setConfirmIndex(index);
              }}
            >
              {confirmIndex === index ? (
                <>
                  <FaCheck
                    className="hover:text-green-500 w-6 h-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMix(index);
                      setConfirmIndex(null);
                    }}
                  />
                  <IoCloseSharp
                    className="hover:text-red-500 w-6 h-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmIndex(null);
                    }}
                  />
                </>
              ) : (
                <FaTrash />
              )}
            </button>
          </div>
        ))}
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      {/* دکمه ترکیب تصادفی (فعلاً بدون عملکرد) */}
      <div className="flex items-center justify-center w-3/4">
        <button onClick={handleRandom} className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">
          ترکیب تصادفی
        </button>
      </div>
    </div>
  );
}
