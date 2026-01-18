// js/services.js - 产品服务页面功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initServiceTabs();
    initServiceNavigation();
    initServiceAnimations();
});

// 初始化服务标签页
function initServiceTabs() {
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceSections = document.querySelectorAll('.service-section');
    
    if (serviceTabs.length === 0 || serviceSections.length === 0) return;
    
    // 默认显示第一个服务
    const firstTab = serviceTabs[0];
    const firstSection = serviceSections[0];
    
    firstTab.classList.add('active');
    firstSection.classList.add('active');
    
    // 标签点击事件
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // 更新激活的标签
            serviceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新显示的服务区域
            serviceSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    setTimeout(() => {
                        section.classList.add('active');
                        // 滚动到该区域
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 10);
                }
            });
            
            // 更新URL哈希
            updateURLHash(targetId);
        });
    });
    
    // 检查URL哈希
    checkURLHash();
}

// 检查URL哈希并激活相应标签
function checkURLHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetTab = document.querySelector(`.service-tab[data-target="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
}

// 更新URL哈希
function updateURLHash(targetId) {
    if (history.pushState) {
        history.pushState(null, null, `#${targetId}`);
    } else {
        window.location.hash = `#${targetId}`;
    }
}

// 初始化服务导航
function initServiceNavigation() {
    // 监听滚动，更新活跃的服务标签
    window.addEventListener('scroll', throttle(updateActiveServiceTab, 200));
    
    // 初始更新
    updateActiveServiceTab();
}

// 更新活跃的服务标签
function updateActiveServiceTab() {
    const serviceSections = document.querySelectorAll('.service-section');
    const serviceTabs = document.querySelectorAll('.service-tab');
    const scrollPosition = window.scrollY + 150;
    
    let currentSectionId = '';
    
    serviceSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.id;
        }
    });
    
    if (currentSectionId) {
        serviceTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-target') === currentSectionId) {
                tab.classList.add('active');
            }
        });
    }
}

// 初始化服务动画
function initServiceAnimations() {
    const animatedElements = document.querySelectorAll('.benefit-card, .software-item, .testing-card, .report-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 工具函数：节流
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

// 服务咨询表单处理
function initServiceConsultation() {
    const consultationForm = document.getElementById('serviceConsultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serviceType = this.querySelector('select[name="service-type"]').value;
            const name = this.querySelector('input[name="name"]').value;
            const phone = this.querySelector('input[name="phone"]').value;
            const description = this.querySelector('textarea[name="description"]').value;
            
            // 显示加载状态
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;
            
            // 模拟提交
            setTimeout(() => {
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('服务咨询已提交！我们的业务专员将在24小时内与您联系。', 'success');
                }
                
                // 重置表单
                this.reset();
                
                // 恢复按钮状态
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // 记录提交
                console.log('服务咨询提交:', { serviceType, name, phone, description });
            }, 1500);
        });
    }
}

// 材料标签交互
function initMaterialTags() {
    const materialTags = document.querySelectorAll('.material-tag');
    
    materialTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const material = this.textContent;
            
            // 显示材料信息
            showMaterialInfo(material);
            
            // 添加点击效果
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
}

// 显示材料信息
function showMaterialInfo(material) {
    const materialInfo = {
        '模具钢': '常用模具钢材：P20、718、S136、NAK80、H13等',
        '不锈钢': '304、316、420、440C等不锈钢材料',
        '铝合金': '6061、7075、ADC12等铝合金材料',
        '铜合金': '黄铜、青铜、铍铜等铜合金材料',
        '钛合金': 'TC4、TA2等钛合金材料',
        '工程塑料': 'POM、PEEK、尼龙、PC等工程塑料',
        '陶瓷': '氧化铝、氧化锆等陶瓷材料',
        '复合材料': '碳纤维、玻璃钢等复合材料'
    };
    
    const info = materialInfo[material] || `关于${material}的详细信息`;
    
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(`${material}: ${info}`, 'info');
    }
}

