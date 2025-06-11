import ContactTitleAnimation from '@/components/animations/ContactTitleAnimation';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import Contact from '@/components/Modules/ContactUs/Contact';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تماس با ما - صدای آرام',
  description: 'برای ارتباط با تیم صدای آرام و ارسال نظرات یا پیشنهادات خود، از این صفحه استفاده کنید. ما همیشه آماده شنیدن نظرات شما هستیم.',
  keywords: ['تماس با ما', 'ارتباط با صدای آرام', 'ارسال پیام', 'فرم تماس', 'پشتیبانی'],
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
    shortcut: '/images/Logo.png',
  },
  openGraph: {
    title: 'تماس با ما - صدای آرام',
    description: 'برای ارتباط با تیم صدای آرام و ارسال نظرات یا پیشنهادات خود، از این صفحه استفاده کنید. ما همیشه آماده شنیدن نظرات شما هستیم.',
    url: 'https://sedaayaram.ir/contact-us',
    siteName: 'صدای آرام',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: 'https://sedaayaram.ir/images/Logo.png',
        width: 600,
        height: 600,
        alt: 'صدای آرام',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تماس با ما - صدای آرام',
    description: 'راه ارتباطی با تیم صدای آرام برای نظرات، پیشنهادات و همکاری‌ها.',
    images: ['https://sedaayaram.ir/images/Logo.png'],
  },
};

export default function ContactUs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <ContactTitleAnimation />
      <Contact />
      <Footer />
    </>
  );
}
