'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa6';
import { JSX, useEffect, useState } from 'react';
import { useFillColor } from '@/hooks/use-fill-color';

export default function ShareSounds(): JSX.Element | null {
const fillColor = useFillColor({
    light: '#6C63FF',
    dark: '#F2F4F8',
  });
  const fillColorTwo = useFillColor({
    light: '#F2F4F8',
    dark: '#6C63FF',
  });
  // state to check if component is mounted
  const [mounted, setMounted] = useState<boolean>(false);

  // useEffect to set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="lg:w-2/4 md:w-3/4 relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-4 h-[400px] flex-col justify-around items-center">
      {/* border animation  */}
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />
      <div className="flex items-center justify-around w-full">
        {/* generate link for your mix  */}
        <div className="w-full flex items-center justify-center min-h-10 bg-transparent border border-foreground rounded-sm">
          <p className="font-medium underline underline-offset-2 cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 text-lg">link.com/23/45</p>
        </div>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      <div className="w-full flex xl:flex-row flex-col gap-3 px-3 justify-around items-end">
        <div className="flex w-full items-end justify-around">
          {/* select your mix  */}
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
          {/* auto play check  */}
          <div className="flex items-center gap-2">
            <Checkbox id="autoplay" />
            <label htmlFor="autoplay" className="font-medium text-sm">
              پخش خودکار
            </label>
          </div>
        </div>
        {/* copy to clipboard  */}
        <button className="relative w-full xl:w-1/3 font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full">
          کپی در حافظه
        </button>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      {/* share on social media  */}
      <div className="flex items-center justify-between w-3/4">
        <h4 className="font-medium">اشتراک گذاری در :</h4>
        <FaInstagram className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300" />
        <FaTelegram className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300" />
        <FaWhatsapp className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300" />
      </div>
    </div>
  );
}
