import React from 'react';

interface GameControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  selectedSong: string;
  onSongSelect: (song: string) => void;
  availableSongs: { name: string; description: string }[];
}

const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  isPaused,
  onStart,
  onPause,
  onReset,
  selectedSong,
  onSongSelect,
  availableSongs
}) => {
  return (
    <div
      className="game-controls"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        color: 'white'
      }}
    >
      <h2 style={{ margin: 0, color: '#ffcc00', textAlign: 'center' }}>Rhythm Game Controls</h2>
      
      <div>
        <h3 style={{ margin: '5px 0' }}>Select Song:</h3>
        <select
          value={selectedSong}
          onChange={(e) => onSongSelect(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #555',
            borderRadius: '5px',
            fontSize: '1rem'
          }}
          disabled={isPlaying && !isPaused}
        >
          {availableSongs.map((song) => (
            <option key={song.name} value={song.name}>
              {song.name}
            </option>
          ))}
        </select>
        <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#aaa' }}>
          {availableSongs.find(song => song.name === selectedSong)?.description || ''}
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {!isPlaying ? (
          <button
            onClick={onStart}
            style={{
              padding: '10px 20px',
              backgroundColor: '#00cc66',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Start Game
          </button>
        ) : (
          <>
            <button
              onClick={onPause}
              style={{
                padding: '10px 20px',
                backgroundColor: isPaused ? '#ffcc00' : '#ff9933',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={onReset}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff4d4d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </>
        )}
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <h3 style={{ margin: '5px 0' }}>Controls:</h3>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>D - Lane 1</li>
          <li>F - Lane 2</li>
          <li>J - Lane 3</li>
          <li>K - Lane 4</li>
        </ul>
        <p style={{ fontSize: '0.9rem', margin: '5px 0' }}>
          Hit the notes when they reach the bottom of the lane!
        </p>
      </div>
    </div>
  );
};

export default GameControls; 