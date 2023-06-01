//Databse handler
//loads all the players data from the key thing
//on game loading, we load any data from cookies
//if there is none, it gets set to a defualt value
//all data can be accessed anytime during the project
//exzample: DataBase.UserData or DataBase.UserStats
//each value is saved to a specific index in the array
class DataHandler {
  constructor() {
    this.UserData = [];
    this.UserStats = [];
  }

  ReadFromStoreMaps(Data) {
    let CheckData = getItem("Map" + Data);
    if (CheckData == null) {
      return "none";
    } else {
      return CheckData;
    }
  }

  ReadFromStoreStats(Data) {
    let CheckData = getItem("Stat" + Data);
    if (CheckData == null || CheckData == "none") {
      return 0;
    } else {
      return CheckData;
    }
  }
  LoadUserData() {
    for (let i = 0; i != 6; i++) {
      this.UserData[i] = this.ReadFromStoreMaps(i);
    }
    for (let i = 0; i != 4; i++) {
      this.UserStats[i] = this.ReadFromStoreStats(i);
    }
  }

  DataSend() {
    this.UserData[MapPlayed - 1] = GetStarCount();
    storeItem("Map" + (MapPlayed - 1), GetStarCount());
  }

  ResetMapData() {
    for (let i = 0; i != 6; i++) {
      this.UserData[i] = "none";
      storeItem("Map" + i, "none");
    }
  }

  ResetStatData() {
    for (let i = 0; i != 4; i++) {
      this.UserStats[i] = 0;
      storeItem("Stat" + i, 0);
    }
  }

  DataPushKill() {
    this.UserStats[3]++;
    storeItem("Stat3", this.UserStats[3]);
  }

  DataPushWin() {
    this.UserStats[2]++;
    storeItem("Stat2", this.UserStats[2]);
  }

  DataPushGameStart() {
    this.UserStats[1]++;
    storeItem("Stat1", this.UserStats[1]);
  }

  DataPushPlayTime() {
    this.UserStats[0]++;
    storeItem("Stat0", this.UserStats[0]);
  }
}
