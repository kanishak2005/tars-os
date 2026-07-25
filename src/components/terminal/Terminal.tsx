"use client";

import useTerminal from "@/hooks/useTerminal";
import TerminalHeader from "./TerminalHeader";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";


export default function Terminal() {
  
const {
  history,
  input,
  setInput,
  submitCommand,
} = useTerminal();
  return (
    <div className="flex h-[500px] flex-col overflow-hidden rounded-xl border border-cyan-400/20 bg-black/40 backdrop-blur-md">
      <TerminalHeader />

      <TerminalOutput history={history} />

      <TerminalInput
    value={input}
    onChange={setInput}
    onSubmit={submitCommand}
/>
    </div>
  );
}