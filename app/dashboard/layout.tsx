<<<<<<< HEAD
import React from "react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <>
            <Navbar />

            <div className="my-20">
                <MaxWidthWrapper>
                    <div className="mx-auto w-full">
                        {children}
                    </div>
                </MaxWidthWrapper>
            </div>

            <Footer />
        </>
    );
}

=======
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import DashboardSidebar, { DashboardView } from "@/components/dashboard/dashboard-sidebar";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { NotificationsDropdown } from "@/components/notifications/notifications-dropdown";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { user } = useUser();
  const firstName = user?.firstName || 'User';
  const lastName = user?.lastName || '';
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  useEffect(() => {
    const handleToggleMenu = () => setMobileMenuOpen(prev => !prev);
    window.addEventListener('toggle-mobile-menu', handleToggleMenu);
    return () => window.removeEventListener('toggle-mobile-menu', handleToggleMenu);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-background">
      <NotificationsProvider>
        {/* Fixed Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 border-r bg-background transition-transform duration-300 ease-in-out lg:translate-x-0",
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <DashboardSidebar
            activeView={(pathname.split('/')[2] || 'home') as DashboardView}
            onViewChange={() => { }}
          />
        </div>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col md:ml-64">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex justify-between items-center h-16 px-4 md:px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>

              {/* AiConnect Logo - Desktop */}
              <Link
                href="/"
                className="hidden md:flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity"
              >
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  AiConnect
                </span>
              </Link>

              {/* Page Title - Mobile */}
              <div className="md:hidden text-lg font-semibold text-foreground ml-2">
                {pathname.includes('/settings') ? 'Settings' : 'Dashboard'}
              </div>
            </div>

            {/* Right side - Navigation items */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <NotificationsDropdown />

              {/* Profile Section */}
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-accent/50 transition-colors cursor-pointer">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9"
                    }
                  }}
                />
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">{firstName} {lastName}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
            {children}
          </main>
        </div>
      </NotificationsProvider>
    </div>
  );
}
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
