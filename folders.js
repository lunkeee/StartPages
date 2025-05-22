// 读取同目录文件下的favorites.html 解析收藏夹内容
async function parseBookmarksFromFile() {
    try {
        // 1. 获取 favorites.html 文件内容
        const response = await fetch('favorites.html');
        const htmlString = await response.text();

        // 2. 创建 DOM 解析器
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const result = {};

        // 3. 获取所有H3标签（分类标题）
        const categories = doc.querySelectorAll('h3');

        categories.forEach(category => {
            const categoryName = category.textContent;
            if (categoryName === '收藏夹栏') {
                return;
            }
            result[categoryName] = [];

            // 4. 获取当前分类下的所有链接
            const dl = category.nextElementSibling;
            if (dl && dl.tagName === 'DL' && dl.textContent !== '收藏夹栏') {
                const links = dl.querySelectorAll('a');

                links.forEach(link => {
                    result[categoryName].push({
                        name: link.textContent,
                        url: link.getAttribute('href'),
                        icon: link.getAttribute('ICON') || '' // 注意属性名是大写的 ICON
                    });
                });
            }
        });

        return result;

    } catch (error) {
        console.error('Error parsing bookmarks:', error);
        return {};
    }
}

// 渲染书签到页面
function renderBookmarks(foldersData) {
    // 获取容器
    const foldersContainer = document.getElementById('folders-container');

    // 遍历数据并生成文件夹和链接
    for (const [folderName, links] of Object.entries(foldersData)) {
        // 创建文件夹容器
        const folderDiv = document.createElement('div');
        folderDiv.className = 'folder';

        // 创建文件夹按钮
        const folderButton = document.createElement('button');
        folderButton.className = 'folder-btn';
        folderButton.textContent = folderName;
        folderDiv.appendChild(folderButton);

        // 创建下拉菜单
        const folderContent = document.createElement('div');
        folderContent.className = 'folder-content';

        // 添加链接到下拉菜单
        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.name;
            folderContent.appendChild(linkElement);
        });

        // 将下拉菜单添加到文件夹容器
        folderDiv.appendChild(folderContent);

        // 将文件夹添加到页面容器
        foldersContainer.appendChild(folderDiv);
    }
}

// 主执行流程
(async function() {
    console.log("hello");
    
    try {
        // 解析书签文件
        const bookmarks = await parseBookmarksFromFile();
        
        // 打印结果
        console.log('Extracted bookmarks:', bookmarks);
        
        // 渲染书签到页面
        renderBookmarks(bookmarks);
    } catch (error) {
        console.error('Error:', error);
    }
})();