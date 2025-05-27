'use client';

import { BoxReveal } from '@/components/magicui/box-reveal';
import { MusicWaves } from './MusicWaves';
import { useTheme } from 'next-themes';
import { JSX, useEffect, useState } from 'react';

export default function HeroSection(): JSX.Element | null {
    //get theme
  const { resolvedTheme } = useTheme();
    //state for mounted
  const [mounted, setMounted] = useState<boolean>(false);

    //set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const fillColor : string = resolvedTheme === 'dark' ? '#6C63FF' : '#F2F4F8';

  return (
    <div className="mx-auto container">
      <section className="bg-black/20 md:py-10 z-[1] gap-8 md:px-20 p-8 flex md:flex-row flex-col items-center justify-center h-[500px] mt-14">
        <div className="md:w-1/2 flex flex-col items-start justify-center">
          <h1 className="text-background dark:text-foreground md:text-6xl text-4xl mb-16">صدای آرام</h1>
          {/* box animation */}
          <BoxReveal duration={1} boxColor="#ffffff60">
            <div className="font-medium text-background/95 dark:text-foreground/80 md:text-base text-sm">صدای آرام یک پلتفرم آنلاین است که به شما این امکان را می‌دهد، به راحتی و با کیفیت بالا، صداهای آرامش‌بخش را بشنوید و تجربه‌ای منحصر به فرد از آرامش را داشته باشید.</div>
          </BoxReveal>
        </div>

        {/* svg animate and svg background */}
        <div className="md:w-1/2 w-full relative flex items-center justify-center md:aspect-square aspect-[2/1]">
          <svg className="absolute md:w-full md:h-full w-[250px] h-[250px] md:p-10 p-4 transition-all duration-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={fillColor}
              d="M53.6,-63.6C65.6,-53.8,68.7,-33.2,71.3,-13.4C73.9,6.5,75.8,25.7,68.6,40.9C61.4,56.2,45,67.5,28.4,70C11.8,72.5,-5,66.2,-19.4,58.6C-33.8,51.1,-45.7,42.2,-57.7,29.4C-69.7,16.7,-81.7,0.1,-79.5,-14.3C-77.3,-28.7,-61,-40.9,-45.3,-50.1C-29.7,-59.2,-14.9,-65.3,3,-68.8C20.8,-72.4,41.6,-73.4,53.6,-63.6Z"
              transform="translate(100 100)"
            />
          </svg>
          <div className="absolute flex items-center justify-center w-[100px] h-[100px] md:w-[200px] md:h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <MusicWaves />
          </div>
        </div>
      </section>
    </div>
  );
}
