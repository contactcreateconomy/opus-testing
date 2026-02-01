import { Variants, type TargetAndTransition, type Easing } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    y: -2,
    boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.04)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const buttonPress: Variants = {
  rest: { scale: 1 },
  pressed: { scale: 0.95 },
};

export const upvoteBounce: Variants = {
  rest: { scale: 1 },
  pressed: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1],
      ease: "easeOut",
    },
  },
};

export const expandSearch: Variants = {
  collapsed: {
    width: 40,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  expanded: {
    width: 300,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const rotateToggle: Variants = {
  light: {
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  dark: {
    rotate: 180,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const slideIn: Variants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const carouselSlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  }),
};

export const morphCard: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const glowPulse: { animate: TargetAndTransition } = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1)",
      "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.2)",
      "0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as Easing,
    },
  },
};
