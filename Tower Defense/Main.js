// Global variables
const Xmax = 600;
const Ymax = 600;
const ShopSize = 200;

let GameHealth = 100;
let GameMoney = 10000;

let WaveCount = 1;
let WaveReward = 100;

let GamePaused = false;

// Main loop that refreshes the screen every iteration
function draw() {
  if (focused){
     // Draw the background
  background(MapData[0], MapData[1], MapData[2]);

  // Reset to Track Color
  fill(MapData[3], MapData[4], MapData[5]);

  // Draw Track
  strokeWeight(0);
  DrawTrack();
  strokeWeight(1);

  //Shows all bullets
  ShowBullets();

  //SpawnEnemies
  SpawnEnemiesInWaveQuery();

  // Draw All Active Enemies
  ShowEnemies();

  // Draw All Placed Towers
  ShowTowers();

  fill(0, 0, 0);
  textSize(20);

  // Draw Image Elements
  DrawGameImages();

  // Draw Shop
  CreateShop();

  // Draw Text Elements
  DrawGameText();
  }
}

// Main setup function, mainly used for testing
function setup() {
  createCanvas(Xmax + ShopSize, Ymax);
  keyPressed();
}

function keyPressed() {
  if (keyCode === 32) {
    PauseGame();
  }
}
