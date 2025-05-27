'use client';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import styles from './ScrollToTop.module.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      window.scrollY > 120 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  };

  return (
    <button
      className={isVisible ? styles.buttonVisible : styles.button}
      onClick={scrollToTop}
    >
      <MdKeyboardArrowUp />
    </button>
  );
};

export default ScrollToTop;