// 保养计划表格交互
function initMaintenanceTable() {
    const tableRows = document.querySelectorAll('.plan-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // 移除其他行的选中状态
            tableRows.forEach(r => r.classList.remove('selected'));
            
            // 添加选中状态
            this.classList.add('selected');
            
            // 显示详细保养方案
            const maintenanceType = this.cells[0].textContent;
            const period = this.cells[1].textContent;
            const content = this.cells[2].textContent;
            const time = this.cells[3].textContent;
            
            showMaintenanceDetail(maintenanceType, period, content, time);
        });
    });
}

// 显示保养详情
function showMaintenanceDetail(type, period, content, time) {
    const detailContent = `
        <h3>${type}保养方案</h3>
        <p><strong>保养周期：</strong>${period}</p>
        <p><strong>主要内容：</strong>${content}</p>
        <p><strong>所需时间：</strong>${time}</p>
        <p><strong>服务说明：</strong>专业技术人员上门服务，提供保养报告</p>
        <button class="btn btn-primary" onclick="requestMaintenance('${type}')">预约${type}保养</button>
    `;
    
    // 显示详情弹窗
    showDetailModal(detailContent, `${type}保养方案`);
}

// 显示详情弹窗
function showDetailModal(content, title) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'detail-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 关闭按钮事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        closeDetailModal(modal);
    });
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDetailModal(modal);
        }
    });
}

// 关闭详情弹窗
function closeDetailModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// 预约保养服务
function requestMaintenance(type) {
    const formContent = `
        <h3>预约${type}保养服务</h3>
        <form id="maintenanceForm">
            <div class="form-group">
                <label for="company">公司名称</label>
                <input type="text" id="company" name="company" required>
            </div>
            <div class="form-group">
                <label for="contact">联系人</label>
                <input type="text" id="contact" name="contact" required>
            </div>
            <div class="form-group">
                <label for="phone">联系电话</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="moldInfo">模具信息</label>
                <textarea id="moldInfo" name="moldInfo" placeholder="请提供模具型号、数量等信息" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="preferredDate">期望保养时间</label>
                <input type="date" id="preferredDate" name="preferredDate">
            </div>
            <button type="submit" class="btn btn-primary">提交预约</button>
        </form>
    `;
    
    showDetailModal(formContent, `预约${type}保养`);
    
    // 处理表单提交
    setTimeout(() => {
        const form = document.getElementById('maintenanceForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 显示提交成功
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('保养预约已提交！我们将尽快与您确认服务时间。', 'success');
                }
                
                // 关闭模态框
                const modal = document.querySelector('.detail-modal.show');
                if (modal) {
                    closeDetailModal(modal);
                }
                
                console.log('保养预约:', data);
            });
        }
    }, 100);
}

// 添加CSS样式
const serviceStyles = `
    .detail-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
    }
    
    .detail-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background: white;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        transform: translateY(-20px);
        transition: transform 0.3s;
    }
    
    .detail-modal.show .modal-content {
        transform: translateY(0);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--primary-blue);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--medium-gray);
        cursor: pointer;
        padding: 5px;
        line-height: 1;
    }
    
    .modal-body {
        padding: 20px;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        color: var(--dark-gray);
        font-weight: 500;
    }
    
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 1rem;
        font-family: inherit;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--accent-blue);
    }
    
    .plan-table tr.selected {
        background-color: rgba(0, 112, 204, 0.1) !important;
    }
    
    .material-tag.clicked {
        transform: scale(0.95);
    }
    
    .benefit-card.animate-in,
    .software-item.animate-in,
    .testing-card.animate-in,
    .report-item.animate-in {
        animation: slideUp 0.5s ease;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = serviceStyles;
document.head.appendChild(styleSheet);

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initServiceTabs();
    initServiceNavigation();
    initServiceAnimations();
    initServiceConsultation();
    initMaterialTags();
    initMaintenanceTable();
});