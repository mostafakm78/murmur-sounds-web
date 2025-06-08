'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineLoading } from 'react-icons/ai';

export default function RouteLoadingIcon() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const finish = setTimeout(() => {
      setLoading(false);
    }, 1000); // زمان نمایش آیکون بعد از تغییر مسیر

    return () => clearTimeout(finish);
  }, [pathname]);

  if (!loading) return null;

  return (
    <motion.div initial={{ opacity: 1 }} animate={{ rotate: 360 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }} className="fixed top-4 right-4 z-[9999] text-4xl from-purple-500 to-blue-500 dark:from-purple-500 dark:to-pink-400">
      <AiOutlineLoading className="animate-spin" />
    </motion.div>
  );
}
