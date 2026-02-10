"use client";

import { motion, HTMLMotionProps, easeOut } from "framer-motion";
import { forwardRef } from "react";

type MotionDivProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

export default MotionDiv;