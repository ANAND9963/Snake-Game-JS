let highscore = 0;
let currscore = 0;
let snake = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  
];

let dir = "right";
let hasGAmeStarted = false;
let gridsize = 20;
let gameInterval;
let gameSpeedDelay = 250;

const logoel = document.getElementById("logo");
const instructel = document.getElementById("instruction-text");
const boardEl = document.getElementById("box");

//methods
const setPosition = (pixel, el) => {
  el.style.gridRow = pixel.x;
  el.style.gridColumn = pixel.y;
};

const createGameEl = (tag, className) => {
  let el = document.createElement(tag);
  el.className = className;

  return el;
};

const generateFood = () => {
  x = Math.floor(Math.random() * gridsize + 1);
  y = Math.floor(Math.random() * gridsize + 1);
  return { x, y };
};

let food = generateFood();

const drawfood = () => {
//   boardEl.innerHTML = "";
  let foodSquare = createGameEl("div", "food");
  setPosition(food, foodSquare);
  boardEl.appendChild(foodSquare);
};

const drawSnake = () => {
  snake.map((pixel, idx) => {
    let snakeSquare = createGameEl("div", "snake");
    setPosition(pixel, snakeSquare);
    boardEl.appendChild(snakeSquare);
  });
};

const draw = () => {
  drawSnake();
  drawfood();
};

const move = () => {
  let snakeHead = { x: snake[0].x, y: snake[0].y };
  //eatfood
  //onestep move
  //dir where to go snake
  switch (dir) {
    case "up":
      snakeHead.x--;

      break;
    case "down":
      snakeHead.x++;

      break;
    case "left":
      snakeHead.y--;

      break;
    case "right":
      snakeHead.y++;

      break;

    default:
      break;
  }
  snake.unshift(snakeHead);

  if (food.x === snakeHead.x && food.y === snakeHead.y) {
    //add head to the snake
    food = generateFood();
  } else {
    //sdd the snakehead

    //remove tail
    snake.pop();
  }
};
const resetGame = () => {
  hasGAmeStarted = false;
  logoel.style.display = "block";
  instructel.style.display = "block";
  snake = [{ x: 10, y: 10 }];
   
  highscore = Math.max(highscore, currscore);
  currscore = 0;
  dir = "right";
  clearInterval(gameInterval);
};

const checkCollision = () => {
  if (
    snake[0].x == gridsize + 1 ||
    snake[0].y == gridsize + 1 ||
    snake[0].x == 0 ||
    snake[0].y == 0
  ) {
    //reset the ganme
    resetGame();
  }
};

const startGame = () => {
  logoel.style.display = "none";
  instructel.style.display = "none";
  gameInterval = setInterval(() => {
    boardEl.innerHTML = "";
    move();

    checkCollision();
    draw();

    //score
    //check collision
  }, gameSpeedDelay);
};

const handleKeyPres = (e) => {
  if (e.key === " " || e.key === "Space") {
    hasGAmeStarted = true;
    startGame();
  } else {
    switch (e.key) {
      case "ArrowUp":
        dir = "up";
        break;
      case "ArrowDown":
        dir = "down";
        break;
      case "ArrowLeft":
        dir = "left";
        break;
      case "ArrowRight":
        dir = "right";
        break;
      default:
        break;
    }
  }
};

document.addEventListener("keyup", handleKeyPres);
