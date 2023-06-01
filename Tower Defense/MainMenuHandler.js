//I find it easier to make menus using functions
//instead of a class
//this file makes the main menu for the game
//we first have to make all the screenframes
//Each var is like a frame
//if the frame is true; its visible
//otherwise its hiden
let DrawingMenu = true;
let MainMenu = true;
let MapMenu = false;
let SettingMenu = false;
let AboutMenu = false;
let MapPlayed = 0;

//Button that hides all the map buttons
//just makes it easier
function HideMapButtons() {
  MapOneButton.hide();
  MapTwoButton.hide();
  MapThreeButton.hide();
  MapFourButton.hide();
  MapFiveButton.hide();
  MapSixButton.hide();
  BackMenuButton.hide();
  BackMenuButton2.hide();
}

//each function just runs a map
//first if removes the main menu,
//then loads all the data from the maps
function PlayMapOne() {
  PlayClick();
  ResetGame();
  MapData = MapOneData;
  TrackData = MapOneTrackData;
  PathPoints = MapOnePathPoints;
  DrawingMenu = false;
  BackToMenu();
  HideMapButtons();
  MapPlayed = 1;
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
  MapPlayed = 2;
}

function PlayMapThree() {
  PlayClick();
  ResetGame();
  MapData = MapThreeData;
  TrackData = MapThreeTrackData;
  PathPoints = MapThreePathPoints;
  DrawingMenu = false;
  BackToMenu();
  HideMapButtons();
  MapPlayed = 3;
}

function PlayMapFour() {
  PlayClick();
  ResetGame();
  MapData = MapFourData;
  TrackData = MapFourTrackData;
  PathPoints = MapFourPathPoints;
  DrawingMenu = false;
  BackToMenu();
  HideMapButtons();
  MapPlayed = 4;
}

function PlayMapFive() {
  PlayClick();
  ResetGame();
  MapData = MapFiveData;
  TrackData = MapFiveTrackData;
  PathPoints = MapFivePathPoints;
  DrawingMenu = false;
  BackToMenu();
  HideMapButtons();
  MapPlayed = 5;
}

function PlayMapSix() {
  PlayClick();
  ResetGame();
  MapData = MapSixData;
  TrackData = MapSixTrackData;
  PathPoints = MapSixPathPoints;
  DrawingMenu = false;
  BackToMenu();
  HideMapButtons();
  MapPlayed = 6;
}

//These buttons make buttons that change game audio
//currently only settings
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
  SoundEnabled = !SoundEnabled;
  if (SoundEnabled == true) {
    ToggleSoundButton.style("background-color", "green");
  } else {
    ToggleSoundButton.style("background-color", "red");
  }
  PlayClick();
}

//Each button has a functiom
//the functions below change the "visibilty" of each frame
//and hides eany coraspoding buttons
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
  AboutMenu = false;
}

function SettingsOnClick() {
  PlayClick();
  MainMenu = false;
  SettingMenu = true;
  AboutMenu = false;
}

function AboutClick() {
  MainMenu = false;
  SettingMenu = false;
  AboutMenu = true;
}

//main function that draws the main menu
//if a frame is visible, it is drawn
//otherwise it doesnt, this was stated above
//this is a dumb way of doing of this,
//but p5 doesnt really have a ui
function DrawMenu() {
  fill(0, 0, 0);
  background(100, 50, 100);
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
    text("Squares and Circles", Ymax / 2 - 30, 250);
    textSize(20);
    text("A tower defence game", Ymax / 2, 200);
  } else {
    StartButton.hide();
    AboutButton.hide();
    SettingsButton.hide();
  }

  if (MapMenu) {
    DrawMapStars();
    MapOneButton.show();
    MapTwoButton.show();
    MapThreeButton.show();
    MapFourButton.show();
    MapFiveButton.show();
    MapSixButton.show();

    image(Map1Directory, 66, 0, 199, 200);
    image(Map2Directory, 301, 0, 199, 200);
    image(Map3Directory, 536, 0, 199, 200);
    image(Map4Directory, 66, 280, 199, 200);
    image(Map5Directory, 301, 280, 199, 200);
    image(Map6Directory, 536, 280, 199, 200);
    BackMenuButton2.show();
    BackMenuButton.hide();
  } else {
    HideMapButtons();
    BackMenuButton2.hide();
  }

  if (SettingMenu) {
    ToggleMusicButton.show();
    ToggleSoundButton.show();
    BackMenuButton.show();
  } else {
    ToggleSoundButton.hide();
    ToggleMusicButton.hide();
  }

  if (AboutMenu) {
    textSize(40);
    text("Play Time: " + DataBase.UserStats[0], 5, 30);
    text("Played Games: " + DataBase.UserStats[1], 5, 130);
    text("Wins: " + DataBase.UserStats[2], 5, 80);
    text("Kills: " + DataBase.UserStats[3], 5, 190);
    BackMenuButton.show();
  }
}

