//array with all current enemies on screen
let Enemies = [];
let SpawnCheck = false;

//points that the enemies have to follow
let PathPoints = [
  385,
  110,
  150,
  110,
  150,
  360,
  400,
  360,
  400,
  460,
  200,
  460,
  200,
  600,
];

//Shows the enemies on the canvas
function ShowEnemies() {
  for (let i = 0; i < Enemies.length; i++) {
    if (Enemies[i].Moving == true) {
      Enemies[i].show();
      Enemies[i].move();
    }
  }
}

//Enemy class
class Enemy {
  //Builds an enemy with initial position and speed
  constructor() {
    this.h = 30; // Height of the enemy square
    this.x = MapData[6] - (this.h / 2); // X-coordinate of the enemy
    this.y = MapData[7] - this.h; // Y-coordinate of the enemy
    this.speed = 30; // Speed of the enemy
    this.pathPoints = PathPoints; // Path that the enemy has to follow
    this.Moving = false;
    this.currentPoint = 0; // Current point on the path that the enemy is at
    this.health = 1; // Health of the enemy
    this.orginalHealth = this.health;
    this.resistance = {}
  }

  //Moves the enemy along the path
  move() {
    //Coordinates of the target point on the path
    let targetX = this.pathPoints[this.currentPoint * 2];
    let targetY = this.pathPoints[this.currentPoint * 2 + 1];

    //Calculates the difference between the enemy's current position and the target point
    let dx = targetX - this.x;
    let dy = targetY - this.y;
    let distance = sqrt(dx * dx + dy * dy);

    //Moves the enemy closer to the target point
    this.x += (dx * this.speed) / (distance * 10);
    this.y += (dy * this.speed) / (distance * 10);

    //If the enemy has reached the target point
    if (floor(distance) <= 1 + this.speed / 5) {
      this.x = targetX;
      this.y = targetY;
      this.currentPoint++;

      //If the enemy has reached the end of the path
      if (this.currentPoint >= this.pathPoints.length / 2) {
        let index = Enemies.indexOf(this);
        //Removes the enemy from the enemies array
        Enemies.splice(index, 1);
        GameHealth -= floor(this.health);
      }
    }
  }

  //Displays the enemy on the canvas
  show() {
    fill(255);
    square(this.x, this.y, this.h);

    if (this.health != this.orginalHealth) {
      fill(50, 50, 50, 120);
      rect(this.x - 13, this.y - 13, this.h + 26, 7);

      fill(255, 0, 0, 200); //health bar
      rect(
        this.x - 13,
        this.y - 13,
        (this.health / this.orginalHealth) * (this.h + 26),
        5
      );
    }
  }
}

class Soilder extends Enemy {
  constructor(Health) {
    super();
    this.health = Health;
    this.orginalHealth = Health;
    this.speed = 30;
    this.h = 30;
  }
}

class Camo extends Enemy {
  constructor(Health) {
    super();
    this.health = Health;
    this.orginalHealth = Health;
    this.speed = 30;
    this.h = 30;
    this.resistance = {camo}
  }
}

class Tank extends Enemy {
  constructor(Health) {
    super();
    this.health = Health;
    this.orginalHealth = Health;
    this.speed = 30;
    this.h = 30;
    this.resistance = {tank}
  }
}

class CamoTank extends Enemy {
  constructor(Health) {
    super();
    this.health = Health;
    this.orginalHealth = Health;
    this.speed = 30;
    this.h = 30;
    this.resistance = {camo,tank}
  }
}

function SpawnEnemies(Type, Amount, Delay, Debounce, Health) {
  WaveStarted = true;
  setTimeout(() => {
    if (SpawnCheck === false) {
      SpawnCheck = true;
      for (let i = 0; i < Amount; i++) {
        // create a new enemy instance
        let enemy = new Type(Health);
        // set a timeout to start moving the enemy after the specified delay
        setTimeout(() => {
          enemy.Moving = true;
        }, i * Debounce);
        // add the enemy to the array of all current enemies
        Enemies.push(enemy);
      }
    }
  }, Delay);
}

SpawnEnemies(Soilder, 100, 5000, 500, 5);
