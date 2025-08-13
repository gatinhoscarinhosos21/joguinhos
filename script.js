// Pegando os elementos do jogo
const player = document.getElementById("player");
const ground = document.getElementById("ground");

// Variáveis de controle do personagem
let playerX = 50;
let playerY = 550;
let velocityY = 0;
let isJumping = false;
const gravity = 0.5;
const jumpHeight = -12;
const moveSpeed = 5;
const groundHeight = 50;

// Função para atualizar a posição do personagem
function updatePlayerPosition() {
    player.style.left = `${playerX}px`;
    player.style.bottom = `${playerY}px`;
}

// Função para mover o personagem
function movePlayer() {
    if (isJumping) {
        velocityY += gravity; // Simula a gravidade
        playerY += velocityY;
        if (playerY <= 50) {
            playerY = 50;
            isJumping = false;
        }
    }
    updatePlayerPosition();
}

// Função para controlar o movimento do jogador
function controlMovement(event) {
    if (event.key === "ArrowLeft") {
        playerX -= moveSpeed;
        if (playerX < 0) playerX = 0; // Evitar que o personagem saia da tela
    } else if (event.key === "ArrowRight") {
        playerX += moveSpeed;
        if (playerX > 750) playerX = 750; // Limitar à largura da tela
    } else if (event.key === " " && !isJumping) {
        // Pular
        isJumping = true;
        velocityY = jumpHeight;
    }
}

// Adicionando o listener para o teclado
window.addEventListener("keydown", controlMovement);

// Função para o loop do jogo
function gameLoop() {
    movePlayer();
    requestAnimationFrame(gameLoop); // Continuar o loop do jogo
}

// Iniciar o jogo
gameLoop();
