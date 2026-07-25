"use client";

import { useEffect, useState } from "react";

interface BootTerminalProps {
  messages: string[];
}

export default function BootTerminal({
  messages,
}: BootTerminalProps) {
  const latestMessage = messages[messages.length - 1] ?? "";

  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (messages.length === 0) return;

    // Preserve all previous completed messages
    setDisplayedMessages(messages.slice(0, -1));
    setTyped("");

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setTyped(latestMessage.slice(0, index));

      if (index >= latestMessage.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [latestMessage, messages]);

  return (
    <div className="w-[560px] rounded-xl border border-cyan-400/20 bg-black/40 p-7 backdrop-blur-md">
      <div className="space-y-2 font-mono text-sm text-green-400">
        {displayedMessages.map((msg, i) => (
          <div key={i}>&gt; {msg}</div>
        ))}

        {latestMessage && <div>&gt; {typed}</div>}

        <div className="animate-pulse">&gt; █</div>
      </div>
    </div>
  );
}