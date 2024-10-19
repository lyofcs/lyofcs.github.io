//��������׺��ȡ��ǰrank
function getQueryParam(param) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

//������ʾ����
function dataUpdate() {

    //ID���
    headName.textContent = data.members[rank].tfaName;
    document.getElementById('index').textContent = data.members[rank].tfaIndex;

    //�����������
    document.getElementById('rank').textContent = '#' + data.members[rank].rank;
    document.getElementById('mmr').textContent = data.members[rank].currentMMR;

    //�����������
    document.getElementById('tours').textContent = data.members[rank].showInfo.toursCount;
    document.getElementById('lastTour').textContent = data.members[rank].showInfo.lastTour;
    document.getElementById('lastStanding').textContent = data.members[rank].showInfo.lastTourRank;

    //ʤ�����
    matches.textContent = data.members[rank].totalMatches[0];
    wins.textContent = data.members[rank].totalWinMatches[0];
    document.getElementById('winRate').textContent = (Number(wins.textContent) / Number(matches.textContent) * 100).toFixed(2) + '%';
}



var data;
var rank = getQueryParam('rank') - 1; // ��ȡrank����

//��ȡҳ�沼��Ԫ��id
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
                return response.json(); // ����Ӧת��ΪJSON
            }
            throw new Error('Network response was not ok.');
        })
        .then(jsonData => {
            data = jsonData;
            var player = data.members[rank];

            //�������¼�¼
            player.showInfo.historyResult.forEach(function (item) {
                var row = tableTour.insertRow(-1); // �ڱ��ĩβ�������
                var cell1 = row.insertCell(0); // ��������
                var cell2 = row.insertCell(1); // ��������
                var cell3 = row.insertCell(2); // ����ID
                var cell4 = row.insertCell(3); // �ȷ�
                cell1.textContent = item.standing;
                switch (item.standing) {
                    case 1:
                        cell1.style.backgroundColor = "#CD7F32";
                        console.log(item.standing + "��ɫ");
                        break;
                    case 2:
                        cell1.style.backgroundColor = "#E6E8FA";
                        console.log(item.standing + "��ɫ");
                        break;
                    case 3:
                        cell1.style.backgroundColor = "#8C7853";
                        console.log(item.standing + "ͭɫ");
                        break;
                }
                cell2.textContent = item.tour;
                cell3.innerHTML = " VS " + '<span class="scheduled-game">' + item.rival + '</span>';
                cell4.textContent = item.result;
            });


            //�����ּ�¼
            player.showInfo.ada.forEach(function (item) {
                var row2 = tableVersus.insertRow(-1); // �ڱ��ĩβ�������
                var cell21 = row2.insertCell(0); // ��������
                var cell22 = row2.insertCell(1); // �Ծ�
                var cell23 = row2.insertCell(2); // ʤ��

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

            //������ʷ����
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

            //����ͼ�����
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                var chartData = new google.visualization.DataTable();

                // ����JSON�������DataTable
                //var jsonObject = JSON.parse(jsonData);
                chartData.addColumn('string', 'Tournament');
                chartData.addColumn('number', 'MMR');
                chartData.addColumn({ type: 'string', role: 'annotation'});
                chartData.addColumn({ type: 'string', role: 'annotation'});
                chartData.addRow(["��ʼ", 1500, '1500','']);
                for (var i = player.historyMMR.length; i > 0; i--) {
                    var join = (player.historyIn[i - 1]) ? '����' : '';
                    chartData.addRow([data.tournaments[i - 1].desc, player.historyMMR[i - 1], String(player.historyMMR[i - 1]), join]);
                }

                var options = {
                    title: '���ֱ仯����',
                    hAxis: {
                        slantedText: false,
                        title: '����', titleTextStyle: {
                            color: 'red'
                        },
                        textStyle: {
                            fontSize: 8,
                            //format: '#####,####'
                        }
                    },
                    vAxis: { title: '����', titleTextStyle: { color: 'red' } },
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

            //����������ʾ
            dataUpdate();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

});

//����ͼƬ�ķ���
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