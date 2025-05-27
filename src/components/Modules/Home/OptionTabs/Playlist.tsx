'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { Share, Trash } from 'lucide-react';
import { useTheme } from 'next-themes';
import { JSX, useEffect, useState } from 'react';

export default function Playlist(): JSX.Element | null {
    // get theme
  const { resolvedTheme } = useTheme();
    // state to check if component is mounted
  const [mounted, setMounted] = useState<boolean>(false);

    // useEffect to set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fillColor: string = resolvedTheme === 'dark' ? '#F2F4F8' : '#6C63FF';
  const fillColorTwo: string = resolvedTheme === 'dark' ? '#6C63FF' : '#F2F4F8';

  return (
    <div className="lg:w-2/4 md:w-3/4 h-[400px] relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-6 flex-col justify-around items-center">
        {/* animation for border  */}
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />
      <div className="flex items-center justify-around w-full">
        <div className="w-full gap-4 flex items-center justify-center bg-background rounded-sm">
            {/* save new mix  */}
          <input type="text" placeholder="اسم ترکیب جدید" className="w-3/4 outline-none focus:outline-none bg-transparent border border-foreground rounded-sm py-2 px-2 mr-2 placeholder:text-sm placeholder:font-light" />
          <button className="relative w-1/4 font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            ذخیره
          </button>
        </div>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      {/* all saved mixes  */}
      <div className="w-full flex gap-3 px-3 flex-col overflow-y-auto justify-around items-center">
        <div className="w-full md:gap-4 gap-2 flex items-center justify-center bg-background rounded-sm">
          <span className="w-3/4 bg-transparent border border-foreground font-medium rounded-sm py-2 px-2 mr-2">ترکیب 1</span>
          <button className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            <Share />
          </button>
          <button className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            <Trash />
          </button>
        </div>
        <div className="w-full md:gap-4 gap-2 flex items-center justify-center bg-background rounded-sm">
          <span className="w-3/4 bg-transparent border border-foreground font-medium rounded-sm py-2 px-2 mr-2">ترکیب 1</span>
          <button className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            <Share />
          </button>
          <button className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            <Trash />
          </button>
        </div>
        <div className="w-full md:gap-4 gap-2 flex items-center justify-center bg-background rounded-sm">
          <span className="w-3/4 bg-transparent border border-foreground font-medium rounded-sm py-2 px-2 mr-2">ترکیب 1</span>
          <button className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            <Share />
          </button>
          <button className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            <Trash />
          </button>
        </div>
        <div className="w-full md:gap-4 gap-2 flex items-center justify-center bg-background rounded-sm">
          <span className="w-3/4 bg-transparent border border-foreground font-medium rounded-sm py-2 px-2 mr-2">ترکیب 1</span>
          <button className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            <Share />
          </button>
          <button className="relative font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
            <Trash />
          </button>
        </div>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      <div className="flex items-center justify-center w-3/4">
        {/* random mix button  */}
        <button className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm  cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">ترکیب تصادفی</button>
      </div>
    </div>
  );
}
