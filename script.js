const playboard = document.querySelector(".play-board");
const scoreelement = document.querySelector(".score");
const highscoreelement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i")






let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0
let snakeBody = [];
let setIntervalId;
let score = 0;
//getting high score from local storage
let highscore = localStorage.getItem("high-score") || 0;
highscoreelement.innerText = `High Score: ${highscore}`;

const changeFoodPosition = () => {
    // Passing Random 1-30 value as Food Positionws
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    //clearing the timer and restarting the game over.
    clearInterval(setIntervalId);
    alert("Game Over");
    location.reload();
}

const changeDirection = (e) => {
    // changing position acc to key!!
    if (e.key === "w" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;

    }
    else if (e.key === "s" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;

    }
    else if (e.key === "a" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;

    }
    else if (e.key === "d" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;

    }

}
controls.forEach(key => {
    // Calling changeDirection on each key click and passing key dataset value as an object
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));

});

const initgame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class = food style="grid-area:${foodY} / ${foodX} "></div>`;


    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); // pushing the food position  to snakes body array
        score++;
        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("high-score", highscore);
        scoreelement.innerText = `Score: ${score}`;
        highscoreelement.innerText = `High Score: ${highscore}`;

    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]; // shifting forward values of the elements in the snakes body one by one 

    }

    snakeBody[0] = [snakeX, snakeY]; // setting first element  of snake body  to current position 

    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    // checking if the snake's head is out of the wall , if so setting  gameover true
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }


    for (let i = 0; i < snakeBody.length; i++) {
        // adding snakes div  for each part of the snakes body
        htmlMarkup += `<div class = head style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
        // checking if snake hits its own body, if so  then gameover
        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playboard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initgame, 125);


document.addEventListener("keydown", changeDirection);