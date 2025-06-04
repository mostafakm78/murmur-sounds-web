import { useEffect, useState } from 'react';

export interface SavedMix {
  name: string;
  sounds: { [key : number] : number };
  createdAt: number;
}

export default function useSavedMixes() {
  const [mixes, setMixes] = useState<SavedMix[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedMixes');
    if (saved) {
      try {
        setMixes(JSON.parse(saved));
      } catch (err) {
        console.error('Invalid JSON in savedMixes', err);
        setMixes([]);
      }
    }
  }, []);

  const addMix = (newMix: SavedMix) => {
    const updated = [...mixes,  newMix];
    localStorage.setItem('savedMixes', JSON.stringify(updated));
    setMixes(updated);
  };

  const deleteMix = (index: number) => {
    const updated = mixes.filter((_, i) => i !== index);
    localStorage.setItem('savedMixes', JSON.stringify(updated));
    setMixes(updated);
  };

  const clearMixes = () => {
    localStorage.removeItem('savedMixes');
    setMixes([]);
  };

  return { mixes, addMix, deleteMix, clearMixes };
}
