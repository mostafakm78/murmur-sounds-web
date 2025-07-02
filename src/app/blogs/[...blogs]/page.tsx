import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import dayjs from '@/lib/dayjs-jalili';
import Header from '@/components/Shared/Header';
import Footer from '@/components/Shared/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { TbArrowBackUp } from 'react-icons/tb';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ blogs: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsResolved = await params;
  const slugPath = paramsResolved.blogs.join('/');
  const postsDirectory = path.join(process.cwd(), 'src', 'blogs-content');
  const fullPath = path.join(postsDirectory, `${slugPath}.md`);

  if (!fs.existsSync(fullPath)) {
    return {
      title: 'مطلب یافت نشد',
      description: 'این مطلب موجود نیست یا حذف شده است.',
    };
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: data.title || 'مطلب وبلاگ',
    description: data.excerpt || '',
    keywords: ['بلاگ آرامش', 'صداهای طبیعی', 'مدیتیشن', 'کاهش استرس', 'ریلکسیشن', 'آرامش ذهن'],
    openGraph: {
      title: data.title,
      description: data.excerpt,
      url: `https://softsound.vercel.app/blogs/${slugPath}`,
      type: 'article',
      images: data.image
        ? [
            {
              url: `https://softsound.vercel.app${data.image}`,
              width: 800,
              height: 600,
              alt: data.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.excerpt,
      images: data.image ? [`https://softsound.vercel.app${data.image}`] : [],
      creator: data.author || '@softsound',
    },
    authors: data.author ? [{ name: data.author }] : undefined,
    category: data.category || 'وبلاگ',
  };
}

export default async function SingleBlogPost({ params }: Props) {
  const param = await params;
  const slugPath = param.blogs.join('/');

  const postsDirectory = path.join(process.cwd(), 'src', 'blogs-content');
  const fullPath = path.join(postsDirectory, `${slugPath}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const formattedDate = dayjs(data.date).calendar('jalali').locale('fa').format('YYYY/MM/DD');

  return (
    <>
      <Header />
      <main className="container mx-auto">
        <div className="dark:bg-black/20 my-16 bg-white/20 backdrop-blur-md p-6 flex flex-col items-center px-10 rounded-sm relative">
          <Link href="/blogs" aria-label="بازگشت به صفحه بلاگ‌ها" className="absolute lg:text-4xl lg:left-[15%] lg:top-[5%] text-2xl left-[15%] top-[1%]">
            <TbArrowBackUp />
          </Link>

          <article className="prose dark:prose-invert lg:text-base font-medium text-sm leading-6 text-justify lg:w-3/4 space-y-10 mx-auto py-10 lg:p-10">
            <h1 className="lg:text-3xl font-bold text-2xl text-center">{data.title}</h1>
            <time dateTime={dayjs(data.date).format('YYYY-MM-DD')} className="text-background/60 dark:text-foreground/60 text-center block">
              {formattedDate}
            </time>
            <ReactMarkdown>{content}</ReactMarkdown>
            {data.image && <Image className="ring-1 ring-foreground dark:ring-foreground rounded-md mx-auto" src={data.image} alt={data.title} width={500} height={500} priority />}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
