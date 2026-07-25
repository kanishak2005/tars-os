"use client";

import { TerminalEntry } from "@/types/terminal";

interface Props {
  history: TerminalEntry[];
}

export default function TerminalOutput({ history }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-5 font-mono text-sm">
      {history.map((entry) => (
  <div key={entry.id} className="mb-2">

    {entry.type === "input" && (
      <p className="text-cyan-300">
        &gt; {entry.text}
      </p>
    )}

    {entry.type === "system" && (
      <p className="whitespace-pre-line text-yellow-400">
        {entry.text}
      </p>
    )}

    {entry.type === "output" && (
      <p className="whitespace-pre-line text-green-400">
        {entry.text}
      </p>
    )}

  </div>
))}
    </div>
  );
}