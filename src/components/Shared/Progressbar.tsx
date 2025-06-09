'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

export default function RouteLoadingIcon() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const finish = setTimeout(() => setLoading(false), 1000);
    return () => {
      clearTimeout(finish);
      setLoading(false);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] text-4xl text-gradient animate-spin">
      <AiOutlineLoading />
    </div>
  );
}
