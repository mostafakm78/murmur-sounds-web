import { SliderSounds } from '../Shadcn';
import { MagicCard } from '@/components/magicui/magic-card';
import { FaFire } from 'react-icons/fa6';
import { LuWind } from 'react-icons/lu';
import { FaCloudRain, FaTv, FaPlay, FaPause } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { MdOutlineWaves } from 'react-icons/md';
import { PiBird } from 'react-icons/pi';
import { GiGrass, GiBubblingBowl } from 'react-icons/gi';
import { AiOutlineThunderbolt } from 'react-icons/ai';

const sounds = [
  {
    id: 1,
    name: 'باد',
    icon: LuWind,
  },
  {
    id: 2,
    name: 'باران',
    icon: FaCloudRain,
  },
  {
    id: 3,
    name: 'آتش',
    icon: FaFire,
  },
  {
    id: 4,
    name: 'شلوغی',
    icon: IoIosPeople,
  },
  {
    id: 5,
    name: 'موج دریا',
    icon: MdOutlineWaves,
  },
  {
    id: 6,
    name: 'پرنده',
    icon: PiBird,
  },
  {
    id: 7,
    name: 'جیرجیرک',
    icon: GiGrass,
  },
  {
    id: 8,
    name: 'برفرک',
    icon: FaTv,
  },
  {
    id: 9,
    name: 'کاسه آواز',
    icon: GiBubblingBowl,
  },
  {
    id: 10,
    name: 'رعد و برق',
    icon: AiOutlineThunderbolt,
  },
];

export default function Sounds() {
  return (
    <main className="mx-auto container">
      <div className="grid md:grid-cols-5 grid-cols-2 gap-8 mt-16 px-10">
        {sounds.map((sound) => {
          const Icon = sound.icon;
          return (
            <MagicCard key={sound.id} gradientColor="#6F38C5" gradientSize={700} className="w-full h-full ">
              <div className="flex flex-col items-center p-6 rounded-md shadow shadow-foreground/30 justify-center">
                <div className="flex flex-col items-center mb-8 md:text-2xl text-xl justify-center gap-1 text-background/90 font-medium dark:text-foreground/90">
                  <Icon className="w-20 h-20 md:w-[100px] sm:h-[100px]" />
                  {sound.name}
                </div>
                <div className="flex w-full md:gap-6 gap-1 px-3 py-1 bg-black/10 rounded-md">
                  <FaPlay className="w-5 h-5 md:w-[20px] sm:h-[20px] cursor-pointer" color="#F2F4F8" />
                  <FaPause className="w-5 h-5 md:w-[20px] sm:h-[20px] cursor-pointer" color="#F2F4F8" />
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
