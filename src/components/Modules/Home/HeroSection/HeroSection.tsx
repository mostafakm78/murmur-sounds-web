'use client';

import { BoxReveal } from '@/components/magicui/box-reveal';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Particles } from '@/components/magicui/particles';
import MusicWaves from './MusicWaves';
import { useFillColor } from '@/hooks/use-fill-color';
import { JSX } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection(): JSX.Element | null {
  const fillColor = useFillColor({ light: '#F2F4F8', dark: '#AB46D2' });
  const fillColor2 = useFillColor({ light: '#4B164C', dark: '#FFCFEF' });

  return (
    <div className="mx-auto container">
      <section
        className="
        relative
        overflow-hidden
          bg-white/20 dark:bg-black/20
          backdrop-blur-md
          lg:py-10
          z-[1]
          gap-8
          lg:px-20
          p-8
          flex
          lg:flex-row flex-col
          items-center justify-center
          h-[500px]
          mt-14
          rounded-sm
        "
      >
        <Particles className="absolute inset-0 z-0" staticity={10} quantity={200} ease={150} color={fillColor2} refresh />
        {/* بخش متن و تیتر */}
        <div className="md:w-1/2 flex flex-col items-start justify-center">
          <BlurFade delay={0.35} inView>
            <h1 className="text-foreground dark:text-foreground md:text-7xl text-4xl mb-16">صدای آرام</h1>
          </BlurFade>

          {/* انیمیشن باکس برای متن */}
          <BoxReveal duration={1} boxColor="#ffffff40">
            <div className="font-medium text-foreground/95 dark:text-foreground/80 lg:text-lg md:text-base text-justify leading-6 text-sm">
              صدای آرام یک پلتفرم آنلاین است که به شما این امکان را می‌دهد، به راحتی و با کیفیت بالا، صداهای آرامش‌بخش را بشنوید و تجربه‌ای منحصر به فرد از آرامش را داشته باشید.
            </div>
          </BoxReveal>
        </div>

        {/* بخش SVG و انیمیشن موج موسیقی */}
        <motion.div
          initial={{ scale: 1.05, x: 0, opacity: 0 }}
          animate={{
            x: [0, -20, 20, -10, 10, 0],
            scale: [1.05, 1, 1.02, 1, 1.01, 1],
            opacity: [0, 1, 1, 1, 1, 1],
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
            delay: 0.7,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
          className="
            lg:w-1/2
            w-full
            relative
            flex items-center justify-center
            lg:aspect-square
            md:aspect-[4/1]
            aspect-[2/1]
          "
        >
          {/* SVG شکل پس‌زمینه متحرک */}
          <svg
            className="
              absolute
              lg:w-full lg:h-full
              md:w-[300px] md:h-[300px]
              w-[250px] h-[250px]
              lg:p-10 p-4
              transition-all duration-500
            "
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill={fillColor}
              d="M53.6,-63.6C65.6,-53.8,68.7,-33.2,71.3,-13.4C73.9,6.5,75.8,25.7,68.6,40.9C61.4,56.2,45,67.5,28.4,70C11.8,72.5,-5,66.2,-19.4,58.6C-33.8,51.1,-45.7,42.2,-57.7,29.4C-69.7,16.7,-81.7,0.1,-79.5,-14.3C-77.3,-28.7,-61,-40.9,-45.3,-50.1C-29.7,-59.2,-14.9,-65.3,3,-68.8C20.8,-72.4,41.6,-73.4,53.6,-63.6Z"
              transform="translate(100 100)"
            />
          </svg>

          {/* مرکز موج موسیقی */}
          <div
            className="
              absolute
              flex items-center justify-center
              w-[100px] h-[100px]
              lg:w-[200px] lg:h-[200px]
              top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
            "
          >
            <MusicWaves />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
