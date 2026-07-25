"use client";

import { ReactNode } from "react";

interface Props {
  active: boolean;
  children: ReactNode;
}

export default function WorkspaceCache({
  active,
  children,
}: Props) {
  return (
    <div
      className={active ? "block h-full" : "hidden h-full"}
    >
      {children}
    </div>
  );
}