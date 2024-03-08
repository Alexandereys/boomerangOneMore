const keypress = require('keypress');

function runInteractiveConsole(game) {
  const keyboard = {
    // Добавляем управление для движения героя и атаки
    a: () => game.hero.moveLeft(),
    d: () => game.hero.moveRight(),
    w: () => game.hero.moveUp(),
    s: () => game.hero.moveDown(),
    space: () => game.hero.attack(),
  };

  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

module.exports = runInteractiveConsole;
