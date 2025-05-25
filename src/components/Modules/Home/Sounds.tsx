import { Bird, CloudRain, FireExtinguisher, IceCreamBowl, Inspect, PauseIcon, PersonStanding, PlayIcon, Rainbow, Tv, Waves, WindIcon } from 'lucide-react';
import { SliderSounds } from './Shadcn';
import { MagicCard } from '@/components/magicui/magic-card';

const sounds = [
  {
    id: 1,
    name: 'باد',
    icon: WindIcon,
  },
  {
    id: 2,
    name: 'باران',
    icon: CloudRain,
  },
  {
    id: 3,
    name: 'آتش',
    icon: FireExtinguisher,
  },
  {
    id: 4,
    name: 'مردم',
    icon: PersonStanding,
  },
  {
    id: 5,
    name: 'موج دریا',
    icon: Waves,
  },
  {
    id: 6,
    name: 'پرنده',
    icon: Bird,
  },
  {
    id: 7,
    name: 'جیرجیرک',
    icon: Inspect,
  },
  {
    id: 8,
    name: 'برفرک',
    icon: Tv,
  },
  {
    id: 9,
    name: 'کاسه آواز',
    icon: IceCreamBowl,
  },
  {
    id: 10,
    name: 'رعد و برق',
    icon: Rainbow,
  },
];

export default function Sounds() {
  return (
    <main className="mx-auto container">
      <div className="grid md:grid-cols-5 grid-cols-2 gap-8 mt-16 px-10">
        {sounds.map((sound) => {
          const Icon = sound.icon;
          return (
            <MagicCard key={sound.id} gradientColor="#6F38C5" gradientSize={200} className="w-full h-full ">
              <div className="flex flex-col items-center p-6 shadow-sm shadow-foreground dark:shadow-foreground bg-black/20 rounded-md justify-center">
                <div className="flex flex-col items-center mb-8 md:text-2xl text-xl justify-center gap-1 text-background/90 font-medium dark:text-foreground/90">
                  <Icon className="w-20 h-20 md:w-[100px] sm:h-[100px]" />
                  {sound.name}
                </div>
                <div className="flex w-full gap-6 px-3 py-1 bg-black/10 rounded-md">
                  <PlayIcon className="w-5 h-5 md:w-[20px] sm:h-[20px] cursor-pointer" color="#F2F4F8" />
                  <PauseIcon className="w-5 h-5 md:w-[20px] sm:h-[20px] cursor-pointer" color="#F2F4F8" />
                  <SliderSounds />
                </div>
              </div>
            </MagicCard>
          );
        })}
      </div>
    </main>
  );
}
