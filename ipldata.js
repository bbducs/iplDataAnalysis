let csvToJson = require('convert-csv-to-json');
let ipldata = csvToJson.fieldDelimiter(',') .getJsonFromCsv('matches.csv');
//console.log(typeof(ipldata));
//console.log(ipldata);
function matchesPerYear() {
  let seasonArr=[];
  for (let i = 0; i < ipldata.length; i++) {
    seasonArr.push(ipldata[i].season);
  }
  var uniqueSeasons=[]
  for(let i = 0; i<seasonArr.length;i++){
    if(uniqueSeasons.indexOf(seasonArr[i]) < 0){
      uniqueSeasons.push(seasonArr[i]);
    }
  }
  let YearlyPlayedMatchsData={};

  for(let i=0; i<uniqueSeasons.length;i++){
    let matchcount=0;
    for (let j = 0; j < seasonArr.length; j++) {
        if(uniqueSeasons[i]===seasonArr[j]){
          matchcount++;
        }
    }
    YearlyPlayedMatchsData[uniqueSeasons[i]]=matchcount;
  }
  console.log("Matchs played per year data:");
  console.log(YearlyPlayedMatchsData);
}
matchesPerYear();
