'use client';

import { MagicCard } from '@/components/magicui/magic-card';
import { FaPlay, FaPause } from 'react-icons/fa';
import React, { JSX, useEffect, useRef } from 'react';
import { LuWind } from 'react-icons/lu';
import { FaCloudRain, FaFire } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { MdOutlineWaves } from 'react-icons/md';
import { PiBird } from 'react-icons/pi';
import { GiGrass, GiBubblingBowl } from 'react-icons/gi';
import { FaTv } from 'react-icons/fa';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { pauseSound, playSound } from '@/app/store/soundSlice';
import { SliderSounds } from './SliderSounds';

type soundsProps = {
  id: number;
  name: string;
  icon: React.ElementType | string;
  audio: string[];
};

const soundsData: soundsProps[] = [
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
];

export default function Sounds(): JSX.Element {
  const dispatch = useDispatch();
  const volumes = useSelector((state: RootState) => state.sound.volumes);
  const playing = useSelector((state: RootState) => state.sound.playing);
  const globalVolume = useSelector((state: RootState) => state.sound.globalVolume);

  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  const togglePlay = (id: number) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      dispatch(playSound(id));
    } else {
      audio.pause();
      dispatch(pauseSound(id));
    }
  };

  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([idStr, audio]) => {
      const id = parseInt(idStr);
      if (audio) {
        const volume = volumes[id] ?? 30;
        audio.volume = (volume / 100) * (globalVolume / 100);
      }
    });
  }, [volumes, globalVolume]);

  return (
    <main className="mx-auto container">
      <div className="grid md:grid-cols-5 grid-cols-2 gap-8 mt-16 px-10">
        {soundsData.map((sound) => {
          const Icon = sound.icon;
          return (
            <MagicCard key={sound.id} gradientColor="#6F38C5" gradientSize={700} className={`w-full h-full rounded-md border border-foreground/10 dark:border-foreground/20 ${playing[sound.id] ? 'scale-105 outline-4 outline outline-foreground/50 dark:outline-foreground/50' : ''} duration-500`}>
              <div className={`flex flex-col items-center p-6 shadow-foreground/30 justify-center`}>
                <div className={`flex flex-col items-center mb-8 md:text-2xl text-xl justify-center gap-1 ${playing[sound.id] ? 'scale-110' : ''} font-medium duration-500 text-background/90 dark:text-foreground/90`}>
                  <Icon className="w-20 h-20 md:w-[100px] sm:h-[100px]" />
                  {sound.name}
                </div>

                <audio
                  ref={(el) => {
                    if (el) {
                      el.setAttribute('controlsList', 'nodownload');
                      audioRefs.current[sound.id] = el;
                    }
                  }}
                  loop
                  controls={false}
                  style={{ display: 'none' }}
                >
                  {sound.audio.map((src, idx) => (
                    <source key={idx} src={src} />
                  ))}
                </audio>

                <div className="flex w-full px-3 justify-between py-1 bg-black/10 rounded-md items-center">
                  {!playing[sound.id] ? (
                    <FaPlay onClick={() => togglePlay(sound.id)} className="w-5 h-5 cursor-pointer" color="#F2F4F8" title="Play" />
                  ) : (
                    <FaPause onClick={() => togglePlay(sound.id)} className="w-5 h-5 cursor-pointer" color="#F2F4F8" title="Pause" />
                  )}

                  <SliderSounds soundId={sound.id} audio={audioRefs.current[sound.id]} />
                </div>
              </div>
            </MagicCard>
          );
        })}
      </div>
    </main>
  );
}
