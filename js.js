window.addEventListener("DOMContentLoaded", (event) => {
  const cells = document.querySelectorAll(".cell");
  const board = document.querySelector(".board");
  const startBtn = document.getElementById("startBtn");
  const overley = document.querySelector(".overley");
  const message = document.querySelector(".message");

  let xscore = 0;
  let oscore = 0;
  const xbox = document.getElementById("x");
  const obox = document.getElementById("o");

  const cross = "x";
  const zero = "o";

  const ticSound = document.getElementById("tic");
  const tacSound = document.getElementById("tac");
  const drawSound = document.getElementById("draw");
  const winSound = document.getElementById("win");

  let turn = cross;
  const winCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  startBtn.addEventListener("click", () => {
    overley.classList.remove("show");
    reset();
  });
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.classList.contains(cross) || cell.classList.contains(zero)) {
        return;
      }
      cell.classList.add(turn);
      if (win(turn)) {
        player = turn.toUpperCase();
        message.textContent = `${player} wins`;
        startBtn.textContent = "Play again";
        overley.classList.add("show");
        addScore(turn);
        winSound.play();
      } else if (draw()) {
        message.textContent = "Draw";
        startBtn.textContent = "Play again";
        overley.classList.add("show");
        drawSound.play();
      }
      swapTurn();
    });
  });
  function addScore(turn) {
    if (turn == "x") {
      xscore++;
      xbox.textContent = xscore;
    } else {
      oscore++;
      obox.textContent = oscore;
    }
  }

  function reset() {
    cells.forEach((cell) => {
      cell.classList.remove("x");
      cell.classList.remove("o");
    });
  }

  function draw() {
    return [...cells].every((cell) => {
      return cell.classList.contains("x") || cell.classList.contains("o");
    });
  }

  function swapTurn() {
    if (turn == cross) {
      ticSound.play();
      board.classList.replace(cross, zero);
      turn = zero;
    } else {
      tacSound.play();
      board.classList.replace(zero, cross);
      turn = cross;
    }
  }

  function win(turn) {
    return winCombination.some((combination) => {
      return combination.every((index) => {
        return cells[index - 1].classList.contains(turn);
      });
    });
  }
});
