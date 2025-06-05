import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// نوع وضعیت مربوط به صداها
interface SoundState {
  playing: { [id: number]: boolean }; // وضعیت پخش هر صدا
  volumes: { [id: number]: number }; // ولوم هر صدا
  globalPlaying: boolean; // آیا همه صداها در حال پخش‌اند؟
  globalPause: boolean; // آیا پخش جهانی متوقف شده؟
  globalMuted: boolean; // آیا صدای کلی بی‌صدا شده؟
  globalVolume: number; // حجم صدای کلی
  dockVisible: boolean; // نمایش یا مخفی بودن داک
  startAt?: { hour: number; min: number; timestamp: number } | null; // زمان شروع برنامه‌ریزی‌شده
  endAt?: { hour: number; min: number; timestamp: number } | null; // زمان پایان برنامه‌ریزی‌شده
  fade?: {
    hour: number;
    min: number;
    timestamp: number;
    from: string; // حالت شروع (مثلاً silent یا mix1)
    to: string; // حالت پایان (مثلاً mix2 یا silent)
  } | null;
  hasStarted: boolean; // آیا صداها شروع به پخش کرده‌اند؟
  activeSounds: number[]; // لیست صداهای فعال
}

// مقدار اولیه state
const initialState: SoundState = {
  playing: {},
  volumes: {},
  globalPlaying: false,
  globalPause: false,
  globalMuted: false,
  globalVolume: 100,
  dockVisible: false,
  startAt: null,
  endAt: null,
  fade: null,
  hasStarted: false,
  activeSounds: [],
};

// ایجاد Slice برای مدیریت وضعیت صدا
const soundsSlice = createSlice({
  name: 'sounds',
  initialState,
  reducers: {
    // تغییر وضعیت پخش یک صدای خاص
    setPlaying: (state, action: PayloadAction<{ id: number; playing: boolean }>) => {
      state.playing[action.payload.id] = action.payload.playing;
    },

    // تنظیم ولوم یک صدا + مدیریت صداهای فعال
    setVolume: (state, action: PayloadAction<{ id: number; volume: number }>) => {
      const { id, volume } = action.payload;
      const currentVolume = state.volumes[id] ?? 0;

      if (currentVolume === volume) return;

      state.volumes[id] = volume;

      const isInActive = state.activeSounds.includes(id);

      // افزودن به لیست صداهای فعال
      if (volume > 0 && !isInActive) {
        state.activeSounds.push(id);
      }
      // حذف از لیست در صورت صفر شدن
      else if (volume === 0 && isInActive) {
        state.activeSounds = state.activeSounds.filter((soundId) => soundId !== id);
      }

      // ذخیره وضعیت در localStorage (در مرورگر)
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeSounds', JSON.stringify(state.activeSounds));
        localStorage.setItem('soundVolumes', JSON.stringify(state.volumes));
      }
    },

    // بی‌صدا کردن یا فعال‌سازی کلی صدا
    setGlobalMuted: (state, action: PayloadAction<boolean>) => {
      state.globalMuted = action.payload;
      state.globalVolume = action.payload ? 0 : 100;
    },

    // تنظیم حجم کلی صدا
    setGlobalVolume: (state, action: PayloadAction<number>) => {
      state.globalVolume = action.payload;
    },

    // نمایش یا مخفی کردن داک پایین صفحه
    setDockVisible: (state, action: PayloadAction<boolean>) => {
      state.dockVisible = action.payload;
    },

    // تنظیم زمان شروع پخش برنامه‌ریزی‌شده
    setStartAt: (state, action: PayloadAction<{ hour: number; min: number } | null>) => {
      if (action.payload === null) {
        state.startAt = null;
        state.hasStarted = false;
        return;
      }

      const now = Date.now();
      const delay = (action.payload.hour * 60 + action.payload.min) * 60 * 1000;

      state.startAt = {
        ...action.payload,
        timestamp: now + delay,
      };
      state.hasStarted = false;
    },

    // تنظیم زمان پایان پخش برنامه‌ریزی‌شده
    setEndAt: (state, action: PayloadAction<{ hour: number; min: number } | null>) => {
      if (action.payload === null) {
        state.endAt = null;
        state.hasStarted = false;
        return;
      }

      const now = Date.now();
      const delay = (action.payload.hour * 60 + action.payload.min) * 60 * 1000;

      state.endAt = {
        ...action.payload,
        timestamp: now + delay,
      };
      state.hasStarted = false;
    },

    // تنظیم حالت فید از یک وضعیت به وضعیت دیگر در زمان مشخص‌شده
    setFade: (state, action: PayloadAction<{ hour: number; min: number; from: string; to: string } | null>) => {
      if (action.payload === null) {
        state.fade = null;
        state.hasStarted = false;
        return;
      }

      const { hour, min, from, to } = action.payload;
      const now = Date.now();
      const delay = (hour * 60 + min) * 60 * 1000;

      state.fade = {
        hour,
        min,
        timestamp: now + delay,
        from,
        to,
      };
      state.hasStarted = false;
    },

    // ثبت شروع شدن پخش (مثلاً توسط تایمر یا فید)
    setHasStarted: (state) => {
      state.hasStarted = true;
    },

    // ریست کردن وضعیت شروع
    resetHasStarted: (state) => {
      state.hasStarted = false;
    },

    // حذف تایمرهای شروع و پایان
    clearTimers: (state) => {
      state.startAt = null;
      state.endAt = null;
    },

    // پخش همه صداها با تنظیم وضعیت پخش و غیر فعال‌سازی Pause
    setGlobalPlaying: (state) => {
      Object.keys(state.playing).forEach((id) => {
        state.playing[Number(id)] = true;
      });
      state.globalPlaying = true;
      state.globalPause = false;
      state.hasStarted = false;
    },

    // توقف پخش همه صداها
    setGlobalPause: (state) => {
      Object.keys(state.playing).forEach((id) => {
        state.playing[Number(id)] = false;
      });
      state.globalPlaying = false;
      state.globalPause = true;
    },

    // تنظیم وضعیت پخش کلی بر اساس وضعیت صداهای تکی
    setGlobalStateByPlaying: (state) => {
      const isAnyPlaying = Object.values(state.playing).some((val) => val);
      state.globalPlaying = isAnyPlaying;
      state.globalPause = !isAnyPlaying;
    },
  },
});

// استخراج اکشن‌ها
export const { setPlaying, setVolume, setGlobalMuted, setGlobalVolume, setDockVisible, setStartAt, setEndAt, clearTimers, setGlobalPause, setGlobalPlaying, setGlobalStateByPlaying, setHasStarted, resetHasStarted, setFade } = soundsSlice.actions;

// اکشن‌های کمکی برای استفاده راحت در کامپوننت‌ها
export const playSound = (id: number) => setPlaying({ id, playing: true });
export const pauseSound = (id: number) => setPlaying({ id, playing: false });

// خروجی ریدوسر برای اضافه کردن به store
export default soundsSlice.reducer;
