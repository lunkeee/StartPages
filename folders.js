// 定义文件夹数据
const foldersData = {
    "INTERNET": [
        { name: "GameRes游资网", url: "https://www.gameres.com/" },
        { name: "3DMGAME_中国单机游戏论坛", url: "https://bbs.3dmgame.com/forum.php" },
        { name: "中国国家地理网", url: "http://www.dili360.com/" },
        { name: "中舞网", url: "https://www.dance365.com/index/recommend" }
    ],
    "WEB": [
        { name: "DeepSeek - 探索未至之境", url: "https://chat.deepseek.com/a/chat/s/07e61861-a4cc-4690-9f4b-51c419eb558b" },
        { name: "GitHub", url: "https://github.com/" },
        { name: "YouTube", url: "https://www.youtube.com/" },
        { name: "微信公众平台", url: "https://mp.weixin.qq.com/cgi-bin/loginpage?url=%2Fcgi-bin%2Fhome%3Ftoken%3D889279717" }
    ],
    "DOCS": [
        { name: "系统架构 · 野火IM 产品介绍", url: "https://docs.wildfirechat.cn/architecture/" },
        { name: "API 文档 | Ping++", url: "https://www.pingxx.com/api/Users%20%E7%94%A8%E6%88%B7%E6%A6%82%E8%BF%B0.html" },
        { name: "Scratchapixel 4.0, Learn Computer Graphics Programming", url: "https://www.scratchapixel.com/" }
    ]
};

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