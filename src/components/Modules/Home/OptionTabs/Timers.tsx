'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import { Fragment, JSX, useEffect, useState } from 'react';
import Fade from './Fade';
import StartAt from './StartAt';
import EndAt from './EndAt';

type Tab = 'StartAt' | 'EndAt' | 'Fade';

const tabs: Tab[] = ['StartAt', 'EndAt', 'Fade'];

export default function Timers(): JSX.Element | null {
  const [selectTab, setSelectTab] = useState<Tab>('StartAt');
  // Get the current theme
  const { resolvedTheme } = useTheme();
  // State to check if the component is mounted
  const [mounted, setMounted] = useState(false);

  // useEffect to set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderTabContent = (tab: Tab) => {
    switch (tab) {
      case 'StartAt':
        return <StartAt />;
      case 'EndAt':
        return <EndAt />;
      case 'Fade':
        return <Fade />;
      default:
        return null;
    }
  };

  const fillColor: string = resolvedTheme === 'dark' ? '#F2F4F8' : '#6C63FF';
  const fillColorTwo: string = resolvedTheme === 'dark' ? '#6C63FF' : '#F2F4F8';

  return (
    <div className="lg:w-2/4 md:w-3/4 relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-4 h-[400px] flex-col justify-around items-center">
      {/* border animation  */}
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />
      {/* Selecting the timer type  */}
      <div className="flex items-center justify-around w-full">
        {tabs.map((tab, index) => (
          <Fragment key={index}>
            <button onClick={() => setSelectTab(tab)} className={`font-medium ${selectTab === tab ? 'bg-black/10' : ''} hover:opacity-85 duration-300 rounded-sm py-3 px-4`}>
              {tab === 'StartAt' ? 'شروع در' : tab === 'EndAt' ? 'پایان در' : 'حالت محو'}
            </button>
            {index !== tabs.length - 1 && <Separator orientation="vertical" className="dark:bg-foreground/20" />}
          </Fragment>
        ))}
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      {/* set hour and min for timer  */}
      {renderTabContent(selectTab)}
    </div>
  );
}
