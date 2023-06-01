let PauseMenuEnabled = false;
let fart = true;
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
    PauseGame(true);
    ToggleMusicButton.show();
    ToggleSoundButton.show();
    ReturnToMenuButton.show();
    RestartButton.show();
    fill(255, 0, 255);
    square(285, 155, 230);
  } else {
    ToggleMusicButton.hide();
    ToggleSoundButton.hide();
    ReturnToMenuButton.hide();
    RestartButton.hide();
  }
}

function LooseGamePopUp() {
  if (GameHealth <= 0) {
    if (PushedData == false){
      PushedData = true
      PlayLooseSound()
    }
    PauseMenuEnabled = false;
    SelectedTower = false;
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
let PushedData = false;
function WinGamePopUp() {
  if (
    WavesCompleted == true &&
    Enemies.length == 0 &&
    EnemyMakerInstances.length == 0 
  ) {
    if (PushedData == false){
      PushedData = true
      DataBase.DataPushWin()
      PlayWinSound()
    }
    textSize(35);
    fill(255, 0, 255);
    square(285, 155, 230);
    fill(0, 0, 0);
    text("You Win", 330, 200);
    textSize(20);
    text("All Waves Completed", 305, 250);
    ReturnToMenuButton.show();
    RestartButton.show();
    DataBase.DataSend();
  }
}
