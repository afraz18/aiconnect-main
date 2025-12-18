import { Github, Linkedin, Youtube, Mail, Instagram } from 'lucide-react'

export const FOOTER_BRAND = {
  name: 'AiConnect',
  tagline: 'Empowering smarter collaboration through AI',
  logo: 'AI',
}

export const FOOTER_SOCIAL_LINKS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@aiconnect.com' },
]

export const FOOTER_LINKS = [
  {
    category: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    category: 'Product',
    links: [
      { label: 'AI Tools', href: '/ai-tools' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'API Access', href: '/api' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    category: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Community', href: '/community' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    category: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
]

export const FOOTER_COPYRIGHT_TEXT = 'AiConnect. All rights reserved. Crafted for developers, by developers.'

export const FOOTER_ADDRESS = {
  street: '123 Tech Street',
  city: 'San Francisco, CA',
  postal: '94105',
  country: 'USA',
  phone: '+1 (555) 123-4567',
  email: 'hello@aiconnect.com',
}
