'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import { JSX, useEffect, useState } from 'react';

export default function Timers() : JSX.Element | null {
    // Get the current theme
  const { resolvedTheme } = useTheme();
    // State to check if the component is mounted
  const [mounted, setMounted] = useState(false);

    // useEffect to set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fillColor : string = resolvedTheme === 'dark' ? '#F2F4F8' : '#6C63FF';
  const fillColorTwo : string = resolvedTheme === 'dark' ? '#6C63FF' : '#F2F4F8';

  return (
    <div className="lg:w-2/4 md:w-3/4 relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-4 h-[400px] flex-col justify-around items-center">
        {/* border animation  */}
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />
      {/* Selecting the timer type  */}
      <div className="flex items-center justify-around w-full">
        <button className="font-medium bg-black/10 hover:opacity-85 duration-300 rounded-sm py-3 px-4">قطع شدن بعد از</button>
        <Separator orientation="vertical" className='dark:bg-foreground/20'/>
        <button className="font-medium hover:opacity-85 duration-300 py-4">پخش شدن بعد از</button>
        <Separator orientation="vertical" className='dark:bg-foreground/20'/>
        <button className="font-medium hover:opacity-85 duration-300 py-4">حالت محو</button>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      {/* set hour and min for timer  */}
      <div className="xl:w-2/3 w-full flex justify-around items-center">
        <input type="number" id="hour" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" />
        <label htmlFor="hour" className="md:text-lg font-medium">
          ساعت و
        </label>
        <input type="number" id="min" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" />
        <label htmlFor="min" className="md:text-lg font-medium">
          دقیقه
        </label>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      {/* cancel and submit button for timer  */}
      <div className="flex items-center justify-between w-3/4">
        <button className="dark:bg-red-700 dark:text-foreground bg-red-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">انصراف</button>
        <button className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">شروع</button>
      </div>
    </div>
  );
}
