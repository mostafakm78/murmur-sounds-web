'use client';

import { Slidertwo } from '@/components/ui/slidertwo';
import { cn } from '@/lib/utils';
import { SliderProps } from '@radix-ui/react-slider';
import { useDispatch, useSelector } from 'react-redux';
import { setVolume } from '@/app/store/soundSlice';
import { RootState } from '@/app/store';

type Props = {
  soundId: number;
} & SliderProps;

export function SliderSounds({ soundId, className, ...props }: Props) {
  const dispatch = useDispatch();
  const volume = useSelector((state: RootState) => state.sound.volumes[soundId] ?? 0);

  const handleChange = (value: number[]) => {
    dispatch(setVolume({ id: soundId, volume: value[0] }));
  };


  return <Slidertwo value={[volume]} onValueChange={handleChange} max={100} step={1} className={cn('w-[70%]', className)} {...props} />;
}
