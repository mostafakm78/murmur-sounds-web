'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 7 روز به میلی‌ثانیه

export function DrawerWarning() {
  const [open, setOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const lastSeenTimestamp = Number(localStorage.getItem('softsound-warning-time') || '0');
    const now = Date.now();

    if (now - lastSeenTimestamp > ONE_WEEK_MS) {
      setOpen(true);
      localStorage.setItem('softsound-warning-time', now.toString());
    }

    setShouldRender(true); // روی همه دستگاه‌ها رندر شود
  }, []);

  if (!shouldRender) return null;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm lg:max-w-lg pt-4 pb-10">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl text-foreground">تـــوجه !</DrawerTitle>
            <DrawerDescription className="text-justify text-base text-foreground/80">
              «سایت SoftSound در حال حاضر اپلیکیشن موبایل ندارد. نسخه‌ی موبایل و تبلت سایت صرفاً شامل امکانات محدود برای آشنایی اولیه با عملکرد آن است. این پلتفرم در حال حاضر برای کاربران دسکتاپ طراحی و بهینه‌سازی شده است. در صورت انتشار اپلیکیشن موبایل، حتماً شما را باخبر خواهیم کرد!»
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <button
                onClick={() => setOpen(false)}
                title="بستن"
                aria-label="بستن"
                className="relative w-full font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
              >
                بستن
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
