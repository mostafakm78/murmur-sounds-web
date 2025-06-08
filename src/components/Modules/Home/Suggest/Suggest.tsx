import { JSX } from 'react';
import { SuggestForm } from './SuggestForm';
import { TypingAnimation } from '@/components/magicui/typing-animation';

export default function Suggest(): JSX.Element {
  return (
    <section className="mx-auto container">
      {/* بخش ارسال پیشنهاد صدا جدید */}
      <div className="mt-16 p-6 gap-4 bg-white/20 dark:bg-black/20 backdrop-blur-md flex flex-col rounded-sm items-center px-10">
        {/* عنوان بخش */}
        <h3 className="md:text-3xl text-2xl text-foreground">دوست داری چه صدایی اضافه بشه ؟</h3>

        {/* انیمیشن تایپ‌شونده برای توضیح */}
        <TypingAnimation startOnView duration={30} className="font-medium min-h-[100px] xl:w-1/3 lg:w-2/4 md:w-2/3 w-full text-justify text-background text-sm md:text-base dark:text-foreground/90">
          نظر خودت رو حتما برامون بنویس و بگو دوست داری چه مدل صدایی اضافه بشه که برات انجامش بدیم! ممنون که نظرت رو با ما به اشتراک می‌گذاری. این کمک می‌کنه تا صدای آرام رو بهتر کنیم و تجربه‌ای عالی برای همه ایجاد کنیم.
        </TypingAnimation>

        {/* فرم ارسال پیشنهاد */}
        <SuggestForm />
      </div>
    </section>
  );
}
