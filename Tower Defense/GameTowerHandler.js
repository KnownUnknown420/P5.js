let PlacedTowers = [];
let Bullets = [];
let Lighting = [];
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
  for (let i = Lighting.length - 1; i >= 0; i--) {
    Lighting[i].makeLighting();
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

class LightingBolt {
  constructor(Enemy, X, Y) {
    this.X = X;
    this.Y = Y;
    this.Enemy = Enemy;
    this.Counter = 0;
  }
  makeLighting() {
    this.Counter++;
    if (this.Counter <= 10) {
      line(
        this.X,
        this.Y,
        this.Enemy.x + Center(this.Enemy.h),
        this.Enemy.y + Center(this.Enemy.h)
      );
    } else {
      Lighting.splice(Lighting.indexOf(this), 1);
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
    this.x = mouseX - Center(this.size);
    this.y = mouseY - Center(this.size);
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
      this.x + Center(this.size),
      this.y + Center(this.size),
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
      this.EnemiesInRange = [];
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
          this.EnemiesInRange.push(IndexOfEnemy);
        }
      }
      for (let i = 0; i < this.EnemiesInRange.length; i++) {
        if (this.TargetMode == "first") {
          this.NearestEnemy = this.EnemiesInRange[0];
          this.NearestDistance = distance;
          this.attackdelay = 0;
        }
        if (this.TargetMode == "last") {
          this.NearestEnemy = this.EnemiesInRange[
            this.EnemiesInRange.length - 1
          ];
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
          this.x + Center(this.size),
          this.y + Center(this.size),
          this.NearestEnemy.x + Center(this.size),
          this.NearestEnemy.y + Center(this.size),
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
    circle(this.x + Center(this.size), this.y + Center(this.size), this.size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.x + Center(this.size) - 6,
      this.y + Center(this.size) + 6
    );
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
    circle(this.x + Center(this.size), this.y + Center(this.size), this.size);
    line(
      this.x + Center(this.size),
      this.y,
      this.x + Center(this.size),
      this.y + this.size
    );
    line(
      this.x,
      this.y + Center(this.size),
      this.x + this.size,
      this.y + Center(this.size)
    );
    fill(255, 255, 255);
    text(
      this.Level,
      this.x + Center(this.size) - 6,
      this.y + Center(this.size) + 6
    );
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
    circle(this.x + Center(this.size), this.y + Center(this.size), this.size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.x + Center(this.size) - 6,
      this.y + Center(this.size) + 6
    );
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
    circle(this.x + Center(this.size), this.y + Center(this.size), this.size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.x + Center(this.size) - 6,
      this.y + Center(this.size) + 6
    );
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
    circle(this.x + Center(this.size), this.y + Center(this.size), this.size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.x + Center(this.size) - 6,
      this.y + Center(this.size) + 6
    );
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
  }
}

class WizardTower extends Tower {
  constructor() {
    super();
    this.EnemySize = 0;
    this.name = "Wizard";
    this.size = 30;
    this.damage = 1;
    this.TowerPrice = 1500;
    this.radius = 150;
    this.SellPrice = 1200;
    this.AttackSpeed = 0.9;
    this.Upgrade = [1.5, 0.7, 150, 400, 3, 0.5, 200, 700, 5, 0.3, 250, 900];
    this.DamageType = ["camo"];
    this.timer = 0;
    this.shooting = false;
  }

  Attack() {
    if (this.NearestEnemy) {
      let FirstEnemy = Enemies.indexOf(this.NearestEnemy);
      let Enemy2 = Enemies[FirstEnemy + 1];
      let Enemy3 = Enemies[FirstEnemy + 2];
      if (this.TargetMode == "first") {
        if (Enemy2 != null) {
          Lighting.push(
            new LightingBolt(
              Enemy2,
              this.x + Center(this.size),
              this.y + Center(this.size)
            )
          );
          Enemy2.health -= this.damage;
          if (Enemy2.health <= 0) {
            GameMoney += Enemy2.orginalHealth;
            let index = Enemies.indexOf(Enemy2);
            Enemies.splice(index, 1);
            this.KillCount++;
          }
        }
        if (Enemy3 != null) {
          Lighting.push(
            new LightingBolt(
              Enemy3,
              this.x + Center(this.size),
              this.y + Center(this.size)
            )
          );
          Enemy3.health -= this.damage;
          if (Enemy3.health <= 0) {
            GameMoney += Enemy3.orginalHealth;
            let index = Enemies.indexOf(Enemy3);
            Enemies.splice(index, 1);
            this.KillCount++;
          }
        }

        Lighting.push(
          new LightingBolt(
            this.NearestEnemy,
            this.x + Center(this.size),
            this.y + Center(this.size)
          )
        );
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

  Show() {
    fill(this.colorR, this.colorG, this.colorB);
    square(this.x, this.y, this.size);
    circle(this.x + Center(this.size), this.y + Center(this.size), this.size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.x + Center(this.size) - 6,
      this.y + Center(this.size) + 6
    );
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
  }
}
