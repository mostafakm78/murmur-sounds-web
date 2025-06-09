import { JSX } from 'react';
import { useFillColor } from '@/hooks/use-fill-color';

const MusicWaves = (): JSX.Element => {
  const fillColor = useFillColor({light: '#AB46D2',dark: '#F2F4F8',});

  return (
    // SVG با توضیحات دسترسی (aria-label) برای انیمیشن موج موسیقی
    <svg width="100%" height="100%" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Music waves animation">
      {/* ایجاد 4 مستطیل به عنوان موج‌های موسیقی */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={10 + i * 25} // موقعیت افقی هر مستطیل با فاصله مناسب
          y="20" // موقعیت عمودی ابتدایی
          width="15"
          height="20"
          fill={fillColor} // رنگ پر شدن بر اساس تم
        >
          {/* انیمیشن تغییر ارتفاع (height) مستطیل‌ها */}
          <animate
            attributeName="height"
            values="20;50;20"
            dur="1s"
            repeatCount="indefinite"
            begin={`${i * 0.25}s`} // شروع انیمیشن با تأخیر برای هر مستطیل (افکت موج)
          />
          {/* انیمیشن تغییر موقعیت عمودی (y) مستطیل‌ها */}
          <animate
            attributeName="y"
            values="20;0;20"
            dur="1s"
            repeatCount="indefinite"
            begin={`${i * 0.25}s`} // شروع انیمیشن با تأخیر مشابه برای هماهنگی موج
          />
        </rect>
      ))}
    </svg>
  );
};

export default MusicWaves;
