import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from '@/lib/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import ReduxProvider from '@/lib/ReduxProvider';
import Overlay from '@/components/Shared/Overlay';
import Pattern from '@/components/Shared/Pattern';
import { ClientOnly } from '@/components/Shared/ClientOnly';
import ProgressBar from '@/components/Shared/Progressbar';

/**
 * اطلاعات متا برای موتورهای جستجو و اشتراک‌گذاری
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://softsound.vercel.app'),

  title: 'صدای آرام',
  description: 'پخش صداهای آرامش‌بخش از طبیعت و زندگی روزمره برای ایجاد آرامش و کاهش استرس.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true, // اجازه ایندکس شدن
    follow: true, // اجازه دنبال کردن لینک‌ها
    nocache: false, // اجازه کش شدن
    noarchive: false, // گوگل نسخه‌ی کش‌شده نگه دارد
  },
  keywords: ['صدای آرام', 'صداهای طبیعت', 'ریلکسیشن', 'آرامش', 'مدیتیشن', 'موزیک آرامش‌بخش'],
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
    shortcut: '/images/Logo.png',
  },
  openGraph: {
    title: 'صدای آرام',
    description: 'پخش صداهای آرامش‌بخش از طبیعت و زندگی روزمره برای ایجاد آرامش و کاهش استرس.',
    url: 'https://softsound.vercel.app',
    siteName: 'صدای آرام',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: 'https://softsound.vercel.app/images/Logo.png',
        width: 600,
        height: 600,
        alt: 'صدای آرام',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'صدای آرام',
    description: 'پخش صداهای آرامش‌بخش از طبیعت و زندگی روزمره برای کاهش استرس.',
    images: ['https://softsound.vercel.app/images/Logo.png'],
  },
};

/**
 * کامپوننت لایه اصلی برنامه
 * شامل ارائه تم، ریداکس، نوار پیشرفت، اوورلی و نوتیفیکیشن‌ها
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProgressBar />
            {/* لایه محو روی محتوا */}
            <Overlay />

            <Pattern />
            {/* محتوای اصلی صفحات */}
            <ClientOnly>{children}</ClientOnly>

            {/* نمایش نوتیفیکیشن‌ها */}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
