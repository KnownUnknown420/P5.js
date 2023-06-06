//Main SoundHandler for the game
//Each function is called in a specific spot
//The sound track function can be found at the bottom
let ClickSound;
let UpgradeSound;
let WinSound;
let KillSound;
let MusicEnabled = true;
let SoundEnabled = true;
let MapMusic;
let PlayingMusic;

function GenerateSong() {}

function PlayClick() {
  if (SoundEnabled) {
    ClickSound.play();
  }
}

function PlayUpgradeSound() {
  if (SoundEnabled) {
    UpgradeSound.play();
  }
}

function PlayWinSound() {
  if (SoundEnabled) {
    WinSound.play();
  }
}

function PlayLooseSound() {
  if (SoundEnabled) {
    LooseSound.play();
  }
}

function PlayKillSound() {
  return;
  //PopNoise.play()   
  //this would be cool if it worked,
  //but it gets very destorted and laggy
  //so this wont work
}

//Function that runs the code
//checks to see if music is even enanled in the menu
//then checks to see if the menu is enabled, this will play the menu music
//otherwise it will randomly pick a song to play
function PlaySoundTrackMusic() {
  if (MusicEnabled === false) {
    if (PlayingMusic != null) {
      PlayingMusic.pause();
    }
    MenuMusic.stop();
  } else {
    if (DrawingMenu == true && MenuMusic.isPlaying() == false) {
      MenuMusic.play();
      PlayingMusic.stop();
    }
    if (DrawingMenu == false && PlayingMusic.isPlaying() == false) {
      let RandomValue = floor(random(0, MapMusic.length));
      PlayingMusic = MapMusic[RandomValue];
      PlayingMusic.play();
      MenuMusic.stop();
    }
  }
}
