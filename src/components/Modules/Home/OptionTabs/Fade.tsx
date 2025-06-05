'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

import { playSound, setVolume, setFade, resetHasStarted, setGlobalPause, setHasStarted } from '@/app/store/soundSlice';

import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { toast } from '@/hooks/use-toast';
import { defaultMixes } from '@/lib/defaultMixes';
import useSavedMixes from '@/hooks/useSavedMixes';

// نوع برای دیکشنری ولوم هر صدا بر اساس شناسه صدا
type MixVolumes = { [id: number]: number };

/**
 * تابع کمکی برای گرفتن ولوم‌های میکس بر اساس نام آن
 * @param name نام میکس به صورت رشته (مثلاً "mix-calm")
 * @param allMixes آرایه‌ای از میکس‌ها که هر کدام شامل نام و ولوم صداها است
 * @returns شیء ولوم‌های میکس یا شیء خالی اگر میکس یافت نشد
 */
const volumesFromMixName = (name: string, allMixes: { name: string; sounds: MixVolumes }[]): MixVolumes => allMixes.find((m) => `mix-${m.name}` === name)?.sounds ?? {};

export default function FadeTimer() {
  // گرفتن dispatch از ریداکس برای ارسال اکشن‌ها
  const dispatch = useDispatch();

  // گرفتن ولوم‌های فعلی از ریداکس استور
  const volumes = useSelector((s: RootState) => s.sound.volumes);

  // گرفتن میکس‌های ذخیره‌شده از هوک سفارشی
  const { mixes } = useSavedMixes();

  // ترکیب میکس‌های پیش‌فرض و ذخیره‌شده
  const allMixes = [...defaultMixes, ...mixes];

  // وضعیت ساعت و دقیقه برای مدت زمان فید (شروع صفر)
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  // وضعیت انتخاب کاربر برای نقطه شروع (default: 'current' یعنی ولوم‌های فعلی)
  const [startSel, setStartSel] = useState<string>('current');
  // وضعیت انتخاب کاربر برای نقطه پایان (default: 'silent' یعنی بی‌صدا)
  const [endSel, setEndSel] = useState<string>('silent');

  /**
   * اجرای فید ولوم صداها به صورت تدریجی طی مدت زمان مشخص
   * @param startVolumes شیء ولوم‌های شروع (id صدا: مقدار ولوم)
   * @param endVolumes شیء ولوم‌های پایان
   * @param durationMs مدت زمان فید به میلی‌ثانیه
   */
  const fadeVolumesOverTime = (startVolumes: MixVolumes, endVolumes: MixVolumes, durationMs: number) => {
    const startTime = Date.now();
    const interval = 100; // به‌روزرسانی هر 100 میلی‌ثانیه

    // لیست شناسه‌های صداهای موجود در شروع یا پایان (برای پوشش کامل)
    const allIds = Array.from(new Set([...Object.keys(startVolumes), ...Object.keys(endVolumes)]));

    // اجرای بازگشتی با استفاده از setInterval
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1); // مقدار پیشرفت بین 0 و 1

      // برای هر صدا، ولوم فعلی را بر اساس درصد پیشرفت محاسبه و تنظیم می‌کنیم
      allIds.forEach((idStr) => {
        const id = +idStr;
        const from = startVolumes[id] ?? 0;
        const to = endVolumes[id] ?? 0;
        const current = Math.round(from + (to - from) * progress);
        dispatch(setVolume({ id, volume: current }));
      });

      // اگر به انتهای مدت زمان رسیدیم، توقف تایمر
      if (progress === 1) {
        clearInterval(timer);
        dispatch(setHasStarted());
        toast({
          description: 'زمان پایان رسیده است. پخش صداها متوقف شد.',
        });
        return;
      }
    }, interval);
  };

  /**
   * تابع ذخیره و شروع تایمر فید با ولوم‌های انتخاب‌شده و مدت زمان واردشده
   */
  const onSave = () => {
    // اعتبارسنجی ورودی ساعت و دقیقه
    if (hour === 0 && min === 0) {
      toast({ description: 'لطفاً ساعت یا دقیقه را وارد کنید.' });
      return;
    }

    let startVolumes: MixVolumes = {};
    let endVolumes: MixVolumes = {};

    // تعیین ولوم‌های شروع بر اساس انتخاب کاربر
    if (startSel === 'current') {
      // گرفتن ولوم‌های ذخیره‌شده در localStorage اگر وجود داشته باشد
      const saved = localStorage.getItem('soundVolumes');
      startVolumes = saved ? JSON.parse(saved) : {};
    } else if (startSel.startsWith('mix-')) {
      // ولوم‌های میکس انتخاب‌شده
      startVolumes = volumesFromMixName(startSel, allMixes);
    } else if (startSel === 'silent') {
      // اگر شروع بی‌صدا باشد، همه ولوم‌ها را صفر قرار می‌دهیم (بر اساس ولوم‌های پایان)
      const endVols = endSel.startsWith('mix-') ? volumesFromMixName(endSel, allMixes) : volumes;
      Object.keys(endVols).forEach((id) => {
        startVolumes[+id] = 0;
      });
    }

    // تعیین ولوم‌های پایان بر اساس انتخاب کاربر
    if (endSel === 'current') {
      endVolumes = volumes;
    } else if (endSel.startsWith('mix-')) {
      endVolumes = volumesFromMixName(endSel, allMixes);
    } else if (endSel === 'silent') {
      // اگر پایان بی‌صدا باشد، همه ولوم‌ها را صفر قرار می‌دهیم (بر اساس ولوم‌های شروع)
      Object.keys(startVolumes).forEach((id) => {
        endVolumes[+id] = 0;
      });
    }

    // لیست کل شناسه‌های صداها برای پخش و تنظیم ولوم اولیه
    const allIds = Array.from(new Set([...Object.keys(startVolumes), ...Object.keys(endVolumes)]));

    // پخش همه صداها با ولوم شروع
    allIds.forEach((idStr) => {
      const id = +idStr;
      dispatch(playSound(id));
      dispatch(setVolume({ id, volume: startVolumes[id] ?? 0 }));
    });

    // محاسبه مدت زمان فید به میلی‌ثانیه
    const durationMs = (hour * 3600 + min * 60) * 1000;

    // شروع اجرای فید ولوم صداها
    fadeVolumesOverTime(startVolumes, endVolumes, durationMs);

    // ثبت تنظیمات فید در استور
    dispatch(setFade({ hour, min, from: startSel, to: endSel }));

    // نمایش پیام موفقیت به کاربر
    toast({
      description: `فید صدا از "${startSel}" به "${endSel}" در ${hour ? `${hour} ساعت` : ''} ${min ? `${min} دقیقه` : ''} آغاز شد.`,
    });
  };

  /**
   * تابع لغو تایمر فید و بازنشانی تنظیمات
   */
  const onCancel = () => {
    setHour(0);
    setMin(0);

    // توقف پخش صداها و بازنشانی استیت
    dispatch(setGlobalPause());
    dispatch(resetHasStarted());
    dispatch(setFade(null));

    // نمایش پیام لغو تایمر
    toast({ description: 'تایمر فید لغو شد.' });
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      {/* انتخاب نقطه شروع فید */}
      <div className="flex items-center justify-around w-full">
        <div>
          <span className="text-sm font-light block mb-1">نقطه شروع:</span>
          <Select value={startSel} onValueChange={setStartSel}>
            <SelectTrigger className="lg:w-44 w-28">
              <SelectValue placeholder="شروع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="silent">بی‌صدا</SelectItem>
              <SelectItem value="current">وضعیت فعلی</SelectItem>
              {allMixes.map((m, i) => (
                <SelectItem key={`s-${i}`} value={`mix-${m.name}`}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <span className="text-sm font-medium">← فید →</span>

        {/* انتخاب نقطه پایان فید */}
        <div>
          <span className="text-sm font-light block mb-1">نقطه پایان:</span>
          <Select value={endSel} onValueChange={setEndSel}>
            <SelectTrigger className="lg:w-44 w-28">
              <SelectValue placeholder="پایان" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="silent">بی‌صدا</SelectItem>
              <SelectItem value="current">وضعیت فعلی</SelectItem>
              {allMixes.map((m, i) => (
                <SelectItem key={`e-${i}`} value={`mix-${m.name}`}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ورودی ساعت و دقیقه */}
      <div className="flex items-center justify-around w-full">
        <input type="number" value={hour} min={0} onChange={(e) => setHour(Math.max(0, +e.target.value))} className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" aria-label="ساعت" />
        <label className="mx-1">ساعت</label>

        <input type="number" value={min} min={0} onChange={(e) => setMin(Math.max(0, +e.target.value))} className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" aria-label="دقیقه" />
        <label className="mx-1">دقیقه</label>
      </div>

      <Separator className="my-4" />

      {/* دکمه‌های انصراف و شروع */}
      <div className="flex w-3/4 justify-between">
        <button onClick={onCancel} className="dark:bg-red-700 dark:text-foreground bg-red-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium" aria-label="لغو تایمر فید" type="button">
          انصراف
        </button>
        <button onClick={onSave} className="dark:bg-emerald-700 dark:text-foreground bg-emerald-500 text-background md:py-2 py-1 px-4 rounded-sm cursor-pointer hover:opacity-85 duration-300 focus:opacity-85 font-medium" aria-label="شروع تایمر فید" type="button">
          شروع
        </button>
      </div>
    </div>
  );
}
