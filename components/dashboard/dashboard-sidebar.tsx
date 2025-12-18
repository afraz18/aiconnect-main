"use client";

import React from "react";
<<<<<<< HEAD
import { cn } from "@/lib/utils";
import { LayoutDashboard, Video, FileText } from "lucide-react";
import { DashboardView } from "@/app/dashboard/page";
=======
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Calendar, FileText, Bot, Settings } from "lucide-react";
export type DashboardView = 'home' | 'chats' | 'meetings' | 'calendar' | 'files' | 'ai-workshop' | 'settings';
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf

interface DashboardSidebarProps {
    activeView: DashboardView;
    onViewChange: (view: DashboardView) => void;
}

const menuItems = [
    {
<<<<<<< HEAD
        id: "overview" as DashboardView,
        label: "Overview",
        icon: LayoutDashboard,
    },
    {
        id: "recording" as DashboardView,
        label: "Recordings",
        icon: Video,
    },
    {
        id: "interviews" as DashboardView,
        label: "Interviews",
        icon: FileText,
    },
];

export default function DashboardSidebar({ activeView, onViewChange }: DashboardSidebarProps) {
    return (
        <aside className="w-64 shrink-0">
            <nav className="space-y-2 sticky top-24">
=======
        id: "home" as DashboardView,
        label: "Home",
        icon: Home,
    },
    {
        id: "meetings" as DashboardView,
        label: "Meetings",
        icon: MessageSquare,
    },
    {
        id: "chat" as DashboardView,
        label: "Chat",
        icon: MessageSquare,
    },
    {
        id: "calendar" as DashboardView,
        label: "Calendar",
        icon: Calendar,
    },
    {
        id: "files" as DashboardView,
        label: "Files",
        icon: FileText,
    },
    {
        id: "ai-workshop" as DashboardView,
        label: "AI Workplace",
        icon: Bot,
    },
    {
        id: "settings" as DashboardView,
        label: "Settings",
        icon: Settings,
    },
];

export default function DashboardSidebar({ activeView, onViewChange }: DashboardSidebarProps) {
    const router = useRouter();

    const handleNavigation = (item: { id: string; label: string; icon: any }) => {
        if (item.id === 'home') {
            router.push('/dashboard');
        } else if (item.id === 'chat') {
            router.push('/dashboard/chat');
        } else if (item.id === 'settings') {
            router.push('/dashboard/settings');
        } else if (item.id === 'calendar') {
            router.push('/dashboard/calendar');
        } else {
            onViewChange(item.id as any);
        }
    };
    return (
        <aside className="w-full h-full flex flex-col">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeView === item.id;

                        return (
                            <li key={item.id}>
                                <button
<<<<<<< HEAD
                                    onClick={() => onViewChange(item.id)}
=======
                                    onClick={() => handleNavigation(item)}
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground font-medium"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
