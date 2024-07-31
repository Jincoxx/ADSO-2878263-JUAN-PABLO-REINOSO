// Selecciona los elementos del DOM que vamos a usar
const board = document.querySelectorAll(".cell");
const modal = document.getElementById("modal");
const optX = document.getElementById("btn-x");
const optO = document.getElementById("btn-o");
const resetButton = document.getElementById("reset-button");
const resultMessage = document.createElement("div"); // Crear un elemento para mostrar el resultado

document.body.appendChild(resultMessage); // Añadir el elemento al cuerpo del documento

let user = "";
let machine = "";
let boardGame = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

// Mostrar el modal al cargar la página
modal.style.display = "block";

// Función para manejar la elección del jugador
function choosePlayer(player) {
  user = player;
  machine = player === "X" ? "O" : "X";
  modal.style.display = "none";
}

// Asignar eventos a los botones de elección de jugador
optX.addEventListener("click", () => choosePlayer("X"));
optO.addEventListener("click", () => choosePlayer("O"));

// Función para manejar clics en las celdas
board.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "" && !isGameOver) {
      cell.textContent = user;
      boardGame[index] = user;
      if (checkWin(user)) {
        resultMessage.textContent = `¡${user} ha ganado!`;
        resultMessage.classList.add("show");
        isGameOver = true;
      } else if (boardGame.every((cell) => cell !== "")) {
        resultMessage.textContent = "¡Empate!";
        resultMessage.classList.add("show");
        isGameOver = true;
      } else {
        machineMove();
      }
    }
  });
});

// Función para que la máquina haga su movimiento
function machineMove() {
  let emptyCells = [];
  boardGame.forEach((cell, index) => {
    if (cell === "") {
      emptyCells.push(index);
    }
  });

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex].textContent = machine;
  boardGame[randomIndex] = machine;

  if (checkWin(machine)) {
    resultMessage.textContent = `¡${machine} ha ganado!`;
    resultMessage.classList.add("show");
    isGameOver = true;
  }
}

// Función para verificar si hay un ganador
function checkWin(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) => {
    return pattern.every((index) => {
      return boardGame[index] === player;
    });
  });
}

// Función para reiniciar el juego
function resetGame() {
  boardGame = ["", "", "", "", "", "", "", "", ""];
  board.forEach((cell) => (cell.textContent = ""));
  isGameOver = false;
  resultMessage.textContent = "";
  resultMessage.classList.remove("show");
  modal.style.display = "block";
}

// Asignar el evento para reiniciar el juego cuando se haga clic en el botón de reiniciar
resetButton.addEventListener("click", resetGame);
