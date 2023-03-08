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

//points that the enemies have to follow
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

// Draws the track onto the screen
function DrawTrack() {
  for (let i = 0; i < TrackData.length; i += 4) {
    rect(TrackData[i], TrackData[i + 1], TrackData[i + 2], TrackData[i + 3]);
  }
}
