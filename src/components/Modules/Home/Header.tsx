import { SliderHeader, SwitchMute } from './Shadcn';
import { DarkMode } from '../../Shared/DarkMode';
import Link from 'next/link';

const linkClassName = "relative text-foreground after:content-[''] after:w-0 after:absolute after:h-1 after:bg-foreground after:-top-[18px] after:right-0 after:duration-300 md:hover:after:w-full duration-300 hover:opacity-80 focus:opacity-80 cursor-pointer";

export default function Header() {
  return (
    <header className="h-20 z-[5] mt-3 flex justify-center p-2">
      <div className="bg-[#F2F4F8] dark:bg-[#6C63FF] md:w-10/12 w-full flex shadow-sm dark:shadow-sm dark:shadow-foreground items-center justify-between md:px-10 px-4 rounded h-full py-2">
        <div className="flex items-center">
          <SwitchMute />
          <SliderHeader className="md:w-32 w-20 ml-3" />
          <DarkMode />
        </div>
        <div className="flex flex-row-reverse md:space-x-4 space-x-2 md:text-lg text-sm">
          <Link href="#" className={linkClassName}>
            تماس با ما
          </Link>
          <Link href="#" className={linkClassName}>
            درباره ما
          </Link>
          <Link href="#" className={linkClassName}>
            بلاگ
          </Link>
          <Link href="/" className={linkClassName}>
            خانه
          </Link>
        </div>
      </div>
    </header>
  );
}
