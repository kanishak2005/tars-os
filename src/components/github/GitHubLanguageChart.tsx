"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";

interface Props {
  repositories: any[];
}

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

function CustomTooltip({
  active,
  payload,
}: any) {
  if (!active || !payload?.length) return null;

  const data = payload[0];

  return (
    <div
      className="
        rounded-xl
        border border-cyan-500/20
        bg-[#08131d]
        px-4
        py-3
        shadow-xl
      "
    >
      <p className="font-semibold text-cyan-300">
        {data.name}
      </p>

      <p className="mt-1 text-sm text-gray-300">
        {data.value}{" "}
        {data.value === 1 ? "repository" : "repositories"}
      </p>
    </div>
  );
}

const renderActiveShape = (props: any) => (
  <Sector
    {...props}
    outerRadius={props.outerRadius + 8}
  />
);

export default function GitHubLanguageChart({
  repositories,
}: Props) {
  const languageData = useMemo(() => {
    const counts: Record<string, number> = {};

    repositories.forEach((repo) => {
      if (!repo.language) return;

      counts[repo.language] =
        (counts[repo.language] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [repositories]);

  const totalRepositories = languageData.reduce(
    (sum, language) => sum + language.value,
    0
  );

  const [activeIndex, setActiveIndex] =
    useState<number | undefined>(undefined);

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
        Language Distribution
      </h2>

      {languageData.length === 0 ? (
        <div className="mt-8 flex h-[320px] items-center justify-center text-gray-500">
          No language data available.
        </div>
      ) : (
        <div
          className="
            mt-8
            grid
            items-center
            gap-8
            lg:grid-cols-[1.2fr_1fr]
          "
        >
          {/* Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={languageData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={4}
                  animationDuration={800}
                  activeShape={renderActiveShape}
                  activeIndex={activeIndex}
                  onMouseEnter={(_, index) =>
                    setActiveIndex(index)
                  }
                  onMouseLeave={() =>
                    setActiveIndex(undefined)
                  }
                >
                  {languageData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={false}
                  wrapperStyle={{
                    outline: "none",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {languageData.map(
              (language, index) => {
                const percentage = Math.round(
                  (language.value /
                    totalRepositories) *
                    100
                );

                const isActive =
                  activeIndex === index;

                return (
                  <motion.div
                    key={language.name}
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    onMouseEnter={() =>
                      setActiveIndex(index)
                    }
                    onMouseLeave={() =>
                      setActiveIndex(undefined)
                    }
                    className={`
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      px-4
                      py-3
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                          : "border-cyan-500/15 bg-cyan-500/5"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[
                              index %
                                COLORS.length
                            ],
                        }}
                      />

                      <span className="text-gray-300">
                        {language.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-cyan-300">
                        {language.value}{" "}
                        {language.value === 1
                          ? "repo"
                          : "repos"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {percentage}%
                      </p>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}