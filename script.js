let highScore = 0,
  currscore = 0;
let snake = [{ x: 10, y: 10 }];
let dir = "right";
let hasGameStarted = false;
let gridsize = 20;
let gameInteral;
let gameSpeedDelay = 250;


const logoel = document.getElementById("logo");
const instrutionel = document.getElementById("instruction-text");
const boardEle = document.getElementById("box");
const currscoreEl = document.getElementById("currscore");
const highScoreEL = document.getElementById("highScore");

currscoreEl.innerHTML = currscore.toString().padStart(3,"0");
highScoreEL.innerHTML =highScore.toString().padStart(3,"0");

//methods           
const setPosition = (pixel, el) => {
  el.style.gridRow = pixel.x;
  el.style.gridColumn = pixel.y;
};
const createGameElement = (tag, className) => {
  let el = document.createElement(tag);
  el.className = className;
  return el;
};
const generateFood = () => {
  x = Math.floor(Math.random() * gridsize + 1); // 0,1
  y = Math.floor(Math.random() * gridsize + 1);

  return { x, y };
};
let food = generateFood();
const drawfood = () => {
  let foodSquare = createGameElement("div", "food");
  setPosition(food, foodSquare);
  boardEle.appendChild(foodSquare);
};
const drawSnake = () => {
  snake.map((pixel, index) => {
    
    let snakeSquare = createGameElement("div", "snake");
   
    setPosition(pixel, snakeSquare);
    boardEle.appendChild(snakeSquare);
  });
};
const move = () => {
  let snakeHead = { x: snake[0].x, y: snake[0].y };

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
    food = generateFood();
    currscore = snake.length - 1; // Update score based on snake length
    currscoreEl.innerHTML = currscore.toString().padStart(3,"0");

  } else {
    snake.pop();
  }
};
const resetGame = () => {
  clearInterval(gameInteral);
  hasGameStarted = false;
  currscore =0;
  currscoreEl.innerHTML = currscore.toString().padStart(3,"0");
  logoel.style.display = "block"; 
  instrutionel.style.display = "block";
  dir = "right";
  snake = [{ x: 10, y: 10 }];


  
  
};
const updateScore = () => {

    highScore = Math.max(highScore,currscore);
    highScoreEL.innerHTML = highScore.toString().padStart(3,"0");
    

    
   
};
const checkCollision = () => {
  if (
    snake[0].x === 0 ||
    snake[0].x === gridsize + 1 ||
    snake[0].y === 0 ||
    snake[0].y === gridsize + 1
  ) {
    updateScore();  
    resetGame();
    }

    for(let i = 1; i < snake.length ; i++){
        let head = snake[0];
        if(head.x ==snake[i].x && head.y == snake[i].y){
            updateScore();
            resetGame();
        }
    }
};
const draw = () => {
  drawSnake();
  drawfood();
};
const startGame = () => {
  logoel.style.display = "none";
  instrutionel.style.display = "none";
  snake = [{ x: 10, y: 10 }];
  gameInteral = setInterval(() => {
    move();
    boardEle.innerHTML = "";
    checkCollision();
    draw();
  }, gameSpeedDelay);
};

//events
const handleKeyPress = (e) => {
  // e.preventDefault();
  if (e.key === " " || e.key === "Space") {
    hasGameStarted = true;
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

document.addEventListener("keyup", handleKeyPress);
