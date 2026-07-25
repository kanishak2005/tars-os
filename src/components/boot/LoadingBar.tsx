"use client";

interface LoadingBarProps {
  progress: number;
}

export default function LoadingBar({
  progress,
}: LoadingBarProps) {
  return (
    <div className="w-80">
      <div className="h-2 overflow-hidden rounded bg-white/10">
        <div
          className="h-full bg-cyan-400 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="mt-2 text-center text-sm text-gray-500">
        {progress}%
      </p>
    </div>
  );
}