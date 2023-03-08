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

class LightingBolt extends Bullet {
  constructor(Enemy, X, Y) {
    super();
    this.X = X;
    this.Y = Y;
    this.Enemy = Enemy;
    this.Counter = 0;
  }
  update() {
    this.Counter++;
  }
  display() {
    if (this.Counter <= 10) {
      line(
        this.X,
        this.Y,
        this.Enemy.x + Center(this.Enemy.h),
        this.Enemy.y + Center(this.Enemy.h)
      );
    } else {
      this.reachedTarget = true;
    }
  }
}
