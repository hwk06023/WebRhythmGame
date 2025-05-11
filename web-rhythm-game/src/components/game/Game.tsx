import React, { useCallback, useMemo, useState } from 'react';
import GameBoard from './GameBoard';
import Scoreboard from './Scoreboard';
import GameControls from './GameControls';
import { Lane, Note } from '../../types';
import { useGameState } from '../../hooks/useGameState';
import { sampleSongs } from '../../utils/sampleSong';

const Game: React.FC = () => {
  const [selectedSongName, setSelectedSongName] = useState(sampleSongs[0].name);
  const [songData, setSongData] = useState<Note[]>([]);
  
  const selectedSong = useMemo(() => {
    return sampleSongs.find(song => song.name === selectedSongName) || sampleSongs[0];
  }, [selectedSongName]);
  
  const { 
    gameState, 
    currentTime, 
    hitFeedback, 
    startGame: startGameHook, 
    pauseGame, 
    resetGame 
  } = useGameState(songData);
  
  const startGame = useCallback(() => {
    const notes = selectedSong.generator();
    setSongData(notes);
    startGameHook();
  }, [selectedSong, startGameHook]);
  
  const lanes: Lane[] = [0, 1, 2, 3];
  
  const notesByLane = useMemo(() => {
    const result: Record<Lane, Note[]> = { 0: [], 1: [], 2: [], 3: [] };
    gameState.notes.forEach(note => {
      result[note.lane].push(note);
    });
    return result;
  }, [gameState.notes]);
  
  return (
    <div 
      className="game-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#222'
      }}
    >
      <h1 style={{ color: '#ffcc00', textAlign: 'center', margin: '0 0 20px 0' }}>
        Web Rhythm Game
      </h1>

      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
          <GameControls 
            isPlaying={gameState.isPlaying}
            isPaused={gameState.isPaused}
            onStart={startGame}
            onPause={pauseGame}
            onReset={resetGame}
            selectedSong={selectedSongName}
            onSongSelect={setSelectedSongName}
            availableSongs={sampleSongs}
          />
          <div style={{ height: '20px' }}></div>
          <Scoreboard gameState={gameState} />
        </div>
        
        <div style={{ flex: '2', minWidth: '500px' }}>
          <GameBoard 
            lanes={lanes}
            notes={notesByLane}
            currentTime={currentTime}
            hitFeedback={hitFeedback}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '20px', color: '#aaa', textAlign: 'center' }}>
        <p>Press the keys when the notes reach the hit zone at the bottom of each lane.</p>
        <p>Keyboard: D, F, J, K</p>
      </div>
    </div>
  );
};

export default Game; 