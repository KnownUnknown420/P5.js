function CreateEnemies(Type, Amount, Delay, Debounce, Health, Speed) {
  WaveQuery.push(new EnemyMaker(Type, Amount, Delay, Debounce, Health, Speed));
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
      console.log("Warning: No wave Amount defined");
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

CreateEnemies(Soilder, 100, 10, 10, 1, 30);
