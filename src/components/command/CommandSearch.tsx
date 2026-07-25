"use client";

import { Search } from "lucide-react";

import { useNavigation } from "@/context/NavigationContext";
import { useEffect } from "react";

export default function CommandSearch() {
  const {
  searchQuery,
  setSearchQuery,
  setSelectedCommand,
} = useNavigation();
useEffect(() => {
  setSelectedCommand(0);
}, [searchQuery, setSelectedCommand]);
  return (
    <div className="flex items-center gap-4 border-b border-cyan-500/20 px-6 py-5">
      <Search
        size={20}
        className="text-cyan-400"
      />

      <input
        autoFocus
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
        placeholder="Ask T.A.R.S. to execute a command..."
        className="
          flex-1
          bg-transparent
          text-lg
          text-cyan-200
          outline-none
          placeholder:text-cyan-500/50
        "
      />
    </div>
  );
}