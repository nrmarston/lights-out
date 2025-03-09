import React, { useState, useEffect } from "react";

const Board = () => {
  // Helper function to safely interact with localStorage
  const storage = {
    get: () => {
      if (typeof window === "undefined") return null;
      try {
        const item = window.localStorage.getItem("lightsOutBoard");
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    },
    set: (value: boolean[]) => {
      if (typeof window === "undefined") return;
      try {
        window.localStorage.setItem("lightsOutBoard", JSON.stringify(value));
      } catch {
        // Fail silently
      }
    },
  };

  // Get initial state
  const [board, setBoard] = useState<boolean[]>(() => {
    const saved = storage.get();
    return saved || Array(25).fill(false);
  });
  const gridSize = 5;

  // Save board changes
  useEffect(() => {
    storage.set(board);
  }, [board]);

  // Handle tile clicks
  const handleTileClick = (index: number) => {
    const newBoard = [...board];
    newBoard[index] = !newBoard[index];
    setBoard(newBoard);
  };

  // Reset function
  const handleReset = () => {
    const newBoard = Array(25).fill(false);
    setBoard(newBoard);
    storage.set(newBoard);
  };

  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-1">
        {/* Array of grid items */}
        {Array.from({ length: gridSize * gridSize }).map((_, index) => (
          <div
            key={index}
            // Apply different styles depending on tile state
            className={`flex h-12 w-12 items-center justify-center rounded select-none ${
              board[index]
                ? "bg-red-500 text-white transition-colors duration-200"
                : "bg-purple-200 text-black transition-colors duration-200"
            } `}
            onClick={() => handleTileClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <button
        onClick={handleReset}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Reset Game
      </button>
    </div>
  );
};

export default Board;
