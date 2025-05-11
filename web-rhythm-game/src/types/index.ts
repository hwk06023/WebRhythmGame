export type Lane = 0 | 1 | 2 | 3;

export interface Note {
  id: string;
  lane: Lane;
  time: number;
  duration?: number;
  speed: number;
  hit: boolean;
  missed: boolean;
}

export type KeyBinding = {
  [key: string]: Lane;
};

export enum HitAccuracy {
  PERFECT = "PERFECT",
  GREAT = "GREAT",
  GOOD = "GOOD",
  BAD = "BAD",
  MISS = "MISS"
}

export interface GameState {
  score: number;
  combo: number;
  maxCombo: number;
  accuracy: number;
  notes: Note[];
  hitNotes: number;
  missedNotes: number;
  perfectHits: number;
  greatHits: number;
  goodHits: number;
  badHits: number;
  isPlaying: boolean;
  isPaused: boolean;
} 