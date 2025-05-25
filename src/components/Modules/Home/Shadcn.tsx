import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderHeader({ className, ...props }: SliderProps) {
  return <Slider defaultValue={[30]} max={100} step={1} className={cn('w-[60%]', className)} {...props} />;
}

export function SliderSounds({ className, ...props }: SliderProps) {
  return <Slider defaultValue={[30]} max={100} step={1} className={cn('w-[60%]', className)} {...props} />;
}

export function SwitchMute() {
  return (
    <div className="flex items-center ml-3 space-x-2 space-x-reverse">
      <Label htmlFor="mute" className="text-foreground hover:cursor-pointer">
        بی صدا
      </Label>
      <Switch dir="ltr" id="mute" />
    </div>
  );
}
