import { useState } from "react";

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
  let squaresColours = [Array(9).fill(null)];
  let status;
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
      {[0, 1, 2].map((x) => (
        <div className="board-row">
          {[0, 1, 2].map((y) => (
            <Square
              value={squares[3 * x + y]}
              colour={squaresColours[3 * x + y]}
              onSquareClick={() => handleClick(3 * x + y)}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function Checkbox({ orderValue, setOrderFunction }) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onClick={setOrderFunction}
      />
      <label
        className="form-check-label"
        htmlFor="flexSwitchCheckDefault"
        checked={orderValue ? true : false}
      >
        Reverse list order
      </label>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [order, setOrder] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleToggle() {
    setOrder(!order);
  }

  let history_plus = history.slice();
  history_plus.push(Array(9).fill(null));
  const moves = history_plus.map((squares, move) => {
    let description;
    let length = history.length;
    if (move > 0 && move < length) {
      let index_change = findDifferenceIndex(
        history_plus[move - 1],
        history_plus[move]
      );
      description = "Go to move #" + move + " " + index_change;
    } else if (move < length) {
      description = "Go to game start";
    } else {
      description = "You are at move #" + move;
    }
    return (
      <>
        <li key={move}>
          {move === length ? (
            description
          ) : (
            <button onClick={() => jumpTo(move)}>{description}</button>
          )}
        </li>
      </>
    );
  });

  if (order == true) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <Checkbox orderValue={order} setOrderFunction={handleToggle} />
        <ol reversed={order ? true : false}>{moves}</ol>
      </div>
    </div>
  );
}

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

function findDifferenceIndex(list1, list2) {
  // Important! This function assumes list2 is after list1 in play sequence
  const outcomes = [
    "r1c1",
    "r1c2",
    "r1c3",
    "r2c1",
    "r2c2",
    "r2c3",
    "r3c1",
    "r3c2",
    "r3c3",
  ];
  for (let i = 0; i < list1.length; i++) {
    if (list1[i] !== list2[i]) {
      return list2[i] + " to " + outcomes[i];
    }
  }
  // If no differences found, return -1
  return -1;
}

// Additional Exercises
// DONE For the current move only, show “You are at move #…” instead of a button.
// DONE Rewrite Board to use two loops to make the squares instead of hardcoding them.
// DONE Add a toggle button that lets you sort the moves in either ascending or descending order.
// DONE When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
// DONE Display the location for each move in the format (row, col) in the move history list.
