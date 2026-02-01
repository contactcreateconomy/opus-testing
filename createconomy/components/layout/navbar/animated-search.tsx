"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { expandSearch } from "@/lib/animations";

interface AnimatedSearchProps {
  className?: string;
}

export function AnimatedSearch({ className }: AnimatedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery("");
  };

  return (
    <motion.div
      className={cn("relative flex items-center", className)}
      variants={expandSearch}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            className="flex items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 h-10 rounded-full bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-indigo-500"
                onBlur={() => {
                  if (!searchQuery) {
                    handleClose();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleClose();
                  }
                }}
              />
              {searchQuery && (
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            onClick={() => setIsExpanded(true)}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            aria-label="Open search"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
