//This File, being on the the biggest Files, Contains all tower code
//The Tower Class, along with all the other types of towers are contained here.
//This shit is complex, so im just going to give a basic description of each
//Its readable on its own, if you want more information

//Firstly we need to know if we have selected a tower
//This is mostly used for upgrades and showing the range
let SelectedTower = false;

//We First Create the Tower Class
//This class is used across all other tower types
class Tower {
  constructor() {
    this.Type = "Tower";
    this.Name = "Tower";
    this. Size = 1;
    this.DamageModifer = 1;
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
    //EffectiveDamage is used to check if this tower can attack certin types of towers
    //Camo can attack camo, but none cant attack camo
    this.EffectiveDamage = ["none"];
    this.TargetMode = "first";
    this.NearestEnemy = null;
    this.NearestDistance = Infinity;
    //Used to pass data from the Targeting function to the attack function
    this.EnemiesInRange = [];
    this.BoostedBy = [];
    this.BoostedEffectiveDamage = [];
  }

  //Method To push this tower into the TowersList
  PushToList() {
    PlacedTowers.push(this);
  }

  //Places Tower on the screen
  //First checks to see if the tower is not inside another tower, or the track
  //If it is inside a tower or the track, it will turn red
  //Along with disabling placing
  //Its super complex ;(
  PlaceTower() {
    this.X = mouseX - Center(this.Size);
    this.Y = mouseY - Center(this.Size);
    let TowerRect = {
      x: this.X,
      y: this.Y,
      w: this.Size,
      h: this.Size,
    };

    let CanPlaceTower = true;
    if (
      this.X >= 0 &&
      this.X <= 550 - this.Size &&
      this.Y >= 0 &&
      this.Y <= 600 - this.Size
    ) {
      CanPlaceTower = true;
    } else {
      CanPlaceTower = false;
    }

    for (let i = 0; i < TrackData.length; i = i + 4) {
      let TrackRect = {
        x: TrackData[i],
        y: TrackData[i + 1],
        w: TrackData[i + 2],
        h: TrackData[i + 3],
      };
      if (CheckRectIntersection(TowerRect, TrackRect)) {
        CanPlaceTower = false;
        break;
      }
    }

    let CurrentTower = this;
    for (let i = 0; i < PlacedTowers.length; i++) {
      let placedTowerRect = {
        x: PlacedTowers[i].X,
        y: PlacedTowers[i].Y,
        w: PlacedTowers[i].Size,
        h: PlacedTowers[i].Size,
      };
      if (
        PlacedTowers[i] !== CurrentTower &&
        CheckRectIntersection(TowerRect, placedTowerRect)
      ) {
        CanPlaceTower = false;
        break;
      }
    }
    if (CanPlaceTower) {
      fill(this.ColorR, this.ColorG, this.ColorB);
    } else {
      fill(255, 0, 0);
    }

    if (CanPlaceTower) {
      if (mouseIsPressed && mouseButton === LEFT) {
        this.TowerPlaced = true;
        DisablePlacing = false;
        GameMoney -= this.TowerPrice;
      }
    }
    square(this.X, this.Y, this.Size);
    this.showRange();
  }

  //This would be where the tower is shown
  //Because each tower hasa diffrent Apperance, this passes an error
  Show() {
    console.log("Warning: No show method for " + this.Name + " found");
  }

  //Shows the range of the tower with a range circle
  showRange() {
    fill(this.ColorR, this.ColorG, this.ColorB, 50);
    circle(
      this.X + Center(this.Size),
      this.Y + Center(this.Size),
      this.Radius * 2
    );
  }
  //Checks to see if the mouse is inside the tower
  //Setting it as the selected tower
  CheckForMouse() {
    if (mouseIsPressed && mouseButton === LEFT) {
      if (
        mouseX >= this.X &&
        mouseX <= this.X + this.Size &&
        mouseY >= this.Y &&
        mouseY <= this.Y + this.Size
      ) {
        SelectedTower = this;
      }
    }
  }

