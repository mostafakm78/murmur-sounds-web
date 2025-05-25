import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderHeader({ className, ...props }: SliderProps) {
  return <Slider defaultValue={[30]} max={100} step={1} className={cn('w-[60%]', className)} {...props} />;
}

export function ButtonMute() {
  return <Button className="text-background bg-foreground dark:bg-background dark:text-foreground md:text-md text-base font-normal ml-2">بی صدا</Button>;
}

export function SwitchMute() {
  return (
    <div className="flex items-center ml-3 space-x-2 space-x-reverse">
      <Label htmlFor="mute" className='text-foreground'>بی صدا</Label>
      <Switch dir="ltr" id="mute"/>
    </div>
  );
}
