import { JSX } from 'react';

export default function TitleAbout(): JSX.Element {
  return (
    <section aria-labelledby="about-title" className="flex flex-col justify-center items-center my-16 gap-8">
      <h2 id="about-title" className="md:text-6xl text-4xl text-foreground">
        صدای آرام
      </h2>
      <p className="font-medium text-background dark:text-foreground">پروژه توسط مصطفی کمری</p>
    </section>
  );
}
