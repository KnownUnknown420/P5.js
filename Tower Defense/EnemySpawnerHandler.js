//This files contains all the Enemy Creations code and functions
//Along with the EnemyMaker Class
//This class bypasses a feature of the setTimout() function
//The setTimout() function would pause all code that is ran after the function code
//Even if it was embeded inside another function
//I had to rewrite the old spawning method
//This method works, along with it preforming better

//This array contains all EnemyMaker instances
let EnemyMakerInstances = [];

//Used to loop throught all EnemyMaker Instances
//Then it runs the SpawnEnemies() Function
//Also Checks if the game is paused
//This new method of running the code allow the game to be paused
function SpawnEnemiesInEnemyMakerInstances() {
  if (EnemyMakerInstances.length != 0 && GamePaused == false) {
    for (let i = 0; i < EnemyMakerInstances.length; i++) {
      EnemyMakerInstances[i].SpawnEnemies();
    }
  }
}

//This is just a more readble and user friendly way of Making a EnemyMaker Instance
function CreateEnemies(Type, Amount, Delay, Debounce, Health, Speed) {
  EnemyMakerInstances.push(new EnemyMaker(Type, Amount, Delay, Debounce, Health, Speed));
}

//This is a cool soultion I thought of during english
//This method allows Multiple EnemySpawners to be ran at once
//This allows diffrent types of Enemies to be spawned at the same time
//And Allows changes in health and speed on the fly
class EnemyMaker {
  //The Constrctor Method Contains Multiple Diffrent paramartiers:
  //Type: Sets the enemy type
  //Amount: Sets the Amount of enemies to be spawned
  //Delay: Sets the time to wait before spawning enemies
  //Debounce: Sets the delay between each enemy spawn
  //Health and Speed are both used to create the enemy
  //DelayCheck is used to make sure the DelayAmount has been waited for
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
  
  //SpawnEnemies() Method is used to create and add the Enemies to the Enemies array
  //First we need to increment the timer, this acts as a clock for this Object
  //Next we check if the Delay has been waited for
  //If the Amount is a invalid number (less then 0 or NULL), we return an error and delete the object
  //If the Amount is equal to one, it will spawn in 1 enemy. (2 Lazy 2 fix)
  //Otherwise, if the Delay Amount has been met, and the Debunce is met, we start spawning
  //We first must create the new Enemy Object
  //Then we pust it to the array, reset the timer, and increment the counter
  //If the Counter is Equal to the Amount, that means we have completed all of our spawns
  //We then delete this object from the EnemyMakerInstances Array
  SpawnEnemies() {
    this.Timer++;
    
    if (this.DelayCheck == false && this.Timer == this.Delay){
      this.DelayCheck = true
    }
    
    let index = EnemyMakerInstances.indexOf(this);
    if (this.Amount <= 0 || this.Amount == null) {
      console.log("Warning: No wave Amount defined");
      EnemyMakerInstances.splice(index, 1);
    }
    if (this.Amount == 1) {
      let enemy = new this.Type(this.Health, this.Speed);
      Enemies.push(enemy);
      EnemyMakerInstances.splice(index, 1);
    }
    
    if (this.Timer >= this.Debounce && this.DelayCheck == true) {
      let enemy = new this.Type(this.Health, this.Speed);
      Enemies.push(enemy);
      this.Count++;
      this.Timer = 0;
      if (this.Count == this.Amount) {
        EnemyMakerInstances.splice(index, 1);
      }
    }
  }
}
