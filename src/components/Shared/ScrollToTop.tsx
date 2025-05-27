'use client';
import { JSX, useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import styles from './ScrollToTop.module.css';

// scroll to top button component
const ScrollToTop = (): JSX.Element => {
  // state to track visibility of the button
  const [isVisible, setIsVisible] = useState(false);

  // Effect to handle scroll event and toggle button visibility
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
    <button className={isVisible ? styles.buttonVisible : styles.button} onClick={scrollToTop}>
      <MdKeyboardArrowUp />
    </button>
  );
};

export default ScrollToTop;
