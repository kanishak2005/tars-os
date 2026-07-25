"use client";

import { ReactNode } from "react";
import { NavigationProvider } from "@/context/NavigationContext";

interface Props {
  children: ReactNode;
}

export default function AppProvider({ children }: Props) {
  return (
    <NavigationProvider>
      {children}
    </NavigationProvider>
  );
}