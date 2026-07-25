"use client";

import SystemMonitor from "./SystemMonitor";
import NavigationItem from "./NavigationItem";
import { useNavigation } from "@/context/NavigationContext";
import { navigation } from "@/data/navigation";

export default function Sidebar() {
  const {
    activePage,
    setActivePage,
    expandedSections,
    toggleSection,
  } = useNavigation();

  return (
    <aside
      className="
      flex h-full w-80 flex-col
      border-r border-cyan-500/20
      bg-gradient-to-b
      from-black/70
      via-slate-950/60
      to-black/80
      backdrop-blur-xl
      shadow-[20px_0_60px_rgba(0,0,0,0.35)]
    "
    >
      {/* Accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Header */}
      <div className="border-b border-cyan-500/20 p-7">
        <h2 className="text-sm uppercase tracking-[0.45em] text-cyan-400">
          Mission Control
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-5 space-y-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isExpandable = !!item.children;

          const isExpanded = expandedSections.includes(item.id);

          return (
            <NavigationItem
              key={item.id}
              icon={<Icon size={20} />}
              title={item.title}
              active={activePage === item.id}
              expandable={isExpandable}
              expanded={isExpanded}
              onClick={() => {
                if (isExpandable) {
                  toggleSection(item.id);
                } else {
                  setActivePage(item.id as any);
                }
              }}
            >
              {item.children?.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setActivePage(child.id as any)}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition
                    ${
                      activePage === child.id
                        ? "bg-cyan-500/10 text-cyan-300"
                        : "text-gray-400 hover:bg-cyan-500/5 hover:text-cyan-300"
                    }`}
                >
                  {child.title}
                </button>
              ))}
            </NavigationItem>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-cyan-500/20 p-5">
        <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-400">
          System Status
        </div>

        <SystemMonitor />
      </div>
    </aside>
  );
}