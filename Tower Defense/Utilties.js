//This file contains UniversalFunctions that dont really
//Belong anywhere so they are specia I guess
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function CheckSpecialType(TowerPass, Enemy) {
  let ReturnValue = true;
  let Tower = TowerPass;
  if (Tower.EffectiveDamage.includes("none") && Enemy.includes("none")) {
    return true;
  }
  if (Enemy.includes("camo")) {
    if (
      Tower.EffectiveDamage.includes("camo") == false &&
      Tower.BoostedEffectiveDamage.includes("camo") == false
    ) {
      ReturnValue = false;
    }
  }

  if (Enemy.includes("tank")) {
    if (
      Tower.EffectiveDamage.includes("tank") == false &&
      Tower.BoostedEffectiveDamage.includes("tank") == false
    ) {
      ReturnValue = false;
    }
  }

  return ReturnValue;
}

function PauseGame() {
  GamePaused = !GamePaused;
  if (GamePaused == false) {
    PauseButton.style("background-color", "green");
  } else {
    PauseButton.style("background-color", "red");
  }
}

//Yea this was dumb, but it was easier soooo
//Work smarter not harder
//I could have just delcared a ceneter variable :skull:
function Center(size) {
  return size / 2;
}

//This is needed mutliple times
function CheckRectIntersection(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
    return true;
  }
  return false;
}

