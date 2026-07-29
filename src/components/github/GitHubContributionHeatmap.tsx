"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  repositories: any[];
}

interface HeatmapDay {
  date: string;
  level: number;
}

const LEVEL_COLORS = [
  "bg-[#0d1117]",
  "bg-cyan-900/40",
  "bg-cyan-700/60",
  "bg-cyan-500/80",
  "bg-cyan-400",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.002,
    },
  },
};

const squareVariants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.18,
    },
  },
};

export default function GitHubContributionHeatmap({
  repositories,
}: Props) {
  const [hoveredDay, setHoveredDay] =
    useState<HeatmapDay | null>(null);

  const heatmapData = useMemo(() => {
    const today = new Date();

    const days: HeatmapDay[] = [];

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      days.push({
        date: date.toISOString().split("T")[0],
        level: 0,
      });
    }

    repositories.forEach((repo) => {
      const updated = new Date(repo.updated_at)
        .toISOString()
        .split("T")[0];

      const day = days.find(
        (d) => d.date === updated
      );

      if (!day) return;

      day.level = Math.min(day.level + 1, 4);
    });

    return days;
  }, [repositories]);

  const weeks = useMemo(() => {
    const result: HeatmapDay[][] = [];

    for (let i = 0; i < heatmapData.length; i += 7) {
      const week = heatmapData.slice(i, i + 7);

      while (week.length < 7) {
        week.push({
          date: "",
          level: 0,
        });
      }

      result.push(week);
    }

    return result;
  }, [heatmapData]);

  const monthLabels = useMemo(() => {
    let previous = "";

    return weeks.map((week) => {
      if (!week[0]?.date) return "";

      const month = new Date(
        week[0].date
      ).toLocaleString("default", {
        month: "short",
      });

      if (month === previous) return "";

      previous = month;

      return month;
    });
  }, [weeks]);

  const WEEKDAY_LABELS = [
    "",
    "Mon",
    "",
    "Wed",
    "",
    "Fri",
    "",
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -2,
        boxShadow:
          "0 0 35px rgba(6,182,212,0.12)",
      }}
      className="
        rounded-2xl
        border
        border-cyan-500/20
        bg-black/40
        backdrop-blur-xl
        p-6
      "
    >
      <h2 className="text-xl font-semibold text-cyan-300">
        Contribution Activity
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Repository updates during the last
        365 days
      </p>

      <div className="mt-8 overflow-x-auto">
        <div className="min-w-max">

          {/* Month Labels */}
          <div className="mb-3 flex pl-8">
            {monthLabels.map((month, index) => (
              <div
                key={index}
                className="
                  w-[18px]
                  text-[10px]
                  text-gray-500
                "
              >
                {month}
              </div>
            ))}
          </div>

          <div className="flex">

            {/* Weekday Labels */}
            <div className="mr-2 flex flex-col gap-[3px]">
              {WEEKDAY_LABELS.map(
                (day, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      h-3
                      items-center
                      text-[10px]
                      text-gray-500
                    "
                  >
                    {day}
                  </div>
                )
              )}
            </div>

            {/* Heatmap */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-[3px]"
            >
              {weeks.map(
                (week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="flex flex-col gap-[3px]"
                  >
                    {week.map((day) => (
                      <motion.div
                        key={
                          day.date ||
                          `${weekIndex}-${Math.random()}`
                        }
                        variants={squareVariants}
                        onMouseEnter={() =>
                          day.date &&
                          setHoveredDay(day)
                        }
                        onMouseLeave={() =>
                          setHoveredDay(null)
                        }
                        className={`
                          h-3
                          w-3
                          rounded-[3px]
                          transition-all
                          duration-200
                          hover:scale-125
                          hover:ring-2
                          hover:ring-cyan-400/70
                          ${
                            LEVEL_COLORS[
                              day.level
                            ]
                          }
                          ${
                            !day.date
                              ? "opacity-0 pointer-events-none"
                              : "cursor-pointer"
                          }
                        `}
                      />
                    ))}
                  </div>
                )
              )}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Hover Information */}
      <div className="mt-6 h-6 text-sm text-gray-400">
        {hoveredDay ? (
          <>
            <span className="text-cyan-300">
              {hoveredDay.date}
            </span>{" "}
            • Activity Level{" "}
            <span className="font-semibold">
              {hoveredDay.level}
            </span>
          </>
        ) : (
          "Learn how we count contributions"
        )}
      </div>

      {/* Legend */}
      <div
        className="
          mt-6
          flex
          items-center
          justify-end
          gap-3
          text-xs
          text-gray-500
        "
      >
        <span>Less</span>

        <div className="flex gap-1">
          {LEVEL_COLORS.map((color) => (
            <div
              key={color}
              className={`h-3 w-3 rounded-[3px] ${color}`}
            />
          ))}
        </div>

        <span>More</span>
      </div>
    </motion.section>
  );
}