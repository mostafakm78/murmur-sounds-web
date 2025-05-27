import About from '@/components/Modules/About/About';
import TitleAbout from '@/components/Modules/About/TitleAbout';
import GalaxyBackground from '@/components/Shared/Background';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';

export default function AboutUs() {
  return (
    <>
      <GalaxyBackground />
      <Header />
      <TitleAbout />
      <About />
      <Footer />
    </>
  );
}
