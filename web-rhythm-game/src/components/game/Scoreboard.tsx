import React from 'react';
import { GameState } from '../../types';

interface ScoreboardProps {
  gameState: GameState;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ gameState }) => {
  const { 
    score, 
    combo, 
    maxCombo, 
    accuracy, 
    hitNotes, 
    missedNotes, 
    perfectHits, 
    greatHits, 
    goodHits, 
    badHits 
  } = gameState;

  const totalNotes = hitNotes + missedNotes;
  const progressPercentage = totalNotes > 0 
    ? ((hitNotes + missedNotes) / gameState.notes.length) * 100 
    : 0;

  return (
    <div 
      className="scoreboard"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        color: 'white',
        width: '300px'
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #444',
          paddingBottom: '10px'
        }}
      >
        <h2 style={{ margin: 0, color: '#ffcc00' }}>Score</h2>
        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{score}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: '5px 0', color: '#4d94ff' }}>Combo</h3>
          <span style={{ fontSize: '1.5rem' }}>{combo}x</span>
        </div>
        <div>
          <h3 style={{ margin: '5px 0', color: '#4d94ff' }}>Max Combo</h3>
          <span style={{ fontSize: '1.5rem' }}>{maxCombo}x</span>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '5px 0', color: '#00cc66' }}>Accuracy</h3>
        <div style={{ position: 'relative', height: '20px', backgroundColor: '#333', borderRadius: '10px' }}>
          <div 
            style={{
              position: 'absolute',
              height: '100%',
              width: `${accuracy}%`,
              backgroundColor: accuracy > 90 ? '#00cc66' : accuracy > 75 ? '#ffcc00' : '#ff4d4d',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }}
          />
          <span 
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              lineHeight: '20px',
              fontWeight: 'bold',
              textShadow: '0 0 3px rgba(0, 0, 0, 0.8)'
            }}
          >
            {accuracy.toFixed(2)}%
          </span>
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <h3 style={{ margin: '5px 0', color: '#f8f8f8' }}>Hit Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
          <div style={{ color: '#ffcc00' }}>Perfect:</div>
          <div>{perfectHits}</div>
          <div style={{ color: '#00cc66' }}>Great:</div>
          <div>{greatHits}</div>
          <div style={{ color: '#4d94ff' }}>Good:</div>
          <div>{goodHits}</div>
          <div style={{ color: '#ff99cc' }}>Bad:</div>
          <div>{badHits}</div>
          <div style={{ color: '#ff4d4d' }}>Miss:</div>
          <div>{missedNotes}</div>
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <h3 style={{ margin: '5px 0', color: '#f8f8f8' }}>Progress</h3>
        <div style={{ position: 'relative', height: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
          <div 
            style={{
              position: 'absolute',
              height: '100%',
              width: `${progressPercentage}%`,
              backgroundColor: '#ffcc00',
              borderRadius: '5px',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '5px' }}>
          {hitNotes + missedNotes} / {gameState.notes.length} notes
        </div>
      </div>
    </div>
  );
};

export default Scoreboard; 