'use client';

import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa6';
import { LazyMotion, domAnimation, m, Variants } from 'framer-motion';
import ScrollToTop from '@/components/Shared/ScrollToTop';
import Link from 'next/link';

const iconLinkCss = 'hover:opacity-85 hover:duration-300 hover:scale-105 cursor-pointer';

// تعریف Variants برای انیمیشن آیکون‌ها
const iconVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.3, // هر آیکون 0.3 ثانیه بعد از قبلی شروع شود
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  }),
};

export default function FooterIconAnimation() {
  const icons = [
    { href: 'https://t.me/Mostafakamari78', icon: <FaTelegram /> },
    { href: 'https://wa.me/+989169799533', icon: <FaWhatsapp /> },
    { href: 'https://linkedin.com/in/mostafakamari', icon: <FaLinkedin /> },
    { href: 'https://github.com/mostafakm78', icon: <FaGithub /> },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-4 text-3xl items-center">
        {icons.map(({ href, icon }, i) => (
          <m.div key={href} custom={i} variants={iconVariants} className={iconLinkCss}>
            <Link href={href} target="_blank" rel="noopener noreferrer">
              {icon}
            </Link>
          </m.div>
        ))}
        <ScrollToTop />
      </m.div>
    </LazyMotion>
  );
}
