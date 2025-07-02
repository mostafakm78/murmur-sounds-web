import { JSX } from 'react';

export default function TitleContact(): JSX.Element {
  return (
    <header className="flex flex-col justify-center items-center my-16 gap-8 text-center">
      <h1 className="md:text-6xl text-4xl text-foreground">تماس با ما</h1>
      <p className="text-justify lg:text-lg text-background dark:text-foreground font-medium px-10 max-w-3xl">اگه سوالی، ایده‌ای یا مشکلی داری، راحت از فرم پایین برامون بنویس. منتظر شنیدن ازت هستیم!</p>
    </header>
  );
}
