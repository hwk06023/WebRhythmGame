import { Note } from "../types";
import { generateNote } from "./gameUtils";

export const generateBasicSong = (): Note[] => {
  const notes: Note[] = [];
  const songDuration = 30000; // 30 seconds
  const interval = 500; // 500ms between notes
  
  for (let time = 1000; time < songDuration; time += interval) {
    const lane = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3;
    notes.push(generateNote(lane, time));
  }
  
  return notes;
};

export const generatePatternSong = (): Note[] => {
  const notes: Note[] = [];
  const songDuration = 30000;
  let time = 1000;
  
  // Simple ascending pattern
  for (let i = 0; i < 5; i++) {
    notes.push(generateNote(0, time));
    time += 400;
    notes.push(generateNote(1, time));
    time += 400;
    notes.push(generateNote(2, time));
    time += 400;
    notes.push(generateNote(3, time));
    time += 600;
  }
  
  // Simple descending pattern
  for (let i = 0; i < 5; i++) {
    notes.push(generateNote(3, time));
    time += 400;
    notes.push(generateNote(2, time));
    time += 400;
    notes.push(generateNote(1, time));
    time += 400;
    notes.push(generateNote(0, time));
    time += 600;
  }
  
  // Alternating pattern
  for (let i = 0; i < 8; i++) {
    notes.push(generateNote(0, time));
    notes.push(generateNote(3, time));
    time += 500;
    notes.push(generateNote(1, time));
    notes.push(generateNote(2, time));
    time += 500;
  }
  
  // Fast sequence
  for (let i = 0; i < 16; i++) {
    const lane = i % 4 as 0 | 1 | 2 | 3;
    notes.push(generateNote(lane, time));
    time += 250;
  }
  
  // Chords (notes on multiple lanes at the same time)
  for (let i = 0; i < 4; i++) {
    notes.push(generateNote(0, time));
    notes.push(generateNote(3, time));
    time += 800;
    
    notes.push(generateNote(1, time));
    notes.push(generateNote(2, time));
    time += 800;
  }
  
  return notes;
};

export const sampleSongs = [
  {
    name: "Basic Random",
    description: "Random notes at regular intervals",
    generator: generateBasicSong
  },
  {
    name: "Pattern Practice",
    description: "Practice with common note patterns",
    generator: generatePatternSong
  }
]; 