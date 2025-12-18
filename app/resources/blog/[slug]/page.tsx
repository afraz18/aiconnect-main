import { notFound } from 'next/navigation';
import { BlogPostLayout } from './blog-post-layout';
import { getPostBySlug } from '@/app/data/posts';

// Get the blog post data by slug
async function getPost(slug: string) {
  return getPostBySlug(slug);
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Ensure we await the params before using them
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogPostLayout post={post} />
    </div>
  );
}

// This component is now in a separate file: blog-post-layout.tsx
