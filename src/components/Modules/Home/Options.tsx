import { Button } from '@/components/ui/button';
import Timers from './Timers';

export default function Options() {
  return (
    <section className="mx-auto container">
      <div className="mt-16 h-[500px] bg-black/20 p-6 flex gap-10 mb-48 flex-col items-center px-10">
        <div className="md:w-1/2 w-full flex items-center justify-around">
          <Button variant="outline" className="md:text-xl md:py-5">
            زمانبندی
          </Button>
          <Button variant="outline" className="md:text-xl md:py-5">
            اشتراک گذاری
          </Button>
          <Button variant="outline" className="md:text-xl md:py-5">
            ترکیب
          </Button>
        </div>
        <Timers />
      </div>
    </section>
  );
}
