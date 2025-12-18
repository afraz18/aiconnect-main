import { format, addDays, isToday, isTomorrow } from 'date-fns';

type NotificationType = 'meeting' | 'reminder' | 'alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: Date;
  read: boolean;
  meetingId?: string;
}

export function generateSampleNotifications(): Omit<Notification, 'id' | 'read'>[] {
  const now = new Date();
  
  // Generate notifications for the next 3 days
  const notifications = [];
  
  // Today's meetings
  notifications.push({
    type: 'meeting' as const,
    title: 'Team Standup',
    message: 'Daily team sync to discuss progress and blockers',
    time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0), // 10:00 AM today
    meetingId: `meet-${Date.now()}-1`
  });
  
  // Tomorrow's meetings
  const tomorrow = addDays(now, 1);
  notifications.push({
    type: 'meeting' as const,
    title: 'Project Planning',
    message: 'Q1 2024 project planning and roadmap discussion',
    time: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 14, 30), // 2:30 PM tomorrow
    meetingId: `meet-${Date.now()}-2`
  });
  
  // Day after tomorrow
  const dayAfterTomorrow = addDays(now, 2);
  notifications.push({
    type: 'meeting' as const,
    title: 'Client Demo',
    message: 'Showcase new features to the client',
    time: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 11, 0), // 11:00 AM day after tomorrow
    meetingId: `meet-${Date.now()}-3`
  });
  
  // Next week
  const nextWeek = addDays(now, 7);
  notifications.push({
    type: 'meeting' as const,
    title: 'Sprint Retrospective',
    message: 'Review the sprint and discuss improvements',
    time: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 15, 0), // 3:00 PM next week
    meetingId: `meet-${Date.now()}-4`
  });
  
  return notifications;
}

export function formatNotificationTime(date: Date): string {
  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'h:mm a')}`;
  } else {
    return format(date, 'MMM d, yyyy h:mm a');
  }
}
