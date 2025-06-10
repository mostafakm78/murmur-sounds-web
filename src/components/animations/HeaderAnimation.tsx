'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import Header from '../Shared/Header';

export default function HeaderAnimation() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
        <Header />
      </m.div>
    </LazyMotion>
  );
}
