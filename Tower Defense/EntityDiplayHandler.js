//This File contains all the Enemy and Tower Display Code
//This File was created for Readabality and Code managment

//First we need to create the Attacks, Enemies, And PlacedTowers Arrays
//These Contain all the Entities and Particles placed onto the game
let Attacks = [];
let Enemies = [];
let PlacedTowers = [];

//This first Function will lopp throught all the Towers inside the PlacedTowers Array
//It will also show the Range of the SelectedTower
//Along with this, it checks to see if the mouse is pressed
//If its not on the selected tower, it deselets the SelectedTower,
//After all of this, it wil run the PlacedTowers Methods
//Firstly, it will loop throught any towers that are getting placed
//It wil then run the TowerPlacing code
//After that, it will show any Towers placed onto the screen
//Along with checking to see if the mouse is pressed and inside of it.
//If the game is not paused, it will target and attack any enemies inside its range
function ShowTowers() {
  if (SelectedTower) {
    SelectedTower.showRange();
  }
  if (mouseIsPressed && mouseButton === LEFT && mouseX <= 550) {
    SelectedTower = false;
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

//This Function will lopp throught all the Enemies inside the Enemies Array
//It will firstly Show all enemies and the health
//Then, if the game is not paused, move the enemy
function ShowEnemies() {
  for (let i = 0; i < Enemies.length; i++) {
    Enemies[i].show();
    Enemies[i].showHealth();
    if (GamePaused == false) {
      Enemies[i].DebuffHandler()
      Enemies[i].move();
    }
  }
}

//This first Function will lopp throught all the Bullets inside the PlacedTowers Array
//Firslty, it will update the positon of the Bullet
//Then it will Display it onto the screen
//After that, it checks to see if the Bullet has reached it target
//If it has, it will Delete it from the array
function ShowAttacks() {
  for (let i = Attacks.length - 1; i >= 0; i--) {
    Attacks[i].update();
    Attacks[i].display();

    if (Attacks[i].reachedTarget) {
      Attacks.splice(i, 1);
    }
  }
}
