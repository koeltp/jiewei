// js/navigation.js - 导航相关功能

// 初始化导航
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        // 移动端菜单切换
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // 点击导航链接后关闭移动菜单
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && 
                !mobileMenuBtn.contains(event.target) && 
                mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // 窗口大小变化时重置菜单
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250));
    }
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化导航高亮
    initNavHighlight();
}

// 切换移动菜单
function toggleMobileMenu() {
    const mainNav = document.getElementById('mainNav');
    const icon = document.querySelector('#mobileMenuBtn i');
    
    mainNav.classList.toggle('active');
    
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// 关闭移动菜单
function closeMobileMenu() {
    const mainNav = document.getElementById('mainNav');
    const icon = document.querySelector('#mobileMenuBtn i');
    
    mainNav.classList.remove('active');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// 初始化平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // 排除空锚点和页脚中的外部页面链接
        if (anchor.getAttribute('href') === '#' || 
            anchor.getAttribute('href').startsWith('#!') ||
            anchor.getAttribute('href').includes('.html#')) {
            return;
        }
        
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 如果是当前页面的锚点
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // 计算滚动位置（考虑固定导航栏的高度）
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20; // 额外偏移20px
                    
                    // 平滑滚动到目标位置
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 更新URL哈希（不滚动）
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                    
                    // 如果是在移动端，点击后关闭菜单
                    if (window.innerWidth <= 768) {
                        closeMobileMenu();
                    }
                }
            }
        });
    });
    
    // 处理页面加载时的哈希锚点
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

// 初始化导航高亮
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    // 初始高亮
    highlightNav();
    
    // 滚动时高亮
    window.addEventListener('scroll', throttle(highlightNav, 100));
}

// 高亮当前导航
function highlightNav() {
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const scrollPosition = window.scrollY + 100;
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSectionId}` || 
            (currentSectionId === '' && href === '#')) {
            link.classList.add('active');
        }
    });
}

// 防抖函数（如果main.js中已定义，可以移除）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数（如果main.js中已定义，可以移除）
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}