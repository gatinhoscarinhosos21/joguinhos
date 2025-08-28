// Inicializar o jogo
function startGame() {
    score = 0;
    gameRunning = true;
    scoreDisplay.textContent = score;
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    // Reposicionar Hello Kitty
    helloKitty.style.top = '300px';
    helloKitty.style.left = '100px';
    
    // Limpar plataformas e moedas existentes
    document.querySelectorAll('.platform, .coin, .cloud').forEach(el => el.remove());
    platforms = [];
    coins = [];
    
    // Criar plataformas
    createPlatform(0, 450, 800, 50); // Chão
    createPlatform(100, 350, 200, 20);
    createPlatform(400, 250, 200, 20);
    createPlatform(200, 150, 150, 20);
    createPlatform(600, 350, 150, 20);
    
    // Adicionando novas plataformas
    createPlatform(100, 100, 150, 20);  // Nova plataforma acima da primeira
    createPlatform(500, 450, 150, 20);  // Plataforma na parte de baixo
    createPlatform(700, 300, 100, 20);  // Plataforma no alto, perto da borda
    
    // Criar moedas
    createCoin(150, 310);
    createCoin(450, 210);
    createCoin(250, 110);
    createCoin(650, 310);
    createCoin(300, 310);
    createCoin(120, 90); // Moeda na nova plataforma
    createCoin(570, 440); // Moeda na plataforma inferior
    
    // Criar nuvens
    createCloud(100, 50, 60);
    createCloud(300, 80, 40);
    createCloud(600, 60, 70);
    
    // Iniciar o loop do jogo
    gameLoop();
}