  //Gets the Target, Based on the target method, inside the tower
  //Makes sure to target a tower based on its target method
  //Example, First Enemy if the TargetMode is set to first
  //The SelectedTower is writen to this classes NearestEnemy
  //Towers that need there own Custom method
  //Are reweriten undernearth there class extention
  //The Enemy
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
          CheckSpecialType(this, IndexOfEnemy.SpecialType)
        ) {
          this.EnemiesInRange.push(IndexOfEnemy);
        }
      }
      if (this.TargetMode == "first") {
        this.NearestEnemy = this.EnemiesInRange[0];
        this.NearestDistance = distance;
        this.AttackDelay = 0;
      }
      if (this.TargetMode == "last") {
        this.NearestEnemy = this.EnemiesInRange[this.EnemiesInRange.length - 1];
        this.NearestDistance = distance;
        this.AttackDelay = 0;
      }
    }
  }

  //This is where the tower accualy attacks the enemy
  //Makes sure to check if the tower has a target first
  //Then attacks if it does
  //Resets all targeting data afterwards
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
      this.NearestEnemy.Health -= this.Damage * this.DamageModifer;
      if (this.NearestEnemy.Health <= 0) {
        GameMoney += (this.NearestEnemy.OrginalHealth / 2);
        let index = Enemies.indexOf(this.NearestEnemy);
        Enemies.splice(index, 1);
        this.KillCount++;
      }
      this.NearestEnemy = null;
    }
  }
}

//Everything after this are each tower subclass
//Most towers target the same
//But towers like the wizard tower have a diffrent targeting method
//Each tower has its own Upgrade path, this is used mostly in the shop
//Along with changing range, attackspeed, and damage
//Custom ugrades, like the wizard class, can be used in the attack class
//All towers are customized based on what the tower needs

