import { ScrollProgress } from '@/components/magicui/scroll-progress';
import Contact from '@/components/Modules/ContactUs/Contact';
import TitleContact from '@/components/Modules/ContactUs/TitleContact';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';

export default function ContactUs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <TitleContact />
      <Contact />
      <Footer />
    </>
  );
}
