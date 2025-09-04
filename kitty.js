function updateKittyPosition() {
  kitty.velocityY += kitty.gravity;
  kitty.y += kitty.velocityY;

  // Movimento horizontal suave
  if (keys.left) kitty.x -= 5;
  if (keys.right) kitty.x += 5;

  // Limites horizontais
  if (kitty.x < 0) kitty.x = 0;
  if (kitty.x > containerWidth - kitty.width) kitty.x = containerWidth - kitty.width;

  // Atualiza plataformas (movimento horizontal)
  kitty.onPlatform = false;
  platforms.forEach(p => {
    if(p.movingRight){
      p.x += p.speed;
      if(p.x + p.width > containerWidth) p.movingRight = false;
    } else {
      p.x -= p.speed;
      if(p.x < 0) p.movingRight = true;
    }
    p.element.style.left = p.x + 'px';

    // Colisão plataforma Kitty (ajustada)
    // Condição:
    // - Kitty está descendo (velocityY >= 0)
    // - Kitty está dentro do eixo X da plataforma
    // - Kitty está tocando a plataforma pelo topo (com margem pequena)
    if(
      kitty.velocityY >= 0 &&
      kitty.x + kitty.width > p.x + 10 &&    // +10 pra dar uma margem interna e evitar bordas
      kitty.x < p.x + p.width - 10 &&
      kitty.y + kitty.height >= p.y &&
      kitty.y + kitty.height <= p.y + p.height + 10
    ){
      kitty.y = p.y - kitty.height;
      kitty.velocityY = 0;
      kitty.onPlatform = true;
    }
  });

  // Limita Kitty no topo
  if(kitty.y < 0){
    kitty.y = 0;
    kitty.velocityY = 0;
  }

  // Atualiza posição no DOM
  helloKitty.style.left = kitty.x + 'px';
  helloKitty.style.top = kitty.y + 'px';

  // Verifica game over
  if(kitty.y > containerHeight){
    endGame();
  }
}
