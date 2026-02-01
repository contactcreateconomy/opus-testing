"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";

interface StackedAvatarsProps {
  users: User[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
};

export function StackedAvatars({
  users,
  max = 5,
  size = "sm",
  className,
}: StackedAvatarsProps) {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {displayUsers.map((user, index) => (
        <Tooltip key={user.id}>
          <TooltipTrigger asChild>
            <Avatar
              className={cn(
                sizeClasses[size],
                "border-2 border-background ring-0 cursor-pointer transition-transform hover:scale-110 hover:z-10"
              )}
              style={{ zIndex: displayUsers.length - index }}
            >
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xs">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.handle}</p>
          </TooltipContent>
        </Tooltip>
      ))}
      {remainingCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                sizeClasses[size],
                "flex items-center justify-center rounded-full bg-muted border-2 border-background font-medium cursor-pointer"
              )}
            >
              +{remainingCount}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{remainingCount} more participants</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
