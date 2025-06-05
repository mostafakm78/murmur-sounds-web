'use client';

import { playSound, setVolume } from '@/app/store/soundSlice';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import useSavedMixes, { SavedMix } from '@/hooks/useSavedMixes';
import { Share, Trash } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { defaultMixes } from '@/lib/defaultMixes';
import { useFillColor } from '@/hooks/use-fill-color';

export default function Playlist(): JSX.Element | null {
  const dispatch = useDispatch();

  const { mixes, addMix, deleteMix } = useSavedMixes();
  const [mixName, setMixName] = useState<string>('');
  const fillColor = useFillColor({
    light: '#6C63FF',
    dark: '#F2F4F8',
  });
  const fillColorTwo = useFillColor({
    light: '#F2F4F8',
    dark: '#6C63FF',
  });
  // وضعیت mount شدن کامپوننت برای جلوگیری از خطای SSR
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  // ذخیره‌سازی میکس جدید
  const handleSave = () => {
    const saved = localStorage.getItem('activeSounds');
    const volumes = localStorage.getItem('soundVolumes');

    if (!mixName.trim()) return;

    const parsedSaved: number[] = saved ? JSON.parse(saved) : [];
    const parsedVolumes: { [key: number]: number } = volumes ? JSON.parse(volumes) : {};

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
    if (!mix.sounds || typeof mix.sounds !== 'object') {
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

  return (
    <div className="lg:w-2/4 md:w-3/4 h-[400px] relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-6 flex-col justify-around items-center">
      {/* انیمیشن افکت نوری دور کامپوننت */}
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />

      {/* فرم ذخیره میکس جدید */}
      <div className="flex items-center justify-around w-full">
        <div className="w-full gap-4 flex items-center justify-center bg-background rounded-sm">
          <input type="text" value={mixName} onChange={(e) => setMixName(e.target.value)} placeholder="اسم ترکیب جدید" className="w-3/4 outline-none focus:outline-none bg-transparent border border-foreground rounded-sm py-2 px-2 mr-2 placeholder:text-sm placeholder:font-light" />
          <button
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
              onClick={() => playMix(mix)}
              className="relative w-3/4 font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
            >
              {mix.name}
            </button>
            <button
              title="اشتراک‌گذاری"
              className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm"
              onClick={() => {
                const shareData = {
                  title: 'میکس صدا',
                  text: `میکس: ${mix.name}`,
                  url: window.location.href,
                };
                navigator.share?.(shareData).catch(console.error);
              }}
            >
              <Share />
            </button>
            {/* دکمه حذف برای میکس‌های پیش‌فرض نمایش داده نمی‌شود */}
          </div>
        ))}

        {/* میکس‌های ساخته‌شده توسط کاربر */}
        {mixes.map((mix, index) => (
          <div key={`custom-${index}`} className="w-full md:gap-4 gap-2 flex items-center justify-between bg-background rounded-sm">
            <button
              onClick={() => playMix(mix)}
              className="relative w-3/4 font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
            >
              {mix.name}
            </button>
            <button
              title="اشتراک‌گذاری"
              className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm"
              onClick={() => {
                const shareData = {
                  title: 'میکس صدا',
                  text: `میکس: ${mix.name}`,
                  url: window.location.href,
                };
                navigator.share?.(shareData).catch(console.error);
              }}
            >
              <Share />
            </button>
            <button title="حذف" onClick={() => deleteMix(index)} className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm">
              <Trash />
            </button>
          </div>
        ))}
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      {/* دکمه ترکیب تصادفی (فعلاً بدون عملکرد) */}
      <div className="flex items-center justify-center w-3/4">
        <button className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">ترکیب تصادفی</button>
      </div>
    </div>
  );
}
