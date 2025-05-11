import { HitAccuracy, Lane, Note } from '../types';

export const DEFAULT_KEY_BINDINGS = {
  'd': 0 as Lane,
  'f': 1 as Lane,
  'j': 2 as Lane,
  'k': 3 as Lane
};

export const LANE_COLORS = ['#ff4d4d', '#ffcc00', '#00cc66', '#4d94ff'];

export const PERFECT_TIMING_MS = 50;
export const GREAT_TIMING_MS = 100;
export const GOOD_TIMING_MS = 150;
export const BAD_TIMING_MS = 200;

export const PERFECT_SCORE = 100;
export const GREAT_SCORE = 75;
export const GOOD_SCORE = 50;
export const BAD_SCORE = 25;

export const generateNote = (lane: Lane, time: number, speed: number = 1): Note => ({
  id: `note-${lane}-${time}-${Math.random().toString(36).substring(2, 9)}`,
  lane,
  time,
  speed,
  hit: false,
  missed: false
});

export const calculateHitAccuracy = (timeDifference: number): HitAccuracy => {
  const absDifference = Math.abs(timeDifference);
  
  if (absDifference <= PERFECT_TIMING_MS) return HitAccuracy.PERFECT;
  if (absDifference <= GREAT_TIMING_MS) return HitAccuracy.GREAT;
  if (absDifference <= GOOD_TIMING_MS) return HitAccuracy.GOOD;
  if (absDifference <= BAD_TIMING_MS) return HitAccuracy.BAD;
  return HitAccuracy.MISS;
};

export const getScoreForAccuracy = (accuracy: HitAccuracy): number => {
  switch (accuracy) {
    case HitAccuracy.PERFECT: return PERFECT_SCORE;
    case HitAccuracy.GREAT: return GREAT_SCORE;
    case HitAccuracy.GOOD: return GOOD_SCORE;
    case HitAccuracy.BAD: return BAD_SCORE;
    default: return 0;
  }
};

export const calculateOverallAccuracy = (
  perfectHits: number, 
  greatHits: number, 
  goodHits: number, 
  badHits: number, 
  missedNotes: number
): number => {
  const totalNotes = perfectHits + greatHits + goodHits + badHits + missedNotes;
  if (totalNotes === 0) return 100;
  
  const totalScore = 
    perfectHits * PERFECT_SCORE + 
    greatHits * GREAT_SCORE + 
    goodHits * GOOD_SCORE + 
    badHits * BAD_SCORE;
  
  const maxPossibleScore = totalNotes * PERFECT_SCORE;
  return (totalScore / maxPossibleScore) * 100;
}; 