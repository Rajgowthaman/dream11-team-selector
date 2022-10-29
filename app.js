const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let masterData = JSON.parse(rawdata);
let players = masterData.players;
let patterns = masterData.patterns;
let creditLim = masterData.creditLimit;
let allTeam = [];
patterns.forEach(p=>{
	let tot = 0;
	p.forEach(pp=>{
		tot += pp;
	});
	if(tot!=11){
		console.log("Not 11 :: "+p)
	}
});

for (let team = 0; team < masterData.teamsN; team++) {
    let patternIndex = getRandomArr(patterns.length, 1);
    console.log("\nTeam :: " + (team + 1) + "\n" + getTeam(patterns[patternIndex]));
}

function getRandomArr(len, howmany) {
    var array = [];
    for (let z = 0; z < len; z++) {
        array.push(z);
    }
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i + 1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }
    return array.slice(0, howmany);
}

function getTeam(pattern) {
    //console.log(pattern)
    let patIndex = 0;
    let teamArr = [];
    pattern.forEach(p => {
        let ranArr = getRandomArr(players[patIndex].length, p);
        //    console.log("Random Arr::"+ranArr)
        ranArr.forEach(rA => {
            teamArr.push(players[patIndex][rA]);
        });
        patIndex++;
    });
    let tot = 0;
    //console.log("teamArr"+teamArr);
    teamArr.forEach(tA => {
        tot += parseFloat(tA.split('-')[1]);
    });
    //console.log("Total credits ::"+ tot);
    if (tot > creditLim) {
        //console.log("Credit exceeding 100");
        creditLim++;
        return getTeam(pattern);
    }
    let duplicateTeam = false;
    let teamArrTemp = JSON.parse(JSON.stringify(teamArr));
    let teamString = JSON.stringify(teamArrTemp.sort());
    for (let i = 0; i < allTeam.length; i++) {
        let exTeam = JSON.parse(JSON.stringify(allTeam[i]));
        let exTeamString = JSON.stringify(exTeam.sort());
        if (exTeamString === teamString) {
            duplicateTeam = true;
            break;
        }
    }
    if (duplicateTeam) {
        return getTeam(pattern);
    }
    allTeam.push(teamArr);
    return teamArr;
}