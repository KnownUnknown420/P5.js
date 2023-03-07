//array with all current enemies on screen
let Enemies = [];
let WaveQuery = [];
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
    Enemies[i].show();
    Enemies[i].showHealth();
    if (GamePaused == false) {
      Enemies[i].move();
    }
  }
}

function SpawnEnemiesInWaveQuery() {
  if (WaveQuery.length != 0 && GamePaused == false) {
    for (let i = 0; i < WaveQuery.length; i++) {
      WaveQuery[i].SpawnEnemies();
    }
  }
}

//Enemy class
class Enemy {
  //Builds an enemy with initial position and speed
  constructor() {
    this.h = 30; // Height of the enemy square
    this.x = MapData[6] - this.h / 2; // X-coordinate of the enemy
    this.y = MapData[7] - this.h; // Y-coordinate of the enemy
    this.speed = 30; // Speed of the enemy
    this.pathPoints = PathPoints; // Path that the enemy has to follow
    this.currentPoint = 0; // Current point on the path that the enemy is at
    this.health = 1; // Health of the enemy
    this.orginalHealth = this.health;
    this.specialType = ["none"];
    this.Blimp = false;
    this.Turning = false;
    this.colorR = 255;
    this.colorB = 255;
    this.colorG = 255;
    this.RainbowColor = 0;
    this.RainbowCheck = false;
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
    if (this.y == targetY) {
      this.Turning = true;
    } else {
      this.Turning = false;
    }
  }

  //Displays the enemy on the canvas
  show() {
    if (this.RainbowCheck == false) {
      this.RainbowColor += 15;
    } else {
      this.RainbowColor -= 15;
    }
    if (this.RainbowColor >= 255 || this.RainbowColor <= 0) {
      this.RainbowCheck = !this.RainbowCheck;
    }

    fill(this.colorR,this.colorG,this.colorB)
    
    if (this.specialType.includes("camo")) {
      fill(this.RainbowColor, this.colorG, this.RainbowColor);
    }

    if (this.specialType.includes("tank")) {
      fill(this.RainbowColor, 0, this.RainbowColor);
    }
    if (
      this.specialType.includes("camo") &&
      this.specialType.includes("tank")
    ) {
      fill(this.RainbowColor, 0, 0);
    }

    if (this.Blimp == true) {
      if (this.Turning == true) {
        ellipse(this.x + this.h / 2, this.y + this.h / 2, 80, 50);
      } else {
        ellipse(this.x + this.h / 2, this.y + this.h / 2, 50, 80);
      }
    } else {
      square(this.x, this.y, this.h);
    }
  }

  showHealth() {
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
  constructor(Health, Speed) {
    super();
    this.health = Health;
    this.orginalHealth = Health;
    this.speed = Speed;
  }
}

class Camo extends Enemy {
  constructor(Health, Speed) {
    super();
    this.health = Health;
    this.orginalHealth = Health;
    this.speed = Speed;
    this.specialType = ["camo"];
  }
}

class Tank extends Enemy {
  constructor(Health, Speed) {
    super();
    this.health = Health;
    this.orginalHealth = Health;
    this.speed = Speed;
    this.specialType = ["tank"];
  }
}

class CamoTank extends Enemy {
  constructor(Health, Speed) {
    super();
    this.health = Health;
    this.orginalHealth = Health;
    this.speed = Speed;
    this.specialType = ["camo", "tank"];
  }
}

class EnemyMaker {
  constructor(Type, Amount, Delay, Debounce, Health, Speed) {
    this.Type = Type;
    this.Amount = Amount;
    this.Delay = Delay;
    this.Debounce = Debounce;
    this.Health = Health;
    this.Speed = Speed;
    this.Count = 0;
    this.Timer = 0;
    this.DelayCheck = false;
  }
  SpawnEnemies() {
    let index = WaveQuery.indexOf(this);
    if (this.Amount == 0 || this.Amount == null) {
      console.log("Warning: No wave Amount defined")
      WaveQuery.splice(index, 1);
    }
    if (this.Amount == 1) {
      let enemy = new this.Type(this.Health, this.Speed);
      Enemies.push(enemy);
      WaveQuery.splice(index, 1);
    }

    this.Timer++;
    if (this.DelayCheck == false && this.Timer >= this.Delay) {
      this.DelayCheck = true;
      let enemy = new this.Type(this.Health, this.Speed);
      Enemies.push(enemy);
      this.Count++;
      this.Timer = 0;
    }
    if (this.DelayCheck == true && this.Timer >= this.Debounce) {
      let enemy = new this.Type(this.Health, this.Speed);
      Enemies.push(enemy);
      this.Count++;
      this.Timer = 0;
      if (this.Count == this.Amount) {
        WaveQuery.splice(index, 1);
      }
    }
  }
}

function CreateEnemies(Type, Amount, Delay, Debounce, Health, Speed) {
  WaveQuery.push(new EnemyMaker(Type, Amount, Delay, Debounce, Health, Speed));
}

CreateEnemies(Camo, 100, 10, 10, 10, 40);
CreateEnemies(Soilder, 100, 10, 10, 10, 40);

