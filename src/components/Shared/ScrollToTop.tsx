'use client';

import { JSX } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import styles from './ScrollToTop.module.css';

// دکمه بازگشت به بالای صفحه
const ScrollToTop = (): JSX.Element => {
  // تابع بازگشت نرم به بالای صفحه
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button onClick={scrollToTop} className={styles.buttonVisible} aria-label="بازگشت به بالا">
      <MdKeyboardArrowUp />
    </button>
  );
};

export default ScrollToTop;
