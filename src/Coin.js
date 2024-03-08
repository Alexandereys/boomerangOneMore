class Coin {
  constructor() {
    this.skin = '🌷';
    this.position = 0;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }
}

module.exports = Coin;
