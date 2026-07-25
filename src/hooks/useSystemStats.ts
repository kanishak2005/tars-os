"use client";

import { useEffect, useState } from "react";

export default function useSystemStats() {
  const randomValue = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const [stats, setStats] = useState({
    cpu: 72,
    memory: 48,
    network: 81,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: randomValue(60, 90),
        memory: randomValue(35, 70),
        network: randomValue(70, 100),
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return stats;
}