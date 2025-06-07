'use client';

import { useEffect, useState, ReactNode } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center text-2xl lg:text-4xl items-center h-screen text-background dark:text-foreground gap-2">
        <AiOutlineLoading className="animate-spin" />
        در حال بارگذاری...
      </div>
    );
  }

  return <>{children}</>;
}
