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

fetch('data.json')
    .then(response => {
        if (response.ok) {
            return response.json(); // ����Ӧת��ΪJSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(jsonData => {
        data = jsonData;
        jsonData.members.forEach(function (player) {
            player.showInfo.historyResult.forEach(function (item) {
                var row = tableTour.insertRow(-1); // �ڱ��ĩβ�������
                var cell1 = row.insertCell(0); // ��������
                var cell2 = row.insertCell(1); // ��������
                var cell3 = row.insertCell(2); // ����ID
                var cell4 = row.insertCell(3); // �ȷ�
                cell1.textContent = item.standing;
                /*console.log(item.standing);
                console.log(player.showInfo.toursCount);
                console.log(player.showInfo.lastTour);
                console.log(player.tfaName);*/
                cell2.textContent = item.tour;
                cell3.innerHTML = " VS " + '<span class="scheduled-game">' + item.rival + '</span>';
                cell4.textContent = item.result;
            });

            player.showInfo.ada.forEach(function (item) {
                var row2 = tableVersus.insertRow(-1); // �ڱ��ĩβ�������
                var cell21 = row2.insertCell(0); // ��������
                var cell22 = row2.insertCell(1); // �Ծ�
                var cell23 = row2.insertCell(2); // ʤ��
                cell21.innerHTML = " VS " + '<span class="scheduled-game">' + item.tfaName + '</span>';
                cell22.textContent = item.totalRound;

                var rate = (Number(item.totalWinRound) / Number(item.totalRound) * 100).toFixed(2) + '%';

                cell23.textContent = rate;
            });
        });

        dataUpdate();


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