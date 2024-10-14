function getQueryParam(param) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

var rank = getQueryParam('rank') - 1; // 获取rank参数
/*var storedString = localStorage.getItem("members");
var jsonData = JSON.parse(storedString);*/

var data;

fetch('data.json')
    .then(response => {
        if (response.ok) {
            return response.json(); // 将响应转换为JSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(jsonData => {
        data = jsonData;
        console.log(data);
        console.log(data.members[rank].tfaName);
        console.log(data.members[rank].historyMMR);

        var headName = document.getElementById('name');
        headName.textContent = data.members[rank].tfaName;
        document.getElementById('index').textContent = data.members[rank].tfaIndex;
        document.getElementById('rank').textContent = '#' + data.members[rank].rank;
        document.getElementById('mmr').textContent = data.members[rank].currentMMR;

        var matches = document.getElementById('matches');
        var wins = document.getElementById('wins');

        matches.textContent = data.members[rank].totalMatches[0];
        wins.textContent = data.members[rank].totalWinMatches[0];
        document.getElementById('winRate').textContent = wins / matches;
        console.log(wins / matches);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });



/*console.log(jsonData);

console.log(jsonData.members[rank].tfaName);
console.log(jsonData.members[rank].historyMMR);*/
//console.log(data.members[rank].tfaName);

//console.log(data.members[rank].historyMMR);

console.log(rank);

//var tourTable = document.querySelector('#rankings > tbody');