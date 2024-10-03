const rankingsBody = document.querySelector("#rankings > tbody");

function loadRankings() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 在这里使用JSON数据
            console.log(data);
        })
        .catch(error => {
            console.error('读取JSON文件时出错：', error);
        });
}

function populateRankings(data) {
    // Populate Leaderboard
    data.forEach((row) => {
        const tr = document.createElement("tr");

        row.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });

        rankingsBody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", () => { loadRankings(); });

$("#search-leaderboard").keyup(function () {
    var value = this.value;

    $("table").find("tr").each(function (index) {
        if (index === 0) return;

        var if_td_has = false;
        $(this).find('td').each(function () {
            if_td_has = if_td_has || $(this).text().indexOf(value) !== -1; //Check if td's text matches key and then use OR to check it for all td's
        });

        $(this).toggle(if_td_has);

    });
});