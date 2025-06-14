'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { soundsData } from '@/lib/Sounds';
import { setPlaying, setGlobalStateByPlaying, setVolume, setGlobalMuted } from '@/app/store/soundSlice';
import { Howl } from 'howler';

export default function SoundsManager() {
  const dispatch = useDispatch();

  const playing = useSelector((state: RootState) => state.sound.playing);
  const volumes = useSelector((state: RootState) => state.sound.volumes);
  const globalVolume = useSelector((state: RootState) => state.sound.globalVolume);
  const globalMuted = useSelector((state: RootState) => state.sound.globalMuted);

  const howlRefs = useRef<{ [id: number]: Howl }>({});
  const prevPlaying = useRef<{ [id: number]: boolean }>({});
  const originalVolumesRef = useRef<{ [id: number]: number }>({});

  function tryPlay(howl: Howl) {
    if (!howl.playing()) {
      const playId = howl.play();

      howl.once('play', () => {
        // صدا پلی شد
      });

      howl.once('playerror', () => {
        setTimeout(() => {
          howl.play();
        }, 1000);
      });

      howl.once('loaderror', () => {
        console.error('Load error on sound:', howl);
      });
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('activeSounds');
    const volumesSaved = localStorage.getItem('soundVolumes');
    const mutedSaved = localStorage.getItem('globalMuted');

    if (volumesSaved) {
      try {
        const parsedVolumes = JSON.parse(volumesSaved);
        Object.entries(parsedVolumes).forEach(([idStr, vol]) => {
          dispatch(setVolume({ id: Number(idStr), volume: Number(vol) }));
        });
      } catch (err) {
        console.error('Invalid JSON in soundVolumes', err);
      }
    }

    if (saved) {
      try {
        const ids = JSON.parse(saved);
        ids.forEach((id: number) => {
          dispatch(setPlaying({ id, playing: true }));
        });
      } catch (err) {
        console.error('Invalid JSON in activeSounds', err);
      }
    }

    if (mutedSaved) {
      try {
        const muted = JSON.parse(mutedSaved);
        dispatch(setGlobalMuted(muted));
      } catch {
        dispatch(setGlobalMuted(false));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    Object.entries(playing).forEach(([idStr, isPlaying]) => {
      const id = Number(idStr);
      const wasPlaying = prevPlaying.current[id];

      if (wasPlaying === isPlaying) return;

      if (isPlaying) {
        if (!howlRefs.current[id]) {
          const sound = soundsData.find((s) => s.id === id);
          if (!sound) return;

          const validFormats = ['.ogg', '.mp3', '.wav'];
          const filteredSrc = sound.audio.filter((src) => validFormats.some((ext) => src.toLowerCase().endsWith(ext)));
          if (filteredSrc.length === 0) return;

          const howl = new Howl({
            src: filteredSrc,
            loop: true,
            preload: true,
            volume: ((volumes[id] ?? 30) / 100) * (globalVolume / 100),
            html5: true,
            mute: globalMuted,
          });

          tryPlay(howl);

          howlRefs.current[id] = howl;
        } else {
          const howl = howlRefs.current[id];
          howl.mute(globalMuted);
          howl.volume(((volumes[id] ?? 30) / 100) * (globalVolume / 100));
          if (!howl.playing()) {
            tryPlay(howl);
          }
        }
      } else {
        if (howlRefs.current[id]) {
          howlRefs.current[id].stop();
          howlRefs.current[id].unload();
          delete howlRefs.current[id];
        }
      }
    });

    Object.keys(howlRefs.current).forEach((idStr) => {
      const id = Number(idStr);
      if (!(id in playing)) {
        howlRefs.current[id].stop();
        howlRefs.current[id].unload();
        delete howlRefs.current[id];
      }
    });

    prevPlaying.current = { ...playing };

    dispatch(setGlobalStateByPlaying());
  }, [playing, volumes, globalVolume, globalMuted, dispatch]);

  useEffect(() => {
    Object.entries(howlRefs.current).forEach(([idStr, howl]) => {
      const id = Number(idStr);
      const currentVolume = (volumes[id] ?? 30) / 100;

      if (!globalMuted) {
        originalVolumesRef.current[id] = currentVolume;
      }

      if (globalMuted) {
        howl.mute(true);
      } else {
        howl.mute(false);

        if (playing[id] && !howl.playing()) {
          tryPlay(howl);
        }
      }
    });
  }, [volumes, globalVolume, globalMuted, playing]);

  useEffect(() => {
    return () => {
      Object.values(howlRefs.current).forEach((howl) => {
        howl.stop();
        howl.unload();
      });
      howlRefs.current = {};
      prevPlaying.current = {};
      originalVolumesRef.current = {};
    };
  }, []);

  return null;
}
