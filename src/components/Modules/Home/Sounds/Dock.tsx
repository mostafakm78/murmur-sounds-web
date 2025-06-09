'use client';

import { SliderHeader } from '@/components/Shared/SliderHeader';
import { SwitchMute } from '@/components/Shared/SwitchMute';
import { motion } from 'framer-motion';
import { FaShuffle } from 'react-icons/fa6';
import { FaPlay, FaPause } from 'react-icons/fa';
import { RiResetLeftFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setGlobalPause, setGlobalPlaying, setVolume } from '@/app/store/soundSlice';
import { toast } from '@/hooks/use-toast';
import { useCallback, useMemo, useState } from 'react';

export default function Dock() {
  const dispatch = useDispatch();
  const [resetMotion, setResetMotion] = useState<number>(0);

  // وضعیت پخش کلی صداها
  const globalPlaying = useSelector((state: RootState) => state.sound.globalPlaying);

  // لیست صداهای در حال پخش
  const playing = useSelector((state: RootState) => state.sound.playing);
  const volumes = useSelector((state: RootState) => state.sound.volumes);

  // بررسی اینکه آیا هیچ صدایی در حال پخش نیست
  const isValidSound = useMemo(() => Object.entries(playing).some(([id]) => volumes[+id] > 0), [playing, volumes]);

  // کنترل عملکرد دکمه پخش / توقف کلی
  const handleTogglePlay = useCallback(() => {
    if (!isValidSound) {
      toast({
        description: 'لطفاً حداقل یک صدا را انتخاب کنید.',
      });
      return;
    }

    if (globalPlaying) {
      dispatch(setGlobalPause()); // توقف کلی
    } else {
      dispatch(setGlobalPlaying()); // پخش کلی
    }
  }, [dispatch, globalPlaying, isValidSound]);

  const handleResetVolumes = useCallback(() => {
    Object.entries(playing).forEach(([id]) => {
      dispatch(setVolume({ id: Number(id), volume: 0 }));
    });

    dispatch(setGlobalPause());

    toast({
      description: 'حجم همه صداها صفر شد',
    });

    setResetMotion((prev) => prev + -360);
  }, [playing, dispatch]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="fixed lg:bottom-8 bottom-10 left-0 w-full z-[78] pointer-events-none">
      <div className="flex justify-center w-full pointer-events-none">
        <div className="pointer-events-auto lg:w-2/3 w-[90%] outline outline-2 outline-offset-1 shadow-xl flex px-5 gap-5 items-center justify-around rounded-sm bg-[#F2F4F8] dark:bg-[#AB46D2] py-4">
          {/* دکمه Mute کلی */}
          <SwitchMute />

          {/* دکمه حالت پخش تصادفی (نمایشی - هنوز عملکرد ندارد) */}
          <div className="font-medium text-sm flex gap-2 items-center cursor-pointer hover:opacity-85 duration-300 focus:opacity-85">
            <span className="hidden md:inline">حالت تصادفی</span>
            <FaShuffle className="h-5 w-5" />
          </div>

          {/* دکمه پخش / توقف کلی */}
          <button onClick={handleTogglePlay} className="text-base">
            {globalPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <motion.button onClick={handleResetVolumes} className="text-lg" animate={{ rotate: resetMotion }} transition={{ type: 'spring', stiffness: 150, damping: 10 }}>
            <RiResetLeftFill />
          </motion.button>

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
