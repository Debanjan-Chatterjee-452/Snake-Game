//Game Constants
let inputDirection = { x: 0, y: 0 };
const moveSound = new Audio('moveSound.mp3');
const foodSound = new Audio('food2.mp3');
const gameOverSound = new Audio('gameOver2.mp3');
const gameBackgroundSound = new Audio('BGmusic.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let board = document.getElementById('board'); // FIX: Added this line

let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };

//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

//Snake Collide
function isCollide(snakeArr) {
    //if Snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    //if Snake bumps into the wall
    if (
        snakeArr[0].x >= 18 || snakeArr[0].x <= 0 ||
        snakeArr[0].y >= 18 || snakeArr[0].y <= 0
    ) {
        return true;
    }
}

function gameEngine() {
    //Part 1: Updating the Snake array

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameBackgroundSound.pause(); // FIX: Corrected variable name
        inputDirection = { x: 0, y: 0 };
        alert("GAME OVER. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        moveSound.play();
        gameBackgroundSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score; // FIX: Reset score display
    }

    //If Snake have eaten the Food, score increment, food regenerate
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score: " + highscoreval; // FIX: Use highscoreval
        }
        scoreBox.innerHTML = "Score: " + score; // FIX: Consistent format
        snakeArr.unshift({
            x: snakeArr[0].x + inputDirection.x,
            y: snakeArr[0].y + inputDirection.y
        });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    //Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    //Part 2: Display the Snake & Food 

    //Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display Food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main Logic
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
} else {
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score: " + highscoreval; // FIX: Consistent format
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 } //Start Game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
});