//Makes all the buttons the game needs, this help with preformance
function preload() {
  HeartImageDirectory = loadImage("Images/Heart.png");
  MoneyStackDirectory = loadImage("Images/STACK.png");
  Map1Directory = loadImage("Images/Map1.png");
  Map2Directory = loadImage("Images/Map2.png");

  ClickSound = loadSound("Sound/ClickNoise.mp3");

  FirstTargetButton = createButton("F");
  FirstTargetButton.style("background-color", "red");
  FirstTargetButton.position(655, 545);
  FirstTargetButton.size(40, 50);
  FirstTargetButton.mousePressed(ChangeTargetMode);

  LastTargetButton = createButton("L");
  LastTargetButton.style("background-color", "red");
  LastTargetButton.position(655, 545);
  LastTargetButton.size(40, 50);
  LastTargetButton.mousePressed(ChangeTargetMode);

  PauseButton = createButton("Pause");
  PauseButton.style("background-color", "red");
  PauseButton.position(455, 600);
  PauseButton.size(95, 50);
  PauseButton.mousePressed(PauseGame);

  UpgradeButton = createButton("Upgrade");
  UpgradeButton.style("background-color", "rgb(0,115,255)");
  UpgradeButton.position(555, 445);
  UpgradeButton.size(105, 50);
  UpgradeButton.mousePressed(UpgradeTower);

  SellButton = createButton("Sell");
  SellButton.style("background-color", "gold");
  SellButton.position(693, 545);
  SellButton.size(105, 50);
  SellButton.mousePressed(SellTower);

  DeselectButton = createButton("Deselect");
  DeselectButton.style("background-color", "red");
  DeselectButton.position(555, 545);
  DeselectButton.size(105, 50);
  DeselectButton.mousePressed(DeselectTower);

  BasicTowerButton = createButton("($" + Price.BasicTower + ") Soilder");
  BasicTowerButton.style("background-color", "grey");
  BasicTowerButton.position(560, 10);
  BasicTowerButton.size(95, 50);
  BasicTowerButton.mousePressed(PlaceStandardTower);

  SniperTowerButton = createButton("($" + Price.SniperTower + ") Sniper");
  SniperTowerButton.style("background-color", "grey");
  SniperTowerButton.position(690, 10);
  SniperTowerButton.size(95, 50);
  SniperTowerButton.mousePressed(PlaceSniperTower);

  MachinegunTowerTowerButton = createButton(
    "($" + Price.MachinegunTower + ") Machine gun"
  );
  MachinegunTowerTowerButton.style("background-color", "grey");
  MachinegunTowerTowerButton.position(560, 70);
  MachinegunTowerTowerButton.size(95, 50);
  MachinegunTowerTowerButton.mousePressed(PlaceMGTower);

  MissleLauncherButton = createButton(
    "($" + Price.MissleLauncherTower + ") Tank"
  );
  MissleLauncherButton.style("background-color", "grey");
  MissleLauncherButton.position(690, 70);
  MissleLauncherButton.size(95, 50);
  MissleLauncherButton.mousePressed(PlaceMissleTower);

  DroneTowerButton = createButton("($" + Price.Drone + ") Drone");
  DroneTowerButton.style("background-color", "grey");
  DroneTowerButton.position(560, 130);
  DroneTowerButton.size(95, 50);
  DroneTowerButton.mousePressed(PlaceDroneTower);

  WizardTowerButton = createButton("($" + Price.Wizard + ") Wizard");
  WizardTowerButton.style("background-color", "grey");
  WizardTowerButton.position(690, 130);
  WizardTowerButton.size(95, 50);
  WizardTowerButton.mousePressed(PlaceWizardTower);

  FreezeTowerButton = createButton("($" + Price.FreezeTower + ") Freeze");
  FreezeTowerButton.style("background-color", "grey");
  FreezeTowerButton.position(560, 190);
  FreezeTowerButton.size(95, 50);
  FreezeTowerButton.mousePressed(PlaceFreezeTower);

  NinjaTowerButton = createButton("($" + Price.NinjaTower + ")  Ninja");
  NinjaTowerButton.style("background-color", "grey");
  NinjaTowerButton.position(690, 190);
  NinjaTowerButton.size(95, 50);
  NinjaTowerButton.mousePressed(PlaceNinjaTower);

  DamageTowerButton = createButton("($" + Price.DamageTower + ")  FOB");
  DamageTowerButton.style("background-color", "grey");
  DamageTowerButton.position(560, 250);
  DamageTowerButton.size(95, 50);
  DamageTowerButton.mousePressed(PlaceDamageTower);

  RadarTowerButton = createButton("($" + Price.RadarTower + ")  Radar");
  RadarTowerButton.style("background-color", "grey");
  RadarTowerButton.position(690, 250);
  RadarTowerButton.size(95, 50);
  RadarTowerButton.mousePressed(PlaceRadarTower);

  AntiTankTowerButton = createButton(
    "($" + Price.AntiTankTower + ")  Anti Tank"
  );
  AntiTankTowerButton.style("background-color", "grey");
  AntiTankTowerButton.position(560, 310);
  AntiTankTowerButton.size(95, 50);
  AntiTankTowerButton.mousePressed(PlaceAntiTankTower);

  StartButton = createButton("Play");
  StartButton.style("background-color", "rgb(62,201,240)");
  StartButton.position(130, 345);
  StartButton.size(200, 50);
  StartButton.mousePressed(OnStartClick);

  AboutButton = createButton("About");
  AboutButton.style("background-color", "rgb(62,201,240)");
  AboutButton.position(Ymax / 2, 445);
  AboutButton.size(200, 50);
  AboutButton.mousePressed(OnStartClick);

  SettingsButton = createButton("Setting");
  SettingsButton.style("background-color", "rgb(62,201,240)");
  SettingsButton.position(470, 345);
  SettingsButton.size(200, 50);
  SettingsButton.mousePressed(SettingsOnClick);

  BackMenuButton = createButton("Back");
  BackMenuButton.style("background-color", "rgb(62,201,240)");
  BackMenuButton.position(Ymax / 2, 490);
  BackMenuButton.size(200, 50);
  BackMenuButton.mousePressed(BackToMenu);
  BackMenuButton.hide();

  ToggleMusicButton = createButton("Music");
  ToggleMusicButton.style("background-color", "green");
  ToggleMusicButton.position(Ymax / 2, 170);
  ToggleMusicButton.size(200, 50);
  ToggleMusicButton.mousePressed(ToggleMusic);
  ToggleMusicButton.hide();

  ToggleSoundButton = createButton("Sound");
  ToggleSoundButton.style("background-color", "green");
  ToggleSoundButton.position(Ymax / 2, 220);
  ToggleSoundButton.size(200, 50);
  ToggleSoundButton.mousePressed(ToggleSound);
  ToggleSoundButton.hide();

  ReturnToMenuButton = createButton("Menu");
  ReturnToMenuButton.style("background-color", "#FFEB3B");
  ReturnToMenuButton.position(Ymax / 2, 270);
  ReturnToMenuButton.size(200, 50);
  ReturnToMenuButton.mousePressed(PauseMenuReturn);
  ReturnToMenuButton.hide();

  RestartButton = createButton("Restart");
  RestartButton.style("background-color", "rgb(255,28,28)");
  RestartButton.position(Ymax / 2, 320);
  RestartButton.size(200, 50);
  RestartButton.mousePressed(ResetGame);
  RestartButton.hide();

  MapOneButton = createButton("Map 1");
  MapOneButton.style("background-color", "rgb(62,201,240)");
  MapOneButton.position(65, 170);
  MapOneButton.size(200, 50);
  MapOneButton.mousePressed(PlayMapOne);
  MapOneButton.hide();

  MapTwoButton = createButton("Map 2");
  MapTwoButton.style("background-color", "rgb(62,201,240)");
  MapTwoButton.position(300, 170);
  MapTwoButton.size(200, 50);
  MapTwoButton.mousePressed(PlayMapTwo);
  MapTwoButton.hide();

  MapThreeButton = createButton("Map 3");
  MapThreeButton.style("background-color", "rgb(62,201,240)");
  MapThreeButton.position(535, 170);
  MapThreeButton.size(200, 50);
  MapThreeButton.mousePressed(PlayMapTwo);
  MapThreeButton.hide();

  MapFourButton = createButton("Map 4");
  MapFourButton.style("background-color", "rgb(62,201,240)");
  MapFourButton.position(65, 370);
  MapFourButton.size(200, 50);
  MapFourButton.mousePressed(PlayMapTwo);
  MapFourButton.hide();

  MapFiveButton = createButton("Map 5");
  MapFiveButton.style("background-color", "rgb(62,201,240)");
  MapFiveButton.position(300, 370);
  MapFiveButton.size(200, 50);
  MapFiveButton.mousePressed(PlayMapTwo);
  MapFiveButton.hide();

  MapSixButton = createButton("Map 6");
  MapSixButton.style("background-color", "rgb(62,201,240)");
  MapSixButton.position(535, 370);
  MapSixButton.size(200, 50);
  MapSixButton.mousePressed(PlayMapTwo);
  MapSixButton.hide();
}
