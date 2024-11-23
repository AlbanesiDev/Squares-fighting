import React from "react";

interface WinnerModalProps {
  winner: "A" | "B" | null;
  onRestart: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onRestart }) => {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl mb-6">Player {winner} wins!</p>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
