function getQueryParam(param) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

var rank = getQueryParam('rank'); // ��ȡrank����

console.log(rank);