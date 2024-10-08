"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent as ME, PropsWithChildren, useRef } from "react";

export function Magnet({ children }: Readonly<PropsWithChildren>) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: ME<HTMLDivElement, MouseEvent>) => {
    if (window.innerWidth < 480) {
      return;
    }

    if (ref.current) {
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();

      x.set(clientX - (left + width / 2));
      y.set(clientY - (top + height / 2));
    }
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const smoothX = useSpring(x, { stiffness: 600, damping: 60, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 600, damping: 60, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className="w-fit"
    >
      {children}
    </motion.div>
  );
}
