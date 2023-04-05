let PauseMenuEnabled = false;
let GameOverScreen = false
let GameWinScreen = false

function PauseMenuReturn() {
  PauseGame();
  PlayClick();
  PauseMenuEnabled = false;
  ToggleMusicButton.hide();
  ToggleSoundButton.hide();
  ReturnToMenuButton.hide();
  RestartButton.hide();
  MainMenu = true;
  DrawingMenu = true;
}

function PauseMenu() {
  if (PauseMenuEnabled) {
    PauseGame(true)
    ToggleMusicButton.show();
    ToggleSoundButton.show();
    ReturnToMenuButton.show();
    RestartButton.show();
    fill(255, 0, 255);
    square(285, 155, 230);
  }
}

function LooseGamePopUp() {
  if (GameHealth <= 0) {
    SelectedTower = false
    textSize(35);
    fill(255, 0, 255);
    square(285, 155, 230);
    fill(0, 0, 0);
    text("Game Over", 310, 200);
    text("All Lives lost", 300, 250);
    ReturnToMenuButton.show();
    RestartButton.show();
  }
}

function WinGamePopUp() {
  if (WavesCompleted == true && Enemies.length == 0 && EnemyMakerInstances.length == 0) {
    PauseGame()
    textSize(35);
    fill(255, 0, 255);
    square(285, 155, 230);
    fill(0, 0, 0);
    text("You Win!", 250, 300);
    ReturnToMenuButton.show();
    RestartButton.show();
  }
}
