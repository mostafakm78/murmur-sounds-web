'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { JSX, useEffect, useState } from 'react';

/**
 * کامپوننت سوییچ بین تم روشن (Light) و تاریک (Dark)
 */
export function DarkMode(): JSX.Element | null {
  const { setTheme, resolvedTheme } = useTheme(); // گرفتن تم فعلی و تابع تغییر تم از next-themes
  const [mounted, setMounted] = useState<boolean>(false); // بررسی اینکه آیا کامپوننت روی کلاینت ماونت شده یا نه

  useEffect(() => {
    // جلوگیری از Hydration mismatch با اطمینان از اینکه فقط در سمت کلاینت نمایش داده شود
    setMounted(true);
  }, []);

  // قبل از ماونت‌شدن کامل، چیزی رندر نکن
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-2 transition-all duration-300">
      {/* آیکون بر اساس تم جاری */}
      {isDark ? <FaSun className="w-4 h-4 text-yellow-200 transition-all duration-300" /> : <FaMoon className="w-4 h-4 text-blue-700 transition-all duration-300" />}

      {/* سوییچ برای تغییر تم */}
      <Switch dir="ltr" checked={isDark} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
    </div>
  );
}
