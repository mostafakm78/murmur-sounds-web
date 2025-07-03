'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { AnimatePresence, motion } from 'framer-motion';
import { JSX } from 'react';

export function DarkMode(): JSX.Element | null {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-2 transition-all duration-300">
      {/* آیکون با انیمیشن ورود/خروج */}
      <div className="relative w-6 h-6 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span key="sun" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute w-full h-full flex items-center justify-center text-yellow-200">
              <FaSun className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="moon" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute w-full h-full flex items-center justify-center text-blue-700">
              <FaMoon className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* سوییچ تم */}
      <Switch dir="ltr" checked={isDark} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
    </div>
  );
}
