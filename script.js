let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Player (Pushpa-style hero box with headband)
let player = { x: 80, y: 220, width: 40, height: 60, dy: 0, jump: false };

// Obstacle (log)
let obstacle = { x: 800, y: 240, width: 40, height: 40 };

// Physics
let gravity = 1;
let score = 0;
let gameOver = false;

// Controls
document.addEventListener("keydown", function(e) {
  if (e.code === "Space" && !player.jump && !gameOver) {
    player.dy = -15;
    player.jump = true;
  }
  if (e.code === "Enter" && gameOver) {
    restartGame();
  }
});

function drawGround() {
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0, 280, canvas.width, 20);
}

function drawPlayer() {
  // Body
  ctx.fillStyle = "#ff4500"; // Pushpa-style orange
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Head
  ctx.fillStyle = "#ffe0bd"; // skin color
  ctx.fillRect(player.x, player.y - 20, player.width, 20);

  // Headband
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y - 25, player.width, 5);
}

function drawObstacle() {
  ctx.fillStyle = "#8b4513"; // brown log
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function update() {
  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial Black";
    ctx.fillText("🔥 GAME OVER 🔥", 280, 150);
    ctx.font = "18px Arial";
    ctx.fillText("Press ENTER to Restart", 300, 180);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ground
  drawGround();

  // Player physics
  player.y += player.dy;
  player.dy += gravity;
  if (player.y >= 220) {
    player.y = 220;
    player.dy = 0;
    player.jump = false;
  }
  drawPlayer();

  // Obstacle
  obstacle.x -= 6;
  if (obstacle.x < -40) {
    obstacle.x = canvas.width;
    score++;
  }
  drawObstacle();

  // Collision
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y + player.height > obstacle.y
  ) {
    gameOver = true;
  }

  // Score
  ctx.fillStyle = "#ffcc00";
  ctx.font = "20px Arial Black";
  ctx.fillText("Score: " + score, 20, 30);

  requestAnimationFrame(update);
}

function restartGame() {
  score = 0;
  obstacle.x = 800;
  player.y = 220;
  player.dy = 0;
  gameOver = false;
  update();
}

update();
