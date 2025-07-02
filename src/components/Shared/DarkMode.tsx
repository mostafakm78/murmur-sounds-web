'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { JSX } from 'react';

/**
 * کامپوننت سوییچ بین تم روشن (Light) و تاریک (Dark)
 */
export function DarkMode(): JSX.Element | null {
  const { setTheme, resolvedTheme } = useTheme(); // گرفتن تم فعلی و تابع تغییر تم از next-themes

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-2 transition-all duration-300">
      {/* آیکون بر اساس تم جاری */}
      {isDark ? <FaSun className="w-4 h-4 text-yellow-200 transition-all duration-300" /> : <FaMoon className="w-4 h-4 text-blue-700 transition-all duration-300" />}

      {/* سوییچ برای تغییر تم */}
      <Switch key={isDark ? 'dark' : 'light'} dir="ltr" checked={isDark} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
    </div>
  );
}
