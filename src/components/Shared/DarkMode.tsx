'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { JSX, useEffect, useState } from 'react';

// dark and light mode toggle
export function DarkMode(): JSX.Element | null {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-2 transition-all duration-300">
      {isDark ? <FaSun className="w-4 h-4 text-yellow-200 transition-all duration-300" /> : <FaMoon className="w-4 h-4 text-blue-700 transition-all duration-300" />}
      <Switch dir="ltr" checked={isDark} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
    </div>
  );
}
