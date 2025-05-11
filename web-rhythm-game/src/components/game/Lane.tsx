import React, { useRef, useEffect } from 'react';
import { HitAccuracy, Lane as LaneType, Note } from '../../types';
import { LANE_COLORS } from '../../utils/gameUtils';

interface LaneProps {
  lane: LaneType;
  notes: Note[];
  currentTime: number;
  isActive: boolean;
  hitFeedback: HitAccuracy | null;
}

const Lane: React.FC<LaneProps> = ({ lane, notes, currentTime, isActive, hitFeedback }) => {
  const laneRef = useRef<HTMLDivElement>(null);

  const laneHeight = 600;
  const noteWidth = 80;
  const noteHeight = 30;
  const hitPosition = laneHeight - noteHeight;
  const hitZoneSize = noteHeight;
  
  const visibleNotes = notes.filter(note => {
    const timeUntilHit = note.time - currentTime;
    return !note.hit && !note.missed && timeUntilHit > -500 && timeUntilHit < 3000;
  });

  return (
    <div 
      ref={laneRef}
      className="game-lane"
      style={{
        position: 'relative',
        width: '100px',
        height: `${laneHeight}px`,
        backgroundColor: isActive ? `${LANE_COLORS[lane]}80` : '#222',
        border: `2px solid ${LANE_COLORS[lane]}`,
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'background-color 0.1s ease'
      }}
    >
      {visibleNotes.map((note) => {
        const timeUntilHit = note.time - currentTime;
        const notePosition = hitPosition - ((3000 - timeUntilHit) / 3000) * (laneHeight - noteHeight);
        
        return (
          <div
            key={note.id}
            className="game-note"
            style={{
              position: 'absolute',
              width: `${noteWidth}px`,
              height: `${noteHeight}px`,
              borderRadius: '5px',
              backgroundColor: LANE_COLORS[lane],
              bottom: `${notePosition}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: note.hit || note.missed ? 0 : 1,
              transition: 'opacity 0.2s ease',
              boxShadow: `0 0 10px ${LANE_COLORS[lane]}80`
            }}
          />
        );
      })}
      
      <div 
        className="hit-zone"
        style={{
          position: 'absolute',
          width: `${noteWidth}px`,
          height: `${hitZoneSize}px`,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: isActive ? `${LANE_COLORS[lane]}40` : 'rgba(255, 255, 255, 0.1)',
          borderRadius: '5px',
          border: `2px solid ${LANE_COLORS[lane]}`,
          boxShadow: `0 0 10px ${LANE_COLORS[lane]}80`,
          transition: 'background-color 0.1s ease'
        }}
      />
      
      {hitFeedback && (
        <div 
          className="hit-feedback"
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            bottom: `${hitZoneSize + 10}px`,
            color: hitFeedback === HitAccuracy.MISS ? '#ff3333' : 
                  hitFeedback === HitAccuracy.PERFECT ? '#ffcc00' : 
                  hitFeedback === HitAccuracy.GREAT ? '#00cc66' : 
                  hitFeedback === HitAccuracy.GOOD ? '#4d94ff' : '#ffffff',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          {hitFeedback}
        </div>
      )}
    </div>
  );
};

export default Lane; 