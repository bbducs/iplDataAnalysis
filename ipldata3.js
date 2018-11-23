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

  var arr2=deliveries.split('\n');
  var extraRunData={};
  for(let i=0; i<matchID.length;i++){
    for(let j=0; j<arr2.length;j++){
      if(matchID[i]===arr2[j].split(',')[0]){
        if(extraRunData.hasOwnProperty(arr2[j].split(',')[3])){
          extraRunData[arr2[j].split(',')[3]]+=parseInt(arr2[j].split(',')[16]);
        }else{
          extraRunData[arr2[j].split(',')[3]]= parseInt(arr2[j].split(',')[16]);
        }
      }
    }
  }
  console.log(extraRunData);
}

extraRuns(2016);
