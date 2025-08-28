// Função do loop do jogo (para movimentação e colisões)
function gameLoop() {
    if (!gameRunning) return;
    
    // Atualizando a posição do personagem (gravity)
    kittyVelocityY += gravity;
    let kittyTop = parseInt(helloKitty.style.top.replace('px', '')) + kittyVelocityY;
    let kittyLeft = parseInt(helloKitty.style.left.replace('px', ''));

    // Limitar a Hello Kitty para não ultrapassar a parte inferior da tela
    if (kittyTop + helloKitty.offsetHeight > gameContainer.offsetHeight) {
        kittyTop = gameContainer.offsetHeight - helloKitty.offsetHeight;
        kittyVelocityY = 0;
    }

    helloKitty.style.top = kittyTop + 'px';

    // Verificar colisões com as plataformas
    platforms.forEach(platform => {
        let platTop = parseInt(platform.style.top.replace('px', ''));
        let platLeft = parseInt(platform.style.left.replace('px', ''));
        let platWidth = platform.offsetWidth;
        let platHeight = platform.offsetHeight;

        // Verificando se Hello Kitty toca na plataforma
        if (kittyTop + helloKitty.offsetHeight <= platTop && kittyTop + helloKitty.offsetHeight + kittyVelocityY >= platTop && kittyLeft + helloKitty.offsetWidth > platLeft && kittyLeft < platLeft + platWidth) {
            kittyVelocityY = 0;
            helloKitty.style.top = platTop - helloKitty.offsetHeight + 'px';
            isJumping = false;
        }
    });

    // Verificar colisão com moedas
    coins.forEach((coin, index) => {
        let coinLeft = parseInt(coin.style.left.replace('px', ''));
        let coinTop = parseInt(coin.style.top.replace('px', ''));
        
        if (kittyLeft + helloKitty.offsetWidth > coinLeft && kittyLeft < coinLeft + coin.offsetWidth && kittyTop + helloKitty.offsetHeight > coinTop && kittyTop < coinTop + coin.offsetHeight) {
            coin.remove();
            coins.splice(index, 1);
            score += 10;
            scoreDisplay.textContent = score;
        }
    });

    // Loop do jogo
    requestAnimationFrame(gameLoop);
}

