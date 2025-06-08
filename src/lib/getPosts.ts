import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'blogs-content');

export function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image,
      content, // اگر بخواهی برای صفحه جزئیات استفاده کنی
    };
  });

  // اگر خواستی مرتب‌سازی بر اساس تاریخ هم می‌تونی اضافه کنی
  posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}
