"use client";

import { motion } from "framer-motion";
import { MoreHorizontal, MessageCircle, Clock, Verified } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fadeInUp, cardHover } from "@/lib/animations";
import { Discussion } from "@/types/discussion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StackedAvatars } from "./stacked-avatars";
import { CardActions } from "./card-actions";

interface DiscussionCardProps {
  discussion: Discussion;
  index?: number;
}

export function DiscussionCard({ discussion, index = 0 }: DiscussionCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-2xl p-4 cursor-pointer"
      whileHover={{
        y: -2,
        boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
          <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm truncate">
              {discussion.author.name}
            </span>
            {discussion.author.verified && (
              <Verified className="h-4 w-4 text-indigo-500 fill-indigo-500/20" />
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{discussion.author.handle}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {discussion.createdAt}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save discussion</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Body */}
      <div className="space-y-2 mb-3">
        <h3 className="font-semibold text-base leading-tight line-clamp-2">
          {discussion.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {discussion.summary}
        </p>
      </div>

      {/* Tags */}
      {discussion.tags && discussion.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {discussion.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0.5 bg-secondary/50"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Preview image */}
      {discussion.previewImage && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
          <Image
            src={discussion.previewImage}
            alt={discussion.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-3">
          <CardActions
            upvotes={discussion.upvotes}
            isUpvoted={discussion.isUpvoted}
            isFavorited={discussion.isFavorited}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 gap-1.5 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs font-medium">{discussion.comments}</span>
          </Button>
        </div>

        <StackedAvatars users={discussion.participants} max={4} />
      </div>
    </motion.article>
  );
}
