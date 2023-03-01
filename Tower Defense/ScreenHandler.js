// Text variables to store and display game data
let HealthText;
let MoneyText;
let BasicTowerPrice;
let FPS;

// Variables to store image directory and image objects
let HeartImageDirectory;
let HeartImageScreen;
let MoneyStackDirectory;
let MoneyStackScreen;

//shop buttons
let BasicTowerButton;
let SellTowerButton;
let DeselectButton;
let Price = {
  BasicTower: 200,
  SniperTower: 350,
  MachinegunTower: 600,
  MissleLauncherTower: 1200,
  Drone: 1500,
};

let ButtonColor;
let DisablePlacing = false;

function RefreshText() {
  if (selectedTower.Level < 4) {
    text(selectedTower.Upgrade[selectedTower.Level * 4 - 1], 585, 530);
  }
  text(selectedTower.name, 560, 430);
  text("Level: " + selectedTower.Level, 680, 430);
  text("Damage: " + selectedTower.damage, 680, 460);
  text("Speed: " + selectedTower.AttackSpeed, 680, 490);
  text("Kills: " + selectedTower.KillCount, 680, 520);
}

function UpgradeTower() {
  let index = selectedTower.Level * 4;
  if (GameMoney >= selectedTower.Upgrade[index - 1]) {
    GameMoney -= selectedTower.Upgrade[index - 1];
    selectedTower.damage = selectedTower.Upgrade[index - 4];
    selectedTower.AttackSpeed = selectedTower.Upgrade[index - 3];
    selectedTower.radius = selectedTower.Upgrade[index - 2];
    selectedTower.Level++;
    RefreshText();
  }
}

function SellTower() {
  console.log(selectedTower);
  let index = PlacedTowers.indexOf(selectedTower);
  GameMoney += selectedTower.SellPrice;
  PlacedTowers.splice(index, 1);
  selectedTower = false;
}

function PlaceStandardTower() {
  if (GameMoney >= Price.BasicTower && DisablePlacing == false) {
    selectedTower = false;
    DisablePlacing = true;
    let NewTowerType = new BasicTower();
    NewTowerType.PlaceTower();
    NewTowerType.PushToList();
  }
}

function PlaceSniperTower() {
  if (GameMoney >= Price.BasicTower && DisablePlacing == false) {
    selectedTower = false;
    DisablePlacing = true;
    let NewTowerType = new SniperTower();
    NewTowerType.PlaceTower();
    NewTowerType.PushToList();
  }
}

function PlaceMGTower() {
  if (GameMoney >= Price.BasicTower && DisablePlacing == false) {
    selectedTower = false;
    DisablePlacing = true;
    let NewTowerType = new MachinegunTower();
    NewTowerType.PlaceTower();
    NewTowerType.PushToList();
  }
}

function PlaceMissleTower() {
  if (GameMoney >= Price.BasicTower && DisablePlacing == false) {
    selectedTower = false;
    DisablePlacing = true;
    let NewTowerType = new MissleTower();
    NewTowerType.PlaceTower();
    NewTowerType.PushToList();
  }
}

function PlaceDroneTower() {
  if (GameMoney >= Price.BasicTower && DisablePlacing == false) {
    selectedTower = false;
    DisablePlacing = true;
    let NewTowerType = new DroneTower();
    NewTowerType.PlaceTower();
    NewTowerType.PushToList();
  }
}

function DeselectTower() {
  selectedTower = false;
}

//Preload function to load images only once
//Also creates the shop buttons
function preload() {
  HeartImageDirectory = loadImage("Images/Heart.png");
  MoneyStackDirectory = loadImage("Images/STACK.png");

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
    "($" + Price.MissleLauncherTower + ") M.launcher"
  );
  MissleLauncherButton.style("background-color", "grey");
  MissleLauncherButton.position(690, 70);
  MissleLauncherButton.size(95, 50);
  MissleLauncherButton.mousePressed(PlaceMissleTower);

  DroneTowerButton = createButton(
    "($" + Price.Drone + ") Drone"
  );
  DroneTowerButton.style("background-color", "grey");
  DroneTowerButton.position(560, 130);
  DroneTowerButton.size(95, 50);
  DroneTowerButton.mousePressed(PlaceDroneTower);
}

// Function to draw all game images to the screen
function DrawGameImages() {
  HeartImageScreen = image(HeartImageDirectory, 10, 10, 30, 30);
  MoneyStackScreen = image(MoneyStackDirectory, 95, 10, 30, 30);
}

// Function to draw all game text to the screen
function DrawGameText() {
  HealthText = text(GameHealth, 50, 30);
  MoneyText = text(GameMoney, 135, 30);
  let FPSAmount = ceil(frameRate() / 5) * 5;
  FPS = text(FPSAmount, 520, 30);
}

// Function to reset the button colors
function ResetColors() {
  BasicTowerButton.style("background-color", "gray");
  SniperTowerButton.style("background-color", "gray");
  MachinegunTowerTowerButton.style("background-color", "gray");
  MissleLauncherButton.style("background-color", "gray");
  DroneTowerButton.style("background-color", "gray")
}

// Function to create the shop
function CreateShop() {
  ResetColors();
  fill(10, 100, 100);
  square(550, 0, 600);
  
  if (GameMoney >= Price.BasicTower) {
    BasicTowerButton.style("background-color", "green");
  }

  if (GameMoney >= Price.SniperTower) {
    SniperTowerButton.style("background-color", "green");
  }

  if (GameMoney >= Price.MachinegunTower) {
    MachinegunTowerTowerButton.style("background-color", "green");
  }

  if (GameMoney >= Price.MissleLauncherTower) {
    MissleLauncherButton.style("background-color", "green");
  }
  
  if (GameMoney >= Price.Drone){
    DroneTowerButton.style("background-color", "green")
  }

  //Upgrade area
  line(550, 400, Xmax + ShopSize, 400);

  if (selectedTower === false) {
    UpgradeButton.hide();
    SellButton.hide();
    DeselectButton.hide();
  } else {
    UpgradeButton.style("display", "block");
    SellButton.style("display", "block");
    DeselectButton.style("display", "block");

    if (selectedTower.Level > 3) {
      UpgradeButton.hide();
    }
    fill(0, 0, 0);
    RefreshText();
  }
}
