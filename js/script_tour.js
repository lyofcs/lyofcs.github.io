fetch('/data/data.json')
    .then(response => {
        if (response.ok) {
            return response.json(); // 将响应转换为JSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(jsonData => {
        jsonData.tournaments.forEach(function (tour) {
            addAccordionPanel(tour);
            checkQualify(tour);
        });

        var ft = document.getElementById('final');
        var rows = ft.rows;
        for (i = 1; i <= 4; i++) {
            rows[i].cells[1].innerText = finalist[i-1];
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


let checks = [
    { text: "DPCUP", value: 1 }, // 如果包含 "keyword1"，则设置值为 1
    { text: "月赛", value: 2 },  // 如果包含 "example"，则设置值为 2
    { text: "初中级", value: 3 },  // 如果都不包含，则默认值为 3
    { text: "", value: 4 },  // 如果都不包含，则默认值为 4
    { text: "升龙杯", value: 1 }   // 如果都不包含，则默认值为 3
];

let finalist = [
    [],[],[],[]
];
let banlist = [];

let panelCount = 0; // 用于生成唯一的收纳板ID

function getKeyByValue(object, value) {
    for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] === value) {
            return key; // 找到第一个匹配的键后立即返回
        }
    }
    return null; // 如果没有找到匹配的键，则返回null
}

function checkQualify(tour) {
    let title = tour.desc.toLowerCase();
    let type = 4;
    for (let check of checks) {
        if (title.includes(check.text.toLowerCase())) {
            type = check.value;
            break;
        }
    };
    let name = '';
    switch (type) {
        case 1:
            name = getKeyByValue(tour.result, 1);
            if (!banlist.includes(name)) {
                finalist[0].push(name);
                banlist.push(name);
            }
            name = getKeyByValue(tour.result, 2);
            if (!banlist.includes(name)) {
                finalist[0].push(name);
                banlist.push(name);
            }
            break;
        case 2:
            name = getKeyByValue(tour.result, 1);
            if (!banlist.includes(name)) {
                finalist[1].push(name);
                banlist.push(name);
            }
            break;
        case 3:
            break;
        default:
            break;
    }

}




function createAccordionPanel(tour) {
    // 创建一个新的收纳板元素
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';
    accordionItem.id = `accordionItem-${panelCount++}`;

    // 创建收纳板头部
    const accordionHeader = document.createElement('div');
    accordionHeader.className = 'accordion-header';
    accordionHeader.onclick = function () {
        toggleAccordion(this.nextElementSibling, this.querySelector('.accordion-arrow'));
    };

    const accordionText = document.createElement('span');
    accordionText.className = 'accordion-text';
    accordionText.textContent = tour.desc + tour.date;

    const accordionArrow = document.createElement('span');
    accordionArrow.className = 'accordion-arrow';
    accordionArrow.innerHTML = '&#9650;'; // 初始状态为收缩

    accordionHeader.appendChild(accordionText);
    accordionHeader.appendChild(accordionArrow);

    // 创建收纳板内容
    const accordionContent = document.createElement('div');
    accordionContent.className = 'accordion-content';
    accordionContent.style.maxHeight = '400px'; // 初始状态为收缩

    //创建表格
    //先创建表头，固定两列名次和ID
    const table = document.createElement('table');
    table.className = 'tour-table';
    const headerRow = document.createElement('tr');
    const headers = ['名次', '选手ID'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    //创建表体，从tour object中获取名次对应选手的KV结构，并逐个赋值
    const tbody = document.createElement('tbody');

    const result = tour.result;

    for (var key in result) {
        var row = tbody.insertRow(-1);
        var cell1 = row.insertCell(0); // 当前名次
        var cell2 = row.insertCell(1); // 选手ID
        cell1.textContent = result[key];
        cell2.textContent = key;
    }

    table.appendChild(tbody);

    accordionContent.appendChild(table);

    // 将头部和内容添加到收纳板中
    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionContent);

    return accordionItem;
}

function toggleAccordion(content, arrow) {
    console.log("点击nav" + '最大高度：' + content.style.maxHeight)
    // 切换内容高度和箭头方向
    if (content.style.maxHeight == '0px') {
        console.log('应该展开');
        //content.style.maxHeight = content.scrollHeight + 'px';
        content.style.maxHeight = '400px';
        arrow.innerHTML = '&#9650;'; // 切换为上箭头
    } else {
        console.log('应该收缩');
        content.style.maxHeight = '0px';
        arrow.innerHTML = '&#9660;'; // 切换为下箭头
    }

    // 可选：添加或移除高亮效果
    // const accordionItem = content.parentElement;
    // accordionItem.classList.toggle('highlight');
}

function addAccordionPanel(tour) {
    // 生成一个新的标题（例如，使用面板计数）
    // 创建新的收纳板并添加到容器中
    const newPanel = createAccordionPanel(tour);
    const container = document.getElementById('accordionContainer');
    container.appendChild(newPanel);
}