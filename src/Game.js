const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

class Game {
  constructor({ trackWidth, trackHeight }) {
    this.trackWidth = trackWidth;
    this.trackHeight = trackHeight;
    this.hero = new Hero({ position: 0, trackHeight });
    this.enemies = [];
    this.view = new View(this);
    this.track = [];
    this.regenerateTrack();
    this.spawnInterval = null;
  }

  regenerateTrack() {
    this.track = [];
    for (let i = 0; i < this.trackHeight; i++) {
      const row = new Array(this.trackWidth).fill(' ');
      this.track.push(row);
    }
    // Обновляем положение героя на треке
    this.track[this.hero.position.y][this.hero.position.x] = this.hero.skin;
  }

  spawnEnemy() {
    const enemy = new Enemy();
    const posY = Math.floor(Math.random() * this.trackHeight);
    enemy.position = { x: this.trackWidth - 1, y: posY };
    this.enemies.push(enemy);
    this.track[posY][this.trackWidth - 1] = enemy.skin;
    this.regenerateTrack(); // Обновляем трек после появления нового врага
  }

  moveEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      this.track[enemy.position.y][enemy.position.x] = ' ';
      enemy.position.x--;
      if (enemy.position.x < 0) {
        this.endGame();
        return;
      }
      this.track[enemy.position.y][enemy.position.x] = enemy.skin;
    }
  }

  check() {
    // Проверка на столкновение героя с врагами
    for (const enemy of this.enemies) {
      if (
        enemy.position.x === this.hero.position.x &&
        enemy.position.y === this.hero.position.y
      ) {
        this.hero.die();
      }
    }
  }

  endGame() {
    clearInterval(this.spawnInterval);
    console.log('Game Over! You were caught by a monster!');
    process.exit();
  }

  play() {
    this.spawnInterval = setInterval(() => {
      this.spawnEnemy();
    }, Math.floor(Math.random() * 2000) + 1000); // рандомный интервал от 1 до 3 секунд

    setInterval(() => {
      this.check(); // Проверяем столкновение
      this.moveEnemies();
      this.view.render(this.track);
    }, 500); // каждые 200 миллисекунд
  }
}

module.exports = Game;
