function getQueryParam(param) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

var rank = getQueryParam('rank'); // ��ȡrank����

console.log(data.members[rank].tfaName);

console.log(data.members[rank].historyMMR);

console.log(rank);

//var tourTable = document.querySelector('#rankings > tbody');