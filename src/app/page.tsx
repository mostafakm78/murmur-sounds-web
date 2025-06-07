import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';
import HeroSection from '@/components/Modules/Home/HeroSection/HeroSection';
import Options from '@/components/Modules/Home/OptionTabs/Options';
import Sounds from '@/components/Modules/Home/Sounds/Sounds';
import Suggest from '@/components/Modules/Home/Suggest/Suggest';
import SoundsManager from '@/lib/SoundManager';
import { ScrollProgress } from '@/components/magicui/scroll-progress';

export default function Home() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <SoundsManager />
      <Header />
      <HeroSection />
      <Sounds />
      <Options />
      <Suggest />
      <Footer />
    </>
  );
}
