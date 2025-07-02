'use client';

import { RootState } from '@/app/store';
import { setGlobalPause, setGlobalPlaying } from '@/app/store/soundSlice';
import { useCallback, useEffect, useMemo } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '@/hooks/use-toast';

export default function GlobalPlay() {
  const dispatch = useDispatch();
  const volumes = useSelector((state: RootState) => state.sound.volumes);
  const globalPlaying = useSelector((state: RootState) => state.sound.globalPlaying);
  const playing = useSelector((state: RootState) => state.sound.playing);

  // بررسی اینکه حداقل یک صدا فعال هست و ولوم آن > ۰ است
  const isValidSound = useMemo(() => Object.entries(playing).some(([id]) => volumes[+id] > 0), [playing, volumes]);

  // کنترل پخش / توقف همه صداها
  const handleTogglePlay = useCallback(() => {
    if (!isValidSound) {
      toast({ description: 'لطفاً حداقل یک صدا را پخش کنید.' });
      return;
    }

    if (globalPlaying) {
      dispatch(setGlobalPause());
    } else {
      dispatch(setGlobalPlaying());
    }
  }, [dispatch, globalPlaying, isValidSound]);

  useEffect(() => {
    dispatch(setGlobalPause());
  }, [dispatch]);
  return (
    <div className="flex flex-col justify-center items-center my-16 gap-8">
      <h2 className="text-4xl text-foreground dark:text-foreground">صداهای در دسترس</h2>
      <button aria-label={globalPlaying ? 'توقف همه صداها' : 'پخش همه صداها'} onClick={handleTogglePlay} className="text-7xl text-foreground dark:text-foreground">
        {globalPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}
