import AboutTitleAnimation from '@/components/animations/AboutTitleAnimation';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import About from '@/components/Modules/About/About';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';

export default function AboutUs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <AboutTitleAnimation />
      <About />
      <Footer />
    </>
  );
}
