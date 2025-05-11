import React, { useEffect, useState } from 'react';
import Lane from './Lane';
import { HitAccuracy, Lane as LaneType } from '../../types';
import { DEFAULT_KEY_BINDINGS } from '../../utils/gameUtils';

interface GameBoardProps {
  lanes: LaneType[];
  notes: Record<LaneType, any[]>;
  currentTime: number;
  hitFeedback: { lane: LaneType, accuracy: HitAccuracy } | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ lanes, notes, currentTime, hitFeedback }) => {
  const [activeKeys, setActiveKeys] = useState<Record<LaneType, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false
  });

  const keyToLane: Record<string, LaneType> = {};
  Object.entries(DEFAULT_KEY_BINDINGS).forEach(([key, lane]) => {
    keyToLane[key] = lane as LaneType;
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    const lane = keyToLane[event.key.toLowerCase()];
    if (lane !== undefined) {
      setActiveKeys(prev => ({ ...prev, [lane]: true }));
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const lane = keyToLane[event.key.toLowerCase()];
    if (lane !== undefined) {
      setActiveKeys(prev => ({ ...prev, [lane]: false }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div 
      className="game-board"
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
      }}
    >
      {lanes.map((lane) => (
        <Lane 
          key={lane}
          lane={lane}
          notes={notes[lane] || []}
          currentTime={currentTime}
          isActive={activeKeys[lane]}
          hitFeedback={hitFeedback && hitFeedback.lane === lane ? hitFeedback.accuracy : null}
        />
      ))}
    </div>
  );
};

export default GameBoard; 