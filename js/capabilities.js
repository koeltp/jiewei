// js/capabilities.js - 核心能力页面功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initProcessTabs();
    initEquipmentFilter();
    initMaterialInteractions();
    initSpecsTables();
});

// 初始化工艺选项卡
function initProcessTabs() {
    const processTabs = document.querySelectorAll('.process-tab');
    const processContents = document.querySelectorAll('.process-content');
    
    if (processTabs.length === 0 || processContents.length === 0) return;
    
    processTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // 更新激活的标签
            processTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新显示的内容
            processContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    setTimeout(() => {
                        content.classList.add('active');
                    }, 10);
                }
            });
            
            // 更新URL哈希
            updateProcessHash(targetId);
        });
    });
    
    // 检查URL哈希
    checkProcessHash();
}

// 更新工艺哈希
function updateProcessHash(targetId) {
    if (history.pushState) {
        history.pushState(null, null, `#${targetId}`);
    } else {
        location.hash = `#${targetId}`;
    }
}

// 检查工艺哈希
function checkProcessHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetTab = document.querySelector(`.process-tab[data-target="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
}

// 初始化设备筛选
function initEquipmentFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    if (filterButtons.length === 0 || equipmentCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // 更新激活的筛选按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选设备卡片
            equipmentCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const category = card.getAttribute('data-category');
                    
                    if (category === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
            
            // 更新URL参数
            updateEquipmentFilterURL(filterValue);
        });
    });
    
    // 检查URL参数
    checkEquipmentFilterURL();
}

// 更新设备筛选URL
function updateEquipmentFilterURL(filterValue) {
    if (history.pushState) {
        const url = new URL(window.location);
        url.searchParams.set('filter', filterValue);
        history.pushState(null, '', url.toString());
    }
}

// 检查设备筛选URL
function checkEquipmentFilterURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterValue = urlParams.get('filter');
    
    if (filterValue) {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
}

// 初始化材料交互
function initMaterialInteractions() {
    const materialItems = document.querySelectorAll('.material-content li');
    
    materialItems.forEach(item => {
        item.addEventListener('click', function() {
            const materialName = this.textContent;
            showMaterialInfo(materialName);
        });
    });
    
    // 软件标签交互
    const softwareTags = document.querySelectorAll('.software-tag');
    softwareTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const softwareName = this.textContent;
            showSoftwareInfo(softwareName);
        });
    });
    
    // 技能标签交互
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const skillName = this.textContent;
            showSkillInfo(skillName);
        });
    });
}

// 显示材料信息
function showMaterialInfo(materialName) {
    const materialData = {
        'P20系列 (718, 738, 738H)': '预硬塑料模具钢，硬度HRC28-32，抛光性好，适合大型塑料模具。',
        'S136系列 (420不锈钢)': '耐腐蚀不锈钢，适合PVC、腐蚀性塑料模具，镜面抛光效果极佳。',
        'NAK80 (预硬镜面钢)': '预硬镜面钢，硬度HRC38-42，无需热处理，适合高光模具。',
        'H13系列 (热作模具钢)': '热作模具钢，高温强度好，适合压铸模、热锻模。',
        'SKD61/ DAC': '日本牌号热作模具钢，类似H13，热稳定性好。',
        '8407, 2344': '瑞典一胜百热作模具钢，高温性能优异，适合高端压铸模具。',
        '硬质合金 (钨钢)': '硬度高、耐磨性好，适合拉丝模、冲压模。',
        '陶瓷材料': '高硬度、耐高温、耐磨，适合特殊工况模具。',
        '铜合金 (铍铜)': '导热性好，适合注塑模冷却系统。',
        '铝合金 (7075, 6061)': '重量轻、易加工，适合快速模具、试制模具。',
        '钛合金 (TC4, TA2)': '高强度、低密度，适合航空航天零件。',
        '高温合金 (Inconel)': '耐高温、耐腐蚀，适合高温工况模具。'
    };
    
    const info = materialData[materialName] || `关于${materialName}的详细信息`;
    
    const materialHTML = `
        <div class="material-detail">
            <h3>${materialName}</h3>
            <div class="material-info">
                <p>${info}</p>
            </div>
            <div class="material-properties">
                <h4>典型应用</h4>
                <ul>
                    <li>塑料模具</li>
                    <li>压铸模具</li>
                    <li>冲压模具</li>
                    <li>特殊零件</li>
                </ul>
            </div>

        </div>
    `;
    
    showDetailModal(materialHTML, '材料信息');
}

// 显示软件信息
function showSoftwareInfo(softwareName) {
    const softwareData = {
        'UG/NX': '西门子UG/NX，功能强大的CAD/CAM/CAE集成软件，适合复杂模具设计。',
        'CATIA': '达索CATIA，高端CAD软件，适合汽车、航空航天复杂曲面设计。',
        'SolidWorks': '达索SolidWorks，易学易用的3D CAD软件，适合机械设计。',
        'Pro/E': 'PTC Creo（原Pro/E），参数化设计软件，适合产品设计。',
        'AutoCAD': 'Autodesk AutoCAD，2D设计和绘图软件，适合工程图纸。',
        'Moldflow': 'Autodesk Moldflow，专业模流分析软件，优化模具设计。'
    };
    
    const info = softwareData[softwareName] || `${softwareName}设计软件`;
    
    const softwareHTML = `
        <div class="software-detail">
            <h3>${softwareName}</h3>
            <div class="software-info">
                <p>${info}</p>
            </div>
            <div class="software-features">
                <h4>主要功能</h4>
                <ul>
                    <li>3D建模</li>
                    <li>模具设计</li>
                    <li>工程图纸</li>
                    <li>模拟分析</li>
                </ul>
            </div>
        </div>
    `;
    
    showDetailModal(softwareHTML, '设计软件');
}

// 显示技能信息
function showSkillInfo(skillName) {
    const skillData = {
        '精密测量': '使用高精度测量工具，确保零件尺寸精度。',
        '手工抛光': '经验丰富的抛光技师，可达镜面效果。',
        '配研技术': '传统手工配研，确保模具配合精度。',
        '间隙调整': '精确调整模具运动间隙，确保顺畅运行。',
        '热装技术': '加热装配技术，确保过盈配合精度。',
        '密封测试': '模具密封性能测试，确保无泄漏。'
    };
    
    const info = skillData[skillName] || `${skillName}专业技能`;
    
    const skillHTML = `
        <div class="skill-detail">
            <h3>${skillName}</h3>
            <div class="skill-info">
                <p>${info}</p>
            </div>
            <div class="skill-level">
                <h4>技能等级</h4>
                <div class="skill-meter">
                    <div class="skill-fill" style="width: 85%"></div>
                </div>
                <p>高级技师水平</p>
            </div>
        </div>
    `;
    
    showDetailModal(skillHTML, '专业技能');
}

// 初始化规格表格
function initSpecsTables() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        // 添加斑马纹
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (index % 2 === 0) {
                row.classList.add('even-row');
            }
        });
        
        // 添加悬停效果
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(0, 112, 204, 0.05)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    });
}

// 显示详情模态框
function showDetailModal(content, title = '') {
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
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 关闭功能
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        closeDetailModal(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDetailModal(modal);
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeDetailModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// 关闭详情模态框
function closeDetailModal(modal) {
    if (!modal) {
        modal = document.querySelector('.detail-modal.show');
        if (!modal) return;
    }
    
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.body.style.overflow = 'auto';
    }, 300);
}

// 关闭所有模态框
function closeAllModals() {
    const modals = document.querySelectorAll('.detail-modal, .technical-modal.show');
    modals.forEach(modal => {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    document.body.style.overflow = 'auto';
}



// 工具函数：显示通知
function showNotification(message, type = 'info') {
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(message, type);
    } else {
        alert(message);
    }
}