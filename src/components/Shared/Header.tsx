'use client';

import { SwitchMute } from './SwitchMute';
import { DarkMode } from './DarkMode';
import Link from 'next/link';
import { JSX } from 'react';
import { SliderHeader } from './SliderHeader';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

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
          <SliderHeader className="md:w-32 w-20 ml-3 hidden md:flex" />
          {/* تغییر تم روشن/تاریک */}
          <DarkMode />
        </div>

        <h2 className="text-foreground block md:hidden font-sans font-bold dark:text-foreground text-2xl">SoftSound</h2>

        {/* سمت راست هدر: لینک‌های مسیر */}
        <nav aria-label="ناوبری اصلی" className="hidden lg:flex flex-row-reverse md:space-x-4 space-x-2 md:text-lg text-sm">
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
        </nav>
        {/* منوی ناوبری */}
        <div className="lg:hidden block">
          <NavigationMenu dir="rtl">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>منو</NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col-reverse justify-center items-center md:w-[200px] w-[150px] space-y-2 space-y-reverse p-2">
                  <NavigationMenuList className="">
                    <Link href="/contact-us" className={linkClassName}>
                      تماس با ما
                    </Link>
                  </NavigationMenuList>
                  <NavigationMenuList>
                    <Link href="/about-us" className={linkClassName}>
                      درباره ما
                    </Link>
                  </NavigationMenuList>
                  <NavigationMenuList>
                    <Link href="/blogs" className={linkClassName}>
                      بلاگ
                    </Link>
                  </NavigationMenuList>
                  <NavigationMenuList>
                    <Link href="/" className={linkClassName}>
                      خانه
                    </Link>
                  </NavigationMenuList>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
