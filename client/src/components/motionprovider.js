"use client";

import { MotionConfig } from "framer-motion";

export default function MotionProvider({ children }) {
  return (
    <MotionConfig viewport={{ once: true }}>
      {children}
    </MotionConfig>
  );
}
