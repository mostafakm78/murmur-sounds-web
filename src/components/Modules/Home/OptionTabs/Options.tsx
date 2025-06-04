'use client';

import { Button } from '@/components/ui/button';
import { JSX, useEffect, useState } from 'react';
import Timers from './Timers';
import ShareSounds from './ShareSounds';
import Playlist from './Playlist';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

type Tab = 'Timer' | 'Share' | 'Mix';
const tabs: Tab[] = ['Timer', 'Share', 'Mix'];

function formatRemainingTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function Options(): JSX.Element {
  const [selectTab, setSelectTab] = useState<Tab>('Timer');

  const startAt = useSelector((state: RootState) => state.sound.startAt);
  const endAt = useSelector((state: RootState) => state.sound.endAt);
  const fade = useSelector((state: RootState) => state.sound.fade);

  const [remainingStartTime, setRemainingStartTime] = useState<number | null>(null);
  const [remainingEndTime, setRemainingEndTime] = useState<number | null>(null);
  const [remainingFadeTime, setRemainingFadeTime] = useState<number | null>(null);

  // Start Countdown
  useEffect(() => {
    if (!startAt?.timestamp) return setRemainingStartTime(null);

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = startAt.timestamp - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingStartTime(0);
      } else {
        setRemainingStartTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startAt?.timestamp]);

  // End Countdown
  useEffect(() => {
    if (!endAt?.timestamp) return setRemainingEndTime(null);

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = endAt.timestamp - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingEndTime(0);
      } else {
        setRemainingEndTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endAt?.timestamp]);

  useEffect(() => {
    if (!fade?.timestamp) return setRemainingFadeTime(null);

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = fade.timestamp - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingFadeTime(0);
      } else {
        setRemainingFadeTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [fade?.timestamp]);

  // Tab Navigation
  const currentIndex = tabs.indexOf(selectTab);
  const prevTab = () => setSelectTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length]);
  const nextTab = () => setSelectTab(tabs[(currentIndex + 1) % tabs.length]);

  const renderTabContent = (tab: Tab) => {
    switch (tab) {
      case 'Timer':
        return <Timers />;
      case 'Share':
        return <ShareSounds />;
      case 'Mix':
        return <Playlist />;
      default:
        return null;
    }
  };

  return (
    <section className="mx-auto container">
      <div className="mt-16 p-6 gap-10 flex flex-col items-center px-10 relative">
        {/* Tab Buttons */}
        <div className="md:w-1/2 w-full flex items-center justify-around">
          {tabs.map((tab) => {
            const isTimer = tab === 'Timer';
            const showStart = isTimer && remainingStartTime && remainingStartTime > 0;
            const showEnd = isTimer && !showStart && remainingEndTime && remainingEndTime > 0;
            const showFade = isTimer && !showStart && !showEnd && remainingFadeTime && remainingFadeTime > 0;

            return (
              <Button
                key={tab}
                onClick={() => setSelectTab(tab)}
                variant="outline"
                className={`md:text-xl md:py-5
        ${selectTab === tab ? 'bg-background/70 text-foreground dark:bg-foreground/70 dark:text-background' : ''}
        ${showStart || showEnd || showFade ? 'animate-bounce bg-emerald-700 dark:bg-emerald-700 text-background dark:text-foreground' : ''}
      `}
              >
                {isTimer ? (showStart ? formatRemainingTime(remainingStartTime) : showEnd ? formatRemainingTime(remainingEndTime) : showFade ? formatRemainingTime(remainingFadeTime) : 'زمانبندی') : tab === 'Share' ? 'اشتراک‌گذاری' : 'ترکیب'}
              </Button>
            );
          })}
        </div>

        {/* Tab Content with Arrows */}
        <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden">
          <button onClick={prevTab} className="hidden md:block absolute left-0 z-10 p-2 hover:opacity-75 transition-opacity">
            <ChevronLeft className="w-12 h-12 text-background dark:text-foreground" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div key={selectTab} initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -500 }} transition={{ duration: 0.5 }} className="w-full h-full flex min-h-[400px] items-center justify-center">
              {renderTabContent(selectTab)}
            </motion.div>
          </AnimatePresence>

          <button onClick={nextTab} className="hidden md:block absolute right-0 z-10 p-2 hover:opacity-75 transition-opacity">
            <ChevronRight className="w-12 h-12 text-background dark:text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
