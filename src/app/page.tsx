import Footer from '@/components/Shared/Footer';
import HeroSection from '@/components/Modules/Home/HeroSection/HeroSection';
import Options from '@/components/Modules/Home/OptionTabs/Options';
import Sounds from '@/components/Modules/Home/Sounds/Sounds';
import Suggest from '@/components/Modules/Home/Suggest/Suggest';
import SoundsManager from '@/lib/SoundManager';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import InitFromURL from '@/lib/InitFromURL';
import HeaderAnimation from '@/components/animations/HeaderAnimation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'صدای آرام',
  description: 'پخش صداهای آرامش‌بخش از طبیعت و زندگی روزمره برای ایجاد آرامش ذهن و کاهش استرس. صفحه اصلی صدای آرام برای دسترسی سریع به مجموعه‌ای از صداهای ریلکسیشن.',
  keywords: ['صدای آرام', 'صداهای طبیعت', 'آرامش', 'ریلکس', 'مدیتیشن', 'کاهش استرس', 'موزیک بی‌کلام', 'موزیک آرامش‌بخش', 'موسیقی درمانی'],
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
    shortcut: '/images/Logo.png',
  },
  openGraph: {
    title: 'صدای آرام',
    description: 'پخش صداهای آرامش‌بخش از طبیعت و زندگی روزمره برای ایجاد آرامش ذهن و کاهش استرس.',
    url: 'https://sedaayaram.ir',
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
    title: 'صدای آرام',
    description: 'صداهای آرامش‌بخش از طبیعت و زندگی روزمره برای ایجاد حس آرامش و کاهش استرس.',
    images: ['https://sedaayaram.ir/images/Logo.png'],
    creator: '@yourTwitterHandle',
  },
};

export default function Home() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <SoundsManager />
      <InitFromURL />
      <HeaderAnimation />
      <HeroSection />
      <Sounds />
      <Options />
      <Suggest />
      <Footer />
    </>
  );
}
