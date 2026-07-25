"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import StatusBar from "./StatusBar";
import Background from "../background/Background";
import useKeyboardNavigation from "@/hooks/useKeyboardNavigation";
import CommandPalette from "./CommandPalette";
import useCommandPaletteNavigation from "@/hooks/useCommandPaletteNavigation";

export default function CommandCenter() {
  useKeyboardNavigation();
  useCommandPaletteNavigation();

  return (
    <>
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Workspace />
        </div>

        <StatusBar />
      </div>
    </main>
    <CommandPalette />
</>
  );
}