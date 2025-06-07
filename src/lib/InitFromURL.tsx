'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setVolume, playSound, setGlobalPlaying } from '@/app/store/soundSlice';

export default function InitFromURL() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const volumesParam = searchParams.get('volumes');
    const autoPlay = searchParams.has('autoPlay');


    if (volumesParam) {
      const entries = volumesParam.split(',').map((item) => {
        const [id, volume] = item.split(':');
        return { id: Number(id), volume: Number(volume) };
      });


      entries.forEach(({ id, volume }) => {
        dispatch(setVolume({ id, volume }));
        if (autoPlay && volume > 0) {
          dispatch(playSound(id));
        }
      });

      if (autoPlay) {
        setGlobalPlaying();
      }
    }
  }, [searchParams, dispatch]);

  return null;
}
