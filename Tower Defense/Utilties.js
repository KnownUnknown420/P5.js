function CheckSpecialType(DamageType, Enemy) {
  let ReturnValue = true;
  if (DamageType.includes("none") && Enemy.includes("none")) {
    return true;
  }
  if (Enemy.includes("camo")) {
    if (DamageType.includes("camo") == false) {
      ReturnValue = false;
    }
  }

  if (Enemy.includes("tank")) {
    if (DamageType.includes("tank") == false) {
      ReturnValue = false;
    }
  }

  return ReturnValue;
}

function PauseGame() {
  GamePaused = !GamePaused;
  if (GamePaused == false) {
    PauseButton.style("background-color", "green");
  } else {
    PauseButton.style("background-color", "red");
  }
}



