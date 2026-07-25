"use client";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-cyan-400/20 px-8 backdrop-blur-md">
      <h1 className="text-2xl font-bold tracking-[0.3em]">
        T.A.R.S. OS
      </h1>

      <div className="flex items-center gap-6 text-sm text-gray-400">
        <span className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          ONLINE
        </span>

        <span>MISSION CONTROL</span>
      </div>
    </header>
  );
}