"use client";

interface Props {
  value: string;
  languages: string[];
  onChange: (value: string) => void;
}

export default function GitHubLanguageFilter({
  value,
  languages,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-gray-400">
        Language
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          rounded-lg
          border border-cyan-500/20
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
        <option value="All">All</option>

        {languages.map((language) => (
          <option
            key={language}
            value={language}
          >
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}