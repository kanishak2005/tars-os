"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="flex items-center border-t border-cyan-400/20 px-4 py-4">
      <span className="mr-2 font-mono text-cyan-300">&gt;</span>

      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        className="w-full bg-transparent font-mono text-white outline-none"
        placeholder="Enter command..."
      />
    </div>
  );
}