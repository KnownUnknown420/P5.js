//This File contains a bullet class.
//This class is used to create Bullet Particle for all the towers.
//Towers, like the wizard tower, that require a special animation, get a extended class.

//Bullet class is created
class Bullet {
  //It is constructed with:
  constructor(startX, startY, targetX, targetY, speed) {
    this.X = startX;
    this.Y = startY;
    this.Speed = speed;
    this.TargetX = targetX;
    this.TargetY = targetY;
    this.ReachedTarget = false; //Reached target is for when the bullet reaches it end goal
  }

  //Update is used to change the position of the bullet
  //Gets the Distance from the bullet and then adds the diistance to the target / Steps
  //Steps is the Distance / speed. This is used to account for the speed
  //Otherwise the bullet woud never reach its target
  //This is because the speed adds a set value to the position everytime (DistanceX / Steps)
  update() {
    if (!this.ReachedTarget) {
      let DX = this.TargetX - this.X;
      let DY = this.TargetY - this.Y;
      let Distance = sqrt(DX * DX + DY * DY);
      let Steps = Distance / this.Speed;
      this.X += DX / Steps;
      this.Y += DY / Steps;

      //If the bullet has reached its target:
      if (Distance < this.Speed) {
        this.ReachedTarget = true; //Saying the bullet as reached its target
      }
    }
  }

  //Display is used to show the bullet on the screen
  //Checks if reachedTarget == false first,
  //Then draws a bullet, in this case, a point
  //It also changes the stroke weight to make the bullet more visible to the user
  display() {
    if (!this.ReachedTarget) {
      strokeWeight(5);
      point(this.X, this.Y);
      strokeWeight(1);
    }
  }
}

//This is a special bullet type
//The wizard tower shoots three diffrent "lighting bolts"
//A line is connected between the Wizard tower's center and the enemy's center
//I wanted it to be diffrent than a normal bullet, so the LightBolt class was created
//Counter was made to keep the line on screen for a certin amount of time
class LightingBolt extends Bullet {
  constructor(Enemy, X, Y) {
    super();
    this.X = X;
    this.Y = Y;
    this.Enemy = Enemy;
    this.Counter = 0;
  }

  //update() is changed so counter is Increment
  update() {
    this.Counter++;
  }

  //display() checks to see if the counter is less then 10
  //then draws a line with the passed arguments
  //otherwise, reachedTarget is changed to true,
  display() {
    if (this.Counter <= 10) {
      strokeWeight(3);
      line(
        this.X,
        this.Y,
        this.Enemy.X + Center(this.Enemy.H),
        this.Enemy.Y + Center(this.Enemy.H)
      );
    } else {
      this.ReachedTarget = true;
    }
  }
}
