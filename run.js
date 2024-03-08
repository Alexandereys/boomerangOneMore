const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');

// Инициализация игры с настройками.
const game = new Game({
  trackWidth: 50,
  trackHeight: 5, // Добавляем высоту трека
});

// Запуск игры.
game.play();

// Запуск интерактивной консоли
runInteractiveConsole(game);
