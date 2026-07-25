"use client";

export default function TerminalHeader() {
  return (
    <div className="flex items-center justify-between border-b border-cyan-400/20 px-4 py-4">
      <div>
        <h3 className="font-semibold tracking-[0.2em] text-cyan-300">
          T.A.R.S. TERMINAL
        </h3>
        <p className="text-sm text-gray-500">
          Autonomous Command Interface
        </p>
      </div>

      <div className="flex items-center gap-3 text-green-400 text-sm">
        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        ONLINE
      </div>
    </div>
  );
}