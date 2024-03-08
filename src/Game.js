const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Coin = require('./Coin');

class Game {
  constructor({ trackWidth, trackHeight }) {
    this.trackWidth = trackWidth;
    this.trackHeight = trackHeight;
    this.hero = new Hero({ position: 0, trackHeight, game: this }); // Передаем экземпляр игры
    this.enemies = [];
    this.coins = []; // Добавляем массив для монеток
    this.view = new View(this);
    this.track = [];
    this.regenerateTrack();
    this.spawnInterval = null;
    this.score = 0;
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

  spawnCoin() {
    const coin = new Coin();
    const posY = Math.floor(Math.random() * this.trackHeight);
    coin.position = { x: this.trackWidth - 1, y: posY };
    this.coins.push(coin);
    this.track[posY][this.trackWidth - 1] = coin.skin;
    // Удаляем вызов regenerateTrack() здесь
  }

  moveCoins() {
    // for (const coin of this.coins) {
    //   if (this.track[coin.position.y]) {
    //     this.track[coin.position.y][coin.position.x] = ' '; // Очищаем текущее положение монетки
    //     coin.moveLeft(); // Перемещаем монетку влево
    //     if (this.track[coin.position.y]) {
    //       this.track[coin.position.y][coin.position.x] = coin.skin; // Обновляем положение монетки на треке
    //     }
    //   }
    // }

    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      this.track[coin.position.y][coin.position.x] = ' ';
      coin.position.x--;
      if (coin.position.x >= 0) {
        // Проверяем, не достиг ли враг конца трека
        this.track[coin.position.y][coin.position.x] = coin.skin; // Обновляем положение врага на треке
      }
      this.track[coin.position.y][coin.position.x] = coin.skin;
    }
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
      this.track[enemy.position.y][enemy.position.x] = ' '; // Очищаем текущее положение врага
      enemy.position.x--;
      if (enemy.position.x >= 0) {
        // Проверяем, не достиг ли враг конца трека
        this.track[enemy.position.y][enemy.position.x] = enemy.skin; // Обновляем положение врага на треке
      }
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

  play() {
    this.spawnInterval = setInterval(() => {
      this.spawnEnemy();
      this.spawnCoin(); // Добавляем спаун монеток
    }, Math.floor(Math.random() * 2000) + 1000); // рандомный интервал от 1 до 3 секунд

    setInterval(() => {
      this.check(); // Проверяем столкновение
      this.moveEnemies();
      this.moveCoins(); // Добавляем метод для перемещения монеток
      this.collectCoins(); // Добавляем метод для сбора монеток
      this.view.render(this.track);
    }, 500); // каждые 200 миллисекунд
  }

  collectCoins() {
    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      if (
        coin.position.x === this.hero.position.x &&
        coin.position.y === this.hero.position.y
      ) {
        this.coins.splice(i, 1); // Удаляем монетку из массива
        // Тут можно увеличить счетчик монет или что-то подобное
        this.score += 1;
      }
    }
  }

  endGame() {
    clearInterval(this.spawnInterval);
    console.log(`Твой счет(жалко что не банковский): ${this.score}`);
    process.exit();
  }
}

module.exports = Game;
