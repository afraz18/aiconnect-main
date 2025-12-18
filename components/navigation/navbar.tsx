"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants/navigation";
import { LucideIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import AnimationContainer from "../global/animation-container";
import MaxWidthWrapper from "../global/max-width-wrapper";
import MobileNavbar from "./mobile-navbar";
<<<<<<< HEAD
import { useClerk } from "@clerk/nextjs";

const FIXED_AI_NOTES_ROUTE = "/meeting/ai-notes";
=======
import { useClerk, UserButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf

const Navbar = () => {
    const { user } = useClerk();

    const [scroll, setScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 8) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

<<<<<<< HEAD
    // 🔥 Runtime fix: if any link incorrectly points to /meeting/notes → redirect to AI Notes
    const sanitizedLinks = NAV_LINKS.map(section => ({
        ...section,
        menu: section.menu?.map(item => ({
            ...item,
            href: item.href === "/meeting/notes" ? FIXED_AI_NOTES_ROUTE : item.href
        }))
    }));

    return (
        <header className={cn(
            "sticky top-0 inset-x-0 h-14 w-full border-b border-transparent z-[99999] select-none",
=======
    return (
        <header className={cn(
            "sticky top-0 inset-x-0 h-14 w-full border-b border-transparent z-99999 select-none",
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
            scroll && "border-background/80 bg-background/40 backdrop-blur-md"
        )}>
            <AnimationContainer reverse delay={0.1} className="size-full">
                <MaxWidthWrapper className="flex items-center justify-between">
                    <div className="flex items-center space-x-12">
                        <Link href="/#home">
<<<<<<< HEAD
                            <span className="text-lg font-bold font-heading leading-none">
                                AiConnect
                            </span>
                        </Link>

                        <NavigationMenu className="hidden lg:flex">
                            <NavigationMenuList>
                                {sanitizedLinks.map((link) => (
                                    <NavigationMenuItem key={link.title}>
                                        {link.menu ? (
                                            <>
                                                <NavigationMenuTrigger className="bg-transparent">
                                                    {link.title}
                                                </NavigationMenuTrigger>

                                                <NavigationMenuContent>
                                                    <ul
                                                        className={cn(
                                                            "grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl",
                                                            link.title === "Features"
                                                                ? "lg:grid-cols-[.75fr_1fr]"
                                                                : "lg:grid-cols-2"
                                                        )}
                                                    >
                                                        {link.title === "Features" && (
                                                            <li className="row-span-4 pr-2 relative rounded-lg overflow-hidden">
                                                                <div className="absolute inset-0 h-full w-[calc(100%-10px)] bg-[linear-gradient(to_right,oklch(var(--color-foreground)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--color-foreground)/0.1)_1px,transparent_1px)] bg-size-[1rem_1rem]" />
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        href="/"
                                                                        className="flex h-full w-full flex-col justify-end rounded-lg bg-linear-to-b from-muted/50 to-muted p-4"
=======
                            <span className="text-lg font-bold font-heading leading-none!">
                                AiConnect
                            </span>
                        </Link>
                        <NavigationMenu className="hidden lg:flex">
                            <NavigationMenuList>
                                {NAV_LINKS.map((link) => (
                                    <NavigationMenuItem key={link.title}>
                                        {link.menu ? (
                                            <>
                                                <NavigationMenuTrigger className="bg-transparent">{link.title}</NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul className={cn(
                                                        "grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl",
                                                        link.title === "Features" ? "lg:grid-cols-[.75fr_1fr]" : "lg:grid-cols-2"
                                                    )}>
                                                        {link.title === "Features" && (
                                                            <li className="row-span-4 pr-2 relative rounded-lg overflow-hidden">
                                                                <div className="absolute inset-0 z-10! h-full w-[calc(100%-10px)] 
                                                                    bg-[linear-gradient(to_right,oklch(var(--color-foreground)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--color-foreground)/0.1)_1px,transparent_1px)] 
                                                                    bg-size-[1rem_1rem]">
                                                                </div>
                                                                <NavigationMenuLink asChild className="z-20 relative">
                                                                    <Link
                                                                        href="/"
                                                                        className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-linear-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                                                    >
                                                                        <h6 className="mb-2 mt-4 text-lg font-medium">
                                                                            All Features
                                                                        </h6>
                                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                                            Manage links, track performance, and more.
                                                                        </p>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        )}
<<<<<<< HEAD

=======
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                                        {link.menu.map((menuItem) => (
                                                            <ListItem
                                                                key={menuItem.title}
                                                                title={menuItem.title}
<<<<<<< HEAD
                                                                href={
                                                                    menuItem.href === "/meeting/notes"
                                                                        ? FIXED_AI_NOTES_ROUTE
                                                                        : menuItem.href
                                                                }
=======
                                                                href={menuItem.href}
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                                                icon={menuItem.icon}
                                                            >
                                                                {menuItem.tagline}
                                                            </ListItem>
                                                        ))}
<<<<<<< HEAD

=======
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                                    </ul>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <NavigationMenuLink asChild>
<<<<<<< HEAD
                                                <Link
                                                    href={
                                                        link.href === "/meeting/notes"
                                                            ? FIXED_AI_NOTES_ROUTE
                                                            : link.href
                                                    }
                                                    className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                                                >
=======
                                                <Link href={link.href} className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                                    {link.title}
                                                </Link>
                                            </NavigationMenuLink>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
<<<<<<< HEAD
=======

>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                    </div>

                    <div className="hidden lg:flex items-center">
                        <div className="flex items-center gap-x-4">
                            {!user ? (
<<<<<<< HEAD
                                <Link href="/auth/sign-in" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Sign In
                                </Link>
                            ) : (
                                <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
                                    Dashboard
                                </Link>
                            )}

                            {!user && (
                                <Link href="/auth/sign-up" className={buttonVariants({ size: "sm" })}>
                                    Get Started
                                    <ZapIcon className="size-3.5 ml-1.5 text-orange-500 fill-orange-500" />
                                </Link>
=======
                                <>
                                    <Link href="/auth/sign-in" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                        Sign In
                                    </Link>
                                    <Link href="/auth/sign-up" className={buttonVariants({ size: "sm" })}>
                                        Get Started
                                        <ZapIcon className="size-3.5 ml-1.5 text-orange-500 fill-orange-500" />
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
                                        Dashboard
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <UserButton 
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: "h-9 w-9"
                                                }
                                            }}
                                        />
                                        <div className="hidden sm:block text-sm font-medium">
                                            {user.firstName || user.username}
                                        </div>
                                    </div>
                                </div>
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                            )}
                        </div>
                    </div>

                    <MobileNavbar />
<<<<<<< HEAD
                </MaxWidthWrapper>
            </AnimationContainer>
        </header>
    );
=======

                </MaxWidthWrapper>
            </AnimationContainer>
        </header>
    )

>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
<<<<<<< HEAD
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href === "/meeting/notes" ? "/meeting/ai-notes" : href}
                    className={cn(
                        "block space-y-1 rounded-lg p-3 no-underline outline-none transition-all hover:bg-accent hover:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <h6 className="text-sm font-medium">{title}</h6>
                    </div>
                    <p className="line-clamp-1 text-sm text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default Navbar;
=======
>(
    ({ className, title, href, icon: Icon, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        href={href!}
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="flex items-center space-x-2 text-foreground">
                            <Icon className="h-4 w-4" />
                            <h6 className="text-sm font-medium leading-none! ">
                                {title}
                            </h6>
                        </div>
                        <p title={children! as string} className="line-clamp-1 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        )
    })
ListItem.displayName = "ListItem"

export default Navbar
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
