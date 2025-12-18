"use client";

import { formatDate } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { getPostBySlug } from '@/app/data/posts';

interface BlogPostLayoutProps {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;
}

export function BlogPostLayout({ post }: BlogPostLayoutProps) {
  return (
    <article className="overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="absolute bottom-0 left-0 right-0">
          <MaxWidthWrapper className="relative z-10 pb-8">
            <Button variant="ghost" asChild className="mb-6 -ml-2">
              <Link href="/resources/blog" className="flex items-center text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to blog
              </Link>
            </Button>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            
            <div className="mt-6 flex items-center text-sm text-muted-foreground">
              <time dateTime={post.date} className="mr-4">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{post.readTime} min read</span>
              </span>
            </div>
            
            <p className="mt-4 text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </MaxWidthWrapper>
        </div>
      </div>
      
      {/* Article Content */}
      <MaxWidthWrapper className="py-12 md:py-16 lg:py-20">
        <div className="prose prose-slate prose-lg mx-auto dark:prose-invert max-w-3xl">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                <Image
                  src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=random`}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'A')}&background=random`;
                  }}
                />
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">Author</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/resources/blog" className="w-full md:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </article>
  );
}
