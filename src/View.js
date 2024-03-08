class View {
  constructor(game) {
    this.game = game;
  }

  render() {
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(this.game.track.map((row) => row.join('')).join('\n'));
    console.log('\n\n');
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
