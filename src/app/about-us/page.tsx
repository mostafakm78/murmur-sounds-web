import { ScrollProgress } from '@/components/magicui/scroll-progress';
import About from '@/components/Modules/About/About';
import TitleAbout from '@/components/Modules/About/TitleAbout';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';

export default function AboutUs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <TitleAbout />
      <About />
      <Footer />
    </>
  );
}
