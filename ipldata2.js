let csvToJson = require('convert-csv-to-json');
let ipldata = csvToJson.fieldDelimiter(',') .getJsonFromCsv('matches.csv');

function teamOwnOverYear() {
  var seasonArr=[];
  for (let i = 0; i < ipldata.length; i++) {
    seasonArr.push(ipldata[i].season);
  }
  var uniqueSeasons=[]
  for(let i = 0; i<seasonArr.length;i++){
    if(uniqueSeasons.indexOf(seasonArr[i]) < 0){
      uniqueSeasons.push(seasonArr[i]);
    }
  }

  var uniqueWinnerTeams=[];
  var YearByMatchWinner = {};
  for (let i = 0; i < uniqueSeasons.length; i++) {
    var winnerTeams = [];
    for (let j = 0; j < ipldata.length; j++) {
      if(uniqueSeasons[i]===ipldata[j].season){
        winnerTeams.push(ipldata[j].winner);
      }
    }

    for(let j = 0; j<winnerTeams.length; j++){
      if(uniqueWinnerTeams.indexOf(winnerTeams[j]) < 0){
        uniqueWinnerTeams.push(winnerTeams[j]);
      }
    }

    var matchwinner = {};
    for (let j = 0; j < uniqueWinnerTeams.length; j++) {
      let winCount=0;
      for (let k = 0; k < winnerTeams.length; k++) {
        if(uniqueWinnerTeams[j]===winnerTeams[k]){
          winCount++;
        }
      }if(winCount!==0){
        matchwinner[uniqueWinnerTeams[j]]=winCount;
      }
    }
    YearByMatchWinner[uniqueSeasons[i]]=matchwinner;
    }
    console.log(YearByMatchWinner);
}
teamOwnOverYear()
