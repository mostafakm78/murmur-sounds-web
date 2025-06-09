import ContactTitleAnimation from '@/components/animations/ContactTitleAnimation';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import Contact from '@/components/Modules/ContactUs/Contact';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';

export default function ContactUs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <ContactTitleAnimation />
      <Contact />
      <Footer />
    </>
  );
}
