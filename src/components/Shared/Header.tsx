import { SwitchMute } from './SwitchMute';
import { DarkMode } from './DarkMode';
import Link from 'next/link';
import { JSX } from 'react';
import { SliderHeader } from './SliderHeader';

// کلاس استایل برای لینک‌های سربرگ با افکت خط بالا
const linkClassName = "relative text-foreground after:content-[''] after:w-0 after:absolute after:h-1 after:bg-foreground after:-top-[18px] after:right-0 after:duration-300 md:hover:after:w-full duration-300 hover:opacity-80 focus:opacity-80 cursor-pointer";

export default function Header(): JSX.Element {
  return (
    <header className="h-20 z-[5] mt-3 flex justify-center p-2">
      {/* کانتینر اصلی هدر با پس‌زمینه روشن و حالت تیره */}
      <div className="bg-[#F2F4F8] dark:bg-[#AB46D2] md:w-10/12 w-full flex shadow-sm dark:shadow-sm dark:shadow-foreground items-center justify-between md:px-10 px-4 rounded h-full py-2">
        {/* سمت چپ هدر: سوییچ قطع صدا، اسلایدر ولوم، و تغییر تم */}
        <div className="flex items-center">
          {/* قطع/وصل کردن همه صداها */}
          <SwitchMute />
          {/* اسلایدر کنترل حجم صدای کلی */}
          <SliderHeader className="md:w-32 w-20 ml-3" />
          {/* تغییر تم روشن/تاریک */}
          <DarkMode />
        </div>

        {/* سمت راست هدر: لینک‌های مسیر */}
        <div className="flex flex-row-reverse md:space-x-4 space-x-2 md:text-lg text-sm">
          <Link href="/contact-us" className={linkClassName}>
            تماس با ما
          </Link>
          <Link href="/about-us" className={linkClassName}>
            درباره ما
          </Link>
          <Link href="/blogs" className={linkClassName}>
            بلاگ
          </Link>
          <Link href="/" className={linkClassName}>
            خانه
          </Link>
        </div>
      </div>
    </header>
  );
}
