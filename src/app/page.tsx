import Footer from '@/components/Shared/Footer';
import HeroSection from '@/components/Modules/Home/HeroSection/HeroSection';
import Options from '@/components/Modules/Home/OptionTabs/Options';
import Sounds from '@/components/Modules/Home/Sounds/Sounds';
import Suggest from '@/components/Modules/Home/Suggest/Suggest';
import SoundsManager from '@/lib/SoundManager';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import InitFromURL from '@/lib/InitFromURL';
import HeaderAnimation from '@/components/animations/HeaderAnimation';

export default function Home() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <SoundsManager />
      <InitFromURL />
      <HeaderAnimation />
      <HeroSection />
      <Sounds />
      <Options />
      <Suggest />
      <Footer />
    </>
  );
}
