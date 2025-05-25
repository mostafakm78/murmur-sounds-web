import Header from '@/components/Modules/Home/Header';
import HeroSection from '@/components/Modules/Home/HeroSection';
import Overlay from '@/components/Shared/Overlay';

export default function Home() {
  return (
    <Overlay>
      <Header />
      <HeroSection />
    </Overlay>
  );
}
