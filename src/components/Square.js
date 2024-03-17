import React from "react";

function Square({ value, colour, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ backgroundColor: colour }}
    >
      {value}
    </button>
  );
}

export default Square;
