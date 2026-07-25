import {
  User,
  Database,
  FolderGit2,
  Terminal,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    id: "commander",
    title: "Commander",
    icon: User,
  },
  {
    id: "missions",
    title: "Mission Database",
    icon: Database,
    children: [
      {
        id: "active-missions",
        title: "Active Missions",
      },
      {
        id: "archived-missions",
        title: "Archived Missions",
      },
    ],
  },
  {
    id: "github",
    title: "Repository Explorer",
    icon: FolderGit2,
    children: [
      {
        id: "projects",
        title: "Projects",
      },
      {
        id: "opensource",
        title: "Open Source",
      },
    ],
  },
  {
    id: "terminal",
    title: "T.A.R.S. Terminal",
    icon: Terminal,
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
  },
] as const;