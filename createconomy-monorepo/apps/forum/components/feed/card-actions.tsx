"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowBigUp, Heart } from "lucide-react";
import { cn, upvoteBounce, Button } from "@repo/ui";

interface CardActionsProps {
  upvotes: number;
  isUpvoted?: boolean;
  isFavorited?: boolean;
  onUpvote?: () => void;
  onFavorite?: () => void;
}

export function CardActions({
  upvotes,
  isUpvoted: initialUpvoted = false,
  isFavorited: initialFavorited = false,
  onUpvote,
  onFavorite,
}: CardActionsProps) {
  const [isUpvoted, setIsUpvoted] = useState(initialUpvoted);
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleUpvote = () => {
    setIsAnimating(true);
    setIsUpvoted(!isUpvoted);
    setCurrentUpvotes((prev) => (isUpvoted ? prev - 1 : prev + 1));
    onUpvote?.();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.();
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        variants={upvoteBounce}
        animate={isAnimating ? "pressed" : "rest"}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUpvote}
          className={cn(
            "h-8 px-2 gap-1 rounded-lg transition-colors",
            isUpvoted
              ? "text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <ArrowBigUp
            className={cn("h-5 w-5", isUpvoted && "fill-indigo-500")}
          />
          <span className="text-xs font-medium">{currentUpvotes}</span>
        </Button>
      </motion.div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleFavorite}
        className={cn(
          "h-8 w-8 p-0 rounded-lg transition-colors",
          isFavorited
            ? "text-rose-500 hover:bg-rose-500/10"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        )}
      >
        <motion.div
          animate={isFavorited ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Heart
            className={cn("h-4 w-4", isFavorited && "fill-rose-500")}
          />
        </motion.div>
      </Button>
    </div>
  );
}
