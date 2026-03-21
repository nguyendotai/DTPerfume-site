"use client";

import { motion, HTMLMotionProps, easeOut } from "framer-motion";
import { forwardRef, ReactNode } from "react";

interface MotionSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  delay?: number;         
}

const defaultVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easeOut,
    },
  },
};

const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  ({ children, delay = 0, className = "", ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }} 
        variants={defaultVariants}
        transition={{ delay }}
        className={className}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

export default MotionSection;