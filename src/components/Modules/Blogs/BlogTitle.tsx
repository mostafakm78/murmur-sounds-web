import { JSX } from 'react';

export default function TitleBlog(): JSX.Element {
  return (
    <section aria-labelledby="blog-title" className="flex flex-col justify-center items-center my-16 gap-8">
      <h2 id="blog-title" className="md:text-6xl text-4xl text-foreground">
        بلاگ صدای آرام
      </h2>
      <h4 className="font-medium text-xl text-background dark:text-foreground">اخبار جدید سایت</h4>
    </section>
  );
}
