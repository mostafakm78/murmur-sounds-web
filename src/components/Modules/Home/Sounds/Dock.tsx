'use client';

import { SliderHeader } from '@/components/Shared/SliderHeader';
import { SwitchMute } from '@/components/Shared/SwitchMute';
import { motion } from 'framer-motion';
import { FaShuffle } from 'react-icons/fa6';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setGlobalPause, setGlobalPlaying } from '@/app/store/soundSlice';
import { toast } from '@/hooks/use-toast';
import { useCallback, useMemo } from 'react';

export default function Dock() {
  const dispatch = useDispatch();

  // وضعیت پخش کلی صداها
  const globalPalying = useSelector((state: RootState) => state.sound.globalPlaying);

  // لیست صداهای در حال پخش
  const playing = useSelector((state: RootState) => state.sound.playing);

  // بررسی اینکه آیا هیچ صدایی در حال پخش نیست
  const isPlayingEmpty = useMemo(() => Object.keys(playing).length === 0, [playing]);

  // کنترل عملکرد دکمه پخش / توقف کلی
  const handleTogglePlay = useCallback(() => {
    if (isPlayingEmpty) {
      toast({
        description: 'لطفاً حداقل یک صدا را انتخاب کنید.',
      });
    }

    if (globalPalying) {
      dispatch(setGlobalPause()); // توقف کلی
    } else {
      dispatch(setGlobalPlaying()); // پخش کلی
    }
  }, [dispatch, globalPalying, isPlayingEmpty]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="fixed lg:bottom-8 bottom-10 left-0 w-full z-[78] pointer-events-none">
      <div className="flex justify-center w-full pointer-events-none">
        <div className="pointer-events-auto lg:w-1/2 w-[90%] outline outline-2 outline-offset-1 shadow-xl flex items-center justify-around rounded-sm bg-[#F2F4F8] dark:bg-[#AB46D2] py-4">
          {/* دکمه Mute کلی */}
          <SwitchMute />

          {/* دکمه حالت پخش تصادفی (نمایشی - هنوز عملکرد ندارد) */}
          <span className="font-medium text-sm flex gap-2 items-center cursor-pointer hover:opacity-85 duration-300 focus:opacity-85">
            حالت تصادفی
            <FaShuffle className="h-5 w-5" />
          </span>

          {/* دکمه پخش / توقف کلی */}
          <button onClick={handleTogglePlay} className="text-base">
            {globalPalying ? <FaPause /> : <FaPlay />}
          </button>

          {/* کنترل ولوم کلی با اسلایدر */}
          <span className="font-medium text-sm flex gap-2 items-center">
            صدای کل
            <SliderHeader className="md:w-44 w-24 ml-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
