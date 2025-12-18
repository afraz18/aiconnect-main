export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Recruitment",
    slug: "future-of-ai-recruitment",
    excerpt: "How AI is transforming the hiring process and what it means for recruiters and candidates alike.",
    content: `
      <p>Artificial Intelligence is revolutionizing the recruitment industry in ways we couldn't have imagined a decade ago. From automated resume screening to AI-powered video interviews, the hiring process is becoming more efficient and data-driven than ever before.</p>
      
      <h2>The Rise of AI in Hiring</h2>
      <p>Recruiters are now leveraging AI to sift through thousands of resumes in seconds, identify top talent, and even predict candidate success. This not only saves time but also helps reduce unconscious bias in the hiring process.</p>
    `,
    category: "AI",
    tags: ["AI", "recruitment", "hiring", "technology"],
    image: "/placeholder-blog-1.jpg",
    author: {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alex+Johnson",
      role: "AI Specialist"
    },
    date: "2023-11-15",
    readTime: "5 min",
    featured: true
  },
  // Add more posts as needed
];

export const categories = ["All", "AI", "Productivity", "Development", "Design"];

export const popularTags = [
  { name: "AI", count: 12 },
  { name: "Productivity", count: 8 },
  { name: "Development", count: 15 },
  { name: "Design", count: 7 },
  { name: "Tutorial", count: 9 },
];
