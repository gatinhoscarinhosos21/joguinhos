function startGame() {
    score = 0;
    gameRunning = true;
    scoreDisplay.textContent = score;
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';

    // Remover efeito de queda se houver
    helloKitty.classList.remove('falling');
    helloKitty.style.transform = 'rotate(0deg)';
    helloKitty.style.opacity = 1; // ADICIONADO: garantir que a Hello Kitty reapareça

    // Reposicionar Hello Kitty
    helloKitty.style.top = '300px';
    helloKitty.style.left = '100px';
    
    ...