class BasicTower extends Tower {
  constructor() {
    super();
    this.Name = "Soilder";
    this.Size = 30;
    this.Damage = 1.0;
    this.TowerPrice = 150;
    this.Radius = 120;
    this.ColorG = 150;
    this.SellPrice = 175;
    this.AttackSpeed = 0.65;
    this.EffectiveDamage = ["none"];
    this.Upgrade = [1.5, 0.5, 150, 50, 2.0, 0.2, 175, 150, 2.5, 0.05, 200, 300];
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

//This tower has its own drown that follows the first tower on the screen
//This means that has a version of the enemy move code to controll the drone
//Along with not having a targeting type becaus its always attacking the first tower
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
        CheckSpecialType(this, Enemies[0].SpecialType)
      ) {
        this.AttackDelay = 0;
        Enemies[0].Health -= this.Damage * this.DamageModifer;
        if (Enemies[0].Health <= 0) {
          GameMoney += (Enemies[0].OrginalHealth / 2);
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
    this.ColorR = 100;
    this.ColorB = 100;
    this.EnemySize = 0;
    this.Name = "Wizard";
    this.Size = 30;
    this.Damage = 1;
    this.TowerPrice = 600;
    this.Radius = 150;
    this.SellPrice = 1200;
    this.AttackSpeed = 0.9;
    this.Upgrade = [1.5, 0.7, 150, 400, 3, 0.5, 200, 700, 5, 0.3, 250, 900];
    this.EffectiveDamage = ["camo"];
    this.Timer = 0;
  }

  //This Attack Method Allows for only 2 bullets to shoot, then 3, then 4
  //Based on the level of the tower,
  //Along with targeting multiple enemies in its range
  Attack() {
    if (this.NearestEnemy) {
      let FirstEnemy = this.EnemiesInRange.indexOf(this.NearestEnemy);
      let LastEnemy = FirstEnemy;
      let Enemy2 = this.EnemiesInRange[FirstEnemy + 1];
      let Enemy3 = this.EnemiesInRange[FirstEnemy + 2];
      let Enemy4 = this.EnemiesInRange[FirstEnemy + 3];
      if (this.TargetMode == "first") {
        if (Enemy2 != null) {
          Attacks.push(
            new LightingBolt(
              this.NearestEnemy,
              Enemy2.X + Center(this.Size),
              Enemy2.Y + Center(this.Size)
            )
          );
          Attacks.push(
            new LightingBolt(
              FirstEnemy,
              LastEnemy.X + Center(this.Size),
              LastEnemy.Y + Center(this.Size)
            )
          );
          LastEnemy = Enemy2;
          Enemy2.Health -= this.Damage * this.DamageModifer;
          if (Enemy2.Health <= 0) {
            GameMoney += Enemy2.OrginalHealth / 2;
            let index = Enemies.indexOf(Enemy2);
            Enemies.splice(index, 1);
            this.KillCount++;
          }
        }
        if (this.Level >= 2 && Enemy3 != null) {
          Attacks.push(
            new LightingBolt(
              Enemy3,
              LastEnemy.X + Center(this.Size),
              LastEnemy.Y + Center(this.Size)
            )
          );
          LastEnemy = Enemy3;
          Enemy3.Health -= this.Damage * this.DamageModifer;
          if (Enemy3.Health <= 0) {
            GameMoney += Enemy3.OrginalHealth / 2;
            let index = Enemies.indexOf(Enemy3);
            Enemies.splice(index, 1);
            this.KillCount++;
          }
        }

        if (this.Level >= 4 && Enemy4 != null) {
          Attacks.push(
            new LightingBolt(
              Enemy4,
              LastEnemy.X + Center(this.Size),
              LastEnemy.Y + Center(this.Size)
            )
          );
          LastEnemy = Enemy4;
          Enemy4.Health -= this.Damage * this.DamageModifer;
          if (Enemy4.Health <= 0) {
            GameMoney += Enemy4.OrginalHealth / 2;
            let index = Enemies.indexOf(Enemy4);
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
        this.NearestEnemy.Health -= this.Damage * this.DamageModifer;
        if (this.NearestEnemy.Health <= 0) {
          GameMoney += this.NearestEnemy.OrginalHealth / 2;
          let index = Enemies.indexOf(this.NearestEnemy);
          Enemies.splice(index, 1);
          this.KillCount++;
        }
        this.NearestEnemy = null;
      }
    }
  }

  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    circle(this.X + Center(this.Size), this.Y + Center(this.Size), this.Size);
    fill(255, 255, 255);
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
    line(
      this.X,
      this.Y,
      this.X + Center(this.Size),
      this.Y + Center(this.Size)
    );
    line(
      this.X,
      this.Y + this.Size,
      this.X + Center(this.Size),
      this.Y + Center(this.Size)
    );
    line(
      this.X + this.Size,
      this.Y,
      this.X + Center(this.Size),
      this.Y + Center(this.Size)
    );
    line(
      this.X + this.Size,
      this.Y + this.Size,
      this.X + Center(this.Size),
      this.Y + Center(this.Size)
    );
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

class FreezeTower extends Tower {
  constructor() {
    super();
    this.ColorR = 173;
    this.ColorB = 216;
    this.ColorG = 230;
    this.EnemySize = 0;
    this.Name = "Wizard";
    this.Size = 30;
    this.Damage = 1;
    this.TowerPrice = 500;
    this.Radius = 50;
    this.SellPrice = 300;
    this.AttackSpeed = 0.9;
    this.Upgrade = [2, 0.7, 50, 400, 3, 0.5, 60, 700, 4, 0.3, 70, 900];
    this.EffectiveDamage = ["camo", "tank"];
  }

  //Custom method to find any towers inside, and "freeze" them
  //It just slows them down
  //very fast and effective :)
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
          CheckSpecialType(this, IndexOfEnemy.SpecialType) &&
          !this.EnemiesInRange.includes(Enemies[i])
        ) {
          Enemies[i].Frozen = true;
          Enemies[i].FrozenAmount = this.Damage * 60;
        }
      }
    }
  }

  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

class NinjaTower extends Tower {
  constructor() {
    super();
    this.ColorR = 255;
    this.ColorB = 100;
    this.EnemySize = 0;
    this.Name = "Ninja";
    this.Size = 30;
    this.Damage = 1;
    this.TowerPrice = 600;
    this.Radius = 150;
    this.SellPrice = 300;
    this.AttackSpeed = 0.3;
    this.Upgrade = [2, 0.1, 170, 700, 3, 0.05, 200, 1000, 4, 0.03, 250, 2000];
    this.EffectiveDamage = ["camo"];
  }

