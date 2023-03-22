//This file contains all the map drawling code
//Map data has the setup data, such as color and the start of the map
//Ill make a map editor eventually to help with this process
let MapData = [
  0,
  255,
  0, // MapColor 0,1,2
  204,
  204,
  0, // Track Color 3,4,5
  400,
  0, // Start Point 6,7
];

//Track data contains the track that is drawn on the sreen
//These are striclty for visual apperance
//But also block towers from being placed on it
//Do not effect enemy movement
let TrackData = [
  375,
  0,
  50,
  100, // This counts as one block, goes by 4
  140,
  100,
  285,
  50, // 4 5 6 7
  140,
  100,
  50,
  300, // 8 9 10 11 -- and so on
  140,
  350,
  300,
  50,
  390,
  350,
  50,
  150,
  190,
  450,
  250,
  50,
  190,
  450,
  50,
  150,
];

//This contains all the points the enemys move too
//These are manualy done to be more dynamic
//And allow complete controll over map objects
let PathPoints = [
  385,
  110,
  150,
  110,
  150,
  360,
  400,
  360,
  400,
  460,
  200,
  460,
  200,
  600,
];

//This is just an easy way of drawling the track onto the screen
function DrawTrack() {
  for (let i = 0; i < TrackData.length; i += 4) {
    rect(TrackData[i], TrackData[i + 1], TrackData[i + 2], TrackData[i + 3]);
  }
}
