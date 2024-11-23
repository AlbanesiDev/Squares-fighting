import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import GameArena from "./components/GameArena";
import sound from "./assets/in-the-end.mp3";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerAColor, setPlayerAColor] = useState("#ff0000");
  const [playerBColor, setPlayerBColor] = useState("#0000ff");
  const audio = new Audio(sound);

  const handleStartGame = () => {
    setGameStarted(true);
    audio.volume = 0.5;
    audio.play();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!gameStarted ? (
        <div className="bg-blue-950 text-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Battle of Squares
          </h1>
          <div className="flex justify-between gap-8 mb-6">
            <ColorPicker
              label="Player A Color"
              color={playerAColor}
              onChange={setPlayerAColor}
            />
            <ColorPicker
              label="Player B Color"
              color={playerBColor}
              onChange={setPlayerBColor}
            />
          </div>
          <button
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            onClick={handleStartGame}
          >
            Play
          </button>
        </div>
      ) : (
        <GameArena playerAColor={playerAColor} playerBColor={playerBColor} />
      )}
    </div>
  );
}

export default App;
