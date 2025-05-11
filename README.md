# WebRhythmGame

웹 기반 리듬 게임으로, Osu!와 유사한 4키 방식의 게임입니다. 내려오는 노트를 타이밍에 맞춰 키보드로 입력하는 방식입니다.

## 주요 기능

- 4개 레인의 리듬 게임
- 타이밍 기반 히트 판정 시스템
- 점수 및 콤보 기록
- 두 가지 난이도 패턴 (기본 패턴 및 복합 패턴)
- 정확도, 콤보, 히트 통계 등 성능 지표
- 반응형 디자인

## 조작 방법

- **D** - 레인 1 (왼쪽)
- **F** - 레인 2 (중앙 왼쪽)
- **J** - 레인 3 (중앙 오른쪽)
- **K** - 레인 4 (오른쪽)

노트가 각 레인 하단의 히트 존에 도달할 때 키를 누르세요.

## 점수 시스템

- **Perfect**: 100점 (±50ms 타이밍 창)
- **Great**: 75점 (±100ms 타이밍 창)
- **Good**: 50점 (±150ms 타이밍 창)
- **Bad**: 25점 (±200ms 타이밍 창)
- **Miss**: 0점 (정확한 타이밍에서 200ms 이상 벗어난 경우)

## 시작하기

### 필요 조건

- Node.js (v14.0.0 이상)
- npm 또는 yarn

### 설치

1. 저장소 복제
   ```bash
   git clone https://github.com/hwk06023/WebRhythmGame.git
   cd WebRhythmGame/web-rhythm-game
   ```

2. 의존성 설치
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. 개발 서버 시작
   ```bash
   npm start
   # 또는
   yarn start
   ```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 게임을 시작합니다.

## 프로젝트 구조

```
web-rhythm-game/
├── src/
│   ├── components/
│   │   └── game/
│   │       ├── Game.tsx - 메인 게임 컴포넌트
│   │       ├── GameBoard.tsx - 게임 보드와 레인
│   │       ├── Lane.tsx - 개별 레인 컴포넌트
│   │       ├── Scoreboard.tsx - 점수 표시
│   │       └── GameControls.tsx - 게임 컨트롤
│   ├── hooks/
│   │   └── useGameState.ts - 게임 상태 관리
│   ├── types/
│   │   └── index.ts - TypeScript 타입 정의
│   ├── utils/
│   │   ├── gameUtils.ts - 유틸리티 함수
│   │   └── sampleSong.ts - 샘플 노트 데이터
│   ├── assets/
│   │   └── sounds/ - 게임 효과음
│   ├── App.tsx - 루트 컴포넌트
│   └── index.tsx - 진입점
└── public/
    └── index.html - HTML 템플릿
```

## 향후 개선 계획

- 사용자 정의 곡 업로드
- 다양한 노트 패턴 (홀드 노트, 슬라이드)
- 멀티플레이어 모드
- 리더보드
- 효과음 및 시각적 피드백 개선
- 사용자 정의 키 바인딩

## 기술 스택

- [React](https://reactjs.org/) - 프론트엔드 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 타입 안전성

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

## 참고

- Osu!, Beatmania, Guitar Hero와 같은 리듬 게임에서 영감을 받았습니다.
