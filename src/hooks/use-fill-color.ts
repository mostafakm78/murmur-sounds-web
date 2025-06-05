'use client';

import { useTheme } from 'next-themes';

/**
 * هوک دریافت رنگ بر اساس تم جاری
 * @param colors آبجکتی شامل رنگ حالت light و dark
 * @returns رنگ مناسب با تم فعلی
 */
export function useFillColor({ light, dark }: { light: string; dark: string }): string {
  const { resolvedTheme } = useTheme();

  return resolvedTheme === 'dark' ? dark : light;
}
