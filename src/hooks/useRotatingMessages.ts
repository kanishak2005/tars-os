"use client";

import { useEffect, useState } from "react";

const messages = [
  "Monitoring repository activity...",
  "Watching deployment pipeline...",
  "Scanning mission logs...",
  "Synchronizing GitHub repositories...",
  "Cloud infrastructure nominal.",
  "Awaiting Commander authentication...",
];

export default function useRotatingMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return messages[index];
}