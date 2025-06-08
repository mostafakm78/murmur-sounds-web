export interface SavedMix {
  name: string;
  createdAt: number;
  sounds: {
    [key: number]: number;
  };
}

export const defaultMixes: SavedMix[] = [
  {
    name: 'شبِ دریا',
    createdAt: 0,
    sounds: {
      1: 10,
      3: 40,
      5: 60,
    },
  },
  {
    name: 'طبیعت بارانی',
    createdAt: 0,
    sounds: {
      3: 70,
      10: 50,
      7: 20,
    },
  },
  {
    name: 'تنهایی در کوهستان',
    createdAt: 0,
    sounds: {
      13: 35,
      11: 100,
    },
  },
  {
    name: 'استراحت در سفر',
    createdAt: 0,
    sounds: {
      12: 25,
      15: 40,
      14: 10,
    },
  },
  {
    name: 'شلوغی شهری',
    createdAt: 0,
    sounds: {
      4: 55,
      6: 10,
      14: 10,
    },
  },
];
