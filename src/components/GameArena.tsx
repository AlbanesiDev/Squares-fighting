import React, { useRef, useEffect, useState, useCallback } from "react";
import WinnerModal from "./WinnerModal";
import {
  ARENA_SIZE,
  Square,
  initializeSquares,
  updateSquares,
} from "../utils/gameLogic";

interface GameArenaProps {
  playerAColor: string;
  playerBColor: string;
}

const GameArena: React.FC<GameArenaProps> = ({
  playerAColor,
  playerBColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [squares, setSquares] = useState<Square[]>([]);
  const [winner, setWinner] = useState<"A" | "B" | null>(null);

  const startGame = useCallback(() => {
    setSquares(initializeSquares(playerAColor, playerBColor));
    setWinner(null);
  }, [playerAColor, playerBColor]);

  useEffect(() => {
    startGame();
  }, [playerAColor, playerBColor, startGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const gameLoop = setInterval(() => {
      ctx.clearRect(0, 0, ARENA_SIZE, ARENA_SIZE);

      const [updatedSquares, gameWinner] = updateSquares(squares);

      if (gameWinner) {
        setWinner(gameWinner);
        clearInterval(gameLoop);
      } else {
        setSquares(updatedSquares);

        updatedSquares.forEach((square) => {
          ctx.fillStyle = square.color;
          ctx.fillRect(square.x, square.y, square.size, square.size);
        });
      }
    }, 1000 / 144);

    return () => clearInterval(gameLoop);
  }, [squares]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex flex-col gap-1 bg-white/50 p-2 rounded-md">
          <span className="text-xl font-medium" style={{ color: playerAColor }}>
            Player A
          </span>
          <div className="w-32 bg-gray-300 h-3 relative border overflow-hidden border-black">
            <div
              className="bg-green-400 h-3"
              style={{ width: `${squares[0]?.hp || 0}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 bg-white/50 p-2 rounded-md">
          <span className="text-xl font-medium" style={{ color: playerBColor }}>
            Player B
          </span>
          <div className="w-32 bg-gray-300 h-3 relative border overflow-hidden border-black">
            <div
              className="bg-green-400  h-3"
              style={{ width: `${squares[1]?.hp || 0}%` }}
            />
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={ARENA_SIZE}
        height={ARENA_SIZE}
        className="border-2 border-gray-300"
      />
      <WinnerModal winner={winner} onRestart={startGame} />
      <button
        onClick={startGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Restart Game
      </button>
    </div>
  );
};

export default GameArena;
