//从域名后缀获取当前rank
function getQueryParam(param) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

//更新显示数据
function dataUpdate() {

    //ID相关
    headName.textContent = data.members[rank].tfaName;
    document.getElementById('index').textContent = data.members[rank].tfaIndex;

    //积分排名相关
    document.getElementById('rank').textContent = '#' + data.members[rank].rank;
    document.getElementById('mmr').textContent = data.members[rank].currentMMR;

    //赛事数据相关
    document.getElementById('tours').textContent = data.members[rank].toursCount;
    document.getElementById('lastTour').textContent = data.members[rank].lastTour;
    document.getElementById('lastStanding').textContent = data.members[rank].lastTourRank;

    //胜率相关
    matches.textContent = data.members[rank].totalMatches[0];
    wins.textContent = data.members[rank].totalWinMatches[0];
    document.getElementById('winRate').textContent = (Number(wins.textContent) / Number(matches.textContent) * 100).toFixed(2) + '%';
}



var data;
var rank = getQueryParam('rank') - 1; // 获取rank参数

//获取页面布局元素id
var headName = document.getElementById('name');
var matches = document.getElementById('matches');
var wins = document.getElementById('wins');

var tableTour = document.querySelector('#rankings > tbody');
var tableVersus = document.querySelector('#rankings > tbody');

fetch('data.json')
    .then(response => {
        if (response.ok) {
            return response.json(); // 将响应转换为JSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(jsonData => {
        data = jsonData;
        dataUpdate();
        jsonData.members.forEach(function (player, index) {
            var row = tableTour.insertRow(-1); // 在表格末尾添加新行
            var cell1 = row.insertCell(0); // 比赛名次
            var cell2 = row.insertCell(1); // 赛事名称
            var cell3 = row.insertCell(2); // 对手ID
            var cell4 = row.insertCell(3); // 比分
            cell1.textContent = player.showInfo.historyResult.standing;
            cell2.textContent = player.showInfo.historyResult.tour;
            cell3.textContent = player.showInfo.historyResult.rival;
            cell4.textContent = player.showInfo.historyResult.result;

            var row2 = tableVersus.insertRow(-1); // 在表格末尾添加新行
            var cell1 = row.insertCell(0); // 对手名称
            var cell2 = row.insertCell(1); // 对局
            var cell3 = row.insertCell(2); // 胜率
            cell1.textContent = player.showInfo.ada.tfaName;
            cell2.textContent = player.showInfo.ada.totalRound;

            var rate = (Number(player.showInfo.ada.totalWinRound) / Number(player.showInfo.ada.totalRound) * 100).toFixed(2) + '%';

            cell3.textContent = rate;
        });


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