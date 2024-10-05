const rankingsBody = document.querySelector("#rankings > tbody");

var leaderboardData = [
    { "name": "Alice", "score": 10000 , "id":"TFA1001" },
    { "name": "Bob", "score": 9000, "id": "TFA1021" },
    { "name": "Charlie", "score": 8000, "id": "TFA1101" },
    { "name": "ZZZZ", "score": 7000, "id": "TFA1201" }
];

fetch('data.json')
    .then(response => response.json())
    .then(const data => {
    // 在这里使用JSON数据
    let datajson = JSON.parse(data);
    console.log(data.members[0].tfaName);
    console.log(datajson.members[1].tfaName);
    console.log(data);
    })
    .catch(error => {
        console.error('读取JSON文件时出错：', error);
    });

// 获取table元素
var table = document.querySelector('#rankings > tbody');

// 遍历JSON数据并添加到表格中
datajson.forEach(function (player, index) {
    var row = table.insertRow(-1); // 在表格末尾添加新行
    var cell1 = row.insertCell(0); // 名次
    var cell2 = row.insertCell(1); // 姓名
    var cell3 = row.insertCell(2); // 分数
    var cell4 = row.insertCell(3); // 分数
    cell1.textContent = index + 1;
    cell2.textContent = player.name;
    cell3.textContent = player.score;
    cell4.textContent = player.id;
});


/*function loadRankings() {
    const request = new XMLHttpRequest();

    request.open("get", "https://codepen.io/imisterk/pen/MLgwOa.js");
    request.onload = () => {
        try {
            const json = JSON.parse(request.responseText);
            populateRankings(json);
        } catch (e) {
            console.warn("Could not load Player Rankings! :(");
        }
    };

    request.send();
}

function populateRankings(json) {
    // Populate Leaderboard
    json.forEach((row) => {
        const tr = document.createElement("tr");

        row.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });

        rankingsBody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", () => { loadRankings(); });*/

$("#search-leaderboard").keyup(function () {
    var value = this.value;

    $("table").find("tr").each(function (index) {
        if (index === 0) return;

        var if_td_has = false;
        $(this).find('td').each(function () {
            if_td_has = if_td_has || $(this).text().indexOf(value) !== -1; 
        });

        $(this).toggle(if_td_has);

    });
});