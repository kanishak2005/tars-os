"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface NavigationItemProps {
  icon: ReactNode;
  title: string;
  active?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onClick: () => void;
  children?: ReactNode;
}

export default function NavigationItem({
  icon,
  title,
  active,
  expandable,
  expanded,
  onClick,
  children,
}: NavigationItemProps) {
  return (
    <div>
      <motion.button
        whileHover={{ x: 6 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`w-full rounded-xl border px-5 py-4 transition-all duration-300
        ${
          active
            ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-300"
            : "border-transparent text-gray-400 hover:border-cyan-400/20 hover:bg-cyan-500/5"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {icon}
            <span>{title}</span>
          </div>

          {expandable && (
            <motion.div
              animate={{
                rotate: expanded ? 180 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-12 mt-2 space-y-2 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}