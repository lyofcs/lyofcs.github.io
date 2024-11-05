document.addEventListener('DOMContentLoaded', () => {
    const totalPages = 1000; // 总页数，可以根据实际情况修改  
    let currentPage = 1;

    const currentPageSpan = document.getElementById('currentPage');  
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const gotoPageInput = document.getElementById('goto-page');
    const gotoBtn = document.getElementById('goto-btn');

    const updateUI = () => {
        console.log('GGGGG:' + currentPage);
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    };

    // 更新当前页码显示  
    function updateCurrentPage() {
        // 更新URL锚点  
        window.location.href = 'detail.html?rank=' + currentPage;
    }

    // 上一页按钮点击事件  
    /*prevPageButton.addEventListener('click', () => {
        console.log("11111asdzxc:" + currentPage);
        if (currentPage > 1) {
            currentPage--;
            console.log("11111asdzxc:" + currentPage);
            updateCurrentPage();
        }
    });*/

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateCurrentPage();
        }
    });


    // 下一页按钮点击事件  
    nextPageButton.addEventListener('click', () => {
        currentPage++;
        updateCurrentPage();
    });

    // 前往按钮点击事件  
    gotoBtn.addEventListener('click', () => {
        const inputPage = parseInt(gotoPageInput.value, 10);
        if (!isNaN(inputPage) && inputPage > 0) {
            currentPage = inputPage;
            updateCurrentPage();
        } else {
            alert('请输入有效的页码');
        }
    });

    // 页面加载时，如果URL中有锚点，则解析并显示对应的页码  
    const search = window.location.search;
    if (search && search.startsWith('?rank=')) {

        const searchPage = search.slice(6);

        if (!isNaN(searchPage) && searchPage > 0) {
            currentPage = searchPage;
            gotoPageInput.placeholder = currentPage;  
        }
    }

    updateUI();
});