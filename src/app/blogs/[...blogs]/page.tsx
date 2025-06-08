import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import dayjs from '@/lib/dayjs-jalili';
import Header from '@/components/Shared/Header';
import Footer from '@/components/Shared/Footer';
import Image from 'next/image';

interface Props {
  params: { blogs: string[] };
}

export default function SingleBlogPost({ params }: Props) {
  const slugPath = params.blogs.join('/'); // اگر روت catch-all هست

  const postsDirectory = path.join(process.cwd(), 'src', 'blogs-content');
  const fullPath = path.join(postsDirectory, `${slugPath}.md`);

  if (!fs.existsSync(fullPath)) {
    // اگر فایل وجود نداشت صفحه 404
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const formattedDate = dayjs(data.date).calendar('jalali').locale('fa').format('YYYY/MM/DD');

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="dark:bg-black/20 my-16 bg-white/20 backdrop-blur-md p-6 flex flex-col items-center px-10 rounded-sm relative">
          <article className="prose dark:prose-invert lg:text-base font-medium text-sm leading-6 text-justify lg:w-3/4 space-y-10 mx-auto py-10 lg:p-10">
            <h1 className="lg:text-3xl font-bold text-2xl text-center">{data.title}</h1>
            <p className="text-background/60 dark:text-foreground/60 text-center">{formattedDate}</p>
            <ReactMarkdown>{content}</ReactMarkdown>
            <Image className="ring-1 ring-foreground dark:ring-foreground rounded-md mx-auto" src={data.image} alt={data.title} width={500} height={500} />
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
