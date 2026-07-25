"use client";

import { useEffect, useState } from "react";

export default function useClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours();

  let greeting = "Good Evening";

  if (hours >= 5 && hours < 12)
    greeting = "Good Morning";
  else if (hours < 17)
    greeting = "Good Afternoon";

  return {
    greeting,
    time: now.toLocaleTimeString(),
    date: now.toDateString(),
  };
}