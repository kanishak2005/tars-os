"use client";

import Background from "@/components/background/Background";
import BootController from "./BootController";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({
  onComplete,
}: BootScreenProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Background />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-7xl font-bold tracking-[0.45em] text-white">
          T.A.R.S.
        </h1>

        <p className="text-sm uppercase tracking-[0.45em] text-gray-400">
          Technology Autonomous Repository Supervisor
        </p>

        <BootController onComplete={onComplete} />
      </div>
    </main>
  );
}