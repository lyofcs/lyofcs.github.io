const rankingsBody = document.querySelector("#rankings > tbody");

var leaderboardData = [
    { "name": "Alice", "score": 10000 , "id":"TFA1001" },
    { "name": "Bob", "score": 9000, "id": "TFA1021" },
    { "name": "Charlie", "score": 8000, "id": "TFA1101" },
    { "name": "ZZZZ", "score": 7000, "id": "TFA1201" }
];

var data = {
    "members": [
        { "name": "Alice", "score": 10000, "id": "TFA1001" },
        { "name": "Bob", "score": 9000, "id": "TFA1021" },
        { "name": "Charlie", "score": 8000, "id": "TFA1101" },
        { "name": "ZZZZ", "score": 7000, "id": "TFA1201" }
    ]
};
var table = document.querySelector('#rankings > tbody');

fetch('data.json')
    .then(response => {
        if (response.ok) {
            return response.json(); // 将响应转换为JSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(jsonData => {
        console.log(jsonData); // 这里你可以处理你的JSON数据
        // 例如，你可以将其显示在网页上
        //data = jsonData;
        //document.body.innerHTML = JSON.stringify(jsonData, null, 2);
        //jsonData.members.forEach(item =)
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// 获取table元素


// 遍历JSON数据并添加到表格中
data.members.forEach(function (player, index) {
    var row = table.insertRow(-1); // 在表格末尾添加新行
    var cell1 = row.insertCell(0); // 当前名次
    var cell2 = row.insertCell(1); // 选手ID
    var cell3 = row.insertCell(2); // 选手积分
    var cell4 = row.insertCell(3); // 天格会ID
    var cell5 = row.insertCell(4); //首次赛事
    cell1.textContent = index + 1;
    cell2.textContent = player.tfaName;
    cell3.textContent = player.currentMMR;
    cell4.textContent = player.tfaIndex;
    cell5.textContent = player.firstTour;
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
