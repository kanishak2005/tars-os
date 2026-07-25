"use client";

import { useState } from "react";
import { TerminalEntry } from "@/types/terminal";
import { executeCommand } from "@/services/terminalCommands";

export default function useTerminal() {
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 1,
      type: "system",
      text: "T.A.R.S. Terminal initialized.",
    },
    {
      id: 2,
      type: "system",
      text: 'Type "help" to see available commands.',
    },
  ]);

  const [input, setInput] = useState("");

  function submitCommand() {
    const command = input.trim();

    if (!command) return;

    const userEntry: TerminalEntry = {
      id: Date.now(),
      type: "input",
      text: command,
    };

    const responseEntry: TerminalEntry = {
      id: Date.now() + 1,
      type: "output",
      text: executeCommand(command),
    };

    setHistory((prev) => [...prev, userEntry, responseEntry]);

    setInput("");
  }

  return {
    history,
    input,
    setInput,
    submitCommand,
  };
}