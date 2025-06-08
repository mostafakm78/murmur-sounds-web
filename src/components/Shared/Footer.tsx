import Link from 'next/link';
import { JSX } from 'react';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa6';
import ScrollToTop from './ScrollToTop';

// استایل‌های آیکون‌های شبکه‌های اجتماعی
const iconLinkCss = 'hover:opacity-85 hover:duration-300 hover:scale-105';

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
          <h3 className="text-2xl">صدای آرام</h3>
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
          <div className="flex gap-4 text-3xl">
            <Link href="https://t.me/Mostafakamari78" target="_blank" className={iconLinkCss}>
              <FaTelegram />
            </Link>
            <Link href="https://wa.me/+989169799533" target="_blank" className={iconLinkCss}>
              <FaWhatsapp />
            </Link>
            <Link href="https://linkedin.com/in/mostafakamari" target="_blank" className={iconLinkCss}>
              <FaLinkedin />
            </Link>
            <Link href="https://github.com/mostafakm78" target="_blank" className={iconLinkCss}>
              <FaGithub />
            </Link>
            {/* دکمه اسکرول به بالا */}
            <ScrollToTop />
          </div>
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
