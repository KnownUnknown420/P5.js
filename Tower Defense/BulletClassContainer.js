// Bullet class used to create Bullet Particle for all the towers.
// Towers, like the wizard tower, that require a special animation, get an extended class.
class Bullet {
  // Constructs a bullet with a starting position, a target position, and a speed.
  constructor(startX, startY, targetX, targetY, speed) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.targetX = targetX;
    this.targetY = targetY;
    this.reachedTarget = false; // Tracks whether the bullet has reached its target
  }

  // Updates the position of the bullet based on its speed.
  update() {
    if (!this.reachedTarget) {
      let dX = this.targetX - this.x;
      let dY = this.targetY - this.y;
      let distance = sqrt(dX * dX + dY * dY);
      let steps = distance / this.speed;
      this.x += dX / steps;
      this.y += dY / steps;

      // If the bullet has reached its target, mark it as such
      if (distance < this.speed) {
        this.reachedTarget = true;
      }
    }
  }

  // Displays the bullet on the screen as a point.
  display() {
    if (!this.reachedTarget) {
      strokeWeight(5);
      point(this.x, this.y);
      strokeWeight(1);
    }
  }
}


//This is a special bullet type
//The wizard tower shoots three diffrent "lighting bolts"
//A line is connected between the Wizard tower's center and the enemy's center
//I wanted it to be diffrent than a normal bullet, so the LightBolt class was created
//Counter was made to keep the line on screen for a certin amount of time
class LightningBolt extends Bullet {
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
