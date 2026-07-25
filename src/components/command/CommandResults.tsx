"use client";

import { commands } from "@/data/commands";
import { useNavigation } from "@/context/NavigationContext";
import { useEffect } from "react";

import CommandResultItem from "./CommandResultItem";

export default function CommandResults() {
  const {
    searchQuery,
    selectedCommand,
    recentCommands,
  } = useNavigation();

  // Filter commands
  const query = searchQuery.trim().toLowerCase();

const filtered = commands
  .map((command) => {
    let score = 0;

    if (!query) score = 1;

    else if (command.title.toLowerCase() === query)
      score = 100;

    else if (
      command.title.toLowerCase().startsWith(query)
    )
      score = 80;

    else if (
      command.keywords.some((k) =>
        k.toLowerCase().startsWith(query)
      )
    )
      score = 60;

    else if (
      command.title.toLowerCase().includes(query)
    )
      score = 40;

    else if (
      command.keywords.some((k) =>
        k.toLowerCase().includes(query)
      )
    )
      score = 20;

    return {
      ...command,
      score,
    };
  })
  .filter((c) => c.score > 0)
  .sort((a, b) => {
    if (a.score !== b.score)
        return b.score - a.score;

    return (
        recentCommands.indexOf(a.id) -
        recentCommands.indexOf(b.id)
    );
});

  // Recent commands first
  const sorted = [
    ...filtered.filter((command) =>
      recentCommands.includes(command.id)
    ),
    ...filtered.filter(
      (command) => !recentCommands.includes(command.id)
    ),
  ];
  const recent = filtered.filter((command) =>
    recentCommands.includes(command.id)
    );
  const normal = filtered.filter(
    (command) => !recentCommands.includes(command.id)
   );
  useEffect(() => {
  const activeCommand = sorted[selectedCommand];

  if (!activeCommand) return;

  const element = document.getElementById(
    `command-${activeCommand.id}`
  );

  element?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}, [selectedCommand, sorted]);

  return (
    <div className="max-h-[420px] overflow-y-auto p-2">
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="mb-4 w-40 border-t border-cyan-500/20" />

  <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
    No Matching Commands
  </h3>

  <div className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
    T.A.R.S. could not locate a command matching your search.
  </div>

  <div className="mt-6 space-y-2 text-xs uppercase tracking-[0.25em] text-cyan-500/80">
    <div>Try:</div>

    <div className="text-gray-400 normal-case tracking-normal">
      mission
    </div>

    <div className="text-gray-400 normal-case tracking-normal">
      github
    </div>

    <div className="text-gray-400 normal-case tracking-normal">
      terminal
    </div>
  </div>

  <div className="mt-4 w-40 border-t border-cyan-500/20" />
</div>
      ) : (
        <>
      {recent.length > 0 && (
    <>
      <div className="mb-2 mt-1 px-3 text-[11px] uppercase tracking-[0.35em] text-cyan-500">
        Recent Searches
      </div>

      {recent.map((command) => (
        <CommandResultItem
          key={command.id}
          command={command}
          active={false}
          recent
        />
      ))}

      <div className="my-3 border-t border-cyan-500/10" />
    </>
  )}

  <div className="mb-2 px-3 text-[11px] uppercase tracking-[0.35em] text-cyan-500">
    Results
  </div>

  {normal.map((command, index) => (
    <CommandResultItem
      key={command.id}
      command={command}
      active={index === selectedCommand}
    />
  ))}
</>
      )}
    </div>
  );
}