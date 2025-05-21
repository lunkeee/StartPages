// 定义搜索引擎和对应的图标
const engines = [
    { name: 'Bing', icon: 'bing-engin.png', url: 'https://www.bing.com/search?q=' },
    { name: 'Baidu', icon: 'baidu-engin.png', url: 'https://www.baidu.com/s?wd=' },
    { name: 'Google', icon: 'google-enigin.png', url: 'https://www.google.com/search?q=' }
];


// 时间组件
function updateTime() {
    const timeElement = document.getElementById('time');
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    const currentDate = `${date.getMonth() + 1}月${date.getDate()}日 周${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]}`;
    timeElement.innerHTML = `<div class="datetime-time">${currentTime}</div><div class="datetime-date">${currentDate}</div>`;
}


console.log("?")
//收藏夹
// 使用fetch加载导出的HTML文件
function bookmarks() {
    console.log("1")
    fetch('./favorites.html')
        .then(response => response.text())
        .then(html => {
            console.log("2")
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            console.log(doc)

            // 提取所有的<A>标签
            const links = doc.querySelectorAll('a');
            const bookmarksContainer = document.getElementById('bookmarks');

            links.forEach(link => {
                const title = link.textContent;
                const url = link.getAttribute('href');

                // 创建新的链接元素
                const newLink = document.createElement('a');
                newLink.href = url;
                newLink.textContent = title;
                newLink.style.display = 'block'; // 可以根据需要设置样式

                // 将链接添加到页面中
                bookmarksContainer.appendChild(newLink);
            });
        })
        .catch(error => console.error('Error loading bookmarks:', error));
}

console.log("?")
bookmarks()


// 搜索功能
document.getElementById('search-btn').addEventListener('click', function () {
    const searchEngine = document.getElementById('search-engine').value;
    const searchQuery = document.getElementById('search-input').value;
    let searchUrl = '';

    switch (searchEngine) {
        case 'baidu':
            searchUrl = `https://www.baidu.com/s?wd=${searchQuery}`;
            break;
        case 'google':
            searchUrl = `https://www.google.com/search?q=${searchQuery}`;
            break;
        case 'bing':
            searchUrl = `https://www.bing.com/search?q=${searchQuery}`;
            break;
    }

    if (searchQuery) {
        window.location.href = searchUrl;
    }
});

// 页面加载时更新时间和天气
// window.onload = function () {
//     updateTime();
//     updateWeather();
//     setInterval(updateTime, 60000);  // 每分钟更新一次时间
// };
