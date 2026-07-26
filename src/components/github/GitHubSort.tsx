"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function GitHubSort({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-gray-400">
        Sort By
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          rounded-lg
          border
          border-cyan-500/20
          bg-black/40
          px-3
          py-2
          text-sm
          text-cyan-200
          outline-none
          transition
          focus:border-cyan-400
        "
      >
        <option value="updated">Recently Updated</option>
        <option value="stars">Most Stars</option>
        <option value="name">Name (A–Z)</option>
        <option value="size">Repository Size</option>
      </select>
    </div>
  );
}