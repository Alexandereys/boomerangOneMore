class Hero {
  constructor({ position, trackHeight }) {
    this.skin = '💃'; // Смайлик девушки
    this.position = { x: position, y: Math.floor(trackHeight / 2) };
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

  attack() {
    if (this.boomerang) {
      this.boomerang.fly();
    } else {
      console.log('No boomerang equipped!');
    }
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
