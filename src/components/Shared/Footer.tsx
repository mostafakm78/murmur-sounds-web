import Link from 'next/link';
import { JSX } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa6';

// CSS classes for styling the footer icons
const iconLinkCss = 'hover:opacity-85 hover:duration-300 hover:scale-105';

// CSS classes for styling the footer useful links
const usefulLinks = 'font-medium hover:opacity-85 duration-300 relative after:absolute after:w-0 after:h-[1px] after:bottom-0 after:right-0 after:bg-foreground after:duration-300 hover:after:w-full';

export default function Footer(): JSX.Element {
  return (
    <>
      <footer className="bg-[#F2F4F8] dark:bg-[#AB46D2] relative h-[300px] flex flex-col gap-8 items-center justify-center py-10 w-full mt-56 after:content-[''] after:absolute dark:after:bg-[url('/assets/footer-wave-dark.svg')] after:bg-[url('/assets/footer-wave-light.svg')] after:w-full after:bg-no-repeat after:bg-cover after:h-[250px] after:bottom-full">
        {/* short description  */}
        <div className="flex flex-col gap-1 px-10">
          <h3 className="text-2xl">صدای آرام</h3>
          <p className="font-medium">تجربه گوش دادن به صدای لذت بخش طبق سلیقه شخصی و ایجاد لحظات آرامش بخش برای استراحت در طی مشغله های روزانه.</p>
        </div>
        <div className="flex lg:flex-row flex-col items-center lg:gap-10 gap-4">
          {/* useful Links  */}
          <div className="flex gap-4">
            <h4 className="text-base">لینک های مفید :</h4>
            <Link href="" className={usefulLinks}>
              بلاگ
            </Link>
            <Link href="/about-us" className={usefulLinks}>
              درباره ما
            </Link>
            <Link href="/contact-us" className={usefulLinks}>
              تماس با ما
            </Link>
          </div>
          <div className="flex gap-4 text-3xl">
            <Link href="" className={iconLinkCss}>
              <FaTelegram />
            </Link>
            <Link href="" className={iconLinkCss}>
              <FaInstagram />
            </Link>
            <Link href="" className={iconLinkCss}>
              <FaWhatsapp />
            </Link>
            <Link href="" className={iconLinkCss}>
              <FaLinkedin />
            </Link>
            <Link href="" className={iconLinkCss}>
              <FaGithub />
            </Link>
          </div>
        </div>
        {/* copyright */}
        <div dir="ltr" className="flex items-center lg:mb-2 mb-6 flex-col justify-center text-center">
          <p className="text-sm">
            © {new Date().getFullYear()}{' '}
            <Link href="" className={usefulLinks}>
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
