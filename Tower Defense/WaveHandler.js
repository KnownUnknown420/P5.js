let ActiveWave = false;
let WavesCompleted = false;
let WaveCount = 1;
let ArrayIndex = 0;
let GameRestarting = false;
let WaveData;


//Firstly, we check if the keyword "Waves Completed" has been loaded
//if not, then there are still waves to load
//if the word is a string, then we move the index +6
//othewise its moved 5
function GenerateWaves() {
  if (WaveData[ArrayIndex] == "Waves Completed") {
    WavesCompleted = true;
  }
  if (ActiveWave == false && WavesCompleted == false) {
    if (typeof WaveData[ArrayIndex] == "string") {
      CreateEnemies(
        WaveData[ArrayIndex + 1],
        WaveData[ArrayIndex + 2],
        WaveData[ArrayIndex + 3],
        WaveData[ArrayIndex + 4],
        WaveData[ArrayIndex + 5]
      );
      ArrayIndex += 6;
    } else {
      CreateEnemies(
        WaveData[ArrayIndex],
        WaveData[ArrayIndex + 1],
        WaveData[ArrayIndex + 2],
        WaveData[ArrayIndex + 3],
        WaveData[ArrayIndex + 4]
      );
      ArrayIndex += 5;
    }
    if (typeof WaveData[ArrayIndex] == "string") {
      ActiveWave = true;
    }
  }
  if (
    ActiveWave == true &&
    Enemies.length == 0 &&
    EnemyMakerInstances.length == 0
  ) {
    if (!GameRestarting) {
      GameMoney += 150 + WaveCount;
      WaveCount++;
    } else {
      ArrayIndex = 0;
      WaveCount = 1;
      GameRestarting = false;
    }
    ActiveWave = false;
  }
}
