export interface SavedMix {
  name: string;
  createdAt: number;
  sounds: {
    [key: number]: number;
  };
}

export const defaultMixes: SavedMix[] = [
  {
    name: 'آرامش شبانه',
    createdAt: 0,
    sounds: {
      1: 50,
      3: 30,
      5: 47,
    },
  },
  {
    name: 'طبیعت بارانی',
    createdAt: 0,
    sounds: {
      2: 70,
      4: 50,
    },
  },
];
