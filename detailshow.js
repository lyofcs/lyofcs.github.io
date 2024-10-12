function getQueryParam(param) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

var rank = getQueryParam('rank'); // 获取rank参数
var jsonData = localStorage.getItem("json")

console.log(jsonData.members[rank].tfaName);
console.log(jsonData.members[rank].historyMMR);
//console.log(data.members[rank].tfaName);

//console.log(data.members[rank].historyMMR);

console.log(rank);

//var tourTable = document.querySelector('#rankings > tbody');