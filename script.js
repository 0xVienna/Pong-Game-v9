const ball = document.querySelector(".ball");
const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const gameContainer = document.querySelector(".game-container");

const ballSpeedX = 3;
const ballSpeedY = 3;
const paddleSpeed = 5;
let ballDirectionX = 1;
let ballDirectionY = 1;
let ballPosX = 50;
let ballPosY = 50;

let leftPaddlePosY = 50;
let rightPaddlePosY = 50;

document.addEventListener("keydown", (event) => {
    if (event.key === "w") {
        leftPaddlePosY -= paddleSpeed;
    } else if (event.key === "s") {
        leftPaddlePosY += paddleSpeed;
    }
});

function updateGame() {
    // Move the ball
    ballPosX += ballSpeedX * ballDirectionX;
    ballPosY += ballSpeedY * ballDirectionY;

    // Check for collisions with the top and bottom walls
    if (ballPosY <= 0 || ballPosY >= gameContainer.clientHeight - ball.clientHeight) {
        ballDirectionY *= -1;
    }

    // Check for collisions with the paddles
    if (ballPosX <= leftPaddle.clientWidth && ballPosY + ball.clientHeight >= leftPaddlePosY && ballPosY <= leftPaddlePosY + leftPaddle.clientHeight) {
        ballDirectionX = 1;
    } else if (ballPosX >= gameContainer.clientWidth - ball.clientWidth - rightPaddle.clientWidth && ballPosY + ball.clientHeight >= rightPaddlePosY && ballPosY <= rightPaddlePosY + rightPaddle.clientHeight) {
        ballDirectionX = -1;
    }

    // Check for scoring
    if (ballPosX <= 0 || ballPosX >= gameContainer.clientWidth - ball.clientWidth) {
        ballPosX = 50;
        ballPosY = 50;
    }

    // Update the positions of the elements
    ball.style.left = ballPosX + "px";
    ball.style.top = ballPosY + "px";
    leftPaddle.style.top = leftPaddlePosY + "px";
    rightPaddle.style.top = rightPaddlePosY + "px";

    requestAnimationFrame(updateGame);
}

updateGame();
