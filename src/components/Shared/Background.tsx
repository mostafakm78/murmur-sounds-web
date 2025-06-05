'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { JSX, useEffect, useState } from 'react';

/**
 * نمایش بک‌گراند متحرک کهکشان با استفاده از WebGL (Three.js)
 */
export default function GalaxyBackground(): JSX.Element {
  // 🛰️ استیت برای ردیابی موقعیت اسکرول
  // در حال حاضر استفاده نمی‌شود اما آماده‌ است برای انیمیشن‌های مبتنی بر اسکرول
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // 📡 لیسنر برای گرفتن scrollY در هنگام اسکرول
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // 🧷 اضافه کردن لیسنر
    window.addEventListener('scroll', handleScroll);

    // 🧹 حذف لیسنر هنگام آن‌مونت‌شدن
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // 🪐 کانتینر تمام‌صفحه برای پس‌زمینه کهکشان
    <div className="fixed inset-0 -z-10">
      <Canvas>
        {/* ✨ مولد ستاره‌ها با عمق و تعداد بالا */}
        <Stars
          radius={100} // شعاع گوی ستاره‌ها
          depth={50} // عمق میدان دید
          count={1000} // تعداد ستاره‌ها
          factor={7} // اندازه و پراکندگی ستاره‌ها
          fade // فعال‌سازی افکت محو برای عمق بهتر
          speed={1} // سرعت حرکت ستاره‌ها
        />
      </Canvas>
    </div>
  );
}
