import { useCallback, useEffect, useState } from 'react';
import { GameState, HitAccuracy, KeyBinding, Lane, Note } from '../types';
import { DEFAULT_KEY_BINDINGS, calculateHitAccuracy, calculateOverallAccuracy, getScoreForAccuracy } from '../utils/gameUtils';

const INITIAL_GAME_STATE: GameState = {
  score: 0,
  combo: 0,
  maxCombo: 0,
  accuracy: 100,
  notes: [],
  hitNotes: 0,
  missedNotes: 0,
  perfectHits: 0,
  greatHits: 0,
  goodHits: 0,
  badHits: 0,
  isPlaying: false,
  isPaused: false
};

export const useGameState = (songData?: Note[]) => {
  const [gameState, setGameState] = useState<GameState>({ ...INITIAL_GAME_STATE });
  const [keyBindings, setKeyBindings] = useState<KeyBinding>(DEFAULT_KEY_BINDINGS as KeyBinding);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [lastFrameTime, setLastFrameTime] = useState<number>(0);
  const [hitFeedback, setHitFeedback] = useState<{ lane: Lane, accuracy: HitAccuracy } | null>(null);

  const resetGame = useCallback(() => {
    setGameState({ ...INITIAL_GAME_STATE });
    setStartTime(null);
    setCurrentTime(0);
    setLastFrameTime(0);
    setHitFeedback(null);
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    if (songData) {
      setGameState(prev => ({
        ...prev,
        notes: [...songData],
        isPlaying: true
      }));
      setStartTime(performance.now());
      setLastFrameTime(performance.now());
    }
  }, [resetGame, songData]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameState.isPlaying || gameState.isPaused) return;
    
    const lane = keyBindings[event.key.toLowerCase()];
    if (lane === undefined) return;
    
    const currentTimeMs = currentTime;
    const activeNotes = gameState.notes.filter(
      note => !note.hit && !note.missed && 
      note.lane === lane && 
      Math.abs(note.time - currentTimeMs) <= 200
    );

    if (activeNotes.length === 0) return;
    
    const closestNote = activeNotes.reduce((prev, curr) => 
      Math.abs(curr.time - currentTimeMs) < Math.abs(prev.time - currentTimeMs) ? curr : prev
    );
    
    const timeDifference = currentTimeMs - closestNote.time;
    const accuracy = calculateHitAccuracy(timeDifference);
    const scoreToAdd = getScoreForAccuracy(accuracy);
    
    let hitNotes = gameState.hitNotes;
    let missedNotes = gameState.missedNotes;
    let perfectHits = gameState.perfectHits;
    let greatHits = gameState.greatHits;
    let goodHits = gameState.goodHits;
    let badHits = gameState.badHits;
    let combo = gameState.combo;
    
    if (accuracy !== HitAccuracy.MISS) {
      hitNotes += 1;
      combo += 1;
      switch (accuracy) {
        case HitAccuracy.PERFECT: perfectHits += 1; break;
        case HitAccuracy.GREAT: greatHits += 1; break;
        case HitAccuracy.GOOD: goodHits += 1; break;
        case HitAccuracy.BAD: badHits += 1; break;
      }
    } else {
      missedNotes += 1;
      combo = 0;
    }
    
    const maxCombo = Math.max(combo, gameState.maxCombo);
    const overallAccuracy = calculateOverallAccuracy(
      perfectHits, greatHits, goodHits, badHits, missedNotes
    );
    
    setHitFeedback({ lane, accuracy });
    setTimeout(() => setHitFeedback(null), 300);

    setGameState(prev => ({
      ...prev,
      score: prev.score + scoreToAdd,
      combo,
      maxCombo,
      accuracy: overallAccuracy,
      hitNotes,
      missedNotes,
      perfectHits,
      greatHits,
      goodHits,
      badHits,
      notes: prev.notes.map(note => 
        note.id === closestNote.id ? { ...note, hit: accuracy !== HitAccuracy.MISS } : note
      )
    }));
  }, [currentTime, gameState, keyBindings]);

  const updateMissedNotes = useCallback(() => {
    const missThreshold = 200;
    let missCount = 0;
    
    const updatedNotes = gameState.notes.map(note => {
      if (!note.hit && !note.missed && currentTime > note.time + missThreshold) {
        missCount++;
        return { ...note, missed: true };
      }
      return note;
    });
    
    if (missCount > 0) {
      const newMissedTotal = gameState.missedNotes + missCount;
      const overallAccuracy = calculateOverallAccuracy(
        gameState.perfectHits,
        gameState.greatHits,
        gameState.goodHits,
        gameState.badHits,
        newMissedTotal
      );
      
      setGameState(prev => ({
        ...prev,
        notes: updatedNotes,
        missedNotes: newMissedTotal,
        combo: 0,
        accuracy: overallAccuracy
      }));
    }
  }, [currentTime, gameState]);

  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused) return;
    
    const gameLoop = (timestamp: number) => {
      if (startTime === null) return;
      
      const deltaTime = timestamp - lastFrameTime;
      setLastFrameTime(timestamp);
      
      const newCurrentTime = timestamp - startTime;
      setCurrentTime(newCurrentTime);
      
      updateMissedNotes();
      
      const allNotesProcessed = gameState.notes.every(note => note.hit || note.missed);
      if (allNotesProcessed) {
        setGameState(prev => ({ ...prev, isPlaying: false }));
        return;
      }
      
      requestAnimationFrame(gameLoop);
    };
    
    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [gameState.isPlaying, gameState.isPaused, gameState.notes, lastFrameTime, startTime, updateMissedNotes]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    gameState,
    currentTime,
    hitFeedback,
    keyBindings,
    setKeyBindings,
    startGame,
    pauseGame,
    resetGame
  };
}; 