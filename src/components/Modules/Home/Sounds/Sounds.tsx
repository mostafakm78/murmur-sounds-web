'use client';

import { MagicCard } from '@/components/magicui/magic-card';
import React, { JSX, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { pauseSound, playSound, setDockVisible } from '@/app/store/soundSlice';
import { RootState } from '@/app/store';
import { SliderSounds } from './SliderSounds';
import { AnimatePresence, LazyMotion, domAnimation, m, Variants } from 'framer-motion';
import { soundsData } from '@/lib/Sounds';
import Dock from './Dock';
import GlobalPlayAnimation from '@/components/animations/GlobalPlayAnimation';

// تعریف انیمیشن ترتیبی برای کارت‌های صدا
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function Sounds(): JSX.Element {
  const dispatch = useDispatch();

  const playing = useSelector((state: RootState) => state.sound.playing);
  const dockVisible = useSelector((state: RootState) => state.sound.dockVisible);

  const dockRef = useRef<HTMLDivElement>(null);

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

  return (
    <main className="mx-auto container">
      <GlobalPlayAnimation />
      <LazyMotion features={domAnimation}>
        <div ref={dockRef} className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-6 mt-16 lg:px-10 px-4">
          {soundsData.map(({ id, name, icon: Icon }, i) => {
            const isPlaying = playing[id];

            return (
              <m.div key={id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}>
                <MagicCard
                  gradientColor={'#f9ceeeb0'}
                  gradientSize={700}
                  className={`w-full h-full rounded-md backdrop-blur-md border-2 border-background/20 dark:border-foreground/20
                  ${isPlaying ? 'scale-105 outline-4 outline outline-foreground/50' : ''}
                  duration-500`}
                >
                  <div className="flex flex-col items-center lg:p-6 p-4  shadow-foreground/30 justify-center">
                    <div
                      className={`flex flex-col items-center mb-8 md:text-2xl text-xl justify-center gap-1
                    ${isPlaying ? 'scale-110' : ''}
                    font-medium duration-500 text-background/90 dark:text-foreground/90`}
                    >
                      <Icon className="w-20 h-20 md:w-[100px] sm:h-[100px]" />
                      {name}
                    </div>

                    <div className="flex w-full px-2 md:gap-6 justify-center md:justify-between py-1 bg-white/20 dark:bg-black/10 rounded-md items-center">
                      {isPlaying ? <FaPause onClick={() => togglePlay(id)} className="w-4 h-4 lg:w-5 lg:h-5 cursor-pointer" color="#F2F4F8" title="Pause" /> : <FaPlay onClick={() => togglePlay(id)} className="w-4 h-4 lg:w-5 lg:h-5 cursor-pointer" color="#F2F4F8" title="Play" />}
                      <SliderSounds className="hidden md:flex" soundId={id} />
                    </div>
                  </div>
                </MagicCard>
              </m.div>
            );
          })}
        </div>
      </LazyMotion>

      <AnimatePresence>{dockVisible && <Dock />}</AnimatePresence>
    </main>
  );
}
