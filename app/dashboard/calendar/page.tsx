"use client";

import { useState, useCallback } from "react";
import { format, startOfToday, isToday, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ViewType = 'month' | 'week' | 'day' | 'agenda';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

export default function CalendarPage() {
  const today = startOfToday();
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [currentView, setCurrentView] = useState<ViewType>('month');
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  });

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Team Meeting",
      start: new Date(2025, 10, 21, 10, 0),
      end: new Date(2025, 10, 21, 11, 0),
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Design Review",
      start: new Date(2025, 10, 22, 14, 0),
      end: new Date(2025, 10, 22, 15, 30),
      color: "#8b5cf6",
    },
  ]);

  const handlePrevious = () => {
    setCurrentDate(prevDate => {
      if (currentView === 'month') return subMonths(prevDate, 1);
      // Add other view type handling here
      return prevDate;
    });
  };

  const handleNext = () => {
    setCurrentDate(prevDate => {
      if (currentView === 'month') return addMonths(prevDate, 1);
      // Add other view type handling here
      return prevDate;
    });
  };

  const handleToday = () => {
    setCurrentDate(today);
  };

  const handleCreateEvent = () => {
    // Implementation for creating a new event
    setShowNewEventModal(false);
  };

  // Generate days for the month view
  const daysInMonth = [];
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // Add days from previous month
  const startDay = startOfMonth.getDay();
  for (let i = 0; i < startDay; i++) {
    const date = new Date(startOfMonth);
    date.setDate(date.getDate() - (startDay - i));
    daysInMonth.push({ date, isCurrentMonth: false });
  }

  // Add current month days
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    daysInMonth.push({ date, isCurrentMonth: true });
  }

  // Add days from next month to complete the grid
  const remainingDays = 42 - daysInMonth.length; // 6 rows x 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(endOfMonth);
    date.setDate(date.getDate() + i);
    daysInMonth.push({ date, isCurrentMonth: false });
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
            <p className="text-sm text-muted-foreground">
              {format(currentDate, 'MMMM yyyy')}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="ml-4 flex space-x-1 rounded-lg bg-muted p-1">
              {['Month', 'Week', 'Day', 'Agenda'].map((view) => (
                <Button
                  key={view}
                  variant={currentView === view.toLowerCase() as ViewType ? 'default' : 'ghost'}
                  size="sm"
                  className="px-3 py-1 text-xs"
                  onClick={() => setCurrentView(view.toLowerCase() as ViewType)}
                >
                  {view}
                </Button>
              ))}
            </div>
            <Dialog open={showNewEventModal} onOpenChange={setShowNewEventModal}>
              <DialogTrigger asChild>
                <Button className="ml-4">
                  <Plus className="mr-2 h-4 w-4" />
                  New Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date & Time</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <CalendarComponent
                          mode="single"
                          selected={newEvent.start}
                          onSelect={(date) =>
                            date &&
                            setNewEvent({
                              ...newEvent,
                              start: date,
                            })
                          }
                          className="rounded-md border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="time"
                          value={format(newEvent.start, 'HH:mm')}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':').map(Number);
                            const newStart = new Date(newEvent.start);
                            newStart.setHours(hours, minutes);
                            setNewEvent({ ...newEvent, start: newStart });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date & Time</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <CalendarComponent
                          mode="single"
                          selected={newEvent.end}
                          onSelect={(date) =>
                            date &&
                            setNewEvent({
                              ...newEvent,
                              end: date,
                            })
                          }
                          className="rounded-md border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="time"
                          value={format(newEvent.end, 'HH:mm')}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':').map(Number);
                            const newEnd = new Date(newEvent.end);
                            newEnd.setHours(hours, minutes);
                            setNewEvent({ ...newEvent, end: newEnd });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewEventModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateEvent}>Create</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="h-full bg-card rounded-lg border shadow-sm">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-3 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 auto-rows-fr">
            {daysInMonth.map(({ date, isCurrentMonth }, idx) => {
              const dayEvents = events.filter(event => 
                isSameDay(event.start, date) || 
                (event.start <= date && event.end >= date)
              );
              
              return (
                <div 
                  key={idx}
                  className={`min-h-[120px] border-r border-b p-2 ${!isCurrentMonth ? 'bg-muted/20' : ''} ${isToday(date) ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-sm ${isToday(date) ? 'bg-primary text-primary-foreground' : ''}`}>
                      {date.getDate()}
                    </span>
                    {isCurrentMonth && (
                      <button className="text-muted-foreground hover:bg-muted p-1 rounded-full">
                        <Plus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="mt-1 space-y-1 max-h-[calc(100%-24px)] overflow-y-auto">
                    {dayEvents.map((event) => (
                      <div 
                        key={event.id}
                        className="text-xs p-1 rounded truncate"
                        style={{ backgroundColor: `${event.color}20`, borderLeft: `3px solid ${event.color}` }}
                      >
                        <span className="font-medium" style={{ color: event.color }}>
                          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                        </span>
                        <div className="truncate">{event.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
