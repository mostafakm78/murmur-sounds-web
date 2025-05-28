'use client';

import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setGlobalVolume } from '@/app/store/soundSlice';

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderHeader({ className, ...props }: SliderProps) {
  const dispatch = useDispatch();
  const globalVolume = useSelector((state: RootState) => state.sound.globalVolume);

  const handleChange = (value: number[]) => {
    dispatch(setGlobalVolume(value[0]));
  };

  return <Slider value={[globalVolume]} onValueChange={handleChange} max={100} step={1} className={cn('w-[60%]', className)} {...props} />;
}
