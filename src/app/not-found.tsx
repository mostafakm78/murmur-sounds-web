'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-9xl font-extrabold text-gray-300 dark:text-gray-700">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-4">صفحه مورد نظر پیدا نشد</p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">متاسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.</p>
      <Link href="/" className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
