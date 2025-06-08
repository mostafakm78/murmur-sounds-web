import { ScrollProgress } from '@/components/magicui/scroll-progress';
import Blog from '@/components/Modules/Blogs/Blog';
import TitleBlog from '@/components/Modules/Blogs/BlogTitle';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';

export default function Blogs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <TitleBlog />
      <Blog />
      <Footer />
    </>
  );
}
