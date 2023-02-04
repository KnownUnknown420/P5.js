//Text
let HealthText;
let MoneyText;

//Set and load images
let HeartImageDirectory;
let HeartImageScreen;
let MoneyStackDirectory;
let MoneyStackScreen;

//images only need to be preloaded once
//so, we do that here
function preload() {
  HeartImageDirectory = loadImage('Images/Heart.png');
  MoneyStackDirectory = loadImage('Images/STACK.png');
}

//splt the func for organization
//Drawling all images to screen
function DrawGameImages(){
  HeartImageScreen = image(HeartImageDirectory, 10, 10, 30, 30)
  MoneyStackScreen = image(MoneyStackDirectory, 95, 10, 30, 30)
}

//Drawling all text elements to the screen
function DrawGameText(){
  HealthText = text(GameHealth,50,30)
  HealthText = text(GameMoney,135,30)
}