//this function is called when the stars
//need to be drawn to the screen
//stars are saved and drawn based on the health of
//each map after you finsih it
//if the map is beat with 100 health, its give a 4 raiting
//3 is
//data is loaded, if its 4 its diamond (omg diamond camo)
//otherwise its gold for 3
//silver its for 2
//and bronze is 1

function DrawMapStars() {
  if (DataBase.UserData[0] == 4) {
    fill(200, PulseColor, 250);
    PlaceStar(100, 250);
    PlaceStar(165, 250);
    PlaceStar(230, 250);
  } else {
    if (DataBase.UserData[0] >= 1) {
      fill(205, 127, 50);
      PlaceStar(100, 250);
    }
    if (DataBase.UserData[0] >= 2) {
      fill(192, 192, 192);
      PlaceStar(165, 250);
    }
    if (DataBase.UserData[0] == 3) {
      fill(255, 215, 0);
      PlaceStar(230, 250);
    }
  }
  if (DataBase.UserData[1] == 4) {
    fill(200, PulseColor, 250);
    PlaceStar(335, 250);
    PlaceStar(400, 250);
    PlaceStar(465, 250);
  } else {
    if (DataBase.UserData[1] >= 1) {
      fill(205, 127, 50);
      PlaceStar(335, 250);
    }
    if (DataBase.UserData[1] >= 2) {
      fill(192, 192, 192);
      PlaceStar(400, 250);
    }
    if (DataBase.UserData[1] == 3) {
      fill(255, 215, 0);
      PlaceStar(465, 250);
    }
  }

  if (DataBase.UserData[2] == 4) {
    fill(200, PulseColor, 250);
    PlaceStar(570, 250);
    PlaceStar(635, 250);
    PlaceStar(700, 250);
  } else {
    if (DataBase.UserData[2] >= 1) {
      fill(205, 127, 50);
      PlaceStar(570, 250);
    }
    if (DataBase.UserData[2] >= 2) {
      fill(192, 192, 192);
      PlaceStar(635, 250);
    }
    if (DataBase.UserData[2] == 3) {
      fill(255, 215, 0);
      PlaceStar(700, 250);
    }
  }
  if (DataBase.UserData[3] == 4) {
    fill(200, PulseColor, 250);
    PlaceStar(100, 450);
    PlaceStar(165, 450);
    PlaceStar(230, 450);
  } else {
    if (DataBase.UserData[3] >= 1) {
      fill(205, 127, 50);
      PlaceStar(100, 450);
    }
    if (DataBase.UserData[3] >= 2) {
      fill(192, 192, 192);
      PlaceStar(165, 450);
    }
    if (DataBase.UserData[3] == 3) {
      fill(255, 215, 0);
      PlaceStar(230, 450);
    }
  }
  if (DataBase.UserData[4] == 4) {
    fill(200, PulseColor, 250);
    PlaceStar(335, 450);
    PlaceStar(400, 450);
    PlaceStar(465, 450);
  } else {
    if (DataBase.UserData[4] >= 1) {
      fill(205, 127, 50);
      PlaceStar(335, 450);
    }
    if (DataBase.UserData[4] >= 2) {
      fill(192, 192, 192);
      PlaceStar(400, 450);
    }
    if (DataBase.UserData[4] == 3) {
      fill(255, 215, 0);
      PlaceStar(465, 450);
    }
  }

  if (DataBase.UserData[5] == 4) {
    fill(200, PulseColor, 250);
    PlaceStar(570, 450);
    PlaceStar(635, 450);
    PlaceStar(700, 450);
  } else {
    if (DataBase.UserData[5] >= 1) {
      fill(205, 127, 50);
      PlaceStar(570, 450);
    }
    if (DataBase.UserData[5] >= 2) {
      fill(192, 192, 192);
      PlaceStar(635, 450);
    }
    if (DataBase.UserData[5] == 3) {
      fill(255, 215, 0);
      PlaceStar(700, 450);
    }
  }
}
