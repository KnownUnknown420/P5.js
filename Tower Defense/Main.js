//This file contains the games main loop
//Instead of having each file on there own clock
//All functions are called here to make sure eveything is insync
//Can be refered to as GameSync

//Global variables
let GameMoney;
const Xmax = 600;
const Ymax = 600;
const ShopSize = 200;
let GameHealth = 100;
let StartMoney = 450; //Defualt 450
let WaveReward = 100;
let GamePaused = true;

//Standard draw function that runs all the code and stuffs
//A few Color and drawling fixes are applied after certin function calls
function draw() {
  if (DrawingMenu == true) {
    if (MainMenu) {
      textSize(30);
      text("Squares and Circles", Ymax / 2 - 30, 150);
      textSize(20);
      text("A tower defence game", Ymax / 2, 200);
    }
    //checks to see if the menu is visible
    //If it is, we dont need to draw the game
    DrawMenu();
  } else {
    //Otherwise we run the main game loop
    textSize(15);
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

    if (GameHealth > 0) {
      // Draw All Active Enemies
      ShowEnemies();

      // Draw All Placed Towers
      ShowTowers();
    }

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

    //Checks if pause menu is enabled and draws it
    PauseMenu();

    //Loose screen
    LooseGamePopUp();

    //WinScreen
    WinGamePopUp();

    if (GameHealth < 0) {
      GameHealth = 0;
    }
  }
}

//setup just used for the menu
function setup() {
  createCanvas(Xmax + ShopSize, Ymax);
}

//Small function to reset game
//like the wave and game money
function ResetGame() {
  GameHealth = 100;
  WaveReward = 100;
  GamePaused = true;
  GameRestarting = true;
  WaveIndex = 0;
  WaveCount = 1;
  EnemyMakerInstances = [];
  Enemies = [];
  PlacedTowers = [];
  GameMoney = StartMoney;
}

//Also have key detection here,
//This is jsut a fast way to check for singe press key clicks
function keyPressed() {
  if (keyCode === 32) {
    PauseGame();
  }
  if (keyCode === 27 && DrawingMenu == false) {
    PauseMenuEnabled = !PauseMenuEnabled;
    if (PauseMenuEnabled == false) {
      ToggleMusicButton.hide();
      ToggleSoundButton.hide();
      ReturnToMenuButton.hide();
      RestartButton.hide();
    }
  }
}
