//Global Variables IMPORTANT. duh
const Xmax = 600; const Ymax = 600;

let GameHealth = 100;
let GameMoney = 0;

//mainly for testing
function setup() {
  createCanvas(Xmax,Ymax);
  DrawGameImages()
  CreateWave(10, 300 ,400-15,-30,30,100)
}

//main loop
function draw(){
  RefreshScreen();
}

