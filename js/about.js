// js/about.js - 关于我们页面专用功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('关于我们页面已加载');
    
    // 初始化时间线动画
    initTimelineAnimation();
    
    // 初始化领导卡片点击事件
    initLeaderCards();
    
    // 初始化统计数字动画
    initStatsCounter();
    
    // 初始化页面滚动动画
    initScrollAnimation();
});

// 时间线滚动动画
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineItems.length) return;
    
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加延迟动画效果
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                
                // 停止观察已动画的项目
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 设置初始状态和观察每个项目
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // 添加悬停效果
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const year = item.querySelector('.timeline-year');
        
        item.addEventListener('mouseenter', function() {
            if (content) {
                content.style.transform = 'translateY(-8px)';
                content.style.boxShadow = '0 20px 40px rgba(0, 119, 204, 0.15)';
            }
            if (year) {
                year.style.color = 'var(--accent-blue)';
                year.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (content) {
                content.style.transform = 'translateY(-5px)';
                content.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
            }
            if (year) {
                year.style.color = 'var(--primary-blue)';
                year.style.transform = 'scale(1)';
            }
        });
        
        // 点击展开/收起详细信息
        content.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return; // 不阻止链接点击
            
            const list = this.querySelector('ul');
            if (list) {
                const isExpanded = this.classList.contains('expanded');
                if (isExpanded) {
                    this.classList.remove('expanded');
                    list.style.maxHeight = '100px';
                    list.style.overflow = 'hidden';
                } else {
                    this.classList.add('expanded');
                    list.style.maxHeight = list.scrollHeight + 'px';
                }
            }
        });
        
        // 初始化列表样式
        const list = content.querySelector('ul');
        if (list) {
            list.style.maxHeight = '100px';
            list.style.overflow = 'hidden';
            list.style.transition = 'max-height 0.4s ease';
        }
    });
    
    // 添加展开/收起提示
    addTimelineExpandHint();
}

// 添加展开/收起提示样式
function addTimelineExpandHint() {
    if (document.getElementById('timeline-expand-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'timeline-expand-styles';
    styles.textContent = `
        .timeline-content {
            cursor: pointer;
            position: relative;
        }
        
        .timeline-content::after {
            content: '点击展开详情';
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 0.8rem;
            color: var(--accent-blue);
            opacity: 0;
            transition: opacity 0.3s ease;
            background: rgba(255, 255, 255, 0.9);
            padding: 4px 8px;
            border-radius: 4px;
        }
        
        .timeline-content:hover::after {
            opacity: 0.7;
        }
        
        .timeline-content.expanded::after {
            content: '点击收起详情';
        }
        
        .timeline-content.expanded .timeline-details {
            overflow: visible;
        }
    `;
    document.head.appendChild(styles);
}

// 领导卡片功能
function initLeaderCards() {
    const leaderCards = document.querySelectorAll('.leader-card');
    
    leaderCards.forEach(card => {
        // 添加点击查看详情功能
        card.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            const title = this.querySelector('.leader-title').textContent;
            const experience = this.querySelector('.leader-experience').textContent;
            const bio = this.querySelector('.leader-bio p').textContent;
            const education = this.querySelector('.leader-education p').textContent;
            
            // 显示领导详情
            showLeaderDetail({
                name: name,
                title: title,
                experience: experience,
                bio: bio,
                education: education
            });
        });
        
        // 添加键盘支持
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
}

// 显示领导详情
function showLeaderDetail(data) {
    // 创建详情弹窗
    const modal = document.createElement('div');
    modal.className = 'leader-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-leader">
                    <div class="modal-leader-image">
                        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="${data.name}">
                    </div>
                    <div class="modal-leader-info">
                        <h2>${data.name}</h2>
                        <p class="modal-leader-title">${data.title}</p>
                        <p class="modal-leader-experience">${data.experience}</p>
                        <div class="modal-leader-bio">
                            <h3>个人简介</h3>
                            <p>${data.bio}</p>
                            <p>在精密模具制造领域拥有丰富经验，带领团队完成多项技术突破和创新项目。注重团队建设和人才培养，建立了完善的技术和管理体系。</p>
                        </div>
                        <div class="modal-leader-education">
                            <h3>教育背景</h3>
                            <p>${data.education}</p>
                            <ul>
                                <li>拥有多项国家发明专利</li>
                                <li>多次获得行业技术创新奖</li>
                                <li>发表专业论文多篇</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加模态框样式
    addModalStyles();
    
    // 显示模态框
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // 关闭按钮事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.parentNode) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
}

// 添加模态框样式
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
        .leader-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1100;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .leader-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background-color: white;
            border-radius: 15px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }
        
        .leader-modal.active .modal-content {
            transform: translateY(0);
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 2rem;
            color: var(--medium-gray);
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: var(--accent-blue);
        }
        
        .modal-body {
            padding: 40px;
        }
        
        .modal-leader {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 40px;
        }
        
        .modal-leader-image {
            border-radius: 10px;
            overflow: hidden;
        }
        
        .modal-leader-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .modal-leader-info h2 {
            font-size: 2rem;
            color: var(--primary-blue);
            margin-bottom: 10px;
        }
        
        .modal-leader-title {
            color: var(--accent-blue);
            font-weight: 600;
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
        
        .modal-leader-experience {
            color: var(--medium-gray);
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .modal-leader-bio h3,
        .modal-leader-education h3 {
            font-size: 1.3rem;
            color: var(--primary-blue);
            margin: 20px 0 15px;
        }
        
        .modal-leader-bio p,
        .modal-leader-education p {
            color: var(--dark-gray);
            line-height: 1.7;
            margin-bottom: 15px;
        }
        
        .modal-leader-education ul {
            list-style: none;
            padding-left: 0;
        }
        
        .modal-leader-education li {
            padding: 8px 0;
            color: var(--dark-gray);
            position: relative;
            padding-left: 25px;
        }
        
        .modal-leader-education li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--accent-blue);
            font-size: 1.5rem;
            line-height: 1;
        }
        
        @media (max-width: 768px) {
            .modal-leader {
                grid-template-columns: 1fr;
            }
            
            .modal-leader-image {
                max-width: 300px;
                margin: 0 auto;
            }
            
            .modal-body {
                padding: 30px 20px;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

// 统计数字动画
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h3');
                if (statNumber && !statNumber.dataset.animated) {
                    animateCounter(statNumber);
                    statNumber.dataset.animated = 'true';
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    statCards.forEach(card => {
        observer.observe(card);
    });
}

// 数字计数动画
function animateCounter(element) {
    const originalText = element.textContent;
    const target = parseFloat(originalText.replace(/[^0-9.]/g, ''));
    const hasPlus = originalText.includes('+');
    const duration = 2000;
    let startTime = null;
    
    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        let current = progress * target;
        
        if (Number.isInteger(target)) {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        } else {
            element.textContent = current.toFixed(1) + (hasPlus ? '+' : '');
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = originalText;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// 页面滚动动画
function initScrollAnimation() {
    const sections = document.querySelectorAll('.company-intro, .leadership-section, .facilities-section, .culture-section, .awards-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
}

// 导出功能
window.AboutPage = {
    initTimelineAnimation,
    initLeaderCards,
    initStatsCounter,
    initScrollAnimation
};