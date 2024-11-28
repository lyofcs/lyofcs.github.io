let activityIndex = 0;
const activityBackgrounds = [
    'url("/img/logo.png")', // 你可以替换成实际的图片URL
    'url("/img/rank1.png")', // 你可以替换成实际的图片URL
    // ... 添加更多背景图片
];

function addActivity() {
    const form = document.getElementById('activityForm');
    const formData = new FormData(form);

    const activityCard = document.createElement('div');
    activityCard.classList.add('activity-card');
    activityCard.style.backgroundImage = activityBackgrounds[activityIndex % activityBackgrounds.length];

    const content = document.createElement('div');
    content.classList.add('content');

    const activityName = document.createElement('h2');
    activityName.textContent = formData.get('activityName');

    const activityTime = document.createElement('p');
    activityTime.textContent = `时间: ${formData.get('activityTime')}`;

    const activityLocation = document.createElement('p');
    activityLocation.textContent = `地点: ${formData.get('activityLocation')}`;

    const activityRules = document.createElement('p');
    activityRules.textContent = `规则: ${formData.get('activityRules')}`;

    content.appendChild(activityName);
    content.appendChild(activityTime);
    content.appendChild(activityLocation);
    content.appendChild(activityRules);

    activityCard.appendChild(content);

    document.getElementById('activityList').appendChild(activityCard);

    // 重置表单
    form.reset();

    activityIndex++;
}

document.getElementById('downloadBtn').addEventListener('click', function () {
    const activityList = document.getElementById('activityList');
    html2canvas(activityList).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'activity_image.png';
        link.click();
    });
});