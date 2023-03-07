let PlacedTowers = [];
let Bullets = [];
let selectedTower = false;

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
      PlacedTowers[i].Show();
      PlacedTowers[i].CheckForMouse();
      if (GamePaused == false) {
        PlacedTowers[i].GetTarget();
        PlacedTowers[i].Attack();
      }
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

class Bullet {
  constructor(startX, startY, targetX, targetY, speed) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.targetX = targetX;
    this.targetY = targetY;
    this.reachedTarget = false;
  }

  update() {
    if (!this.reachedTarget) {
      let dx = this.targetX - this.x;
      let dy = this.targetY - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let steps = distance / this.speed;
      this.x += dx / steps;
      this.y += dy / steps;

      if (distance < this.speed) {
        this.reachedTarget = true;
      }
    }
  }

  display() {
    if (!this.reachedTarget) {
      strokeWeight(5);
      point(this.x, this.y);
      strokeWeight(1);
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
    this.DamageType = ["none"];
    this.TargetMode = "first";
    this.NearestEnemy = null;
    this.NearestDistance = Infinity;
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

  Show() {
    console.log("Warning: No show method for " + this.name + " found");
  }
  showRange() {
    fill(this.colorR, this.colorG, this.colorB, 50);
    circle(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.radius * 2 + 15
    );
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
      let EnemiesInRange = [];
      let distance;
      this.NearestDistance = this.radius;
      for (let i = 0; i < Enemies.length; i++) {
        let IndexOfEnemy = Enemies[i];
        distance = dist(
          this.x,
          this.y,
          IndexOfEnemy.x + IndexOfEnemy.h / 2,
          IndexOfEnemy.y + IndexOfEnemy.h / 2
        );
        if (
          distance <= this.radius &&
          CheckSpecialType(this.DamageType, IndexOfEnemy.specialType)
        ) {
          EnemiesInRange.push(IndexOfEnemy);
        }
      }
      for (let i = 0; i < EnemiesInRange.length; i++) {
        if (this.TargetMode == "first") {
          this.NearestEnemy = EnemiesInRange[0];
          this.NearestDistance = distance;
          this.attackdelay = 0;
        }
        if (this.TargetMode == "last") {
          this.NearestEnemy = EnemiesInRange[EnemiesInRange.length - 1];
          this.NearestDistance = distance;
          this.attackdelay = 0;
        }
      }
    }
  }

  Attack() {
    if (this.NearestEnemy) {
      Bullets.push(
        new Bullet(
          this.x + this.size / 2,
          this.y + this.size / 2,
          this.NearestEnemy.x + this.size / 2,
          this.NearestEnemy.y + this.size / 2,
          50
        )
      );
      this.NearestDistance = 0;
      this.NearestEnemy.health -= this.damage;
      if (this.NearestEnemy.health <= 0) {
        GameMoney += this.NearestEnemy.orginalHealth;
        let index = Enemies.indexOf(this.NearestEnemy);
        Enemies.splice(index, 1);
        this.NearestEnemy = null;
        this.KillCount++;
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
    this.DamageType = ["none"];
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
  Show() {
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
    this.DamageType = ["tank"];
    this.Upgrade = [6, 1.3, 300, 600, 8, 0.5, 350, 1200, 10, 0.1, 400, 3000];
  }
  Show() {
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
    this.DamageType = ["none"];
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
  Show() {
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
    this.name = "Tank";
    this.size = 40;
    this.damage = 2;
    this.TowerPrice = 1200;
    this.radius = 150;
    this.SellPrice = 200;
    this.AttackSpeed = 2;
    this.DamageType = ["tank"];
    this.Upgrade = [5, 1.5, 200, 600, 10, 1, 250, 600, 15, 0.5, 300, 1000];
  }
  Show() {
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
    this.EnemySize = 0;
    this.name = "Drone";
    this.size = 50;
    this.damage = 1;
    this.TowerPrice = 1500;
    this.radius = 50;
    this.SellPrice = 1200;
    this.AttackSpeed = 0.3;
    this.colorR = 200;
    this.colorG = 200;
    this.Upgrade = [1, 0.1, 50, 600, 2, 0.07, 50, 1200, 3, 0.01, 50, 2500];
    this.CX = 250;
    this.CY = 250;
    this.DamageType = ["camo"];
  }

  GetTarget() {
    this.attackdelay++;
    if (Enemies[0] != null) {
      //Coordinates of the target point on the path
      let targetX = Enemies[0].x;
      let targetY = Enemies[0].y;

      //Calculates the difference between the enemy's current position and the target point
      let dx = targetX - Enemies[0].h / 2 - this.CX;
      let dy = targetY - Enemies[0].h / 2 - this.CY;
      let distance = sqrt(dx * dx + dy * dy);

      //Moves the enemy closer to the target point
      this.CX += (dx * 50) / (distance * 10);
      this.CY += (dy * 50) / (distance * 10);
      this.EnemySize = Enemies[0].h;
      if (
        this.CX <= targetX + this.radius &&
        this.CY <= targetY + this.radius &&
        this.attackdelay >= this.AttackSpeed * 60 &&
        CheckSpecialType(this.DamageType, Enemies[0].specialType)
      ) {
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
  }

  Show() {
    fill(this.colorR, this.colorG, this.colorB);
    square(this.x, this.y, this.size);
    circle(this.x + this.size / 2, this.y + this.size / 2, this.size);
    fill(255, 255, 255);
    text(this.Level, this.x + this.size / 2 - 6, this.y + this.size / 2 + 6);
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
  }
}
