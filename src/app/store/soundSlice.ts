import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SoundState {
  playing: { [id: number]: boolean };
  volumes: { [id: number]: number };
  globalPlaying: boolean;
  globalPause: boolean;
  globalMuted: boolean;
  globalVolume: number;
  dockVisible: boolean;
  startAt?: { hour: number; min: number; timestamp: number } | null;
  endAt?: { hour: number; min: number; timestamp: number } | null;
  fade?: { hour: number; min: number; timestamp: number; from: string; to: string } | null;
  hasStarted: boolean;
  activeSounds: number[];
  playlist?: { id: number; name: string; sounds: number[]; volumes: { [id: number]: number } }[];
}

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

const soundsSlice = createSlice({
  name: 'sounds',
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<{ id: number; playing: boolean }>) => {
      state.playing[action.payload.id] = action.payload.playing;
    },
    setVolume: (state, action: PayloadAction<{ id: number; volume: number }>) => {
      const { id, volume } = action.payload;
      const currentVolume = state.volumes[id] ?? 0;

      if (currentVolume === volume) return;

      state.volumes[id] = volume;

      const isInActive = state.activeSounds.includes(id);

      if (volume > 0 && !isInActive) {
        state.activeSounds.push(id);
      } else if (volume === 0 && isInActive) {
        state.activeSounds = state.activeSounds.filter((soundId) => soundId !== id);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('activeSounds', JSON.stringify(state.activeSounds));
        localStorage.setItem('soundVolumes', JSON.stringify(state.volumes));
      }
    },
    setGlobalMuted: (state, action: PayloadAction<boolean>) => {
      state.globalMuted = action.payload;
      if (action.payload) {
        state.globalVolume = 0;
      } else {
        state.globalVolume = 100;
      }
    },
    setGlobalVolume: (state, action: PayloadAction<number>) => {
      state.globalVolume = action.payload;
    },
    setDockVisible: (state, action: PayloadAction<boolean>) => {
      state.dockVisible = action.payload;
    },
    setStartAt: (state, action: PayloadAction<{ hour: number; min: number } | null>) => {
      if (action.payload === null) {
        state.startAt = null;
        state.hasStarted = false;
        return;
      }
      const now = Date.now();
      const delay = (action.payload.hour * 60 + action.payload.min) * 60 * 1000;
      const timestamp = now + delay;

      state.startAt = {
        hour: action.payload.hour,
        min: action.payload.min,
        timestamp,
      };
      state.hasStarted = false;
    },
    setEndAt: (state, action: PayloadAction<{ hour: number; min: number } | null>) => {
      if (action.payload === null) {
        state.endAt = null;
        state.hasStarted = false;
        return;
      }

      const now = Date.now();
      const delay = (action.payload.hour * 60 + action.payload.min) * 60 * 1000;
      const timestamp = now + delay;

      state.endAt = {
        hour: action.payload.hour,
        min: action.payload.min,
        timestamp,
      };
      state.hasStarted = false;
    },
    setFade: (state, action: PayloadAction<{ hour: number; min: number; from: string; to: string } | null>) => {
      if (action.payload === null) {
        state.fade = null;
        state.hasStarted = false;
        return;
      }

      const { hour, min, from, to } = action.payload;
      const now = Date.now();
      const delay = (hour * 60 + min) * 60 * 1000;
      const timestamp = now + delay;

      state.fade = {
        hour,
        min,
        timestamp,
        from,
        to,
      };
      state.hasStarted = false;
    },
    setHasStarted: (state) => {
      state.hasStarted = true;
    },
    resetHasStarted: (state) => {
      state.hasStarted = false;
    },
    clearTimers: (state) => {
      state.startAt = null;
      state.endAt = null;
    },
    setGlobalPlaying: (state) => {
      Object.keys(state.playing).forEach((id) => {
        state.playing[Number(id)] = true;
      });
      state.globalPlaying = true;
      state.globalPause = false;
      state.hasStarted = false;
    },
    setGlobalPause: (state) => {
      Object.keys(state.playing).forEach((id) => {
        state.playing[Number(id)] = false;
      });
      state.globalPlaying = false;
      state.globalPause = true;
    },
    setGlobalStateByPlaying: (state) => {
      const isAnyPlaying = Object.values(state.playing).some((val) => val);
      state.globalPlaying = isAnyPlaying;
      state.globalPause = !isAnyPlaying;
    },
  },
});

export const { setPlaying, setVolume, setGlobalMuted, setGlobalVolume, setDockVisible, setStartAt, setEndAt, clearTimers, setGlobalPause, setGlobalPlaying, setGlobalStateByPlaying, setHasStarted, resetHasStarted, setFade } = soundsSlice.actions;

export const playSound = (id: number) => setPlaying({ id, playing: true });
export const pauseSound = (id: number) => setPlaying({ id, playing: false });

export default soundsSlice.reducer;
