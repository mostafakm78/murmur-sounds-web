import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/Shared/ThemeProvider';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import ScrollToTop from '@/components/Shared/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import ReduxProvider from '@/components/Shared/ReduxProvider';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ScrollProgress className="h-[1.5px] bg-foreground" />
            {children}
            <Toaster />
            <ScrollToTop />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
