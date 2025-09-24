// Variáveis do jogo
const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const platforms = document.querySelectorAll('.platform');
const coins = document.querySelectorAll('.coin');
const enemies = document.querySelectorAll('.enemy');
const scoreElement = document.getElementById('score');

let playerPosX = 100;
let playerPosY = 550;
let playerVelocityX = 0;
let playerVelocityY = 0;
let gravity = 0.5;
let jumpStrength = -10;
let moveSpeed = 5;
let onGround = false;
let score = 0;

let keys = {
  left: false,
  right: false,
  up: false
};

// Função para verificar colisões com plataformas
function checkCollisions() {
  onGround = false;
  platforms.forEach(platform => {
    let platformRect = platform.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();

    if (
      playerRect.bottom <= platformRect.top + 5 &&
      playerRect.bottom + playerVelocityY >= platformRect.top &&
      playerRect.right > platformRect.left &&
      playerRect.left < platformRect.right
    ) {
      onGround = true;
      playerVelocityY = 0;
      playerPosY = platformRect.top - playerRect.height;
    }
  });

  // Colisão com moedas
  coins.forEach(coin => {
    let coinRect = coin.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < coinRect.right &&
      playerRect.right > coinRect.left &&
      playerRect.top < coinRect.bottom &&
      playerRect.bottom > coinRect.top
    ) {
      coin.style.display = 'none'; // Desaparecer moeda
      score += 10; // Aumenta a pontuação
      scoreElement.textContent = `Pontos: ${score}`;
    }
  });

  // Colisão com inimigos
  enemies.forEach(enemy => {
    let enemyRect = enemy.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {
      alert('Game Over! Você colidiu com um inimigo!');
      resetGame(); // Reseta o jogo
    }
  });
}

// Função para resetar o jogo
function resetGame() {
  playerPosX = 100;
  playerPosY = 550;
  playerVelocityX = 0;
  playerVelocityY = 0;
  score = 0;
  scoreElement.textContent = `Pontos: ${score}`;
  coins.forEach(coin => coin.style.display = 'block');
}

// Movimentação do jogador
function movePlayer() {
  if (keys.left) {
    playerVelocityX = -moveSpeed;
  } else if (keys.right) {
    playerVelocityX = moveSpeed;
  } else {
    playerVelocityX = 0;
  }

  if (keys.up && onGround) {
    playerVelocityY = jumpStrength;
  }

  playerPosX += playerVelocityX;
  playerPosY += playerVelocityY;

  if (!onGround) {
    playerVelocityY += gravity;
  }

  // Atualizando a posição do jogador
  player.style.left = `${playerPosX}px`;
  player.style.bottom = `${playerPosY}px`;
}

// Movimentação dos inimigos (simples)
function moveEnemies() {
  enemies.forEach(enemy => {
    let enemyPosX = parseInt(enemy.style.left);
    let enemyVelocityX = Math.sin(enemyPosX / 100) * 2; // Movimento simples para os inimigos
    enemy.style.left = `${enemyPosX + enemyVelocityX}px`;
  });
}

// Função de animação do jogo
function gameLoop() {
  checkCollisions();
  movePlayer();
  moveEnemies();
  requestAnimationFrame(gameLoop);
}

// Adicionando eventos de teclado
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === 'ArrowUp') keys.up = true;
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === 'ArrowUp') keys.up = false;
});

// Iniciando o loop do jogo
gameLoop();
