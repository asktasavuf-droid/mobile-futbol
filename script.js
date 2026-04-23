const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player = { x: 50, y: canvas.height / 2, width: 10, height: 50, speed: 5 };
let ai = { x: canvas.width - 60, y: canvas.height / 2, width: 10, height: 50, speed: 4 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 5, speedX: 4, speedY: 4 };
let score = { player: 0, ai: 0 };

// Setup canvas dimensions
canvas.width = 800;
canvas.height = 400;

// Function to draw the field
function drawField() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}

// Function to draw the player, AI and ball
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(ai.x, ai.y, ai.width, ai.height);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

// Function to update game logic
function update() {
    // Ball movement
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY = -ball.speedY;
    }

    // Ball collision with players
    if (ball.x - ball.radius < player.x + player.width && 
        ball.y > player.y && 
        ball.y < player.y + player.height) {
        ball.speedX = -ball.speedX;
    }
    if (ball.x + ball.radius > ai.x && 
        ball.y > ai.y && 
        ball.y < ai.y + ai.height) {
        ball.speedX = -ball.speedX;
    }

    // Scoring
    if (ball.x < 0) {
        score.ai++;
        resetBall();
    } else if (ball.x > canvas.width) {
        score.player++;
        resetBall();
    }

    // AI movement
    ai.y += (ball.y - (ai.y + ai.height / 2)) * 0.1;
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

// Event listeners for player movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && player.y > 0) {
        player.y -= player.speed;
    } else if (event.key === 'ArrowDown' && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
});

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();