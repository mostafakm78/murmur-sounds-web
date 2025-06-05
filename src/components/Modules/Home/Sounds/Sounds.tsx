'use client';

import { MagicCard } from '@/components/magicui/magic-card';
import React, { JSX, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { pauseSound, playSound, setDockVisible, setGlobalPause, setGlobalPlaying } from '@/app/store/soundSlice';
import { SliderSounds } from './SliderSounds';
import { AnimatePresence } from 'framer-motion';
import { soundsData } from '@/lib/Sounds';
import Dock from './Dock';
import { toast } from '@/hooks/use-toast';

export default function Sounds(): JSX.Element {
  const dispatch = useDispatch();

  // گرفتن اطلاعات از Redux Store
  const playing = useSelector((state: RootState) => state.sound.playing);
  const volumes = useSelector((state: RootState) => state.sound.volumes);
  const dockVisible = useSelector((state: RootState) => state.sound.dockVisible);
  const globalPalying = useSelector((state: RootState) => state.sound.globalPlaying);

  const dockRef = useRef<HTMLDivElement>(null);

  // بررسی اینکه آیا حداقل یک صدا با ولوم بیشتر از صفر انتخاب شده
  const isValidSound = Object.entries(playing).some(([id]) => volumes[+id] > 0);

  // نشان دادن یا پنهان کردن Dock بر اساس دیده شدن element در صفحه
  useEffect(() => {
    const element = dockRef.current;
    if (!element) return;

    const isMobile = window.innerWidth <= 768;

    const observer = new IntersectionObserver(
      ([entry]) => {
        dispatch(setDockVisible(entry.isIntersecting));
      },
      { threshold: isMobile ? 0.1 : 0.5 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [dockRef, dispatch]);

  // کنترل پخش یا توقف یک صدا
  const togglePlay = (id: number) => {
    if (playing[id]) {
      dispatch(pauseSound(id));
    } else {
      dispatch(playSound(id));
    }
  };

  // کنترل پخش یا توقف تمام صداها (Global)
  const handleTogglePlay = () => {
    if (!isValidSound) {
      toast({ description: 'لطفاً حداقل یک صدا را انتخاب کنید.' });
      return;
    }

    if (globalPalying) {
      dispatch(setGlobalPause());
    } else {
      dispatch(setGlobalPlaying());
    }
  };

  return (
    <main className="mx-auto container">
      {/* هدر و دکمه پخش/توقف کلی */}
      <div className="flex flex-col justify-center items-center my-16 gap-8">
        <h2 className="text-4xl text-background dark:text-foreground">صداهای در دسترس</h2>
        <button onClick={handleTogglePlay} className="text-7xl">
          {globalPalying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* لیست کارت‌های صدا */}
      <div ref={dockRef} className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8 mt-16 px-10">
        {soundsData.map((sound) => {
          const Icon = sound.icon;

          return (
            <MagicCard
              key={sound.id}
              gradientColor={'#f9ceeeb0'}
              gradientSize={700}
              className={`w-full h-full rounded-md border-2 border-background/20 dark:border-foreground/20
              ${playing[sound.id] ? 'scale-105 outline-4 outline outline-foreground/50 dark:outline-foreground/50' : ''}
              duration-500`}
            >
              <div className="flex flex-col items-center p-6 shadow-foreground/30 justify-center">
                {/* نام و آیکن صدا */}
                <div
                  className={`flex flex-col items-center mb-8 md:text-2xl text-xl justify-center gap-1
                  ${playing[sound.id] ? 'scale-110' : ''}
                  font-medium duration-500 text-background/90 dark:text-foreground/90`}
                >
                  <Icon className="w-20 h-20 md:w-[100px] sm:h-[100px]" />
                  {sound.name}
                </div>

                {/* دکمه پلی/پاز و اسلایدر ولوم */}
                <div className="flex w-full px-2 justify-between py-1 bg-white/20 dark:bg-black/10 rounded-md items-center">
                  {!playing[sound.id] ? <FaPlay onClick={() => togglePlay(sound.id)} className="w-4 h-4 lg:w-5 lg:h-5 cursor-pointer" color="#F2F4F8" title="Play" /> : <FaPause onClick={() => togglePlay(sound.id)} className="w-4 h-4 lg:w-5 lg:h-5 cursor-pointer" color="#F2F4F8" title="Pause" />}

                  <SliderSounds soundId={sound.id} />
                </div>
              </div>
            </MagicCard>
          );
        })}
      </div>

      {/* Dock پایین صفحه در صورت نیاز */}
      <AnimatePresence>{dockVisible && <Dock />}</AnimatePresence>
    </main>
  );
}
