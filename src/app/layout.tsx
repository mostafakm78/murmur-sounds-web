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
  title: 'صدای آرام',
  description: 'پخش صداهای آرامش بخش از طبیعت و زندگی روزانه برای ایجاد آرامش و کاهش استرس',
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
    shortcut: '/images/Logo.png',
  },
  openGraph: {
    title: 'صدای آرام',
    description: 'پخش صداهای آرامش بخش از طبیعت و زندگی روزانه برای ایجاد آرامش و کاهش استرس',
    url: 'https://sedaayaram.com',
    siteName: 'صدای آرام',
    images: [
      {
        url: '/images/Logo.png',
        width: 800,
        height: 600,
        alt: 'صدای آرام',
      },
    ],
  },
};

/**
 * کامپوننت لایه اصلی برنامه
 * شامل ارائه تم، ریداکس، نوار پیشرفت، اوورلی و نوتیفیکیشن‌ها
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
