// js/nav.js - 导航栏动态生成功能

// 导航链接数据
const navLinks = [
    {
        href: 'index.html',
        text: '首页',
        id: 'home'
    },
    {
        href: 'about.html',
        text: '关于我们',
        id: 'about'
    },
    {
        href: 'capabilities.html',
        text: '核心能力',
        id: 'capabilities'
    },
    {
        href: 'services.html',
        text: '产品服务',
        id: 'services'
    },
    {
        href: 'cases.html',
        text: '成功案例',
        id: 'cases'
    },
    {
        href: 'quality.html',
        text: '质量体系',
        id: 'quality'
    },
    {
        href: 'contact.html',
        text: '联系我们',
        id: 'contact'
    }
];

// 生成导航栏
function generateNav() {
    const mainNav = document.getElementById('mainNav');
    if (!mainNav) return;
    
    // 创建ul元素
    const ul = document.createElement('ul');
    
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    const currentFilename = currentPath.split('/').pop() || 'index.html';
    
    // 生成导航链接
    navLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = link.href;
        a.textContent = link.text;
        a.setAttribute('data-nav-id', link.id);
        
        // 设置当前页面的活动状态
        if (link.href === currentFilename) {
            a.classList.add('active');
        }
        
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    // 清空现有内容并添加新生成的导航
    mainNav.innerHTML = '';
    mainNav.appendChild(ul);
}

// 初始化导航生成
function initNav() {
    generateNav();
}

// 导出函数供其他模块使用
window.NavGenerator = {
    generateNav,
    initNav,
    navLinks
};
