//This file contains UniversalFunctions that dont really
//Belong anywhere so they are specia I guess

function CheckSpecialType(TowerPass, Enemy) {
  let ReturnValue = true;
  let Tower = TowerPass;
  if (Tower.EffectiveDamage.includes("none") && Enemy.includes("none")) {
    return true;
  }
  if (Enemy.includes("camo")) {
    if (
      Tower.EffectiveDamage.includes("camo") == false &&
      Tower.BoostedEffectiveDamage.includes("camo") == false
    ) {
      ReturnValue = false;
    }
  }

  if (Enemy.includes("tank")) {
    if (
      Tower.EffectiveDamage.includes("tank") == false &&
      Tower.BoostedEffectiveDamage.includes("tank") == false
    ) {
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

//Yea this was dumb, but it was easier soooo
//Work smarter not harder
//I could have just delcared a ceneter variable :skull:
function Center(size) {
  return size / 2;
}

//This is needed mutliple times
function CheckRectIntersection(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
    return true;
  }
  return false;
}
