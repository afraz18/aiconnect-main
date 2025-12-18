"use client";

import { Calendar as CalendarIcon, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

export function CalendarSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-64 border-r p-4 space-y-6">
      <div>
        <Button variant="outline" className="w-full justify-start">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Create New Event
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Filters</h3>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Upcoming
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            This Week
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Mini Calendar</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
}
