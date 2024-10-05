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
    // ������ʹ��JSON����
    let datajson = JSON.parse(data);
    console.log(data.members[0].tfaName);
    console.log(datajson.members[1].tfaName);
    console.log(data);
    })
    .catch(error => {
        console.error('��ȡJSON�ļ�ʱ����', error);
    });

// ��ȡtableԪ��
var table = document.querySelector('#rankings > tbody');

// ����JSON���ݲ���ӵ������
datajson.forEach(function (player, index) {
    var row = table.insertRow(-1); // �ڱ��ĩβ�������
    var cell1 = row.insertCell(0); // ����
    var cell2 = row.insertCell(1); // ����
    var cell3 = row.insertCell(2); // ����
    var cell4 = row.insertCell(3); // ����
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