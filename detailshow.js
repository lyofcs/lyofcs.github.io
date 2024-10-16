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
    document.getElementById('tours').textContent = data.members[rank].toursCount;
    document.getElementById('lastTour').textContent = data.members[rank].lastTour;
    document.getElementById('lastStanding').textContent = data.members[rank].lastTourRank;

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

var tableTour = document.querySelector('#rankings > tbody');
var tableVersus = document.querySelector('#rankings > tbody');

fetch('data.json')
    .then(response => {
        if (response.ok) {
            return response.json(); // ����Ӧת��ΪJSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(jsonData => {
        data = jsonData;
        dataUpdate();
        jsonData.members.forEach(function (player, index) {
            var row = tableTour.insertRow(-1); // �ڱ��ĩβ�������
            var cell1 = row.insertCell(0); // ��������
            var cell2 = row.insertCell(1); // ��������
            var cell3 = row.insertCell(2); // ����ID
            var cell4 = row.insertCell(3); // �ȷ�
            cell1.textContent = player.showInfo.historyResult.standing;
            cell2.textContent = player.showInfo.historyResult.tour;
            cell3.textContent = player.showInfo.historyResult.rival;
            cell4.textContent = player.showInfo.historyResult.result;

            var row2 = tableVersus.insertRow(-1); // �ڱ��ĩβ�������
            var cell1 = row.insertCell(0); // ��������
            var cell2 = row.insertCell(1); // �Ծ�
            var cell3 = row.insertCell(2); // ʤ��
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