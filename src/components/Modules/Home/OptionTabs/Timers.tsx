'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { Fragment, JSX, useEffect, useState } from 'react';

import Fade from './Fade';
import StartAt from './StartAt';
import EndAt from './EndAt';
import { useFillColor } from '@/hooks/use-fill-color';

// تعریف نوع تب‌ها
type Tab = 'StartAt' | 'EndAt' | 'Fade';

// لیست تب‌ها
const tabs: Tab[] = ['StartAt', 'EndAt', 'Fade'];

export default function Timers(): JSX.Element | null {
  const [selectTab, setSelectTab] = useState<Tab>('StartAt'); // تب انتخاب‌شده
  const [mounted, setMounted] = useState(false); // بررسی اینکه کامپوننت روی کلاینت مونت شده
  const fillColor = useFillColor({ light: '#6C63FF', dark: '#F2F4F8' });
  const fillColorTwo = useFillColor({ light: '#F2F4F8', dark: '#6C63FF' });

  // پس از مونت شدن، مقدار mounted را true می‌کنیم
  useEffect(() => {
    setMounted(true);
  }, []);

  // جلوگیری از رندر سمت سرور برای استفاده از تم
  if (!mounted) return null;

  // تابعی برای رندر محتوای تب‌ها
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

  return (
    <div className="lg:w-2/4 md:w-3/4 relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-4 h-[400px] flex-col justify-around items-center">
      {/* انیمیشن BorderBeam */}
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />

      {/* انتخاب تب (شروع - پایان - فید) */}
      <div className="flex items-center justify-around w-full">
        {tabs.map((tab, index) => (
          <Fragment key={index}>
            <button onClick={() => setSelectTab(tab)} className={`font-medium ${selectTab === tab ? 'bg-black/10' : ''} hover:opacity-85 duration-300 rounded-sm py-3 px-4`}>
              {tab === 'StartAt' ? 'شروع در' : tab === 'EndAt' ? 'پایان در' : 'حالت محو'}
            </button>
            {/* Separator بین تب‌ها */}
            {index !== tabs.length - 1 && <Separator orientation="vertical" className="dark:bg-foreground/20" />}
          </Fragment>
        ))}
      </div>

      {/* جداکننده اصلی بین انتخاب تب و محتوای آن */}
      <Separator className="my-4 dark:bg-foreground/20" />

      {/* رندر محتوای تب انتخاب‌شده */}
      {renderTabContent(selectTab)}
    </div>
  );
}
