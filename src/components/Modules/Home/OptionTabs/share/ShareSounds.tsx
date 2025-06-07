'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa6';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useFillColor } from '@/hooks/use-fill-color';
import useSavedMixes from '@/hooks/useSavedMixes';

export default function ShareSounds(): JSX.Element | null {
  const { mixes } = useSavedMixes();
  const fillColor = useFillColor({ light: '#6C63FF', dark: '#F2F4F8' });
  const fillColorTwo = useFillColor({ light: '#F2F4F8', dark: '#6C63FF' });

  const [sel, setSel] = useState('current');
  const [autoPlay, setAutoPlay] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [buttonText, setButtonText] = useState(false);

  const buildVolumesParam = (entries: [string, number][]) => {
    const filtered = entries.filter(([, vol]) => vol > 0);
    return filtered.length > 0 ? 'volumes=' + filtered.map(([id, vol]) => `${id}:${vol}`).join(',') : '';
  };

  const getShareURL = () => {
    try {
      if (sel === 'current') {
        const raw = localStorage.getItem('soundVolumes');
        if (!raw) return '';
        const volumes = JSON.parse(raw);
        const param = buildVolumesParam(Object.entries(volumes));
        return param ? `/?${param}${autoPlay ? '&autoPlay' : ''}` : '';
      }

      if (sel.startsWith('mix-')) {
        const name = sel.replace('mix-', '');
        const mix = mixes.find((m) => m.name === name);
        if (!mix || !mix.sounds) return '';
        const param = buildVolumesParam(Object.entries(mix.sounds));
        return param ? `/?${param}${autoPlay ? '&autoPlay' : ''}` : '';
      }

      return '/';
    } catch (err) {
      console.error('Error creating share URL:', err);
      return '';
    }
  };

  const handleSave = () => {
    const url = getShareURL();
    if (!url) return;
    const fullUrl = window.location.origin + url;
    setShareLink(url);
    navigator.clipboard.writeText(fullUrl);
    setButtonText(true);
    setTimeout(() => setButtonText(false), 5000);
  };

  if (typeof window === 'undefined') return null;

  const fullShareLink = window.location.origin + shareLink;

  return (
    <div className="lg:w-2/4 md:w-3/4 relative overflow-hidden bg-background border border-double w-full flex border-background rounded-md md:p-10 p-4 h-[400px] flex-col justify-around items-center">
      <BorderBeam size={200} colorFrom={fillColor} colorTo={fillColorTwo} />

      {/* لینک */}
      <div className="flex items-center justify-around w-full">
        <div className="w-full flex items-center justify-center min-h-10 bg-transparent border border-foreground rounded-sm px-2">
          <p dir="ltr" className="font-medium underline underline-offset-2 text-sm break-words text-center">
            {shareLink ? fullShareLink : 'لینک شما اینجا نمایش داده خواهد شد'}
          </p>
        </div>
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      {/* تنظیمات */}
      <div className="w-full flex xl:flex-row flex-col gap-3 px-3 justify-around items-end">
        <div className="flex w-full items-center justify-around">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-light">میکس را انتخاب کنید :</span>
            <Select value={sel} onValueChange={setSel} dir="rtl">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="میکس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">وضعیت فعلی</SelectItem>
                {mixes.map((mix) => (
                  <SelectItem key={mix.name} value={`mix-${mix.name}`}>
                    {mix.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="autoplay" checked={autoPlay} onCheckedChange={() => setAutoPlay(!autoPlay)} />
            <label htmlFor="autoplay" className="font-medium text-sm">
              پخش خودکار
            </label>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="relative w-full xl:w-1/3 font-medium hover:opacity-85 duration-300 py-2 md:px-3 px-1 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
        >
          {buttonText ? 'کپی شد!' : 'کپی در حافظه'}
        </button>
      </div>

      <Separator className="my-4 dark:bg-foreground/20" />

      {/* اشتراک‌گذاری */}
      <div className="flex items-center justify-between w-3/4">
        <h4 className="font-medium">اشتراک گذاری در :</h4>
        <Link href="https://www.instagram.com/" target="_blank" className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300">
          <FaInstagram />
        </Link>
        <Link href={`https://t.me/share/url?url=${encodeURIComponent(fullShareLink)}`} target="_blank" className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300">
          <FaTelegram />
        </Link>
        <Link href={`https://wa.me/?text=${encodeURIComponent(fullShareLink)}`} target="_blank" className="md:text-5xl text-4xl cursor-pointer hover:scale-105 duration-300">
          <FaWhatsapp />
        </Link>
      </div>
    </div>
  );
}
