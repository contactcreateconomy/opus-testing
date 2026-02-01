"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockNotifications = [
  {
    id: "1",
    title: "New comment on your discussion",
    message: "Alex Chen replied to your post",
    time: "2m ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  {
    id: "2",
    title: "Your post is trending",
    message: "Your discussion has 100+ upvotes",
    time: "1h ago",
    read: false,
    avatar: null,
  },
  {
    id: "3",
    title: "New follower",
    message: "Sarah Miller started following you",
    time: "3h ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
];

export function Notifications() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {mockNotifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className="flex items-start gap-3 p-3 cursor-pointer"
          >
            {notification.avatar ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={notification.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <Bell className="h-4 w-4 text-indigo-500" />
              </div>
            )}
            <div className="flex-1 space-y-1">
              <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>
                {notification.title}
              </p>
              <p className="text-xs text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-indigo-500" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-indigo-500 font-medium">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
