import BlogTitleAnimation from '@/components/animations/BlogTitleAnimation';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import Blog from '@/components/Modules/Blogs/Blog';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'بلاگ صدای آرام',
  description: 'در بلاگ صدای آرام، مقالاتی درباره آرامش ذهن، صداهای طبیعی، تکنیک‌های مدیتیشن، و کاهش استرس مطالعه کنید. این بلاگ راهنمایی برای رسیدن به آرامش در زندگی روزمره است.',
  keywords: ['بلاگ آرامش', 'صداهای طبیعی', 'مدیتیشن', 'کاهش استرس', 'ریلکسیشن', 'آرامش ذهن'],
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
    shortcut: '/images/Logo.png',
  },
  openGraph: {
    title: 'بلاگ صدای آرام',
    description: 'در بلاگ صدای آرام، مقالاتی درباره آرامش ذهن، صداهای طبیعی، تکنیک‌های مدیتیشن، و کاهش استرس مطالعه کنید.',
    url: 'https://softsound.ir/blogs',
    siteName: 'صدای آرام',
    images: [
      {
        url: 'https://softsound.ir/images/Logo.png',
        width: 600,
        height: 600,
        alt: 'صدای آرام',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بلاگ صدای آرام',
    description: 'مطالبی درباره آرامش ذهن، صداهای طبیعی و مدیتیشن برای کمک به کاهش استرس و زندگی آرام‌تر.',
    images: ['https://softsound.ir/images/Logo.png'],
  },
};

export default function Blogs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <BlogTitleAnimation />
      <Blog />
      <Footer />
    </>
  );
}
