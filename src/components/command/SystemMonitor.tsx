"use client";

import { useEffect, useState } from "react";

export default function SystemMonitor() {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const bootTime = Date.now();

    const interval = setInterval(() => {
      // Local Time
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-IN", {
          hour12: false,
        })
      );

      // Uptime
      const elapsed = Math.floor((Date.now() - bootTime) / 1000);

      const hrs = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
      const secs = String(elapsed % 60).padStart(2, "0");

      setUptime(`${hrs}:${mins}:${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3 text-xs">
      <InfoRow label="AI Core" value="ONLINE" color="text-green-400" />

      <InfoRow
        label="GitHub Link"
        value="CONNECTED"
        color="text-green-400"
      />

      <InfoRow
        label="Local Time"
        value={time}
        color="text-cyan-300"
      />

      <InfoRow
        label="Uptime"
        value={uptime}
        color="text-cyan-300"
      />

      <InfoRow
        label="Clearance"
        value="COMMANDER"
        color="text-cyan-300"
      />
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  color: string;
}

function InfoRow({
  label,
  value,
  color,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">
        {label}
      </span>

      <span className={`${color} font-medium`}>
        {value}
      </span>
    </div>
  );
}