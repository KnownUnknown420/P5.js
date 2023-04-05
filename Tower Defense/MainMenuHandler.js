let MusicEnabled = true;
let SoundEnabled = true;
let DrawingMenu = true;
let MainMenu = true;
let MapMenu = false;
let SettingMenu = false;
let AboutMenu = false;

function HideMapButtons() {
  MapOneButton.hide();
  MapTwoButton.hide();
  MapThreeButton.hide();
  MapFourButton.hide();
  MapFiveButton.hide();
  MapSixButton.hide();
  BackMenuButton.hide();
}

function PlayMapOne() {
  PlayClick();
  ResetGame();
  MapData = MapOneData;
  TrackData = MapOneTrackData;
  PathPoints = MapOnePathPoints;
  DrawingMenu = false;
  BackToMenu();
  HideMapButtons();
}

function PlayMapTwo() {
  PlayClick();
  ResetGame();
  MapData = MapTwoData;
  TrackData = MapTwoTrackData;
  PathPoints = MapTwoPathPoints;
  DrawingMenu = false;
  BackToMenu();
  HideMapButtons();
}

function ToggleMusic() {
  PlayClick();
  MusicEnabled = !MusicEnabled;
  if (MusicEnabled == true) {
    ToggleMusicButton.style("background-color", "green");
  } else {
    ToggleMusicButton.style("background-color", "red");
  }
}

function ToggleSound() {
  PlayClick();
  SoundEnabled = !SoundEnabled;
  if (SoundEnabled == true) {
    ToggleSoundButton.style("background-color", "green");
  } else {
    ToggleSoundButton.style("background-color", "red");
  }
}

function OnStartClick() {
  PlayClick();
  MainMenu = false;
  MapMenu = true;
}

function BackToMenu() {
  PlayClick();
  MainMenu = true;
  MapMenu = false;
  SettingMenu = false;
}

function SettingsOnClick() {
  PlayClick();
  MainMenu = false;
  SettingMenu = true;
}

function DrawMenu() {
  fill(0, 0, 0);
  background(255);
  FirstTargetButton.hide();
  LastTargetButton.hide();
  BasicTowerButton.hide();
  SniperTowerButton.hide();
  BasicTowerButton.hide();
  SellButton.hide();
  DeselectButton.hide();
  PauseButton.hide();
  FirstTargetButton.hide();
  LastTargetButton.hide();
  AntiTankTowerButton.hide();
  SniperTowerButton.hide();
  MachinegunTowerTowerButton.hide();
  MissleLauncherButton.hide();
  DroneTowerButton.hide();
  WizardTowerButton.hide();
  FreezeTowerButton.hide();
  NinjaTowerButton.hide();
  DamageTowerButton.hide();
  RadarTowerButton.hide();
  UpgradeButton.hide();

  if (MainMenu) {
    StartButton.show();
    AboutButton.show();
    SettingsButton.show();
    BackMenuButton.hide();
    textSize(30);
    text("Squares and Circles", Ymax / 2 - 30, 150);
    textSize(20);
    text("A tower defence game", Ymax / 2, 200);
  } else {
    StartButton.hide();
    AboutButton.hide();
    SettingsButton.hide();
  }

  if (MapMenu) {
    MapOneButton.show();
    MapTwoButton.show();
    MapThreeButton.show();
    MapFourButton.show();
    MapFiveButton.show();
    MapSixButton.show();

    BackMenuButton.show();
    image(Map1Directory, 65, 0, 200, 200);
    image(Map2Directory, 300, 0, 200, 200);
  } else {
    HideMapButtons()
  }

  if (SettingMenu) {
    ToggleMusicButton.show();
    ToggleSoundButton.show();
    BackMenuButton.show();
  } else {
    ToggleSoundButton.hide();
    ToggleMusicButton.hide();
  }
}
