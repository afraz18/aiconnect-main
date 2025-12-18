'use client';

import { Bell, Clock, Calendar, CheckCircle, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/contexts/notifications-context';
import { format, isToday, isTomorrow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function NotificationsDropdown() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotifications();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const router = useRouter();

  const formatNotificationTime = (date: Date) => {
    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    } else if (isTomorrow(date)) {
      return `Tomorrow at ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, yyyy h:mm a');
    }
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.meetingId) {
      router.push(`/meeting/${notification.meetingId}`);
    }
  };

  const handleDeleteNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotification(id);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to clear all notifications?')) {
      clearAllNotifications();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 p-0">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center rounded-full p-0"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Notifications
              {notifications.length > 0 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {notifications.length} total
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearAll(e);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Clear all
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Mark all read
                  </Button>
                </>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="relative group"
                  onMouseEnter={() => setIsHovered(notification.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <DropdownMenuItem 
                    className={`py-3 pr-10 ${!notification.read ? 'bg-accent/50' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="mt-0.5">
                        {notification.type === 'meeting' ? (
                          <Calendar className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                        <div className="mt-1 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{formatNotificationTime(notification.time)}</span>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive ${
                      isHovered === notification.id ? 'opacity-100' : 'opacity-0'
                    } transition-opacity`}
                    onClick={(e) => handleDeleteNotification(e, notification.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Delete notification</span>
                  </Button>
                </div>
              ))}
            </DropdownMenuGroup>
          )}
        </div>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs text-muted-foreground hover:text-foreground"
                onClick={handleClearAll}
              >
                Clear all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
