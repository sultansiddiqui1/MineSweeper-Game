// making sure that all our html is loaded before reading this javascript code. We can aalso do this by adding the script tag at the bottom of the body tag but well  this is another way of doing it lets just say.
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let width = 10;
  let bombAmount = 20;
  let squares = [];
  let isGameOver = false;

  // creating the board:
  function createBoard() {
    // get  shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("Valid");

    const gamesArray = emptyArray.concat(bombsArray);

    // randomize the array:
    const shuffledArray = gamesArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      //normalclick:
      square.addEventListener("click", function (e) {
        click(square);
      });
    }

    // add numbers:
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      // corner case: handling the border elements diffrently:
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (squares[i].classList.contains("valid")) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) {
          total = total + 1;
        }
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        ) {
          total = total + 1;
        }
        if (i > 10 && squares[i - width].classList.contains("bomb")) {
          total = total + 1;
        }
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        ) {
          total = total + 1;
        }
        if (
          i < 98 &&
          !isRightEdge &&
          squares[i + 1].classList.contains("bomb")
        ) {
          total = total + 1;
        }
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        ) {
          total = total + 1;
        }
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        ) {
          total = total + 1;
        }
        if (i < 89 && squares[i + width].classList.contains("bomb")) {
          total = total + 1;
        }

        squares[i].setAttribute("data", 9);
        console.log("hello world");
      }
    }
  }

  createBoard();

  function click(square) {
    let currentId = square.id;
    if (isGameOver) return;
    if (square.classList.contains("bomb") || square.classList.contains("flag"))
      return;
    if (square.classList.contains("bomb")) {
      console.log("Game Over");
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }
      checkSquare(square, currentId);
    }
    square.classList.add("checked");
  }

  // checking the neighbouring square is clicked:
  function checkSquare(square, currentId) {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;
    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId - width)].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;

        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;

        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;

        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id;

        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }
});
