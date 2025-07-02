import Image from 'next/image';
import { JSX } from 'react';

export default function About(): JSX.Element {
  return (
    // بخش معرفی و توضیح درباره‌ی خودم و پروژه صدای آرام
    <section aria-labelledby="about-title" className="mx-auto container">
      <div className="dark:bg-black/20 bg-white/20 backdrop-blur-md p-6 gap-10 flex flex-col items-center px-10 rounded-sm relative">
        {/* بخش عنوان و تصویر شخصی */}
        <div className="flex flex-col items-center gap-6 lg:gap-0 lg:items-start lg:flex-row justify-between w-full md:w-2/3 lg:w-1/2">
          {/* عنوان معرفی */}
          <h4 id="about-title" className="text-xl text-background dark:text-foreground">
            من &quot;صدای آرام&quot; رو برای خودم ساختم.
          </h4>

          {/* تصویر شخصی سازنده */}
          <Image className="rounded-full ring-4 ring-background dark:ring-foreground" src="/images/personal.jpeg" alt="تصویر شخصی سازنده پروژه صدای آرام" width={150} height={150} priority={true} />
        </div>

        {/* متن توضیحی درباره‌ی هدف و فلسفه پروژه */}
        <p className="text-justify lg:text-lg text-background dark:text-foreground font-medium w-full md:w-2/3 lg:w-1/2 leading-loose whitespace-pre-line">
          من دوست دارم توی فضاهای عمومی مثل کتابخونه‌ها و کافه‌ها کار کنم، اما اونجاها ممکنه پر سر و صدا و حواس‌پرت‌کننده باشن.
          <br />
          گوش دادن به صداهای محیطی کمکم می‌کنه تمرکز کنم، و دوست دارم که بتونم صداهای مختلف رو با هم ترکیب کنم تا با محیطی که توش هستم هماهنگ بشه. به نظر می‌رسه بقیه هم ازش خوششون اومده، واسه همین ادامه دادم و روش کار کردم.
          <br />
          تلاش کردم تجربه‌ی کار با صدای آرام رو ساده و در عین حال کاربردی نگه دارم. ترکیب صداها برام مثل طراحی یک فضای جدید برای ذهنه؛ جایی که هم آرامش هست و هم تمرکز.
          <br />
          هر بار که صدای جدیدی اضافه می‌کنم یا ویژگی تازه‌ای می‌سازم، به این فکر می‌کنم که چطور می‌تونه به بقیه هم برای ساختن فضای دلخواه‌شون کمک کنه. هدفم همیشه این بوده که محیطی بسازم که آدم‌ها بتونن بدون مزاحمت، روی کاری که براشون مهمه تمرکز کنن.
        </p>
      </div>
    </section>
  );
}
