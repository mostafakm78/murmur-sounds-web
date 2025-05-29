import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SoundState {
  playing: { [id: number]: boolean };
  volumes: { [id: number]: number };
  globalMuted: boolean;
  globalVolume: number;
}

const initialState: SoundState = {
  playing: {},
  volumes: {},
  globalMuted: false,
  globalVolume: 100,
};

const soundsSlice = createSlice({
  name: 'sounds',
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<{ id: number; playing: boolean }>) => {
      state.playing[action.payload.id] = action.payload.playing;
    },
    setVolume: (state, action: PayloadAction<{ id: number; volume: number }>) => {
      state.volumes[action.payload.id] = action.payload.volume;
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
  },
});

export const { setPlaying, setVolume, setGlobalMuted, setGlobalVolume  } = soundsSlice.actions;

export const playSound = (id: number) => setPlaying({ id, playing: true });
export const pauseSound = (id: number) => setPlaying({ id, playing: false });

export default soundsSlice.reducer;
