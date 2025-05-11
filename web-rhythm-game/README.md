# Web Rhythm Game

A web-based rhythm game similar to Osu! with 4 keys where notes slide down and players need to press keyboard keys with the right timing.

![Rhythm Game Preview](https://via.placeholder.com/800x400?text=Web+Rhythm+Game)

## Features

- 4-lane rhythm game
- Timing-based hit detection
- Score tracking and combo system
- Multiple difficulty levels
- Performance metrics (accuracy, combo, hit stats)
- Sample songs with different patterns
- Responsive design

## Controls

- **D** - Lane 1 (left)
- **F** - Lane 2 (middle-left)
- **J** - Lane 3 (middle-right)
- **K** - Lane 4 (right)

Press the keys when the notes reach the hit zone at the bottom of each lane.

## Scoring System

- **Perfect**: 100 points (±50ms timing window)
- **Great**: 75 points (±100ms timing window)
- **Good**: 50 points (±150ms timing window)
- **Bad**: 25 points (±200ms timing window)
- **Miss**: 0 points (>200ms away from perfect timing)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/web-rhythm-game.git
   cd web-rhythm-game
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the game in your browser

## Project Structure

```
web-rhythm-game/
├── src/
│   ├── components/
│   │   └── game/
│   │       ├── Game.tsx - Main game component
│   │       ├── GameBoard.tsx - Game board with lanes
│   │       ├── Lane.tsx - Individual lane component
│   │       ├── Scoreboard.tsx - Score display
│   │       └── GameControls.tsx - Game controls
│   ├── hooks/
│   │   └── useGameState.ts - Game state management
│   ├── types/
│   │   └── index.ts - TypeScript type definitions
│   ├── utils/
│   │   ├── gameUtils.ts - Utility functions
│   │   └── sampleSong.ts - Sample song data
│   ├── assets/
│   │   └── sounds/ - Game sound effects
│   ├── App.tsx - Root component
│   └── index.tsx - Entry point
└── public/
    └── index.html - HTML template
```

## Future Enhancements

- Custom song uploads
- More complex note patterns (hold notes, slides)
- Multiplayer mode
- Leaderboards
- Sound effects and better visual feedback
- Custom key bindings

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by rhythm games like Osu!, Beatmania, and Guitar Hero
