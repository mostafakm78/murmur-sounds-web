'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa6';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ShareSounds() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fillColor = resolvedTheme === 'dark' ? '#F2F4F8' : '#6C63FF';
  const fillColorTwo = resolvedTheme === 'dark' ? '#6C63FF' : '#F2F4F8';

  return (
    <div className="lg:w-2/4 md:w-3/4 relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-4 h-[400px] flex-col justify-around items-center">
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />
      <div className="flex items-center justify-around w-full">
        <div className="w-full flex items-center justify-center min-h-10 bg-transparent border border-foreground rounded-sm">
          <p className="font-medium underline underline-offset-2 cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 text-lg">link.com/23/45</p>
        </div>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      <div className="w-full flex xl:flex-row flex-col gap-3 px-3 justify-around items-end">
        <div className="flex w-full items-end justify-around">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-light">میکس را انتخاب کنید :</span>
            <Select dir="rtl">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="میکس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mix1">میکس یک</SelectItem>
                <SelectItem value="mix2">میکس دو</SelectItem>
                <SelectItem value="mix3">میکس سه</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="autoplay" />
            <label htmlFor="autoplay" className="font-medium text-sm">
              پخش خودکار
            </label>
          </div>
        </div>
        <button className="relative w-full xl:w-1/3 font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
          کپی در حافظه
        </button>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      <div className="flex items-center justify-between w-3/4">
        <h4 className='font-medium'>اشتراک گذاری در :</h4>
        <FaInstagram className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300" />
        <FaTelegram className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300" />
        <FaWhatsapp className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300" />
      </div>
    </div>
  );
}
