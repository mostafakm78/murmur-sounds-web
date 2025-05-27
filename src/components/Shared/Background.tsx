'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { JSX, useEffect, useState } from 'react';

export default function GalaxyBackground(): JSX.Element {
  // state to track scroll position
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0);

  // Effect to update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // stars background animation
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <Stars radius={100} depth={50} count={1000} factor={7} fade speed={1} />
      </Canvas>
    </div>
  );
}
