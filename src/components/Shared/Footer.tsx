import Link from 'next/link';
import { JSX } from 'react';
import FooterIconAnimation from '../animations/FooterIconsAnimaton';

// استایل‌های لینک‌های مفید با افکت خط زیر
const usefulLinks = 'font-medium hover:opacity-85 duration-300 relative after:absolute after:w-0 after:h-[1px] after:bottom-0 after:right-0 after:bg-foreground after:duration-300 hover:after:w-full';

export default function Footer(): JSX.Element {
  return (
    <>
      <footer
        className="bg-[#F2F4F8] dark:bg-[#AB46D2] relative h-[300px] flex flex-col gap-8 items-center justify-center py-10 w-full mt-56
        after:content-[''] after:absolute dark:after:bg-[url('/assets/footer-wave-dark.svg')] after:bg-[url('/assets/footer-wave-light.svg')]
        after:w-full after:bg-no-repeat after:bg-cover after:h-[250px] after:bottom-full"
      >
        {/* عنوان و توضیح کوتاه درباره سایت */}
        <div className="flex flex-col gap-3 px-10 text-center">
          <h3 className="text-2xl text-foreground dark:text-background">صدای آرام</h3>
          <h3 className="text-2xl font-sans font-bold text-foreground dark:text-background">SoftSound</h3>
          <p className="font-medium">تجربه گوش دادن به صدای لذت‌بخش طبق سلیقه شخصی و ایجاد لحظات آرامش‌بخش برای استراحت در طی مشغله‌های روزانه.</p>
        </div>

        {/* بخش لینک‌ها و شبکه‌های اجتماعی */}
        <div className="flex lg:flex-row flex-col items-center lg:gap-10 gap-4">
          {/* لینک‌های مفید */}
          <div className="flex gap-4 items-center">
            <h4 className="text-base">لینک‌های مفید:</h4>
            <Link href="/blogs" className={usefulLinks}>
              بلاگ
            </Link>
            <Link href="/about-us" className={usefulLinks}>
              درباره ما
            </Link>
            <Link href="/contact-us" className={usefulLinks}>
              تماس با ما
            </Link>
          </div>

          {/* آیکون شبکه‌های اجتماعی */}
          <FooterIconAnimation />
        </div>

        {/* کپی‌رایت و سازنده */}
        <div dir="ltr" className="flex items-center lg:mb-2 mb-6 flex-col justify-center text-center">
          <p className="text-sm">
            © {new Date().getFullYear()}{' '}
            <Link href="https://portfolio-immostafakamari.vercel.app" target="_blank" className={usefulLinks}>
              Mostafa Kamari
            </Link>
            . All rights reserved.
          </p>
          <p className="text-xs mt-2">Made with ❤️ by Mostafa</p>
        </div>
      </footer>
    </>
  );
}
