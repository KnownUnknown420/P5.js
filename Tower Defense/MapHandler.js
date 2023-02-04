//Map Parts
//These are jsut the default
//TODO: add custom map loading
let MapData = [
0,255,0, //MapColor 0,1,2
204,204,0, //Track Color 3,4,5
400,0, // Start Point 6,7
]

let TrackData = [
  375, 0 , 50, 100,   //This counts as one block, goes by 4
  140, 100, 285, 50,  //4 5 6 7
  140, 100, 50, 300,  //8 9 10 11 -- and so on
  140, 350, 300, 50,
  390, 350, 50, 150,
  190, 450, 250, 50,
  190, 450, 50, 150,
]

//Draws Track Onto screen
function DrawTrack(){
  for (var i = 0; i < TrackData.length; i = i + 4) {
    rect(TrackData[i],TrackData[i+1],TrackData[i+2],TrackData[i+3])
  }
}

//Shows the enemies 
function ShowEnemies(){
  for (let i = 0; i < Enemies.length; i++) {
    Enemies[i].show();
  }
}

//Creates visual map
function DrawMap(){
  
  //First, we draw the background
  background(MapData[0], MapData[1], MapData[2])
  
  //Starts creating the route
  fill(255,0,0) //Changes color for the start marker
  let StartPoint = ellipse(MapData[6], MapData[7], 50) //Start
  
  //Resets to Track Color
  fill(MapData[3], MapData[4], MapData[5])  
  
  //Draw Track
  DrawTrack()
  
  //Draw All Active Enemies
  ShowEnemies()
}
