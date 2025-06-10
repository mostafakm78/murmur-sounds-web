import { JSX } from 'react';

export default function TitleContact(): JSX.Element {
  return (
    // title section of about page
    <div className="flex flex-col justify-center items-center my-16 gap-8">
      <h2 className="md:text-6xl text-4xl text-foreground">تماس با ما</h2>
      <p className="text-justify lg:text-lg text-background dark:text-foreground font-medium px-10">اگه سوالی، ایده‌ای یا مشکلی داری، راحت از فرم پایین برامون بنویس. منتظر شنیدن ازت هستیم!</p>
    </div>
  );
}
