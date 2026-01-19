// js/about.js - 关于我们页面专用功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('关于我们页面已加载 - 东莞市杰威精密模具配件有限公司');
    
    // 初始化时间线动画
    initTimelineAnimation();
    
    // 初始化领导卡片点击事件
    initLeaderCards();
    
    // 初始化统计数字动画
    initStatsCounter();
    
    // 初始化页面滚动动画
    initScrollAnimation();
    
    // 设置当前年份
    setCurrentYear();
});

// 设置当前年份
function setCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

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
    
    // 根据不同的领导提供不同的详细介绍
    let detailedBio = '';
    let detailedEducation = '';
    
    if (data.name === '蒋雪飞') {
        detailedBio = `
            <p>蒋雪飞先生是东莞市杰威精密模具配件有限公司的创始人兼法定代表人，自2015年公司成立以来，一直担任公司总经理职务。</p>
            <p>蒋先生深耕制造业多年，对精密加工行业有着深刻的理解和独到的见解。在他的带领下，公司从初创期的小规模加工厂，逐步发展成为如今拥有3500平方米生产面积、50多名专业员工、年服务客户超过200家的现代化企业。</p>
            <p>他始终坚持"质量为本、客户至上"的经营理念，注重技术创新和工艺改进，带领团队攻克了多个技术难题，赢得了客户的广泛信任和赞誉。</p>
        `;
        detailedEducation = `
            <p><i class="fas fa-user-tie"></i> 法定代表人，全面负责公司战略规划与运营管理</p>
            <p><i class="fas fa-lightbulb"></i> 对精密制造行业有深刻理解，擅长企业战略规划与市场开拓</p>
            <p><i class="fas fa-handshake"></i> 注重客户关系维护，建立长期稳定的合作伙伴关系</p>
        `;
    } else if (data.name === '陈志强') {
        detailedBio = `
            <p>陈志强先生担任公司生产经理，拥有12年精密加工生产管理经验，是公司生产运营的核心骨干。</p>
            <p>他精通各类数控设备的加工工艺与编程，擅长生产流程优化和效率提升。在陈经理的带领下，公司生产效率逐年提升15%以上，产品不良率持续下降。</p>
            <p>他注重现场管理和团队建设，培养了一支技术过硬、责任心强的生产团队，确保每个订单都能按时、按质、按量完成。</p>
        `;
        detailedEducation = `
            <p><i class="fas fa-cogs"></i> 擅长CNC编程、工艺改善与成本控制</p>
            <p><i class="fas fa-chart-line"></i> 精通精益生产管理，持续优化生产流程</p>
            <p><i class="fas fa-users"></i> 注重团队建设与员工技能培训</p>
        `;
    } else if (data.name === '王工') {
        detailedBio = `
            <p>王工担任公司技术主管，拥有10年模具与治夹具设计经验，是公司技术团队的核心成员。</p>
            <p>他精通CAD/CAM软件，能够快速理解客户需求，提供经济可靠的加工方案。在技术难题攻关方面有突出表现，曾主导多个复杂零件的工艺开发项目。</p>
            <p>王工注重技术积累和经验分享，建立了公司内部的技术知识库，为年轻技术人员提供指导和培训。</p>
        `;
        detailedEducation = `
            <p><i class="fas fa-laptop-code"></i> 精通CAD/CAM软件，专注工艺可行性分析</p>
            <p><i class="fas fa-tools"></i> 擅长复杂零件加工工艺设计</p>
            <p><i class="fas fa-book"></i> 建立公司技术知识库，培养技术人才</p>
        `;
    } else if (data.name === '李芳') {
        detailedBio = `
            <p>李芳女士担任公司品控主管，拥有8年精密零件质检经验，是公司质量体系的守护者。</p>
            <p>她建立了完善的质量控制流程和检验标准，确保从原材料入库到成品出厂的每一个环节都符合质量要求。在她的严格把关下，公司产品出厂合格率连续三年保持在99.8%以上。</p>
            <p>李主管注重检测设备的维护和更新，定期组织质量培训，提升全员质量意识，为客户提供可靠的质量保障。</p>
        `;
        detailedEducation = `
            <p><i class="fas fa-search"></i> 熟练操作各类精密测量仪器</p>
            <p><i class="fas fa-clipboard-check"></i> 建立完善的质量控制体系</p>
            <p><i class="fas fa-chart-bar"></i> 擅长质量数据分析与改进</p>
        `;
    } else {
        detailedBio = data.bio;
        detailedEducation = data.education;
    }
    
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
                            ${detailedBio}
                        </div>
                        <div class="modal-leader-education">
                            <h3>专业能力</h3>
                            ${detailedEducation}
                            <ul>
                                <li>多次获得客户质量表彰</li>
                                <li>参与多项工艺改进项目</li>
                                <li>培养多名技术骨干</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加模态框样式（如果尚未添加）
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
            margin-top: 15px;
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
    const isPercent = originalText.includes('%');
    const duration = 2000;
    let startTime = null;
    
    // 对于百分比，我们直接从0开始
    if (isPercent) {
        element.textContent = '0%';
    } else if (hasPlus) {
        element.textContent = '0+';
    } else {
        element.textContent = '0';
    }
    
    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数使动画更自然
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        let current = easeOutQuart * target;
        
        if (isPercent) {
            element.textContent = Math.floor(current) + '%';
        } else if (Number.isInteger(target)) {
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
    initScrollAnimation,
    setCurrentYear
};