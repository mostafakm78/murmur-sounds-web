import Contact from '@/components/Modules/ContactUs/Contact';
import TitleContact from '@/components/Modules/ContactUs/TitleContact';
import GalaxyBackground from '@/components/Shared/Background';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';

export default function ContactUs() {
  return (
    <>
      <GalaxyBackground />
      <Header />
      <TitleContact />
      <Contact />
      <Footer />
    </>
  );
}
