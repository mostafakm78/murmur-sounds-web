'use client';

import { Button } from '@/components/ui/button';
import { JSX, useState } from 'react';
import Timers from './Timers';
import ShareSounds from './ShareSounds';
import Playlist from './Playlist';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// set type for tabs
type Tab = 'Timer' | 'Share' | 'Mix';

// tabs list
const tabs: Tab[] = ['Timer', 'Share', 'Mix'];

export default function Options(): JSX.Element {
  const [selectTab, setSelectTab] = useState<Tab>('Timer');

  const currentIndex = tabs.indexOf(selectTab);
  const prevTab = () : void => setSelectTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length]);
  const nextTab = () : void => setSelectTab(tabs[(currentIndex + 1) % tabs.length]);

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
          {tabs.map((tab) => (
            <Button key={tab} onClick={() => setSelectTab(tab)} variant="outline" className={`md:text-xl md:py-5 ${selectTab === tab ? 'bg-background/70 text-foreground dark:bg-foreground/70 dark:text-background' : ''}`}>
              {tab === 'Timer' ? 'زمانبندی' : tab === 'Share' ? 'اشتراک‌گذاری' : 'ترکیب'}
            </Button>
          ))}
        </div>

        {/* Tab Content with Arrows */}
        <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Left Arrow */}
          <button onClick={prevTab} className="hidden md:block absolute left-0 z-10 p-2 hover:opacity-75 transition-opacity">
            <ChevronLeft className="w-12 h-12 text-background dark:text-foreground" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div key={selectTab} initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -500 }} transition={{ duration: 0.5 }} className="w-full h-full flex min-h-[400px] items-center justify-center">
              {renderTabContent(selectTab)}
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow */}
          <button onClick={nextTab} className="hidden md:block absolute right-0 z-10 p-2 hover:opacity-75 transition-opacity">
            <ChevronRight className="w-12 h-12 text-background dark:text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
