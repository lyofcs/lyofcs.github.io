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
            return response.json(); // ����Ӧת��ΪJSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(jsonData => {
        console.log(jsonData); // ��������Դ������JSON����
        // ���磬����Խ�����ʾ����ҳ��
        //data = jsonData;
        //document.body.innerHTML = JSON.stringify(jsonData, null, 2);
        //jsonData.members.forEach(item =)
        jsonData.members.forEach(function (player, index) {
            var row = table.insertRow(-1); // �ڱ��ĩβ�������
            var cell1 = row.insertCell(0); // ��ǰ����
            var cell2 = row.insertCell(1); // ѡ��ID
            var cell3 = row.insertCell(2); // ѡ�ֻ���
            var cell4 = row.insertCell(3); // ����ID
            var cell5 = row.insertCell(4); //�״�����
            cell1.textContent = index + 1;
            cell2.textContent = player.tfaName;
            cell3.textContent = player.currentMMR;
            cell4.textContent = player.tfaIndex;
            cell5.textContent = player.firstTour;
        });

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


document.getElementById('rankings').addEventListener('click', function (e) {
    var target = e.target; // ��ȡ�¼�������Ԫ��
    if (target.tagName === 'TD') { // ȷ��������ǵ�Ԫ��
        //var id = target.getAttribute('data-id'); // ��ȡID
        var rank = target.parentNode.cells[0].textContent;
        var url = 'details.html?rank=' + encodeURIComponent(rank); // �����µ�URL
        console.log(url); 
        window.location.href = url; // ��תҳ��
    }
});

$("#search-leaderboard").keyup(function () {
    var value = this.value.toLowerCase();

    $("table").find("tr").each(function (index) {
        if (index === 0) return;

        var if_td_has = false;
        $(this).find('td').each(function () {
            if_td_has = if_td_has || $(this).text().toLowerCase().indexOf(value) !== -1; 
        });

        $(this).toggle(if_td_has);

    });
});