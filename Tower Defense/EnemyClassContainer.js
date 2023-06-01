//The file contains all the Enemy classes and there subclasses
//Each Enemy has a custom show() class
//Enemys can also be classfied as a "blimp", or a large egg like object

//Spawn Check is used for placing the tower,
//Checks if a tower is selected
let SpawnCheck = false;

//This is the main enemy class
class Enemy {
  //This is the defualt settings for the enemy
  constructor() {
    this.H = 30;
    this.X = 0;
    this.Y = 0;
    this.Speed = 30;
    this.ActualSpeed = this.Speed;
    this.CurrentPoint = 0;
    this.Health = 1;
    this.OrginalHealth = this.Health;
    this.SpecialType = ["none"];
    this.CanRegen = false;
    this.RegenCounter = 0;
    this.Blimp = false;
    this.Turning = false;
    this.ColorR = 255;
    this.ColorB = 255;
    this.ColorG = 255;
    this.RainbowColor = 0;
    this.RainbowCheck = false;
    this.FrozenAmount = 0;
    this.FrozenClock = 10;
    this.Frozen = false;
    this.HealthDoubled = false;
  }

  //Moves the enemy along the path
  //Uses the PathPoints array to find the point the enemy needs to move upon
  //Sets a TargetX and TargetY and finds the distance from the itself and the point
  //It then moves itself towards the target
  //Once it reaches the point, it will set the new target to the next pathpoint
  //Repeat this untill there are no path points
  //Remove health from the game health for each enemy that crossed the end point
  move() {
    if (this.ActualSpeed <= 3) {
      this.ActualSpeed = 3;
    }

    let TargetX = PathPoints[this.CurrentPoint * 2];
    let TargetY = PathPoints[this.CurrentPoint * 2 + 1];
    let DX = TargetX - this.X;
    let DY = TargetY - this.Y;
    let Distance = sqrt(DX * DX + DY * DY);

    this.X += (DX * this.ActualSpeed) / (Distance * 10);
    this.Y += (DY * this.ActualSpeed) / (Distance * 10);

    if (floor(Distance) <= 1 + this.Speed / 5) {
      this.X = TargetX;
      this.Y = TargetY;
      this.CurrentPoint++;

      if (this.CurrentPoint >= PathPoints.length / 2) {
        let index = Enemies.indexOf(this);
        Enemies.splice(index, 1);
        GameHealth--;
      }
    }
    if (this.Y == TargetY) {
      this.Turning = true;
    } else {
      this.Turning = false;
    }
  }

  //Displays the enemy on the canvas
  //Increments the RainbowColor based on the direction of counting
  //If RainbowColor is equal to 0, add to RainbowColor
  //Otherwise, subtract from RainbowColor
  //It then sets the fill to the set RGB Values, this is done regardless of the towers type
  //Based on the type of the tower, it will change the RGB effect
  //It also checks if the tower is classfied as a blimp, changing it into a big egg
  //most likely used for bosses
  show() {
    if (this.RainbowCheck == false) {
      this.RainbowColor += 15;
    } else {
      this.RainbowColor -= 15;
    }
    if (this.RainbowColor >= 255 || this.RainbowColor <= 0) {
      this.RainbowCheck = !this.RainbowCheck;
    }

    fill(this.ColorR, this.ColorG, this.ColorB);

    if (this.SpecialType.includes("camo")) {
      fill(this.RainbowColor, this.ColorG, this.RainbowColor);
    }

    if (this.SpecialType.includes("tank")) {
      fill(this.RainbowColor, 0, this.RainbowColor);
    }
    if (
      this.SpecialType.includes("camo") &&
      this.SpecialType.includes("tank")
    ) {
      fill(this.RainbowColor, 0, 0);
    }
    if (this.HealthDoubled == true) {
      fill(0);
    }

    if (this.Blimp == true) {
      if (this.Turning == true) {
        ellipse(this.X + Center(this.H), this.Y + Center(this.H), 80, 50);
      } else {
        ellipse(this.X + Center(this.H), this.Y + Center(this.H), 50, 80);
      }
    } else {
      if (this.CanRegen == true) {
        heart(this.X + Center(this.H), this.Y, this.H);
      } else
        ellipse(
          this.X + Center(this.H),
          this.Y + Center(this.H),
          this.H,
          this.H
        );
    }
  }

