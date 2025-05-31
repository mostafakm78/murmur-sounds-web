import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';
import HeroSection from '@/components/Modules/Home/HeroSection/HeroSection';
import Options from '@/components/Modules/Home/OptionTabs/Options';
import Sounds from '@/components/Modules/Home/Sounds/Sounds';
import Suggest from '@/components/Modules/Home/Suggest/Suggest';
import Background from '@/components/Shared/Background';
import SoundsManager from '@/components/Shared/SoundManager';

export default function Home() {
  return (
    <>
    <SoundsManager />
      <Background />
      <Header />
      <HeroSection />
      <Sounds />
      <Options />
      <Suggest />
      <Footer />
    </>
  );
}
