import { useState } from "react";
import Board from "./components/Board";
import Checkbox from "./components/Checkbox";

export default function Game() {
  const [history, setHistory] = useState([Array(81).fill(null)]);
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
  history_plus.push(Array(81).fill(null));
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
      <div>
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
      </div>
      <div className="game-info">
        <Checkbox orderValue={order} setOrderFunction={handleToggle} />
        <ol reversed={order ? true : false}>{moves}</ol>
      </div>
    </div>
  );
}

function mapIndexToSquare(i) {
  const row = Math.floor(i / 9) + 1;
  const column = (i % 9) + 1;
  return `r${row}c${column}`;
}

function findDifferenceIndex(list1, list2) {
  // Important! This function assumes list2 is after list1 in play sequence
  for (let i = 0; i < list1.length; i++) {
    if (list1[i] !== list2[i]) {
      return list2[i] + " to " + mapIndexToSquare(i);
    }
  }
  // If no differences found, return -1
  return -1;
}

function subRegionMapping(i) {
  const gridList = [
    0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2,
    2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 3, 3, 3, 4, 4, 4, 5, 5, 5, 3, 3, 3, 4, 4,
    4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 6, 6, 6, 7, 7, 7, 8, 8, 8, 6, 6, 6,
    7, 7, 7, 8, 8, 8,
  ];
  return gridList[i];
}

function getSubGroup(squares, group) {
  const length = myArray.length;
  let output = Array(length / 9).fill(null);
  let counter = 0;
  for (let i = 0; i < length; i++) {
    if (subRegionMapping(i) == group) {
      output[counter] = squares[i];
      counter += 1;
    }
  }
  return output;
}

// Additional Exercises
// DONE For the current move only, show “You are at move #…” instead of a button.
// DONE Rewrite Board to use two loops to make the squares instead of hardcoding them.
// DONE Add a toggle button that lets you sort the moves in either ascending or descending order.
// DONE When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
// DONE Display the location for each move in the format (row, col) in the move history list.

// for super tic tac toe - valid move? (determine which next move is valid)
// minor win (whole board - already doing)
// major win (state)
