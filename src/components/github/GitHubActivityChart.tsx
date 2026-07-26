"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

interface Props {
  repositories: any[];
}

function ActivityTooltip({
  active,
  payload,
  label,
}: any) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="
        rounded-xl
        border border-cyan-500/20
        bg-[#08131d]
        px-4
        py-3
        shadow-2xl
        backdrop-blur-xl
      "
    >
      <p className="font-semibold text-cyan-300">
        {label}
      </p>

      <p className="mt-1 text-sm text-gray-300">
        {payload[0].value} repository
        {payload[0].value !== 1 && "ies"} updated
      </p>
    </div>
  );
}

export default function GitHubActivityChart({
  repositories,
}: Props) {
  const activityData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const counts = new Array(12).fill(0);

    repositories.forEach((repo) => {
      const month = new Date(
        repo.updated_at
      ).getMonth();

      counts[month]++;
    });

    return months.map((month, index) => ({
      month,
      updates: counts[index],
    }));
  }, [repositories]);

  const hasActivity = activityData.some(
    (item) => item.updates > 0
  );

  return (
    <div
      className="
        rounded-2xl
        border border-cyan-500/20
        bg-black/40
        backdrop-blur-xl
        p-6
      "
    >
      <h2 className="text-xl font-semibold text-cyan-300">
        Repository Activity
      </h2>

      {!hasActivity ? (
        <div className="mt-8 flex h-[320px] items-center justify-center text-gray-500">
          No repository activity found.
        </div>
      ) : (
        <div className="mt-8 h-[320px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={activityData}
              margin={{
                top: 10,
                right: 15,
                left: -20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="activityFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#06b6d4"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="100%"
                    stopColor="#06b6d4"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient
                  id="activityStroke"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#06b6d4"
                  />

                  <stop
                    offset="100%"
                    stopColor="#3b82f6"
                  />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur
                    stdDeviation="4"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid
                stroke="#164e63"
                strokeDasharray="4 4"
                vertical={false}
                opacity={0.3}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
              />

              <Tooltip
                cursor={{
                  stroke: "#06b6d4",
                  strokeOpacity: 0.3,
                }}
                content={<ActivityTooltip />}
              />

              <Area
                type="monotone"
                dataKey="updates"
                fill="url(#activityFill)"
                stroke="none"
                animationDuration={1200}
              />

              <Line
                type="monotone"
                dataKey="updates"
                stroke="url(#activityStroke)"
                strokeWidth={4}
                filter="url(#glow)"
                dot={false}
                activeDot={{
                  r: 7,
                  fill: "#06b6d4",
                  stroke: "#0f172a",
                  strokeWidth: 2,
                }}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}