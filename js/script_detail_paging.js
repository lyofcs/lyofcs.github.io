document.addEventListener('DOMContentLoaded', () => {
    const totalPages = 1000; // 总页数，可以根据实际情况修改  
    let currentPage = 1;

    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const gotoPageInput = document.getElementById('goto-page');
    const gotoBtn = document.getElementById('goto-btn');

    const updateUI = () => {
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            updateUI();
        } else {
            alert('请输入有效的页码');
        }
    };

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    });

    gotoBtn.addEventListener('click', () => {
        const page = parseInt(gotoPageInput.value, 10);
        goToPage(page);
    });

    // 初始化页面状态  
    updateUI();
});