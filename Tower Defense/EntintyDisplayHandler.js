let Attacks = [];
let Enemies = [];
let WaveQuery = [];
let PlacedTowers = [];

function ShowTowers() {
  if (selectedTower) {
    selectedTower.showRange();
  }
  if (mouseIsPressed && mouseButton === LEFT && mouseX <= 550) {
    selectedTower = false;
  }
  for (let i = 0; i < PlacedTowers.length; i++) {
    if (PlacedTowers[i].TowerPlaced == false) {
      PlacedTowers[i].PlaceTower();
    } else {
      PlacedTowers[i].Show();
      PlacedTowers[i].CheckForMouse();
      if (GamePaused == false) {
        PlacedTowers[i].GetTarget();
        PlacedTowers[i].Attack();
      }
    }
  }
}

function SpawnEnemiesInWaveQuery() {
  if (WaveQuery.length != 0 && GamePaused == false) {
    for (let i = 0; i < WaveQuery.length; i++) {
      WaveQuery[i].SpawnEnemies();
    }
  }
}

//Shows the enemies on the canvas
function ShowEnemies() {
  for (let i = 0; i < Enemies.length; i++) {
    Enemies[i].show();
    Enemies[i].showHealth();
    if (GamePaused == false) {
      Enemies[i].move();
    }
  }
}

function ShowAttacks() {
  for (let i = Attacks.length - 1; i >= 0; i--) {
    Attacks[i].update();
    Attacks[i].display();

    if (Attacks[i].reachedTarget) {
      Attacks.splice(i, 1);
    }
  }
}