  Attack() {
    if (this.NearestEnemy) {
      let FirstEnemy = this.EnemiesInRange.indexOf(this.NearestEnemy);
      let Enemy2 = null;
      let Enemy3 = null;
      Enemy2 = this.EnemiesInRange[FirstEnemy + 1];
      Enemy3 = this.EnemiesInRange[FirstEnemy + 2];
      if (this.TargetMode == "first") {
        if (Enemy2 != null) {
          Attacks.push(
            new Bullet(
              this.X + Center(this.Size),
              this.Y + Center(this.Size),
              Enemy2.X + Center(this.Size),
              Enemy2.Y + Center(this.Size),
              50
            )
          );
          Enemy2.Health -= this.Damage * this.DamageModifer;
          if (Enemy2.Health <= 0) {
            GameMoney += Enemy2.OrginalHealth / 2;
            let index = Enemies.indexOf(Enemy2);
            Enemies.splice(index, 1);
            this.KillCount++;
          }
        }
        if (Enemy3 != null) {
          Attacks.push(
            new Bullet(
              this.X + Center(this.Size),
              this.Y + Center(this.Size),
              Enemy3.X + Center(this.Size),
              Enemy3.Y + Center(this.Size),
              50
            )
          );
          Enemy3.Health -= this.Damage * this.DamageModifer;
          if (Enemy3.Health <= 0) {
            GameMoney += Enemy3.OrginalHealth / 2;
            let index = Enemies.indexOf(Enemy3);
            Enemies.splice(index, 1);
            this.KillCount++;
          }
        }
        Attacks.push(
          new Bullet(
            this.X + Center(this.Size),
            this.Y + Center(this.Size),
            this.NearestEnemy.X + Center(this.Size),
            this.NearestEnemy.Y + Center(this.Size),
            50
          )
        );
        this.NearestEnemy.Health -= this.Damage * this.DamageModifer;
        if (this.NearestEnemy.Health <= 0) {
          GameMoney += this.NearestEnemy.OrginalHealth / 2;
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
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

//These Next Towers Contain Towers that Boost other towers
//Damage, Detection, Ect
//Each tower has a custome attack and sell method
//Sell method is changed in the store
class DamageTower extends Tower {
  constructor() {
    super();
    this.Name = "FOB";
    this.Type = "Booster";
    this.ColorR = 100;
    this.ColorG = 30;
    this.ColorB = 0;
    this.EnemySize = 0;
    this.Size = 30;
    this.Damage = 1.3;
    this.TowerPrice = 600;
    this.Radius = 100;
    this.SellPrice = 300;
    this.AttackSpeed = 0.3;
    this.Upgrade = [
      1.5,
      0.1,
      130,
      700,
      2,
      0.05,
      150,
      1000,
      2.5,
      0.03,
      150,
      2000,
    ];
    this.EffectiveDamage = ["none"];
    this.Selling = false;
  }

  GetTarget() {
    if (this.Selling == false) {
      let distance;
      this.NearestDistance = this.Radius;
      for (let i = 0; i < PlacedTowers.length; i++) {
        let IndexOfEnemy = PlacedTowers[i];
        distance = dist(
          this.X,
          this.Y,
          IndexOfEnemy.X + IndexOfEnemy.Size / 2,
          IndexOfEnemy.Y + IndexOfEnemy.Size / 2
        );
        if (
          distance <= this.Radius &&
          PlacedTowers[i] != this &&
          PlacedTowers[i].TowerPlaced == true
        ) {
          if (
            !PlacedTowers[i].BoostedBy.includes(this) &&
            PlacedTowers[i].Type != "Booster"
          ) {
            PlacedTowers[i].BoostedBy.push(this);
            PlacedTowers[i].DamageModifer += this.Damage;
          }
        }
      }
    }
  }

  OnUpgrade() {
    for (let i = 0; i < PlacedTowers.length; i++) {
      let IndexOfEnemy = PlacedTowers[i];
      if (
        PlacedTowers[i].BoostedBy.includes(this) &&
        PlacedTowers[i].Type != "Booster"
      ) {
        PlacedTowers[i].DamageModifer += this.Damage;
      }
    }
  }

  SellTower() {
    this.Selling = true;
    let index;
    this.NearestDistance = this.Radius;
    for (let i = 0; i < PlacedTowers.length; i++) {
      if (PlacedTowers[i].BoostedBy.includes(this)) {
        index = PlacedTowers[i].BoostedBy.indexOf(this);
        PlacedTowers[i].BoostedBy.splice(index, 1);
        PlacedTowers[i].DamageModifer -= this.Damage;
      }
    }
    index = PlacedTowers.indexOf(this);
    PlacedTowers.splice(index, 1);
    SelectedTower = false;
  }

  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

class RadarTower extends Tower {
  constructor() {
    super();
    this.Name = "Radar";
    this.Type = "Booster";
    this.ColorR = 100;
    this.ColorG = 130;
    this.ColorB = 0;
    this.EnemySize = 0;
    this.Size = 30;
    this.Damage = 0;
    this.TowerPrice = 600;
    this.Radius = 100;
    this.SellPrice = 300;
    this.AttackSpeed = 0;
    this.Upgrade = [0, 0, 130, 700, 0, 0, 150, 1000, 0, 0, 170, 2000];
    this.EffectiveDamage = ["none"];
    this.Selling = false;
  }

  GetTarget() {
    if (this.Selling == false) {
      let distance;
      this.NearestDistance = this.Radius;
      for (let i = 0; i < PlacedTowers.length; i++) {
        let IndexOfEnemy = PlacedTowers[i];
        distance = dist(
          this.X,
          this.Y,
          IndexOfEnemy.X + IndexOfEnemy.Size / 2,
          IndexOfEnemy.Y + IndexOfEnemy.Size / 2
        );
        if (
          distance <= this.Radius &&
          PlacedTowers[i] != this &&
          PlacedTowers[i].TowerPlaced == true
        ) {
          if (
            !PlacedTowers[i].BoostedBy.includes(this) &&
            PlacedTowers[i].Type != "Booster"
          ) {
            PlacedTowers[i].BoostedBy.push(this);
            PlacedTowers[i].BoostedEffectiveDamage.push("camo");
          }
        }
      }
    }
  }

  OnUpgrade() {
    //NoLongerNeeded
  }

  SellTower() {
    this.Selling = true;
    let index;
    this.NearestDistance = this.Radius;
    for (let x = 0; x < PlacedTowers.length; x++) {
      for (let i = 0; i < PlacedTowers[x].BoostedEffectiveDamage.length; i++) {
        if (PlacedTowers[x].BoostedEffectiveDamage[i] == "camo") {
          index = PlacedTowers[x].BoostedEffectiveDamage.indexOf(
            PlacedTowers[x].BoostedEffectiveDamage[i]
          );
          PlacedTowers[x].BoostedEffectiveDamage.splice(index, 1);
          index = PlacedTowers[x].BoostedBy.indexOf(this);
          PlacedTowers[x].BoostedBy.splice(index, 1);
          break;
        }
      }
    }
    index = PlacedTowers.indexOf(this);
    PlacedTowers.splice(index, 1);
    SelectedTower = false;
  }

  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}

class AntiTankTower extends Tower {
  constructor() {
    super();
    this.Name = "AntiTank";
    this.Type = "Booster";
    this.ColorR = 100;
    this.ColorG = 100;
    this.ColorB = 0;
    this.EnemySize = 0;
    this.Size = 30;
    this.Damage = 0;
    this.TowerPrice = 600;
    this.Radius = 100;
    this.SellPrice = 300;
    this.AttackSpeed = 0;
    this.Upgrade = [0, 0, 130, 700, 0, 0, 150, 1000, 0, 0, 170, 2000];
    this.EffectiveDamage = ["none"];
    this.Selling = false;
  }

  GetTarget() {
    if (this.Selling == false) {
      let distance;
      this.NearestDistance = this.Radius;
      for (let i = 0; i < PlacedTowers.length; i++) {
        let IndexOfEnemy = PlacedTowers[i];
        distance = dist(
          this.X,
          this.Y,
          IndexOfEnemy.X + IndexOfEnemy.Size / 2,
          IndexOfEnemy.Y + IndexOfEnemy.Size / 2
        );
        if (
          distance <= this.Radius &&
          PlacedTowers[i] != this &&
          PlacedTowers[i].TowerPlaced == true
        ) {
          if (
            !PlacedTowers[i].BoostedBy.includes(this) &&
            PlacedTowers[i].Type != "Booster"
          ) {
            PlacedTowers[i].BoostedBy.push(this);
            PlacedTowers[i].BoostedEffectiveDamage.push("tank");
          }
        }
      }
    }
  }

  OnUpgrade() {
    //NoLongerNeeded
  }

  SellTower() {
    this.Selling = true;
    let index;
    this.NearestDistance = this.Radius;
    for (let x = 0; x < PlacedTowers.length; x++) {
      for (let i = 0; i < PlacedTowers[x].BoostedEffectiveDamage.length; i++) {
        if (PlacedTowers[x].BoostedEffectiveDamage[i] == "tank") {
          index = PlacedTowers[x].BoostedEffectiveDamage.indexOf(
            PlacedTowers[x].BoostedEffectiveDamage[i]
          );
          PlacedTowers[x].BoostedEffectiveDamage.splice(index, 1);
          index = PlacedTowers[x].BoostedBy.indexOf(this);
          PlacedTowers[x].BoostedBy.splice(index, 1);
          break;
        }
      }
    }
    index = PlacedTowers.indexOf(this);
    PlacedTowers.splice(index, 1);
    SelectedTower = false;
  }

  Show() {
    fill(this.ColorR, this.ColorG, this.ColorB);
    square(this.X, this.Y, this.Size);
    fill(255, 255, 0);
    circle(this.CX + this.EnemySize, this.CY + this.EnemySize, 35);
    text(
      this.Level,
      this.X + Center(this.Size) - 6,
      this.Y + Center(this.Size) + 6
    );
  }
}
