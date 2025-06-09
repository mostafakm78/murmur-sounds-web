'use client';

import { Button } from '@/components/ui/button';
import { JSX, useEffect, useState } from 'react';
import Timers from './Timer/Timers';
import ShareSounds from './share/ShareSounds';
import Playlist from './playlist/Playlist';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

enum Tab {
  Timer = 'Timer',
  Share = 'Share',
  Mix = 'Mix',
}
const tabs: Tab[] = [Tab.Timer, Tab.Share, Tab.Mix];

function formatRemainingTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function useCountdown(timestamp?: number | null) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!timestamp || isNaN(timestamp)) {
      setRemaining(null);
      return;
    }

    const updateRemaining = () => {
      const diff = timestamp - Date.now();
      if (diff <= 0) {
        setRemaining(0);
        return true;
      } else {
        setRemaining(diff);
        return false;
      }
    };

    if (updateRemaining()) return;

    const interval = setInterval(() => {
      if (updateRemaining()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return remaining;
}

export default function Options(): JSX.Element {
  const [selectTab, setSelectTab] = useState<Tab>(Tab.Timer);

  const startAt = useSelector((state: RootState) => state.sound.startAt, shallowEqual);
  const endAt = useSelector((state: RootState) => state.sound.endAt, shallowEqual);
  const fade = useSelector((state: RootState) => state.sound.fade, shallowEqual);

  const remainingStartTime = useCountdown(startAt?.timestamp ?? null);
  const remainingEndTime = useCountdown(endAt?.timestamp ?? null);
  const remainingFadeTime = useCountdown(fade?.timestamp ?? null);

  const currentIndex = tabs.indexOf(selectTab);
  const prevTab = () => setSelectTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length]);
  const nextTab = () => setSelectTab(tabs[(currentIndex + 1) % tabs.length]);

  const renderTabContent = (tab: Tab) => {
    switch (tab) {
      case Tab.Timer:
        return <Timers />;
      case Tab.Share:
        return <ShareSounds />;
      case Tab.Mix:
        return <Playlist />;
      default:
        return null;
    }
  };

  return (
    <section className="mx-auto container">
      <div className="mt-16 p-6 gap-10 flex flex-col items-center px-10 relative">
        <div className="md:w-1/2 w-full flex items-center justify-around" role="tablist">
          {tabs.map((tab) => {
            const isTimer = tab === Tab.Timer;
            const showStart = isTimer && remainingStartTime && remainingStartTime > 0;
            const showEnd = isTimer && !showStart && remainingEndTime && remainingEndTime > 0;
            const showFade = isTimer && !showStart && !showEnd && remainingFadeTime && remainingFadeTime > 0;

            return (
              <Button
                key={tab}
                role="tab"
                aria-selected={selectTab === tab}
                onClick={() => setSelectTab(tab)}
                variant="outline"
                className={`md:text-xl md:py-5
                  ${selectTab === tab ? 'bg-background/70 text-foreground dark:bg-foreground/70 dark:text-background' : ''}
                  ${showStart || showEnd || showFade ? 'animate-bounce bg-emerald-700 dark:bg-emerald-700 text-background dark:text-foreground' : ''}
                `}
              >
                {isTimer ? (showStart ? formatRemainingTime(remainingStartTime) : showEnd ? formatRemainingTime(remainingEndTime) : showFade ? formatRemainingTime(remainingFadeTime) : 'زمانبندی') : tab === Tab.Share ? 'اشتراک‌گذاری' : 'ترکیب'}
              </Button>
            );
          })}
        </div>

        <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden">
          <button onClick={prevTab} className="hidden md:block absolute left-0 z-10 p-2 hover:opacity-75 transition-opacity" aria-label="تب قبلی">
            <ChevronLeft className="w-12 h-12 text-background dark:text-foreground" />
          </button>

          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <m.div key={selectTab} initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -500 }} transition={{ duration: 0.5 }} className="w-full h-full flex min-h-[400px] items-center justify-center">
                {renderTabContent(selectTab)}
              </m.div>
            </AnimatePresence>
          </LazyMotion>

          <button onClick={nextTab} className="hidden md:block absolute right-0 z-10 p-2 hover:opacity-75 transition-opacity" aria-label="تب بعدی">
            <ChevronRight className="w-12 h-12 text-background dark:text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
