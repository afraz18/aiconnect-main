'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const { toggle } = useSidebar();
  const { user } = useUser();
  const pathname = usePathname();

  // Get the current page title based on the route
  const getPageTitle = () => {
    if (pathname.includes('/settings')) return 'Settings';
    if (pathname.includes('/interviews')) return 'Interviews';
    if (pathname.includes('/recording')) return 'Recording';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => toggle()}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="hidden md:flex items-center gap-2 text-lg font-bold hover:opacity-80 transition-opacity"
        >
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            AiConnect
          </span>
        </Link>

        <div className="text-lg font-semibold text-foreground">
          {getPageTitle()}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-accent/50 transition-colors cursor-pointer">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}
