import Image from 'next/image';
import Link from 'next/link';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogCardProps {
  title?: string;
  excerpt?: string;
  slug?: string;
  image?: string;
  loading?: boolean;
}

export default function BlogCard({ title = '', excerpt = '', slug = '', image = '', loading = false }: BlogCardProps) {
  return (
    <div className="relative overflow-hidden dark:bg-background md:w-[500px] md:h-[500px] w-[350px] h-[500px] bg-background md:p-6 p-4 md:gap-2 gap-6 flex flex-col items-center justify-between rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <BorderBeam size={200} initialOffset={20} className="dark:from-white dark:via-blue-500 dark:to-transparent from-black via-purple-700 to-transparent" />

      {loading ? (
        <>
          <Skeleton className="h-6 w-3/4 rounded-sm" />
          <Skeleton className="h-4 w-4/5 rounded-sm" />
          <Skeleton className="w-[350px] h-[300px] rounded-md" />
          <Skeleton className="h-10 w-full mt-2 rounded-sm" />
        </>
      ) : (
        <>
          <h2 className="md:text-xl text-base font-bold mb-2 px-6 line-clamp-1">{title}</h2>
          <p className="text-base text-center px-8 font-medium dark:text-foreground/80 text-foreground/80 line-clamp-2">{excerpt}</p>
          <Image className="ring-1 ring-foreground dark:ring-foreground rounded-md" width={350} height={300} src={image} alt={title} />
          <Link
            className="relative w-full text-center font-medium hover:opacity-85 duration-300 py-2 border border-foreground rounded-sm after:absolute after:content-[''] after:w-0 after:h-full after:bg-foreground/10 after:top-0 after:right-0 after:duration-300 hover:after:w-full focus:after:w-full"
            href={`/blogs/${slug}`}
          >
            ادامه مطلب
          </Link>
        </>
      )}
    </div>
  );
}
