import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 border-r">
          <CalendarSidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
