import BlogCard from './BlogCard';
import { getPosts } from '@/lib/getPosts';

export default async function BlogPage() {
  const posts = getPosts();

  return (
    <div className="container mx-auto">
      <section className="dark:bg-black/20 bg-white/20 backdrop-blur-md p-6 rounded-sm gap-10 flex flex-col items-center px-5 relative">
        <div className="grid grid-cols-1 w-full justify-items-center place-items-center gap-10 lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} image={post.image} title={post.title} excerpt={post.excerpt} slug={post.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
