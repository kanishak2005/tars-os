"use client";

import Panel from "@/components/ui/Panel";
import ProgressBar from "@/components/ui/ProgressBar";
import useSystemStats from "@/hooks/useSystemStats";

export default function SystemHealthPanel() {
  const { cpu, memory, network } = useSystemStats();

  return (
    <Panel title="System Health">
      <div className="space-y-5">

        <ProgressBar
          label="CPU"
          value={cpu}
        />

        <ProgressBar
          label="Memory"
          value={memory}
        />

        <ProgressBar
          label="Network"
          value={network}
        />

        <div className="flex items-center justify-between border-t border-cyan-400/20 pt-4">
          <span className="text-cyan-300">
            AI Core
          </span>

          <span className="flex items-center gap-3 text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

            ONLINE
          </span>
        </div>

      </div>
    </Panel>
  );
}