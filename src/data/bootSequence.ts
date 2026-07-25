export interface BootStep {
  id: number;
  message: string;
  progress: number;
  delay: number;
}

export const bootSequence: BootStep[] = [
  {
    id: 1,
    message: "Initializing Neural Core...",
    progress: 10,
    delay: 800,
  },
  {
    id: 2,
    message: "Loading Memory Banks...",
    progress: 25,
    delay: 700,
  },
  {
    id: 3,
    message: "Scanning Repository Database...",
    progress: 45,
    delay: 900,
  },
  {
    id: 4,
    message: "Connecting GitHub Systems...",
    progress: 65,
    delay: 1000,
  },
  {
    id: 5,
    message: "Verifying Security Protocols...",
    progress: 82,
    delay: 800,
  },
  {
    id: 6,
    message: "Synchronizing Mission Control...",
    progress: 95,
    delay: 900,
  },
  {
    id: 7,
    message: "AI Core Online",
    progress: 100,
    delay: 1200,
  },
];