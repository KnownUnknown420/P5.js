//This file contains all the map drawling code
//Map data has the setup data, such as color and the start of the map
//Ill make a map editor eventually to help with this process
let MapData = [];

//Track data contains the track that is drawn on the sreen
//These are striclty for visual apperance
//But also block towers from being placed on it
//Do not effect enemy movement
//DO NOT USE NEGATIVE NUMBERS
let TrackData = [];

//This contains all the points the enemys move too
//These are manualy done to be more dynamic
//And allow complete controll over map objects
let PathPoints = [];

//This is just an easy way of drawling the track onto the screen
function DrawTrack() {
  for (let i = 0; i < TrackData.length; i += 4) {
    rect(TrackData[i], TrackData[i + 1], TrackData[i + 2], TrackData[i + 3]);
  }
}

//MAP DATA

//Map one data
let MapOneData = [
  0,
  255,
  0, // MapColor 0,1,2
  204,
  204,
  0, // Track Color 3,4,5
  400,
  0, // Start Point 6,7
];
let MapOneTrackData = [
  375,
  0,
  50,
  100,
  140,
  100,
  285,
  50,
  140,
  100,
  50,
  300,
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
let MapOnePathPoints = [
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
  630,
];

//Map two data
let MapTwoData = [
  0,
  200,
  100, // MapColor 0,1,2
  200,
  200,
  200, // Track Color 3,4,5
  -30,
  240, // Start Point 6,7
];
let MapTwoTrackData = [
  0,
  200,
  300,
  50,

  300,
  100,
  50,
  150,

  300,
  100,
  200,
  50,

  450,
  100,
  50,
  450,

  250,
  500,
  200,
  50,

  250,
  400,
  50,
  100,

  150,
  400,
  100,
  50,

  150,
  100,
  50,
  300,

  50,
  100,
  100,
  50,

  50,
  0,
  50,
  100,
];
let MapTwoPathPoints = [
  310,
  210,

  310,
  110,

  460,
  110,

  460,
  510,

  260,
  510,

  260,
  410,

  160,
  410,

  160,
  110,

  60,
  110,

  60,
  -30,
];

//Map three data
let MapThreeData = [
  100,
  100,
  150, // MapColor 0,1,2
  200,
  200,
  200, // Track Color 3,4,5
  -30,
  240, // Start Point 6,7
];
let MapThreeTrackData = [
  0,
  200,
  200,
  50,

  200,
  200,
  50,
  300,

  200,
  450,
  300,
  50,

  450,
  350,
  50,
  100,

  350,
  350,
  100,
  50,

  350,
  250,
  50,
  100,

  350,
  250,
  100,
  50,

  450,
  200,
  50,
  100,

  400,
  150,
  100,
  50,

  350,
  50,
  50,
  150,

  400,
  50,
  200,
  50,
];
let MapThreePathPoints = [
  210,
  210,

  210,
  460,

  460,
  460,

  460,
  360,

  360,
  360,

  360,
  260,

  460,
  260,

  460,
  160,

  360,
  160,

  360,
  60,

  570,
  60,
];

let MapFourData = [50, 50, 50, 200, 200, 200, 200, -30];

let MapFourTrackData = [
  0,
  275,
  250,
  50,

  175,
  320,
  50,
  300,

  175,
  0,
  50,
  300,

  250,
  275,
  250,
  50,

  450,
  275,
  50,
  250,

  450,
  500,
  250,
  50,
];

let MapFourPathPoints = [187, 285, 460, 285, 460, 510, 560, 510];

let MapFiveData = [100, 100, 100, 0, 100, 200, 310, -30];

let MapFiveTrackData = [180, 0, 250, 600];

let MapFivePathPoints = [300, 630]; 

let MapSixData = [10, 0, 0, 255, 255, 255, 235, -30];

let MapSixTrackData = [0, 300, 600 , 50,
                      260, 300, 50 , 200];

let MapSixPathPoints = [270, 310, 270, 460];
