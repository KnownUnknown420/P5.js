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

function Center(size){
  return size/2
}

function checkRectIntersection(rect1, rect2) {
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
