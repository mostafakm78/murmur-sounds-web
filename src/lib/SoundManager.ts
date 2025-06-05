'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { soundsData } from '@/lib/Sounds';
import { setPlaying, setGlobalStateByPlaying, setVolume } from '@/app/store/soundSlice';

// کامپوننت مدیریت صداها (ایجاد، پخش، قطع، تنظیم حجم)
export default function SoundsManager() {
  const dispatch = useDispatch();

  // گرفتن وضعیت‌ها از Redux
  const playing = useSelector((state: RootState) => state.sound.playing);
  const volumes = useSelector((state: RootState) => state.sound.volumes);
  const globalVolume = useSelector((state: RootState) => state.sound.globalVolume);
  const globalPlaying = useSelector((state: RootState) => state.sound.globalPlaying);
  const globalPause = useSelector((state: RootState) => state.sound.globalPause);

  // Ref برای نگهداری المان‌های صوتی (Audio instances)
  const audioRefs = useRef<{ [id: number]: HTMLAudioElement }>({});
  // Ref برای ذخیره وضعیت پخش قبلی (مقایسه تغییرات)
  const prevPlaying = useRef<{ [id: number]: boolean }>({});

  // بارگذاری داده‌های ذخیره شده (پخش و حجم) از localStorage هنگام mount
  useEffect(() => {
    const saved = localStorage.getItem('activeSounds');
    const volumesSaved = localStorage.getItem('soundVolumes');

    // بارگذاری حجم صداها از localStorage
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

    // بارگذاری وضعیت پخش صداها از localStorage
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
  }, [dispatch]);

  // مدیریت ایجاد، پخش، توقف و حذف المان‌های صوتی بر اساس تغییرات playing
  useEffect(() => {
    Object.entries(playing).forEach(([idStr, isPlaying]) => {
      const id = Number(idStr);
      const wasPlaying = prevPlaying.current[id];

      // اگر وضعیت تغییر نکرده، کاری انجام نده
      if (wasPlaying === isPlaying) return;

      if (isPlaying) {
        // اگر المان صوتی وجود ندارد، ایجاد کن
        if (!audioRefs.current[id]) {
          const audioSrc = soundsData.find((s) => s.id === id)?.audio[0];
          if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.loop = true;
            audio.volume = ((volumes[id] ?? 0) / 100) * (globalVolume / 100);
            audio.play().catch(() => {
              // اگر پخش موفق نبود، وضعیت را به false برگردان
              dispatch(setPlaying({ id, playing: false }));
            });
            audioRefs.current[id] = audio;
          }
        } else if (audioRefs.current[id].paused) {
          // اگر المان وجود دارد اما متوقف است، پخش کن
          audioRefs.current[id].play().catch(() => {
            dispatch(setPlaying({ id, playing: false }));
          });
        }
      } else {
        // اگر باید قطع شود، المان صوتی را متوقف و حذف کن
        if (audioRefs.current[id]) {
          audioRefs.current[id].pause();
          audioRefs.current[id].currentTime = 0;
          delete audioRefs.current[id];
        }
      }
    });

    // پاکسازی المان‌های صوتی که دیگر در playing نیستند
    Object.keys(audioRefs.current).forEach((idStr) => {
      const id = Number(idStr);
      if (!(id in playing)) {
        audioRefs.current[id].pause();
        delete audioRefs.current[id];
      }
    });

    // ذخیره وضعیت فعلی برای مقایسه در دفعات بعدی
    prevPlaying.current = { ...playing };

    // به‌روزرسانی وضعیت کلی در Redux بر اساس playing
    dispatch(setGlobalStateByPlaying());
  }, [playing, volumes, globalVolume, dispatch]);

  // به‌روزرسانی حجم هر صدای در حال پخش با تغییر حجم‌های فردی یا کلی
  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([idStr, audio]) => {
      const id = Number(idStr);
      const volume = volumes[id] ?? 30;
      audio.volume = (volume / 100) * (globalVolume / 100);
    });
  }, [volumes, globalVolume]);

  // اگر globalPlaying فعال است، پخش همه صداهای فعال را تضمین کن
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

  // اگر globalPause فعال است، همه صداها را متوقف کن
  useEffect(() => {
    if (globalPause) {
      Object.values(audioRefs.current).forEach((audio) => {
        if (!audio.paused) {
          audio.pause();
        }
      });
    }
  }, [globalPause]);

  // پاکسازی کامل هنگام unmount کامپوننت
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
      });
      audioRefs.current = {};
      prevPlaying.current = {};
    };
  }, []);

  // این کامپوننت چیزی رندر نمی‌کند، فقط مدیریت کننده صدا است
  return null;
}
