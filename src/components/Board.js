import React from "react";
import Square from "./Square";

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const winningLine = calculateWinningLine(squares);
  const draw = calculateOccupied(squares);
  let squaresColours = [Array(81).fill(null)];
  let status;

  for (let i = 0; i < 81; i++) {
    let j = i;
    if (j > 53) {
      j = j - 9 * Math.floor(j / 9);
    } else if (j > 26) {
      j = j - 9 * Math.floor(j / 9) + 9;
    } else {
      j = j - 9 * Math.floor(j / 9);
    }

    if (Math.floor(j / 3) % 2 == 0) {
      squaresColours[i] = "#FFFFFF";
    } else {
      squaresColours[i] = "#E6E6E6";
    }
  }

  if (winner) {
    status = "Winner: " + winner;
    squaresColours[winningLine[0]] = "red";
    squaresColours[winningLine[1]] = "red";
    squaresColours[winningLine[2]] = "red";
  } else if (draw) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-container">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <div className="board-row">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((y) => (
              <Square
                value={squares[9 * x + y]}
                colour={squaresColours[9 * x + y]}
                onSquareClick={() => handleClick(9 * x + y)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateWinningLine(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

function calculateOccupied(squares) {
  const hasNoNull = squares.every((element) => element !== null);
  if (hasNoNull) {
    return true;
  } else {
    return false;
  }
}
