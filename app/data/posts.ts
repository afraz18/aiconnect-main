export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  heroImage: {
    src: string;
    alt: string;
    srcSet: {
      src: string;
      width: number;
      height: number;
    }[];
  };
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  href: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Web Development',
    slug: 'future-of-ai-in-web-dev',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and interact with websites and web applications.',
    category: 'Technology',
    tags: ['AI', 'Web Development', 'Innovation', 'Frontend'],
    heroImage: {
      src: 'https://picsum.photos/seed/ai-web-dev/1200/900',
      alt: 'AI and web development concept',
      srcSet: [
        { src: 'https://picsum.photos/seed/ai-web-dev/400/300', width: 400, height: 300 },
        { src: 'https://picsum.photos/seed/ai-web-dev/800/600', width: 800, height: 600 },
        { src: 'https://picsum.photos/seed/ai-web-dev/1200/900', width: 1200, height: 900 },
      ]
    },
    content: `
      <h2>Introduction to AI in Web Development</h2>
      <p>The integration of Artificial Intelligence (AI) into web development is transforming how we create and interact with digital experiences. From automated coding assistants to intelligent user interfaces, AI is making web development more efficient and accessible.</p>
      
      <h3>AI-Powered Development Tools</h3>
      <p>Modern IDEs now come equipped with AI assistants that can predict code, suggest improvements, and even write entire functions. Tools like GitHub Copilot and Amazon CodeWhisperer are becoming essential for developers.</p>
      
      <h3>Enhancing User Experience</h3>
      <p>AI is enabling more personalized and adaptive user experiences. Through machine learning algorithms, websites can now predict user behavior and adjust content dynamically.</p>
      
      <h3>The Future Outlook</h3>
      <p>As AI continues to evolve, we can expect even more sophisticated web development tools and techniques. The future might see AI handling complex tasks like automated testing, performance optimization, and even deployment strategies.</p>
    `,
    author: {
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    date: '2025-11-15',
    readTime: '5 min read',
    href: '/blog/future-of-ai-in-web-dev'
  },
  {
    id: '2',
    title: 'Sustainable Web Design: Building for the Future',
    slug: 'sustainable-web-design',
    excerpt: 'Learn how sustainable web design practices can reduce carbon emissions and create more efficient digital experiences.',
    category: 'Design',
    tags: ['Sustainability', 'Web Design', 'Performance', 'Green Tech'],
    heroImage: {
      src: 'https://picsum.photos/seed/sustainable-web/1200/900',
      alt: 'Sustainable web design concept',
      srcSet: [
        { src: 'https://picsum.photos/seed/sustainable-web/400/300', width: 400, height: 300 },
        { src: 'https://picsum.photos/seed/sustainable-web/800/600', width: 800, height: 600 },
        { src: 'https://picsum.photos/seed/sustainable-web/1200/900', width: 1200, height: 900 },
      ]
    },
    content: `
      <h2>Why Sustainable Web Design Matters</h2>
      <p>The internet's carbon footprint is growing at an alarming rate. Sustainable web design focuses on creating efficient, low-impact websites that deliver great user experiences while minimizing environmental impact.</p>
      
      <h3>Key Principles</h3>
      <p>Sustainable web design encompasses several key principles including performance optimization, efficient coding practices, and responsible hosting solutions.</p>
      
      <h3>Practical Implementation</h3>
      <p>From optimizing images to implementing lazy loading and using system fonts, there are numerous ways to make your website more sustainable without sacrificing quality or user experience.</p>
      
      <h3>Measuring Impact</h3>
      <p>Learn about tools and metrics that can help you measure and reduce your website's carbon footprint, contributing to a more sustainable digital ecosystem.</p>
    `,
    author: {
      name: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    date: '2025-11-10',
    readTime: '4 min read',
    href: '/blog/sustainable-web-design'
  },
  {
    id: '3',
    title: 'The Rise of Edge Computing in Modern Web Applications',
    slug: 'edge-computing-web-apps',
    excerpt: 'Discover how edge computing is changing the landscape of web application development and deployment.',
    category: 'Technology',
    tags: ['Edge Computing', 'Web Apps', 'Performance', 'Cloud'],
    heroImage: {
      src: 'https://picsum.photos/seed/edge-computing/1200/900',
      alt: 'Edge computing concept',
      srcSet: [
        { src: 'https://picsum.photos/seed/edge-computing/400/300', width: 400, height: 300 },
        { src: 'https://picsum.photos/seed/edge-computing/800/600', width: 800, height: 600 },
        { src: 'https://picsum.photos/seed/edge-computing/1200/900', width: 1200, height: 900 },
      ]
    },
    content: `
      <h2>Understanding Edge Computing</h2>
      <p>Edge computing brings computation and data storage closer to the location where it's needed, improving response times and saving bandwidth.</p>
      
      <h3>Benefits for Web Applications</h3>
      <p>By processing data closer to the user, edge computing significantly reduces latency, enhances security, and improves the overall user experience for web applications.</p>
      
      <h3>Implementation Strategies</h3>
      <p>Learn about different approaches to implementing edge computing in your web applications, from CDN-based solutions to edge functions and serverless architectures.</p>
      
      <h3>Real-World Use Cases</h3>
      <p>Explore how leading companies are leveraging edge computing to deliver faster, more reliable web experiences to their users around the globe.</p>
      
      <h3>Future Trends</h3>
      <p>As 5G networks become more prevalent, the role of edge computing in web development is set to expand even further, opening up new possibilities for real-time applications.</p>
    `,
    author: {
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    date: '2025-11-05',
    readTime: '6 min read',
    href: '/blog/edge-computing-web-apps'
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentPostSlug: string, limit: number = 2): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentPostSlug)
    .slice(0, limit);
}
