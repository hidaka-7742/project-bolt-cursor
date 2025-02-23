export interface Location {
  column: string;
  position: string;
  level: string;
  cases: number;
}

export interface DisplayLocation extends Location {
  id: string;
  name: string;
} 