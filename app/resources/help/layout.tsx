import React from 'react';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';
import { cn } from "@/lib/utils";

interface HelpLayoutProps {
    children: React.ReactNode;
}

const HelpLayout = ({ children }: HelpLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="absolute inset-0 -z-10 h-full w-full">
                    <div
                        className={cn(
                            "absolute inset-0 h-full w-full",
                            "bg-size-[3rem_3rem]",
                            "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                            "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                            "mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
                        )}
                    />
                    <div
                        className={cn(
                            "pointer-events-none absolute inset-0 flex items-center justify-center bg-background",
                            "mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"
                        )}
                    />
                </div>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default HelpLayout;
