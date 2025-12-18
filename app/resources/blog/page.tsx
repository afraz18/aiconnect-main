"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, User, Search, X, Tag, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/app/data/posts";
import type { BlogPost } from "@/app/data/posts";

// Categories and tags for filtering
const categories = ['All', 'Technology', 'Design', 'Development'];
const popularTags = ['AI', 'Web Development', 'Innovation', 'Frontend', 'Sustainability', 'Performance', 'Cloud'];

type FilterState = {
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
};

// Extend BlogPost with additional UI-specific properties
type BlogPostWithUI = BlogPost & {
  href: string;
  heroImage: {
    src: string;
    alt: string;
    srcSet: Array<{ src: string; width: number; height: number }>;
  };
  author: {
    name: string;
    avatar: string;
  };
};

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'All',
    selectedTags: [],
  });
  const [filteredPosts, setFilteredPosts] = useState<BlogPostWithUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Prepare blog posts with UI-specific properties
  const preparePosts = useCallback((): BlogPostWithUI[] => {
    return blogPosts.map(post => ({
      ...post,
      href: post.href || `/blog/${post.slug}`,
      heroImage: post.heroImage || {
        src: 'https://picsum.photos/seed/default/1200/900',
        alt: post.title,
        srcSet: []
      },
      author: post.author || {
        name: 'Unknown Author',
        avatar: 'https://i.pravatar.cc/150?img=0'
      }
    }));
  }, []);

  // Update URL with current filters
  const updateUrl = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    if (newFilters.searchQuery) params.set('q', newFilters.searchQuery);
    if (newFilters.selectedCategory !== 'All') params.set('category', newFilters.selectedCategory);
    if (newFilters.selectedTags.length > 0) params.set('tags', newFilters.selectedTags.join(','));

    const queryString = params.toString();
    router.push(`/resources/blog${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [router]);

  // Apply filters to posts
  const applyFilters = useCallback((filters: FilterState) => {
    setIsLoading(true);

    // Simulate API call with a small delay
    setTimeout(() => {
      const preparedPosts = preparePosts();
      let results = [...preparedPosts];

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        results = results.filter(
          post =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // Filter by category
      if (filters.selectedCategory !== 'All') {
        results = results.filter(post =>
          post.category === filters.selectedCategory
        );
      }

      // Filter by tags
      if (filters.selectedTags.length > 0) {
        results = results.filter(post =>
          filters.selectedTags.every(tag => post.tags.includes(tag))
        );
      }

      setFilteredPosts(results);
      setIsLoading(false);
    }, 300);
  }, [preparePosts]);

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters(filters);

      // Generate search suggestions
      if (filters.searchQuery.length > 1) {
        const query = filters.searchQuery.toLowerCase();
        const suggestions = Array.from(
          new Set([
            ...blogPosts
              .filter(post => post.title.toLowerCase().includes(query))
              .map(post => post.title)
              .slice(0, 3),
            ...blogPosts
              .flatMap(post => post.tags)
              .filter(tag => tag.toLowerCase().includes(query))
              .slice(0, 3)
          ])
        );
        setSearchSuggestions(suggestions);
        setShowSuggestions(true);
      } else {
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, applyFilters]);

  // Initialize filters from URL
  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    const selectedCategory = searchParams.get('category') || 'All';
    const selectedTags = searchParams.get('tags')?.split(',') || [];

    setFilters({
      searchQuery,
      selectedCategory: categories.includes(selectedCategory) ? selectedCategory : 'All',
      selectedTags: selectedTags.filter(tag =>
        popularTags.includes(tag)
      ),
    });

    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchParams]);

  // Handle keyboard navigation for search suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const suggestions = document.querySelectorAll('.suggestion-item');
      const current = document.activeElement as HTMLElement;

      if (e.key === 'ArrowDown') {
        if (!current.classList.contains('suggestion-item')) {
          (suggestions[0] as HTMLElement)?.focus();
        } else {
          const next = current.nextElementSibling as HTMLElement;
          next?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        if (current.classList.contains('suggestion-item')) {
          const prev = current.previousElementSibling as HTMLElement;
          prev?.focus();
        }
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: suggestion,
    }));
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const clearSearch = () => {
    setFilters(prev => ({
      ...prev,
      searchQuery: '',
    }));
    searchInputRef.current?.focus();
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => {
      const newTags = prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag];

      const newFilters = {
        ...prev,
        selectedTags: newTags,
      };

      updateUrl(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    const newFilters = {
      searchQuery: '',
      selectedCategory: 'All',
      selectedTags: [],
    };

    setFilters(newFilters);
    updateUrl(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHero
        searchQuery={filters.searchQuery}
        onSearchChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
        onSearchKeyDown={handleKeyDown}
        searchSuggestions={searchSuggestions}
        showSuggestions={showSuggestions}
        onSuggestionClick={handleSuggestionClick}
        setShowSuggestions={setShowSuggestions}
        searchInputRef={searchInputRef}
        clearSearch={clearSearch}
        searchRef={searchRef}
      />

      <div className="border-b">
        <MaxWidthWrapper className="py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilters(prev => {
                    const newFilters = { ...prev, selectedCategory: category };
                    updateUrl(newFilters);
                    return newFilters;
                  })}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    filters.selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {(filters.selectedTags.length > 0 || filters.selectedCategory !== 'All' || filters.searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-colors",
                  filters.selectedTags.includes(tag)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50"
                )}
              >
                <Tag className="h-3 w-3" />
                {tag}
                {filters.selectedTags.includes(tag) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>

      <BlogList
        posts={filteredPosts}
        isLoading={isLoading}
        searchQuery={filters.searchQuery}
      />
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchSuggestions: string[];
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  clearSearch: () => void;
  searchRef: React.RefObject<HTMLDivElement | null>;
  setShowSuggestions: (show: boolean) => void;
}

function BlogHero({
  searchQuery,
  onSearchChange,
  onSearchKeyDown,
  searchSuggestions,
  showSuggestions,
  onSuggestionClick,
  searchInputRef,
  clearSearch,
  searchRef,
  setShowSuggestions,
}: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#4f46e5_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-500 opacity-20 blur-[100px]" />
        </div>
      </div>

      <MaxWidthWrapper className="relative z-10 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Insights & Updates
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Stay ahead with the latest trends, tips, and stories about AI recruitment and hiring.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="relative w-full max-w-md" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search articles, tags, or authors..."
                  value={searchQuery}
                  onChange={onSearchChange}
                  onKeyDown={onSearchKeyDown}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                  className="h-12 w-full rounded-full bg-background/80 backdrop-blur-sm pl-10 pr-12 text-foreground border border-border/50 shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border bg-popover shadow-lg">
                  <div className="divide-y">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        onClick={() => onSuggestionClick(suggestion)}
                        className="suggestion-item w-full px-4 py-3 text-left text-sm text-muted-foreground hover:bg-muted/50 focus:bg-muted/50 focus:outline-none"
                        tabIndex={0}
                      >
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

interface BlogListProps {
  posts: BlogPostWithUI[];
  isLoading: boolean;
  searchQuery: string;
}

function BlogList({ posts, isLoading, searchQuery }: BlogListProps) {
  if (isLoading) {
    return (
      <MaxWidthWrapper className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-xl border bg-card">
                <div className="h-48 animate-pulse bg-muted" />
                <div className="p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="mt-2 h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="mt-1 h-4 w-5/6 animate-pulse rounded bg-muted" />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  if (posts.length === 0) {
    return (
      <MaxWidthWrapper className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {searchQuery ? 'No matching articles found' : 'No articles yet'}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {searchQuery
              ? 'Try adjusting your search or filter to find what you\'re looking for.'
              : 'Check back later for new content.'}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => window.location.search = ''}
            >
              Clear all filters
            </Button>
          )}
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {searchQuery ? 'Search Results' : 'Latest Articles'}
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            {searchQuery
              ? `Found ${posts.length} ${posts.length === 1 ? 'article' : 'articles'} matching your search`
              : 'Learn how to grow your business with our expert advice.'}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination would go here */}
        <div className="mt-16 flex items-center justify-center">
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </nav>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

interface BlogCardProps {
  post: BlogPostWithUI;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 h-full">
      <Link href={`/resources/blog/${post.slug}`} className="block h-full w-full">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>

          <h3 className="mb-2 text-xl font-semibold leading-tight text-foreground">
            {post.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted">
                <Image
                  src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'A')}&background=random`}
                  alt={post.author?.name || 'Author'}
                  width={24}
                  height={24}
                  className="h-full w-full object-cover"
                  priority={false}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'A')}&background=random`;
                  }}
                />
              </div>
              <span className="text-muted-foreground">{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
