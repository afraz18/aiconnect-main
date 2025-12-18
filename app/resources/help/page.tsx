import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import Link from "next/link";
import { ContactSupport } from './contact-support';
import faqs from './help-faqs.json';

export const metadata: Metadata = {
  title: "Help & Support — AIConnect",
  description: "Get help with AIConnect: joining, hosting, audio/video, security, and troubleshooting.",
};

// Group FAQs by category
const faqsByCategory = faqs.reduce((acc, faq) => {
  if (!acc[faq.category]) {
    acc[faq.category] = [];
  }
  acc[faq.category].push(faq);
  return acc;
}, {} as Record<string, typeof faqs>);

const categories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn how to create an account, join meetings, and use basic features.',
    icon: '🚀',
  },
  {
    id: 'account-sso',
    title: 'Account & SSO',
    description: 'Manage your account settings and single sign-on options.',
    icon: '🔑',
  },
  {
    id: 'audio-video',
    title: 'Audio & Video',
    description: 'Troubleshoot audio and video issues and optimize your setup.',
    icon: '🎥',
  },
  {
    id: 'screen-sharing',
    title: 'Screen Sharing & Presenting',
    description: 'Share your screen and present content during meetings.',
    icon: '🖥️',
  },
  {
    id: 'collaboration',
    title: 'Chat & Collaboration',
    description: 'Use chat, reactions, and other collaboration features.',
    icon: '💬',
  },
  {
    id: 'recording',
    title: 'Recording & Transcripts',
    description: 'Record meetings and access transcripts.',
    icon: '⏺️',
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'Secure your meetings and protect your privacy.',
    icon: '🔒',
  },
  {
    id: 'integrations',
    title: 'Integrations & Extensions',
    description: 'Connect with other tools and services.',
    icon: '🔌',
  },
  {
    id: 'shortcuts',
    title: 'Keyboard Shortcuts',
    description: 'Work more efficiently with keyboard shortcuts.',
    icon: '⌨️',
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fix common issues and get help.',
    icon: '🔧',
  },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="text-sm text-muted-foreground mb-2">
          <Link href="/resources" className="hover:underline">Resources</Link> / Help
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Help & Support</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          How to use AIConnect: joining, hosting, audio/video, security, and troubleshooting.
        </p>
        <div className="flex justify-center gap-4">
          <ContactSupport />
          <Button variant="outline" asChild>
            <Link href="#faqs">View FAQs</Link>
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative mb-16 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search help articles, e.g. 'screen share'"
            className="pl-10 w-full"
          />
        </div>
        <div className="mt-2 text-sm text-muted-foreground text-center">
          Popular searches: <button className="hover:underline">audio issues</button>, <button className="hover:underline">screen sharing</button>, <button className="hover:underline">meeting links</button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="text-3xl mb-2">{category.icon}</div>
              <CardTitle className="text-xl">
                <Link href={`#${category.id}`} className="hover:underline">
                  {category.title}
                </Link>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div id="faqs" className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
            <div key={category} className="mb-8">
              <h3 id={category.toLowerCase().replace(/\s+/g, '-')} className="text-xl font-medium mb-4">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1 text-muted-foreground">
                      {faq.answer}
                      {faq.tags && faq.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {faq.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </div>
          ))}
        </Accordion>
      </div>

      {/* Bottom CTA */}
      <div className="bg-muted/50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">Still need help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our support team is here to help you with any questions or issues you might have.
        </p>
        <ContactSupport />
      </div>
    </div>
  );
}
