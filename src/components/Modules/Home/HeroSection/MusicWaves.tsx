'use client';

import { useTheme } from 'next-themes';
import { JSX } from 'react';

export const MusicWaves = (): JSX.Element => {
  const { resolvedTheme } = useTheme();

  const fillColor: string = resolvedTheme === 'dark' ? '#F2F4F8' : '#AB46D2';

  return (
    <svg width="100%" height="100%" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Music waves animation">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={10 + i * 25} y="20" width="15" height="20" fill={fillColor}>
          <animate attributeName="height" values="20;50;20" dur="1s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
          <animate attributeName="y" values="20;0;20" dur="1s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
        </rect>
      ))}
    </svg>
  );
};
