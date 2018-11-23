var f = require('fs');
var matches = f.readFileSync('matches.csv','utf8');
var deliveries = f.readFileSync('deliveries.csv','utf8')

function extraRuns(year) {
  var arr = matches.split('\n');

  var matchID = [];
  for(let i=0;i<arr.length;i++){
    if(arr[i].includes(year)){
      matchID.push(arr[i].split(',')[0]);
    }
  }

  var deliveryArr=deliveries.split('\n');
  runGiven={};
  overBowled={};
  var temp = 'toberemove';
  for (let i = 0; i < matchID.length; i++) {
    for (var j = 0; j < deliveryArr.length; j++) {
      if (matchID[i]===deliveryArr[j].split(',')[0]) {
        if(runGiven.hasOwnProperty(deliveryArr[j].split(',')[8])){
          runGiven[deliveryArr[j].split(',')[8]]+=parseInt(deliveryArr[j].split(',')[17])-(parseInt(deliveryArr[j].split(',')[11])+parseInt(deliveryArr[j].split(',')[12]));
          if(temp!==deliveryArr[j].split(',')[8]){
            if(overBowled.hasOwnProperty(temp)){
              overBowled[temp]+=1;
              temp=deliveryArr[j].split(',')[8];
            }else {
              overBowled[temp]=1;
              temp=deliveryArr[j].split(',')[8];
            }
          }
        }else {
          runGiven[deliveryArr[j].split(',')[8]]=parseInt(deliveryArr[j].split(',')[17]);
        }
      }
    }
  }
  delete overBowled.toberemove;
  //console.log(runGiven);
  //console.log(overBowled);
  var economylist = [];
  for (let i in runGiven){
    for (let j in overBowled){
      if(i==j){
      economylist[i] = (runGiven[i]/overBowled[j]).toFixed(2);
      }
    }
  }
//console.log(economylist);
values = [];
for (let i in economylist) {
 values.push(parseFloat(economylist[i]));
}
values.sort(function(a, b){return a - b});
//console.log(values);
topTenValues=[]
for (let i = 0; i < 10; i++) {
  topTenValues.push(values[i]);
}
//console.log(topTenValues);
toptenbol={}
for(let i =0 ;i<topTenValues.length;i++)
  for(let j in economylist)
  if(topTenValues[i]==economylist[j]){
    toptenbol[j]=topTenValues[i];
  }
  console.log(toptenbol);
}

extraRuns(2015);
