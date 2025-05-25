'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { useTheme } from 'next-themes';

export default function Timers() {

    const { resolvedTheme } = useTheme();

  const fillColor = resolvedTheme === 'dark' ? '#F2F4F8' : '#6C63FF';
  const fillColorTwo = resolvedTheme === 'dark' ? '#6C63FF' : '#F2F4F8';

  return (
    <div className="md:w-2/4 relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md p-10 h-full flex-col">
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo}/>
      <div className="flex items-center justify-around">
        <button className="font-medium bg-black/10 hover:opacity-85 duration-300 rounded-sm py-3 px-2">قطع شدن بعد از</button>
        <button className="font-medium hover:opacity-85 duration-300 py-4">پخش شدن بعد از</button>
        <button className="font-medium hover:opacity-85 duration-300 py-4">حالت محو</button>
      </div>
    </div>
  );
}
