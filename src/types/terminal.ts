export interface TerminalEntry {
  id: number;
  type: "input" | "output" | "system";
  text: string;
}