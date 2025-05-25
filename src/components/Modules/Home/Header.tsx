import { SliderHeader, SwitchMute } from './SliderHeader';
import { DarkMode } from './DarkMode';
import Link from 'next/link';

const linkClassName = "relative text-foreground after:content-[''] after:w-0 after:absolute after:h-1 after:bg-foreground after:-top-[18px] after:right-0 after:duration-300 md:hover:after:w-full duration-300 hover:opacity-80 focus:opacity-80 cursor-pointer";

export default function Header() {
  return (
    <header className="h-20 fixed top-2 left-1/2 -translate-x-1/2 p-2 md:w-10/12 w-full">
      <div className="bg-background flex items-center justify-between md:px-10 px-4 rounded h-full py-2">
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