  //Draws the health of the Enemy
  //Checks to see if the health is not equal
  //Makes it so it doesnt show if the orginal health and health are the same
  //Draws an outter rectangle and a innerrectangle, the heath bar
  //Position of the outter bar is based on size and position of the Enemy
  //Position of the innerhealth bar is based on health and width of the outer bar
  showHealth() {
    if (this.Health != this.OrginalHealth) {
      fill(50, 50, 50, 120);
      rect(this.X - 13, this.Y - 13, this.H + 26, 7);

      fill(255, 0, 0, 200); //health bar
      rect(
        this.X - 13,
        this.Y - 13,
        (this.Health / this.OrginalHealth) * (this.H + 26),
        5
      );
    }
  }

  //This makes the enemy speed / 2 if the tower is hit with the
  //reeze Debuff from the freeze tower
  DebuffHandler() {
    this.ActualSpeed = this.Speed;
    if (this.Frozen == true) {
      this.FrozenClock++;
      this.ActualSpeed = this.Speed / 3;
      if (this.FrozenClock >= this.FrozenAmount) {
        this.FrozenClock = 0;
        this.Frozen = false;
      }
    }
  }

  //This sets up the regen types of enemies
  //Regen just return 20% of the orginal health
  //Also checks to make sure that the current health is not
  //More then the orginal health
  RegenHandler() {
    if (this.CanRegen == true) {
      this.RegenCounter++;
      if (this.RegenCounter == 100) {
        if (this.Health < this.OrginalHealth) {
          this.Health += this.OrginalHealth / 4;
        }
      }
      this.RegenCounter = 0;
      if (this.Health > this.OrginalHealth) {
        this.Health = this.OrginalHealth;
      }
    }
  }

  //Dynamicly Sets the health of the enemy, based on the wave
  //Starts easy, then should get harder and harder
  SetHealth() {
    let Middle;
    if (WaveCount > 40) {
      Middle = floor(1 + (WaveCount - 1) * 1.5);
    } else {
      Middle = floor(1 + (WaveCount - 1) * 2.5);
    }
    if (WaveCount >= 20) {
      this.Health = floor(random(Middle, Middle + 11));
    } else {
      this.Health = Middle;
    }
    if (this.Health <= 0) {
      this.Health = 1;
    }

    if (this.Blimp == true) {
      this.Health *= 3;
    }

    if (this.HealthDoubled == true) {
      this.Health *= 2;
    }

    if (this.wtf == true) {
      this.Health *= 10;
    }
    this.OrginalHealth = this.Health;
  }
}

//These are all custom classes that all extend enemy
//Very Simple and easy to make
//Special Types can be added and removed here
//Combining Special types is allowed
//Health and Speed are passed in throught the enemy spawning functions
//I wanted to be able to controll the health and speed
class Soldier extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
  }
}

class Camo extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.SpecialType = ["camo"];
  }
}

class Tank extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.SpecialType = ["tank"];
  }
}

class CamoTank extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.SpecialType = ["camo", "tank"];
  }
}

//Enemies that can regen
class Regen extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.CanRegen = true;
  }
}

class RegenCamo extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.SpecialType = ["camo"];
    this.CanRegen = true;
  }
}

class RegenTank extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.SpecialType = ["tank"];
    this.CanRegen = true;
  }
}
class RegenCamoTank extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.SpecialType = ["camo", "tank"];
    this.CanRegen = true;
  }
}

//Blimp Types
class Blimp extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.Blimp = true;
  }
}

class CamoBlimp extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.Blimp = true;
    this.SpecialType = ["camo"];
  }
}

class TankBlimp extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.Blimp = true;
    this.SpecialType = ["tank"];
  }
}

class CamoTankBlimp extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.Blimp = true;
    this.SpecialType = ["camo", "tank"];
  }
}

//Blimp Types
class DoubleBlimp extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.Blimp = true;
    this.HealthDoubled = true;
  }
}

class WTF extends Enemy {
  constructor(Speed) {
    super();
    this.Speed = Speed;
    this.Blimp = true;
    this.wtf = true;
    this.SpecialType = ["camo", "tank"];
  }
}
