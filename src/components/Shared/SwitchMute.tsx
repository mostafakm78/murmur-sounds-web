'use client';

import { RootState } from '@/app/store'; // تایپ استیت کلی ریداکس
import { setGlobalMuted } from '@/app/store/soundSlice'; // اکشن تغییر وضعیت بی‌صدا
import { Label } from '@/components/ui/label'; // لیبل UI
import { Switch } from '@/components/ui/switch'; // سوییچ UI
import { useDispatch, useSelector } from 'react-redux'; // هوک‌های ریداکس

// کامپوننت سوییچ برای قطع یا وصل کردن صدای کلی برنامه
export function SwitchMute() {
  const dispatch = useDispatch(); // برای ارسال اکشن به استور
  const globalMuted = useSelector((state: RootState) => state.sound.globalMuted); // دریافت مقدار بی‌صدا بودن از استیت

  // تغییر وضعیت بی‌صدا هنگام تغییر سوییچ
  const handleMuteToggle = (checked: boolean) => {
    dispatch(setGlobalMuted(checked));
  };

  return (
    <div className="flex items-center ml-3 space-x-2 space-x-reverse">
      {/* لیبل سوییچ */}
      <Label htmlFor="mute" className="text-foreground hover:cursor-pointer">
        بی‌صدا
      </Label>

      {/* سوییچ بی‌صدا */}
      <Switch dir="ltr" id="mute" checked={globalMuted} onCheckedChange={handleMuteToggle} />
    </div>
  );
}
