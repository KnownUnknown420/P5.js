//This File, being on the the biggest Files, Contains all tower code
//The Tower Class, along with all the other types of towers are contained here. 

//Firstly we need to know if we have selected a tower
//This is mostly used for upgrades and showing the range
let selectedTower = false;

//We First Create the Tower Class
//This class is used across all other tower types
class Tower {
  constructor() {
    this.Name = "Tower";
    this.Size = 1;
    this.Damage = 1;
    this.ColorR = 0;
    this.ColorG = 0;
    this.ColorB = 0;
    this.TowerPlaced = false;
    this.TowerPrice = 0;
    this.Radius = 150;
    this.AttackSpeed = 1000;
    this.SellPrice = 175;
    this.Level = 1;
    this.AttackDelay = 0;
    this.KillCount = 0;
    this.EffectiveDamage = ["none"];
    this.TargetMode = "first";
    this.NearestEnemy = null;
    this.NearestDistance = Infinity;
    this.EnemiesInRange = [];
  }

  PushToList() {
    PlacedTowers.push(this);
  }
  PlaceTower() {
    this.X = mouseX - Center(this.Size);
    this.Y = mouseY - Center(this.Size);
    let towerRect = {
      x: this.X,
      y: this.Y,
      w: this.Size,
      h: this.Size,
    };

    let canPlaceTower = true;
    if (
      this.X >= 0 &&
      this.X <= 550 - this.Size &&
      this.Y >= 0 &&
      this.Y <= 600 - this.Size
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
        x: PlacedTowers[i].X,
        y: PlacedTowers[i].Y,
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
      fill(this.ColorR, this.ColorG, this.ColorB);
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
    square(this.X, this.Y, this.Size);
    this.showRange();
  }

  Show() {
    console.log("Warning: No show method for " + this.Name + " found");
  }
  showRange() {
    fill(this.ColorR, this.ColorG, this.ColorB, 50);
    circle(
      this.X + Center(this.Size),
      this.Y + Center(this.Size),
      this.Radius * 2 + 15
    );
  }
  CheckForMouse() {
    if (mouseIsPressed && mouseButton === LEFT) {
      if (
        mouseX >= this.X &&
        mouseX <= this.X + this.Size &&
        mouseY >= this.Y &&
        mouseY <= this.Y + this.Size
      ) {
        selectedTower = this;
      }
    }
  }

  GetTarget() {
    this.AttackDelay++;
    if (this.AttackDelay >= this.AttackSpeed * 60) {
      this.EnemiesInRange = [];
      let distance;
      this.NearestDistance = this.Radius;
      for (let i = 0; i < Enemies.length; i++) {
        let IndexOfEnemy = Enemies[i];
        distance = dist(
          this.X,
          this.Y,
          IndexOfEnemy.X + IndexOfEnemy.H / 2,
          IndexOfEnemy.Y + IndexOfEnemy.H / 2
        );
        if (
          distance <= this.Radius &&
          CheckSpecialType(this.EffectiveDamage, IndexOfEnemy.SpecialType)
        ) {
          this.EnemiesInRange.push(IndexOfEnemy);
        }
      }
      for (let i = 0; i < this.EnemiesInRange.length; i++) {
        if (this.TargetMode == "first") {
          this.NearestEnemy = this.EnemiesInRange[0];
          this.NearestDistance = distance;
          this.AttackDelay = 0;
        }
        if (this.TargetMode == "last") {
          this.NearestEnemy = this.EnemiesInRange[
            this.EnemiesInRange.length - 1
          ];
          this.NearestDistance = distance;
          this.AttackDelay = 0;
        }
      }
    }
  }

  Attack() {
    if (this.NearestEnemy) {
      Attacks.push(
        new Bullet(
          this.X + Center(this.Size),
          this.Y + Center(this.Size),
          this.NearestEnemy.X + Center(this.Size),
          this.NearestEnemy.Y + Center(this.Size),
          50
        )
      );
      this.NearestDistance = 0;
      this.NearestEnemy.Health -= this.Damage;
      if (this.NearestEnemy.Health <= 0) {
        GameMoney += this.NearestEnemy.OrginalHealth;
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
    this.Name = "Soilder";
    this.Size = 30;
    this.Damage = 1.0;
    this.TowerPrice = 200;
    this.Radius = 100;
    this.ColorG = 150;
    this.SellPrice = 175;
    this.AttackSpeed = 1;
    this.EffectiveDamage = ["none"];
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
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    circle(this.X + Center(this.Size), this.Y + Center(this.Size), this.Size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

class SniperTower extends Tower {
  constructor() {
    super();
    this.Name = "Sniper";
    this.Size = 30;
    this.Damage = 3;
    this.TowerPrice = 200;
    this.ColorG = 100;
    this.Radius = 200;
    this.SellPrice = 175;
    this.AttackSpeed = 1.7;
    this.EffectiveDamage = ["tank"];
    this.Upgrade = [6, 1.3, 300, 600, 8, 0.5, 350, 1200, 10, 0.1, 400, 3000];
  }
  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    fill(255, 0, 0);
    circle(this.X + Center(this.Size), this.Y + Center(this.Size), this.Size);
    line(
      this.X + Center(this.Size),
      this.Y,
      this.X + Center(this.Size),
      this.Y + this.Size
    );
    line(
      this.X,
      this.Y + Center(this.Size),
      this.X + this.Size,
      this.Y + Center(this.Size)
    );
    fill(255, 255, 255);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

class MachinegunTower extends Tower {
  constructor() {
    super();
    this.Name = "Machine gun";
    this.Size = 30;
    this.Damage = 0.2;
    this.TowerPrice = 600;
    this.ColorB = 200;
    this.Radius = 200;
    this.SellPrice = 400;
    this.AttackSpeed = 0.3;
    this.EffectiveDamage = ["none"];
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
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    circle(this.X + Center(this.Size), this.Y + Center(this.Size), this.Size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

class MissleTower extends Tower {
  constructor() {
    super();
    this.Name = "Tank";
    this.Size = 40;
    this.Damage = 2;
    this.TowerPrice = 1200;
    this.Radius = 150;
    this.SellPrice = 200;
    this.AttackSpeed = 2;
    this.EffectiveDamage = ["tank"];
    this.Upgrade = [5, 1.5, 200, 600, 10, 1, 250, 600, 15, 0.5, 300, 1000];
  }
  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    circle(this.X + Center(this.Size), this.Y + Center(this.Size), this.Size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

class DroneTower extends Tower {
  constructor() {
    super();
    this.EnemySize = 0;
    this.Name = "Drone";
    this.Size = 50;
    this.Damage = 1;
    this.TowerPrice = 1500;
    this.Radius = 50;
    this.SellPrice = 1200;
    this.AttackSpeed = 0.3;
    this.ColorR = 200;
    this.ColorG = 200;
    this.Upgrade = [1, 0.1, 50, 600, 2, 0.07, 50, 1200, 3, 0.01, 50, 2500];
    this.CX = 250;
    this.CY = 250;
    this.EffectiveDamage = ["camo"];
  }

  GetTarget() {
    this.AttackDelay++;
    if (Enemies[0] != null) {
      //Coordinates of the target point on the path
      let targetX = Enemies[0].X;
      let targetY = Enemies[0].Y;

      //Calculates the difference between the enemy's current position and the target point
      let dx = targetX - Enemies[0].H / 2 - this.CX;
      let dy = targetY - Enemies[0].H / 2 - this.CY;
      let distance = sqrt(dx * dx + dy * dy);

      //Moves the enemy closer to the target point
      this.CX += (dx * 50) / (distance * 10);
      this.CY += (dy * 50) / (distance * 10);
      this.EnemySize = Enemies[0].H;
      if (
        this.CX <= targetX + this.Radius &&
        this.CY <= targetY + this.Radius &&
        this.AttackDelay >= this.AttackSpeed * 60 &&
        CheckSpecialType(this.EffectiveDamage, Enemies[0].SpecialType)
      ) {
        this.AttackDelay = 0;
        Enemies[0].Health -= this.Damage;
        if (Enemies[0].Health <= 0) {
          GameMoney += Enemies[0].OrginalHealth;
          let index = Enemies.indexOf(Enemies[0]);
          Enemies.splice(index, 1);
          this.KillCount++;
        }
      }
    }
  }

  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    circle(this.X + Center(this.Size), this.Y + Center(this.Size), this.Size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
  }
}

class WizardTower extends Tower {
  constructor() {
    super();
    this.EnemySize = 0;
    this.Name = "Wizard";
    this.Size = 30;
    this.Damage = 1;
    this.TowerPrice = 1500;
    this.Radius = 150;
    this.SellPrice = 1200;
    this.AttackSpeed = 0.9;
    this.Upgrade = [1.5, 0.7, 150, 400, 3, 0.5, 200, 700, 5, 0.3, 250, 900];
    this.EffectiveDamage = ["camo"];
    this.Timer = 0;
    this.Shooting = false;
  }

  Attack() {
    if (this.NearestEnemy) {
      let FirstEnemy = this.EnemiesInRange.indexOf(this.NearestEnemy);
      let Enemy2 = null
      let Enemy3 = null
      if (FirstEnemy != null) {
        Enemy2 = this.EnemiesInRange[FirstEnemy + 1];
        Enemy3 = this.EnemiesInRange[FirstEnemy + 2];
      }
      if (this.TargetMode == "first") {
        if (Enemy2 != null) {
          Attacks.push(
            new LightingBolt(
              Enemy2,
              this.X + Center(this.Size),
              this.Y + Center(this.Size)
            )
          );
          Enemy2.Health -= this.Damage;
          if (Enemy2.Health <= 0) {
            GameMoney += Enemy2.OrginalHealth;
            let index = Enemies.indexOf(Enemy2);
            Enemies.splice(index, 1);
            this.KillCount++;
          }
        }
        if (Enemy3 != null) {
          Attacks.push(
            new LightingBolt(
              Enemy3,
              this.X + Center(this.Size),
              this.Y + Center(this.Size)
            )
          );
          Enemy3.Health -= this.Damage;
          if (Enemy3.Health <= 0) {
            GameMoney += Enemy3.OrginalHealth;
            let index = Enemies.indexOf(Enemy3);
            Enemies.splice(index, 1);
            this.KillCount++;
          }
        }

        Attacks.push(
          new LightingBolt(
            this.NearestEnemy,
            this.X + Center(this.Size),
            this.Y + Center(this.Size)
          )
        );
        this.NearestEnemy.Health -= this.Damage;
        if (this.NearestEnemy.Health <= 0) {
          GameMoney += this.NearestEnemy.OrginalHealth;
          let index = Enemies.indexOf(this.NearestEnemy);
          Enemies.splice(index, 1);
          this.NearestEnemy = null;
          this.KillCount++;
        }
      }
    }
  }

  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    circle(this.X + Center(this.Size), this.Y + Center(this.Size), this.Size);
    fill(255, 255, 255);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
  }
}
