import { IoIosPeople, IoIosWater, IoMdPlanet } from 'react-icons/io';
import { MdOutlineWaves } from 'react-icons/md';
import { PiBird } from 'react-icons/pi';
import { GiGrass, GiBubblingBowl, GiWindTurbine } from 'react-icons/gi';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { LuWind } from 'react-icons/lu';
import { FaCloudRain, FaFire, FaTv, FaSnowflake, FaRoad } from 'react-icons/fa';

type soundsProps = {
  id: number;
  name: string;
  icon: React.ElementType | string;
  audio: string[];
};

export const soundsData: soundsProps[] = [
  { id: 1, name: 'باد', icon: LuWind, audio: ['/api/sound?file=main-wind.ogg', '/api/sound?file=main-wind.mp4'] },
  { id: 2, name: 'باران', icon: FaCloudRain, audio: ['/api/sound?file=main-rain.ogg', '/api/sound?file=main-rain.mp4'] },
  { id: 3, name: 'آتش', icon: FaFire, audio: ['/api/sound?file=main-fire.ogg', '/api/sound?file=main-fire.mp4'] },
  { id: 4, name: 'شلوغی', icon: IoIosPeople, audio: ['/api/sound?file=main-people.ogg', '/api/sound?file=main-people.mp4'] },
  { id: 5, name: 'موج دریا', icon: MdOutlineWaves, audio: ['/api/sound?file=main-waves.ogg', '/api/sound?file=main-waves.mp4'] },
  { id: 6, name: 'پرنده', icon: PiBird, audio: ['/api/sound?file=main-birds.ogg', '/api/sound?file=main-birds.mp4'] },
  { id: 7, name: 'جیرجیرک', icon: GiGrass, audio: ['/api/sound?file=main-crickets.ogg', '/api/sound?file=main-crickets.mp4'] },
  { id: 8, name: 'برفرک', icon: FaTv, audio: ['/api/sound?file=main-whitenoise.ogg', '/api/sound?file=main-whitenoise.mp4'] },
  { id: 9, name: 'کاسه آواز', icon: GiBubblingBowl, audio: ['/api/sound?file=main-sbowl.ogg', '/api/sound?file=main-sbowl.mp4'] },
  { id: 10, name: 'رعد و برق', icon: AiOutlineThunderbolt, audio: ['/api/sound?file=main-thunder.ogg', '/api/sound?file=main-thunder.mp4'] },
  { id: 11, name: 'فضا', icon: IoMdPlanet, audio: ['/api/sound?file=space.wav'] },
  { id: 12, name: 'جریان آب', icon: IoIosWater, audio: ['/api/sound?file=water.wav'] },
  { id: 13, name: 'قدم زدن در برف', icon: FaSnowflake, audio: ['/api/sound?file=snow-footstep.wav'] },
  { id: 14, name: 'باد ملایم', icon: GiWindTurbine, audio: ['/api/sound?file=wind.wav'] },
  { id: 15, name: 'جاده', icon: FaRoad, audio: ['/api/sound?file=road.wav'] },
];
