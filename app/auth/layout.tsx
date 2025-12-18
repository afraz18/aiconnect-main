import MaxWidthWrapper from "@/components/global/max-width-wrapper";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen flex flex-col justify-center bg-background">
        <MaxWidthWrapper className="justify-center flex">
            {children}
        </MaxWidthWrapper>
    </div>;
}