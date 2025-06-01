import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function Fade() {
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <div className="flex items-center justify-around w-full">
        <div>
          <span className="text-sm font-light">نقطه شروع :</span>
          <Select dir="rtl">
            <SelectTrigger className="lg:w-[180px] w-[100px]">
              <SelectValue placeholder="شروع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mix1">میکس یک</SelectItem>
              <SelectItem value="mix2">میکس دو</SelectItem>
              <SelectItem value="mix3">میکس سه</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="text-sm font-medium">محو شدن به</span>
        <div>
          <span className="text-sm font-light">نقطه پایان :</span>
          <Select dir="rtl">
            <SelectTrigger className="lg:w-[180px] w-[100px]">
              <SelectValue placeholder="پایان" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mix1">میکس یک</SelectItem>
              <SelectItem value="mix2">میکس دو</SelectItem>
              <SelectItem value="mix3">میکس سه</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-around w-full">
        <input type="number" id="hour" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" />
        <label htmlFor="hour" className="md:text-lg font-medium">
          ساعت و
        </label>
        <input type="number" id="min" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" />
        <label htmlFor="min" className="md:text-lg font-medium">
          دقیقه
        </label>
      </div>
      <Separator className="my-4 dark:bg-foreground/20" />
      <div className="flex items-center justify-between w-3/4">
        <button onClick={() => {}} className="dark:bg-red-700 dark:text-foreground bg-red-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">
          انصراف
        </button>
        <button onClick={() => {}} className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium">
          شروع
        </button>
      </div>
    </div>
  );
}
