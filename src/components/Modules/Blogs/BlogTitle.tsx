import { JSX } from 'react';

export default function TitleBlog(): JSX.Element {
  return (
    // title section of about page
    <div className="flex flex-col justify-center items-center my-16 gap-8">
      <h2 className="md:text-6xl text-4xl text-foreground">بلاگ صدای آرام</h2>
      <h4 className="font-medium text-xl text-background dark:text-foreground">اخبار جدید سایت</h4>
    </div>
  );
}
