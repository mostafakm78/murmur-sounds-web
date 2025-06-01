'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { soundsData } from '@/lib/Sounds';
import { setPlaying, setGlobalStateByPlaying, setVolume } from '@/app/store/soundSlice';

export default function SoundsManager() {
  const dispatch = useDispatch();

  const playing = useSelector((state: RootState) => state.sound.playing);
  const volumes = useSelector((state: RootState) => state.sound.volumes);
  const globalVolume = useSelector((state: RootState) => state.sound.globalVolume);
  const globalPlaying = useSelector((state: RootState) => state.sound.globalPlaying);
  const globalPause = useSelector((state: RootState) => state.sound.globalPause);

  const audioRefs = useRef<{ [id: number]: HTMLAudioElement }>({});
  const prevPlaying = useRef<{ [id: number]: boolean }>({});

  // Load from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem('activeSounds');
    const volumesSaved = localStorage.getItem('soundVolumes');
    if (volumesSaved) {
      const parsedVolumes = JSON.parse(volumesSaved);
      Object.entries(parsedVolumes).forEach(([idStr, vol]) => {
        dispatch(setVolume({ id: Number(idStr), volume: vol }));
      });
    }
    if (saved) {
      const ids = JSON.parse(saved);
      ids.forEach((id: number) => {
        dispatch(setPlaying({ id, playing: true }));
      });
    }
  }, [dispatch]);

  // Manage play/pause/create of audio elements
  useEffect(() => {
    Object.entries(playing).forEach(([idStr, isPlaying]) => {
      const id = Number(idStr);
      const wasPlaying = prevPlaying.current[id];

      if (wasPlaying === isPlaying) return;

      if (isPlaying) {
        if (!audioRefs.current[id]) {
          const audioSrc = soundsData.find((s) => s.id === id)?.audio[0];
          if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.loop = true;
            audio.volume = ((volumes[id] ?? 0) / 100) * (globalVolume / 100);
            audio.play().catch(() => {
              dispatch(setPlaying({ id, playing: false }));
            });
            audioRefs.current[id] = audio;
          }
        } else if (audioRefs.current[id].paused) {
          audioRefs.current[id].play().catch(() => {
            dispatch(setPlaying({ id, playing: false }));
          });
        }
      } else {
        if (audioRefs.current[id]) {
          audioRefs.current[id].pause();
          audioRefs.current[id].currentTime = 0;
          delete audioRefs.current[id]; // حذف کامل Audio instance
        }
      }
    });

    // Clean up removed sounds
    Object.keys(audioRefs.current).forEach((idStr) => {
      const id = Number(idStr);
      if (!(id in playing)) {
        audioRefs.current[id].pause();
        delete audioRefs.current[id];
      }
    });

    prevPlaying.current = { ...playing };
    dispatch(setGlobalStateByPlaying());
  }, [playing, volumes, globalVolume, dispatch]);

  // Update volume when individual or global volume changes
  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([idStr, audio]) => {
      const id = Number(idStr);
      const volume = volumes[id] ?? 30;
      audio.volume = (volume / 100) * (globalVolume / 100);
    });
  }, [volumes, globalVolume]);

  // Global play only if playing[id] === true
  useEffect(() => {
    if (globalPlaying) {
      Object.entries(audioRefs.current).forEach(([idStr, audio]) => {
        const id = Number(idStr);
        if (playing[id] && audio.paused) {
          audio.play().catch(() => {
            dispatch(setPlaying({ id, playing: false }));
          });
        }
      });
    }
  }, [globalPlaying, dispatch, playing]);

  // Global pause
  useEffect(() => {
    if (globalPause) {
      Object.values(audioRefs.current).forEach((audio) => {
        if (!audio.paused) {
          audio.pause();
        }
      });
    }
  }, [globalPause]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
      });
      audioRefs.current = {};
      prevPlaying.current = {};
    };
  }, []);

  return null;
}
