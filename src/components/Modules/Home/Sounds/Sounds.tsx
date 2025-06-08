'use client';

import { MagicCard } from '@/components/magicui/magic-card';
import React, { JSX, useEffect, useMemo, useRef, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { pauseSound, playSound, setDockVisible, setGlobalPause, setGlobalPlaying } from '@/app/store/soundSlice';
import { RootState } from '@/app/store';
import { SliderSounds } from './SliderSounds';
import { AnimatePresence } from 'framer-motion';
import { soundsData } from '@/lib/Sounds';
import Dock from './Dock';
import { toast } from '@/hooks/use-toast';

export default function Sounds(): JSX.Element {
  const dispatch = useDispatch();

  const playing = useSelector((state: RootState) => state.sound.playing);
  const volumes = useSelector((state: RootState) => state.sound.volumes);
  const dockVisible = useSelector((state: RootState) => state.sound.dockVisible);
  const globalPlaying = useSelector((state: RootState) => state.sound.globalPlaying);

  const dockRef = useRef<HTMLDivElement>(null);

  // بررسی اینکه حداقل یک صدا فعال هست و ولوم آن > ۰ است
  const isValidSound = useMemo(() => Object.entries(playing).some(([id]) => volumes[+id] > 0), [playing, volumes]);

  // Intersection Observer برای Dock
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
  }, [dispatch]);

  // کنترل پخش / توقف یک صدا
  const togglePlay = useCallback(
    (id: number) => {
      if (playing[id]) {
        dispatch(pauseSound(id));
      } else {
        dispatch(playSound(id));
      }
    },
    [dispatch, playing]
  );

  // کنترل پخش / توقف همه صداها
  const handleTogglePlay = useCallback(() => {
    if (!isValidSound) {
      toast({ description: 'لطفاً حداقل یک صدا را انتخاب کنید.' });
      return;
    }

    if (globalPlaying) {
      dispatch(setGlobalPause());
    } else {
      dispatch(setGlobalPlaying());
    }
  }, [dispatch, globalPlaying, isValidSound]);

  useEffect(() => {
    dispatch(setGlobalPause());
  }, [dispatch]);

  return (
    <main className="mx-auto container">
      {/* هدر و دکمه پخش کلی */}
      <div className="flex flex-col justify-center items-center my-16 gap-8">
        <h2 className="text-4xl text-foreground dark:text-foreground">صداهای در دسترس</h2>
        <button onClick={handleTogglePlay} className="text-7xl text-foreground dark:text-foreground">
          {globalPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* لیست صداها */}
      <div ref={dockRef} className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8 mt-16 px-10">
        {soundsData.map(({ id, name, icon: Icon }) => {
          const isPlaying = playing[id];

          return (
            <MagicCard
              key={id}
              gradientColor={'#f9ceeeb0'}
              gradientSize={700}
              className={`w-full h-full rounded-md backdrop-blur-md border-2 border-background/20 dark:border-foreground/20
              ${isPlaying ? 'scale-105 outline-4 outline outline-foreground/50' : ''}
              duration-500`}
            >
              <div className="flex flex-col items-center p-6 shadow-foreground/30 justify-center">
                {/* آیکن و نام */}
                <div
                  className={`flex flex-col items-center mb-8 md:text-2xl text-xl justify-center gap-1
                  ${isPlaying ? 'scale-110' : ''}
                  font-medium duration-500 text-background/90 dark:text-foreground/90`}
                >
                  <Icon className="w-20 h-20 md:w-[100px] sm:h-[100px]" />
                  {name}
                </div>

                {/* دکمه Play/Pause و اسلایدر */}
                <div className="flex w-full px-2 gap-6 justify-between py-1 bg-white/20 dark:bg-black/10 rounded-md items-center">
                  {isPlaying ? <FaPause onClick={() => togglePlay(id)} className="w-4 h-4 lg:w-5 lg:h-5 cursor-pointer" color="#F2F4F8" title="Pause" /> : <FaPlay onClick={() => togglePlay(id)} className="w-4 h-4 lg:w-5 lg:h-5 cursor-pointer" color="#F2F4F8" title="Play" />}
                  <SliderSounds soundId={id} />
                </div>
              </div>
            </MagicCard>
          );
        })}
      </div>

      {/* Dock پایین صفحه */}
      <AnimatePresence>{dockVisible && <Dock />}</AnimatePresence>
    </main>
  );
}
