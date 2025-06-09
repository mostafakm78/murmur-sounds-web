'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import Header from '../Shared/Header';

export default function HeaderAnimation() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
        <Header />
      </m.div>
    </LazyMotion>
  );
}
