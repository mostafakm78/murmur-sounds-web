import AboutTitleAnimation from '@/components/animations/AboutTitleAnimation';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import About from '@/components/Modules/About/About';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'درباره ما - صدای آرام',
  description: 'صفحه درباره ما صدای آرام. در این صفحه می‌توانید با تیم ما آشنا شوید و اطلاعات بیشتری درباره اهداف و فعالیت‌های ما کسب کنید.',
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
    shortcut: '/images/Logo.png',
  },
  openGraph: {
    title: 'درباره ما - صدای آرام',
    description: 'صفحه درباره ما صدای آرام. در این صفحه می‌توانید با تیم ما آشنا شوید و اطلاعات بیشتری درباره اهداف و فعالیت‌های ما کسب کنید.',
    url: 'https://softsound.ir/contact-us',
    siteName: 'صدای آرام',
    images: [
      {
        url: 'https://softsound.ir/images/Logo.png',
        width: 600,
        height: 600,
        alt: 'صدای آرام',
      },
    ],
  },
};

export default function AboutUs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <AboutTitleAnimation />
      <About />
      <Footer />
    </>
  );
}
