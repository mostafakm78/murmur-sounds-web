'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import TitleContact from '../Modules/ContactUs/TitleContact';

export default function ContactTitleAnimation() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: 'easeOut',
        }}
        viewport={{ once: true }}
      >
        <TitleContact />
      </m.div>
    </LazyMotion>
  );
}
