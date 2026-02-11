export type LocationId = "origins" | "projects" | "leadership" | "philosophy" | "hobbies";

export interface MapLocation {
  id: LocationId;
  label: string;
  position: [number, number, number];
  content: React.ReactNode;
}
