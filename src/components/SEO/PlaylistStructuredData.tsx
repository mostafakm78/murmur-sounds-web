'use client';

import Script from 'next/script';
import { soundsData } from '@/lib/Sounds';

export default function SoundsStructuredData() {
  const playlist = {
    '@context': 'https://schema.org',
    '@type': 'MusicPlaylist',
    name: 'صدای آرام',
    url: 'https://softsound.vercel.app',
    description: 'مجموعه‌ای از صداهای طبیعت و آرامش‌بخش برای ریلکس شدن.',
    numTracks: soundsData.length,
    track: soundsData.map((sound, index) => ({
      '@type': 'MusicRecording',
      name: sound.name,
      url: `https://softsound.vercel.app#sound-${sound.id}`, // اگر صفحه جدا نداری می‌تونی فقط '#'
      duration: 'PT3M00S', // به‌صورت پیش‌فرض، اگر اطلاعات دقیق نداری
      position: index + 1,
    })),
  };

  return (
    <Script id="structured-data-sounds" type="application/ld+json">
      {JSON.stringify(playlist)}
    </Script>
  );
}
