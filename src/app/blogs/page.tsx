import BlogTitleAnimation from '@/components/animations/BlogTitleAnimation';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import Blog from '@/components/Modules/Blogs/Blog';
import Footer from '@/components/Shared/Footer';
import Header from '@/components/Shared/Header';

export default function Blogs() {
  return (
    <>
      <ScrollProgress className="h-[1.5px] bg-foreground" />
      <Header />
      <BlogTitleAnimation />
      <Blog />
      <Footer />
    </>
  );
}
