import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import React from "react";

interface Props {
  delay?: number;
}

export default function FadeInFromTopWhenVisible({
  children,
  delay = 0.2,
}: React.PropsWithChildren<Props>) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      animate={controls}
      initial="hidden"
      ref={ref}
      transition={{ duration: 0.5, delay: delay }}
      variants={{
        hidden: {
          opacity: 0,
          y: -50,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
