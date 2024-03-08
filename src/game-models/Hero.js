class Hero {
  constructor({ position, trackHeight, game }) {
    this.skin = '💃'; // Смайлик девушки
    this.position = { x: position, y: Math.floor(trackHeight / 2) };
    this.game = game;
  }

  moveLeft() {
    this.position.x -= 1;
  }

  moveRight() {
    this.position.x += 1;
  }

  moveUp() {
    this.position.y -= 1;
  }

  moveDown() {
    this.position.y += 1;
  }

  die() {
    this.skin = '👨‍👩‍👧';
    console.log('ТЫ ПОПАЛА В СЕТИ!👨‍👩‍👧');
    console.log('С ПРАЗДНИКОМ!');
    this.game.endGame();
    process.exit();
  }
}

module.exports = Hero;
