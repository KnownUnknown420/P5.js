//This file contains the games main loop
//Instead of having each file on there own clock
//All functions are called here to make sure eveything is insync
//Can be refered to as GameSync

//Global variables
const Xmax = 600;
const Ymax = 600;
const ShopSize = 200;
let GameHealth = 100;
let GameMoney = 450; //Defualt 450
let WaveReward = 100;
let GamePaused = true;

//Standard draw function that runs all the code and stuffs
//A few Color and drawling fixes are applied after certin function calls
function draw() {
  // Draw the background
  background(MapData[0], MapData[1], MapData[2]);

  // Reset to Track Color
  fill(MapData[3], MapData[4], MapData[5]);

  // Draw Track
  strokeWeight(0);
  DrawTrack();
  strokeWeight(1);

  //SpawnEnemies
  SpawnEnemiesInEnemyMakerInstances();

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

  //Shows all bullets\
  ShowAttacks();

  //Set waves thingy
  GenerateWaves();
}

// Main setup function, mainly used for testing
function setup() {
  createCanvas(Xmax + ShopSize, Ymax);
  GenerateWaves();
}

//Also have key detection here,
//This is jsut a fast way to check for singe press key clicks
function keyPressed() {
  if (keyCode === 32) {
    PauseGame();
  }
}
