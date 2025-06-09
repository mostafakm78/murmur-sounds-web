import { AiOutlineLoading } from 'react-icons/ai';

export default function Loading() {
  return (
    <div className="flex justify-center text-2xl lg:text-4xl items-center h-screen text-background dark:text-foreground gap-2">
      <AiOutlineLoading className="animate-spin" />
      در حال بارگذاری...
    </div>
  );
}
