'use client';

import { RootState } from '@/app/store';
import { setGlobalMuted } from '@/app/store/soundSlice';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useDispatch, useSelector } from 'react-redux';

export function SwitchMute() {
  const dispatch = useDispatch();
  const globalMuted = useSelector((state: RootState) => state.sound.globalMuted);

  const handleMuteToggle = (checked: boolean) => {
    dispatch(setGlobalMuted(checked));
  };

  return (
    <div className="flex items-center ml-3 space-x-2 space-x-reverse">
      <Label htmlFor="mute" className="text-foreground hover:cursor-pointer">
        بی صدا
      </Label>
      <Switch dir="ltr" id="mute" checked={globalMuted} onCheckedChange={handleMuteToggle} />
    </div>
  );
}
