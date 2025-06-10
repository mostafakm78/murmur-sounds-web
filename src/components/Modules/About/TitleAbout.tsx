import { JSX } from 'react';

export default function TitleAbout(): JSX.Element {
  return (
    // title section of about page
    <div className="flex flex-col justify-center items-center my-16 gap-8">
      <h2 className="md:text-6xl text-4xl text-foreground">صدای آرام</h2>
      <p className="font-medium text-background dark:text-foreground">پروژه توسط مصطفی کمری</p>
    </div>
  );
}
