'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Shared/Header';
import Footer from '@/components/Shared/Footer';

export default function Loading() {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="dark:bg-black/20 my-16 bg-white/20 backdrop-blur-md p-6 flex flex-col items-center px-10 rounded-sm relative">
          <article className="prose dark:prose-invert lg:text-base font-medium text-sm leading-6 text-justify lg:w-3/4 space-y-10 mx-auto py-10 lg:p-10">
            <Skeleton className="h-10 w-3/4 mx-auto rounded" />
            <Skeleton className="h-4 w-24 mx-auto rounded" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full rounded" />
              ))}
            </div>
            <Skeleton className="w-[500px] h-[500px] mx-auto rounded-md" />
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
