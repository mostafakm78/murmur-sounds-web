'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { Fragment, JSX, useState } from 'react';

import Fade from './Fade';
import StartAt from './StartAt';
import EndAt from './EndAt';
import { useFillColor } from '@/hooks/use-fill-color';

enum Tab {
  StartAt = 'StartAt',
  EndAt = 'EndAt',
  Fade = 'Fade',
}

const tabs: Tab[] = [Tab.StartAt, Tab.EndAt, Tab.Fade];

const tabLabels: Record<Tab, string> = {
  [Tab.StartAt]: 'شروع در',
  [Tab.EndAt]: 'پایان در',
  [Tab.Fade]: 'حالت محو',
};

export default function Timers(): JSX.Element | null {
  const [selectTab, setSelectTab] = useState<Tab>(Tab.StartAt);
  const fillColor = useFillColor({ light: '#6C63FF', dark: '#F2F4F8' });
  const fillColorTwo = useFillColor({ light: '#F2F4F8', dark: '#6C63FF' });

  const renderTabContent = (tab: Tab) => {
    switch (tab) {
      case Tab.StartAt:
        return <StartAt />;
      case Tab.EndAt:
        return <EndAt />;
      case Tab.Fade:
        return <Fade />;
      default:
        return null;
    }
  };

  return (
    <div className="lg:w-2/4 md:w-3/4 relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-4 h-[400px] flex-col justify-around items-center">
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />

      <div className="flex items-center justify-around w-full" role="tablist">
        {tabs.map((tab, index) => (
          <Fragment key={tab}>
            <button role="tab" aria-selected={selectTab === tab} onClick={() => setSelectTab(tab)} className={`font-medium ${selectTab === tab ? 'bg-black/10' : ''} hover:opacity-85 duration-300 rounded-sm py-3 px-4`}>
              {tabLabels[tab]}
            </button>
            {index !== tabs.length - 1 && <Separator orientation="vertical" className="dark:bg-foreground/20" />}
          </Fragment>
        ))}
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      {renderTabContent(selectTab)}
    </div>
  );
}
