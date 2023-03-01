let PlacedTowers = [];
let Bullets = [];
let selectedTower = false;

function MakeBullet(startX, startY, targetX, targetY, speed) {
  let bullet = {};
  bullet.x = startX;
  bullet.y = startY;
  bullet.speed = speed;
  bullet.targetX = targetX;
  bullet.targetY = targetY;
  bullet.reachedTarget = false;

  bullet.update = function () {
    if (!this.reachedTarget) {
      let dx = this.targetX - this.x;
      let dy = this.targetY - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let steps = distance / this.speed;
      this.x += dx / steps;
      this.y += dy / steps;

      if (distance < this.speed) {
        this.reachedTarget = true;
      }
    }
  };

  bullet.display = function () {
    if (!this.reachedTarget) {
      strokeWeight(5);
      point(this.x, this.y);
      strokeWeight(1);
    }
  };

  return bullet;
}

function checkRectIntersection(rect1, rect2) {
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

function ShowTowers() {
  if (selectedTower) {
    selectedTower.showRange();
  }

  if (mouseIsPressed && mouseButton === LEFT && mouseX <= 550) {
    selectedTower = false;
  }
  for (let i = 0; i < PlacedTowers.length; i++) {
    if (PlacedTowers[i].TowerPlaced == false) {
      PlacedTowers[i].PlaceTower();
    } else {
      PlacedTowers[i].show();
      PlacedTowers[i].CheckForMouse();
      PlacedTowers[i].GetTarget();
    }
  }
}

function ShowBullets() {
  for (let i = Bullets.length - 1; i >= 0; i--) {
    Bullets[i].update();
    Bullets[i].display();

    if (Bullets[i].reachedTarget) {
      Bullets.splice(i, 1);
    }
  }
}

class Tower {
  constructor() {
    this.name = "Tower";
    this.size = 1;
    this.damage = 1;
    this.colorR = 0;
    this.colorG = 0;
    this.colorB = 0;
    this.TowerPlaced = false;
    this.TowerPrice = 0;
    this.radius = 150;
    this.AttackSpeed = 1000;
    this.SellPrice = 175;
    this.Level = 1;
    this.attackdelay = 0;
    this.KillCount = 0;
  }

  PushToList() {
    PlacedTowers.push(this);
  }
  PlaceTower() {
    this.x = mouseX - this.size / 2;
    this.y = mouseY - this.size / 2;
    let towerRect = {
      x: this.x,
      y: this.y,
      w: this.size,
      h: this.size,
    };

    let canPlaceTower = true;
    if (
      this.x >= 0 &&
      this.x <= 550 - this.size &&
      this.y >= 0 &&
      this.y <= 600 - this.size
    ) {
      canPlaceTower = true;
    } else {
      canPlaceTower = false;
    }

    for (let i = 0; i < TrackData.length; i = i + 4) {
      let trackRect = {
        x: TrackData[i],
        y: TrackData[i + 1],
        w: TrackData[i + 2],
        h: TrackData[i + 3],
      };
      if (checkRectIntersection(towerRect, trackRect)) {
        canPlaceTower = false;
        break;
      }
    }

    let currentTower = this;
    for (let i = 0; i < PlacedTowers.length; i++) {
      let placedTowerRect = {
        x: PlacedTowers[i].x,
        y: PlacedTowers[i].y,
        w: PlacedTowers[i].size,
        h: PlacedTowers[i].size,
      };
      if (
        PlacedTowers[i] !== currentTower &&
        checkRectIntersection(towerRect, placedTowerRect)
      ) {
        canPlaceTower = false;
        break;
      }
    }
    if (canPlaceTower) {
      fill(this.colorR, this.colorG, this.colorB);
    } else {
      fill(255, 0, 0);
    }

    if (canPlaceTower) {
      if (mouseIsPressed && mouseButton === LEFT) {
        this.TowerPlaced = true;
        DisablePlacing = false;
        GameMoney -= this.TowerPrice;
      }
    }
    square(this.x, this.y, this.size);
    this.showRange();
  }

  show() {
    console.log("Error: No show method found");
  }
  showRange() {
    fill(this.colorR, this.colorG, this.colorB, 50);
    circle(this.x + this.size / 2, this.y + this.size / 2, this.radius * 2 - 5);
  }
  CheckForMouse() {
    if (mouseIsPressed && mouseButton === LEFT) {
      if (
        mouseX >= this.x &&
        mouseX <= this.x + this.size &&
        mouseY >= this.y &&
        mouseY <= this.y + this.size
      ) {
        selectedTower = this;
      }
    }
  }
  GetTarget() {
    this.attackdelay++;
    if (this.attackdelay >= this.AttackSpeed * 60) {
      let nearestDistance = this.radius;
      let nearestEnemy;
      for (let i = 0; i < Enemies.length; i++) {
        const distance = dist(
          this.x,
          this.y,
          Enemies[i].x - Enemies[i].h / 2,
          Enemies[i].y - Enemies[i].h / 2
        );
        if (distance <= this.radius && distance < nearestDistance) {
          this.attackdelay = 0;
          nearestEnemy = Enemies[i];
          nearestDistance = distance;
        }
      }
      if (nearestEnemy) {
        Bullets.push(
          MakeBullet(
            this.x + this.size / 2,
            this.y + this.size / 2,
            nearestEnemy.x + this.size / 2,
            nearestEnemy.y + this.size / 2,
            50
          )
        );
        nearestDistance = 0;
        nearestEnemy.health -= this.damage;
        if (nearestEnemy.health <= 0) {
          GameMoney += nearestEnemy.orginalHealth;
          let index = Enemies.indexOf(nearestEnemy);
          Enemies.splice(index, 1);
          nearestEnemy = null;
          this.KillCount++;
        }
        nearestEnemy = null;
      }
    }
  }
}

class BasicTower extends Tower {
  constructor() {
    super();
    this.name = "Soilder";
    this.size = 30;
    this.damage = 1.0;
    this.TowerPrice = 200;
    this.radius = 100;
    this.colorG = 150;
    this.SellPrice = 175;
    this.AttackSpeed = 1;
    this.Upgrade = [
      1.0,
      0.7,
      120,
      200,
      2.0,
      0.5,
      150,
      600,
      2.5,
      0.2,
      175,
      1000,
    ];
  }
  show() {
    fill(this.colorR, this.colorG, this.colorB);
    square(this.x, this.y, this.size);
    circle(this.x + this.size / 2, this.y + this.size / 2, this.size);
    fill(255, 255, 255);
    text(this.Level, this.x + this.size / 2 - 6, this.y + this.size / 2 + 6);
  }
}

class SniperTower extends Tower {
  constructor() {
    super();
    this.name = "Sniper";
    this.size = 30;
    this.damage = 3;
    this.TowerPrice = 200;
    this.colorG = 100;
    this.radius = 200;
    this.SellPrice = 175;
    this.AttackSpeed = 1.7;
    this.Upgrade = [6, 1.3, 300, 600, 8, 0.5, 350, 1200, 10, 0.1, 400, 3000];
  }
  show() {
    fill(this.colorR, this.colorG, this.colorB);
    square(this.x, this.y, this.size);
    fill(255, 0, 0);
    circle(this.x + this.size / 2, this.y + this.size / 2, this.size);
    line(
      this.x + this.size / 2,
      this.y,
      this.x + this.size / 2,
      this.y + this.size
    );
    line(
      this.x,
      this.y + this.size / 2,
      this.x + this.size,
      this.y + this.size / 2
    );
    fill(255, 255, 255);
    text(this.Level, this.x + this.size / 2 - 6, this.y + this.size / 2 + 6);
  }
}

class MachinegunTower extends Tower {
  constructor() {
    super();
    this.name = "Machine gun";
    this.size = 30;
    this.damage = 0.2;
    this.TowerPrice = 600;
    this.colorB = 200;
    this.radius = 200;
    this.SellPrice = 400;
    this.AttackSpeed = 0.3;
    this.Upgrade = [
      0.3,
      0.1,
      200,
      300,
      0.5,
      0.05,
      250,
      600,
      1,
      0.01,
      300,
      1000,
    ];
  }
  show() {
    fill(this.colorR, this.colorG, this.colorB);
    square(this.x, this.y, this.size);
    circle(this.x + this.size / 2, this.y + this.size / 2, this.size);
    fill(255, 255, 255);
    text(this.Level, this.x + this.size / 2 - 6, this.y + this.size / 2 + 6);
  }
}

class MissleTower extends Tower {
  constructor() {
    super();
    this.name = "Missle Tower";
    this.size = 40;
    this.damage = 2;
    this.TowerPrice = 1200;
    this.radius = 150;
    this.SellPrice = 200;
    this.AttackSpeed = 2;
    this.Upgrade = [5, 1.5, 200, 600, 10, 1, 250, 600, 15, 0.5, 300, 1000];
  }

  GetTarget() {
    this.attackdelay++;
    if (this.attackdelay >= this.AttackSpeed * 60) {
      let nearestDistance = Infinity;
      let nearestEnemy;
      for (let i = 0; i < Enemies.length; i++) {
        let distance = dist(
          this.x,
          this.y,
          Enemies[i].x - Enemies[i].h / 2,
          Enemies[i].y - Enemies[i].h / 2
        );
        if (distance <= this.radius && distance < nearestDistance) {
          this.attackdelay = 0;
          nearestEnemy = Enemies[i];
          nearestDistance = distance;
        }
      }

      if (nearestEnemy) {
        nearestEnemy.health -= this.damage;
        for (let i = 0; i < Enemies.length; i++) {
          let distance = dist(
            nearestEnemy.x,
            nearestEnemy.y,
            Enemies[i].x - Enemies[i].h / 2,
            Enemies[i].y - Enemies[i].h / 2
          );
          if (distance <= 50) {
            Enemies[i].health -= this.damage;
            if (Enemies[i].health <= 0) {
              GameMoney += Enemies[i].orginalHealth;
              let index = Enemies.indexOf(Enemies[i]);
              Enemies.splice(index, 1);
              this.KillCount++;
            }
          }
        }
        if (nearestEnemy.health <= 0) {
          GameMoney += nearestEnemy.orginalHealth;
          let index = Enemies.indexOf(nearestEnemy);
          Enemies.splice(index, 1);
          nearestEnemy = null;
          this.KillCount++;
        }
      }
    }
  }

  show() {
    fill(this.colorR, this.colorG, this.colorB);
    square(this.x, this.y, this.size);
    circle(this.x + this.size / 2, this.y + this.size / 2, this.size);
    fill(255, 255, 255);
    text(this.Level, this.x + this.size / 2 - 6, this.y + this.size / 2 + 6);
  }
}


class DroneTower extends Tower {
  constructor() {
    super();
    this.EnemySize = 0
    this.name = "Drone";
    this.size = 50;
    this.damage = 1;
    this.TowerPrice = 1500;
    this.radius = 50;
    this.SellPrice = 1200;
    this.AttackSpeed = 0.3 ;
    this.colorR = 200;
    this.colorG = 200;
    this.Upgrade = [1, 0.3, 50, 600, 1, 0.3, 50, 1200, 1, 0.3, 50, 2000];
    this.CX = 250;
    this.CY = 250;
  }

  GetTarget() {
    this.attackdelay++;
    if (Enemies[0] != null) {
      //Coordinates of the target point on the path
      let targetX = Enemies[0].x;
      let targetY = Enemies[0].y;

      //Calculates the difference between the enemy's current position and the target point
      let dx = (targetX - (Enemies[0].h / 2)) - this.CX;
      let dy = (targetY - (Enemies[0].h / 2)) - this.CY;
      let distance = sqrt(dx * dx + dy * dy);

      //Moves the enemy closer to the target point
      this.CX += (dx * 50) / (distance * 10);
      this.CY += (dy * 50) / (distance * 10);
      this.EnemySize = Enemies[0].h; 
      if(this.CX <= targetX + this.radius && this.CY <= targetY + this.radius && this.attackdelay >= this.AttackSpeed * 60){
        this.attackdelay = 0;
        Enemies[0].health -= this.damage;
        if (Enemies[0].health <= 0) {
          GameMoney += Enemies[0].orginalHealth;
          let index = Enemies.indexOf(Enemies[0]);
          Enemies.splice(index, 1);
          this.KillCount++;
        }
      }
    }
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
  }

  show() {
    fill(this.colorR, this.colorG, this.colorB);
    square(this.x, this.y, this.size);
    circle(this.x + this.size / 2, this.y + this.size / 2, this.size);
    fill(255, 255, 255);
    text(this.Level, this.x + this.size / 2 - 6, this.y + this.size / 2 + 6);
  }
}
