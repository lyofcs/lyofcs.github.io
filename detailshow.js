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
    document.getElementById('tours').textContent = data.members[rank].showInfo.toursCount;
    document.getElementById('lastTour').textContent = data.members[rank].showInfo.lastTour;
    document.getElementById('lastStanding').textContent = data.members[rank].showInfo.lastTourRank;

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

var tableTour = document.querySelector('#tourTable > tbody');
var tableVersus = document.querySelector('#rivalTable > tbody');

var container = document.getElementById('history-honor');

document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => {
            if (response.ok) {
                return response.json(); // 将响应转换为JSON
            }
            throw new Error('Network response was not ok.');
        })
        .then(jsonData => {
            data = jsonData;
            var player = data.members[rank];

            //处理赛事记录
            player.showInfo.historyResult.forEach(function (item) {
                var row = tableTour.insertRow(-1); // 在表格末尾添加新行
                var cell1 = row.insertCell(0); // 比赛名次
                var cell2 = row.insertCell(1); // 赛事名称
                var cell3 = row.insertCell(2); // 对手ID
                var cell4 = row.insertCell(3); // 比分
                cell1.textContent = item.standing;
                switch (item.standing) {
                    case 1:
                        cell1.style.backgroundColor = "#CD7F32";
                        console.log(item.standing + "金色");
                        break;
                    case 2:
                        cell1.style.backgroundColor = "#E6E8FA";
                        console.log(item.standing + "银色");
                        break;
                    case 3:
                        cell1.style.backgroundColor = "#8C7853";
                        console.log(item.standing + "铜色");
                        break;
                }
                cell2.textContent = item.tour;
                cell3.innerHTML = " VS " + '<span class="scheduled-game">' + item.rival + '</span>';
                cell4.textContent = item.result;
            });


            //处理交手记录
            player.showInfo.ada.forEach(function (item) {
                var row2 = tableVersus.insertRow(-1); // 在表格末尾添加新行
                var cell21 = row2.insertCell(0); // 对手名称
                var cell22 = row2.insertCell(1); // 对局
                var cell23 = row2.insertCell(2); // 胜率

                cell21.innerHTML = " VS " + '<span class="scheduled-game">' + item.tfaName + '</span>';
                cell22.textContent = item.totalWinRound + "-" + (Number(item.totalRound) - Number(item.totalWinRound));

                var rate = (Number(item.totalWinRound) / Number(item.totalRound) * 100);

                cell23.textContent = rate.toFixed(2) + '%';

                if (rate > 50) {
                    cell23.style.color = "green";
                }
                else if (rate < 50) {
                    cell23.style.color = "red";
                }
            });

            //处理历史荣誉
            var honorKV = player.showInfo.honor;
            if (Object.keys(honorKV).length > 0) {
                /*for (var key in honorKV) {
                    if (honorKV.hasOwnProperty(key)) {
                        insertImageWithText('/img/rank'+honorKV[key]+'.png', key)
                    }
                }*/
                honorKV.forEach(({ src, text }) => {
                    const div = document.createElement('div');
                    div.className = 'image-container';

                    const img = document.createElement('img');
                    img.src = src;
                    div.appendChild(img);

                    const span = document.createElement('span');
                    span.className = 'text-overlay';
                    span.textContent = text;
                    div.appendChild(span);

                    container.appendChild(div);
                });

            }

            //处理图表相关
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                var chartData = new google.visualization.DataTable();

                // 解析JSON数据填充DataTable
                //var jsonObject = JSON.parse(jsonData);
                chartData.addColumn('string', 'Tournament');
                chartData.addColumn('number', 'MMR');
                chartData.addColumn({ type: 'string', role: 'annotation'});
                chartData.addColumn({ type: 'string', role: 'annotation'});
                chartData.addRow(["初始", 1500, '1500','']);
                for (var i = player.historyMMR.length; i > 0; i--) {
                    var join = (player.historyIn[i - 1]) ? '参赛' : '';
                    chartData.addRow([data.tournaments[i - 1].desc, player.historyMMR[i - 1], String(player.historyMMR[i - 1]), join]);
                }

                var options = {
                    title: '积分变化曲线',
                    hAxis: {
                        slantedText: false,
                        title: '赛事', titleTextStyle: {
                            color: 'red'
                        },
                        textStyle: {
                            fontSize: 8,
                            //format: '#####,####'
                        }
                    },
                    vAxis: { title: '积分', titleTextStyle: { color: 'red' } },
                    tooltip: {
                        text: 'X: %{x}, Y: %{y}',
                        trigger: 'both',
                        isHtml: true
                    },
                    width: '100%',
                    height: '100%',
                    legend: 'none',

                };
                var chart = new google.visualization.LineChart(document.getElementById('donutchart'));
                chart.draw(chartData, options);
            };

            //更新数据显示
            dataUpdate();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

});

//插入图片的方法
function insertImageWithText(imageSrc, text) {
    const container = document.createElement('div');
    container.className = 'image-container';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = text;
    container.appendChild(img);

    const textDiv = document.createElement('div');
    textDiv.className = 'text-overlay';
    textDiv.textContent = text;
    container.appendChild(textDiv);

    document.getElementById('history-honor').appendChild(container);
}

/*console.log(jsonData);

console.log(jsonData.members[rank].tfaName);
console.log(jsonData.members[rank].historyMMR);*/
//console.log(data.members[rank].tfaName);

//console.log(data.members[rank].historyMMR);

console.log(rank);

//var tourTable = document.querySelector('#rankings > tbody');