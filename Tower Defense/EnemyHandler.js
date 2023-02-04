//array with all current enemies on screen
let Enemies = []

//points that the enemies have to follow
let PathPoints = [
  385,110, 
  150,110, 
  150,360,
  400,360,
  400,460,
  200,460,
  200,600
]

//enemy class
class Enemy {
  
  //builds the enemy
  constructor(x, y, h, speed) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.speed = speed;
    this.pathPoints = PathPoints;
    this.currentPoint = 0;
  }
  
  //sets up move function, loops automaticly
  move() {
  let interval = setInterval(() => {
    let targetX = this.pathPoints[this.currentPoint * 2];
    let targetY = this.pathPoints[this.currentPoint * 2 + 1];

    let dx = targetX - this.x;
    let dy = targetY - this.y;
    let distance = sqrt(dx * dx + dy * dy);

    this.x += (dx * this.speed) / (distance * 10);
    this.y += (dy * this.speed) / (distance * 10);
    //console.log(this.currentPoint)
    if (distance <= 1) {
      this.x = targetX;
      this.y = targetY;
      this.currentPoint++;

      if (this.currentPoint >= this.pathPoints.length / 2) {
        clearInterval(interval);
        console.log("Done!")
      }
    }
    }, 1000/60);
  }
  
  //shows the block
  show(){
  fill(255);
  square(this.x, this.y, this.h);
  }
}


//code to create a wave
function CreateWave(Amount, Delay, x, y, h, speed) {
  for (let i = 0; i < Amount; i++) {
    let enemy = new Enemy(x, y, h, speed);
    setTimeout(() => {
      enemy.move();
    }, i * Delay);
    Enemies.push(enemy);
  }
}



