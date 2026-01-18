// js/capabilities.js - 核心能力页面功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initProcessTabs();
    initEquipmentFilter();
    initTechnicalReview();
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

// 初始化技术评估
function initTechnicalReview() {
    const reviewBtn = document.getElementById('requestTechnicalReview');
    if (reviewBtn) {
        reviewBtn.addEventListener('click', requestTechnicalReview);
    }
}

// 请求技术评估
function requestTechnicalReview() {
    const reviewHTML = `
        <div class="technical-review-form">
            <h3>技术评估申请</h3>
            <p>请提供您的项目信息，我们的技术团队将为您提供专业的技术评估报告</p>
            <form id="techReviewForm">
                <div class="form-group">
                    <label for="projectName">项目名称 *</label>
                    <input type="text" id="projectName" name="projectName" required 
                           placeholder="例如：汽车发动机零件模具">
                </div>
                <div class="form-group">
                    <label for="projectDescription">项目描述 *</label>
                    <textarea id="projectDescription" name="description" rows="4" required 
                              placeholder="请详细描述项目需求，包括零件功能、使用环境、技术要求等"></textarea>
                </div>
                <div class="form-group">
                    <label for="technicalRequirements">技术要求</label>
                    <div class="requirements-grid">
                        <div class="requirement-item">
                            <label>精度要求</label>
                            <select name="precision">
                                <option value="">选择精度等级</option>
                                <option value="±0.01mm">±0.01mm (一般精度)</option>
                                <option value="±0.005mm">±0.005mm (高精度)</option>
                                <option value="±0.002mm">±0.002mm (超高精度)</option>
                                <option value="±0.001mm">±0.001mm (特高精度)</option>
                            </select>
                        </div>
                        <div class="requirement-item">
                            <label>表面粗糙度</label>
                            <select name="roughness">
                                <option value="">选择粗糙度</option>
                                <option value="Ra3.2">Ra3.2μm</option>
                                <option value="Ra1.6">Ra1.6μm</option>
                                <option value="Ra0.8">Ra0.8μm</option>
                                <option value="Ra0.4">Ra0.4μm</option>
                                <option value="Ra0.2">Ra0.2μm (镜面)</option>
                            </select>
                        </div>
                        <div class="requirement-item">
                            <label>材料类型</label>
                            <select name="material">
                                <option value="">选择材料</option>
                                <option value="steel">模具钢</option>
                                <option value="aluminum">铝合金</option>
                                <option value="copper">铜合金</option>
                                <option value="titanium">钛合金</option>
                                <option value="other">其他材料</option>
                            </select>
                        </div>
                        <div class="requirement-item">
                            <label>热处理要求</label>
                            <select name="heat_treatment">
                                <option value="">选择热处理</option>
                                <option value="none">不需要</option>
                                <option value="quenching">淬火</option>
                                <option value="nitriding">氮化</option>
                                <option value="tempering">调质</option>
                                <option value="other">其他</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="fileUpload">上传技术文件（可选）</label>
                    <div class="file-upload-area">
                        <input type="file" id="reviewFileUpload" name="files" multiple 
                               accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.jpg,.jpeg,.png">
                        <label for="reviewFileUpload" class="upload-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span>点击上传或拖放文件</span>
                            <small>支持CAD图纸、3D模型、照片等格式</small>
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="contactInfo">联系信息 *</label>
                    <div class="contact-grid">
                        <input type="text" name="contactName" placeholder="联系人姓名" required>
                        <input type="tel" name="contactPhone" placeholder="联系电话" required>
                        <input type="email" name="contactEmail" placeholder="电子邮箱" required>
                        <input type="text" name="companyName" placeholder="公司名称">
                    </div>
                </div>
                <div class="form-group">
                    <label for="urgency">紧急程度</label>
                    <select name="urgency" required>
                        <option value="normal">正常 (1-3个工作日)</option>
                        <option value="urgent">加急 (24小时内)</option>
                        <option value="emergency">特急 (8小时内)</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i> 提交评估申请
                    </button>
                </div>
            </form>
        </div>
    `;
    
    showTechnicalReviewModal(reviewHTML, '技术评估申请');
    
    // 初始化文件上传
    setTimeout(() => {
        initReviewFileUpload();
        
        // 处理表单提交
        const techForm = document.getElementById('techReviewForm');
        if (techForm) {
            techForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('技术评估申请已提交！我们的技术团队将在指定时间内与您联系。', 'success');
                }
                
                // 关闭模态框
                closeTechnicalReviewModal();
                
                console.log('技术评估申请:', data);
            });
        }
    }, 100);
}

// 初始化评估文件上传
function initReviewFileUpload() {
    const fileInput = document.getElementById('reviewFileUpload');
    const uploadLabel = document.querySelector('.upload-label');
    
    if (!fileInput || !uploadLabel) return;
    
    fileInput.addEventListener('change', function() {
        const files = this.files;
        if (files.length > 0) {
            uploadLabel.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>已选择 ${files.length} 个文件</span>
                <small>点击可重新选择</small>
            `;
        }
    });
}

// 显示技术评估模态框
function showTechnicalReviewModal(content, title = '') {
    const modal = document.getElementById('technicalReviewModal');
    const modalBody = document.getElementById('technicalReviewBody');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = content;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // 添加关闭事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeTechnicalReviewModal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeTechnicalReviewModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeTechnicalReviewModal();
        }
    });
}

// 关闭技术评估模态框
function closeTechnicalReviewModal() {
    const modal = document.getElementById('technicalReviewModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // 移除ESC键监听
    document.removeEventListener('keydown', arguments.callee);
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
            <div class="material-actions">
                <button class="btn btn-secondary" onclick="requestMaterialSample('${materialName}')">
                    <i class="fas fa-vial"></i> 申请样品
                </button>
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

// 申请材料样品
function requestMaterialSample(materialName) {
    const sampleHTML = `
        <div class="sample-request">
            <h3>申请材料样品</h3>
            <p>请填写信息申请 ${materialName} 的样品</p>
            <form id="sampleRequestForm">
                <div class="form-group">
                    <label for="sampleName">姓名 *</label>
                    <input type="text" id="sampleName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="sampleCompany">公司名称 *</label>
                    <input type="text" id="sampleCompany" name="company" required>
                </div>
                <div class="form-group">
                    <label for="samplePurpose">申请目的 *</label>
                    <textarea id="samplePurpose" name="purpose" rows="3" required 
                              placeholder="请说明申请样品的目的，例如：材料测试、项目评估等"></textarea>
                </div>
                <div class="form-group">
                    <label for="sampleSize">样品规格</label>
                    <select id="sampleSize" name="size">
                        <option value="small">小样 (20×20×10mm)</option>
                        <option value="medium" selected>中样 (50×50×20mm)</option>
                        <option value="large">大样 (100×100×30mm)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="sampleQuantity">数量</label>
                    <input type="number" id="sampleQuantity" name="quantity" min="1" max="5" value="1">
                </div>
                <input type="hidden" name="material" value="${materialName}">
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-box"></i> 提交样品申请
                    </button>
                </div>
            </form>
        </div>
    `;
    
    showDetailModal(sampleHTML, '样品申请');
    
    // 处理样品申请表单
    setTimeout(() => {
        const sampleForm = document.getElementById('sampleRequestForm');
        if (sampleForm) {
            sampleForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('样品申请已提交！样品将在3-5个工作日内寄出。', 'success');
                }
                
                // 关闭所有模态框
                closeDetailModal();
                closeAllModals();
                
                console.log('样品申请:', data);
            });
        }
    }, 100);
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

// 添加CSS样式
const capabilitiesStyles = `
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
        padding: 20px;
    }
    
    .detail-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .detail-modal .modal-content {
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
    
    .material-detail,
    .software-detail,
    .skill-detail,
    .sample-request {
        text-align: center;
    }
    
    .material-info,
    .software-info,
    .skill-info {
        margin-bottom: 25px;
    }
    
    .material-info p,
    .software-info p,
    .skill-info p {
        color: var(--dark-gray);
        line-height: 1.6;
        font-size: 1.05rem;
    }
    
    .material-properties,
    .software-features,
    .skill-level {
        text-align: left;
        margin-bottom: 25px;
        padding: 20px;
        background: var(--light-gray);
        border-radius: 8px;
    }
    
    .material-properties h4,
    .software-features h4,
    .skill-level h4 {
        color: var(--secondary-blue);
        margin-bottom: 15px;
        font-size: 1.1rem;
    }
    
    .material-properties ul,
    .software-features ul {
        list-style: none;
    }
    
    .material-properties li,
    .software-features li {
        padding: 8px 0;
        padding-left: 25px;
        position: relative;
        color: var(--dark-gray);
        font-size: 0.95rem;
    }
    
    .material-properties li::before,
    .software-features li::before {
        content: '•';
        position: absolute;
        left: 10px;
        color: var(--accent-blue);
        font-size: 1.2rem;
    }
    
    .skill-meter {
        height: 10px;
        background: var(--border-color);
        border-radius: 5px;
        margin-bottom: 10px;
        overflow: hidden;
    }
    
    .skill-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-blue), var(--secondary-blue));
        border-radius: 5px;
        transition: width 0.5s ease;
    }
    
    .skill-level p {
        color: var(--medium-gray);
        font-size: 0.9rem;
        text-align: center;
    }
    
    .material-actions {
        margin-top: 25px;
    }
    
    .sample-request form {
        text-align: left;
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
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 1rem;
        font-family: inherit;
    }
    
    .form-group textarea {
        resize: vertical;
    }
    
    .form-actions {
        text-align: center;
        margin-top: 30px;
    }
    
    .technical-review-form {
        text-align: left;
    }
    
    .requirements-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 10px;
    }
    
    .requirement-item label {
        display: block;
        margin-bottom: 5px;
        font-size: 0.9rem;
        color: var(--medium-gray);
    }
    
    .requirement-item select {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 0.9rem;
    }
    
    .file-upload-area {
        border: 2px dashed var(--border-color);
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .file-upload-area:hover {
        border-color: var(--accent-blue);
        background: rgba(0, 112, 204, 0.05);
    }
    
    .upload-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--medium-gray);
    }
    
    .upload-label i {
        font-size: 2.5rem;
        margin-bottom: 10px;
        color: var(--accent-blue);
    }
    
    .upload-label span {
        font-size: 1rem;
        margin-bottom: 5px;
    }
    
    .upload-label small {
        font-size: 0.85rem;
        color: var(--medium-gray);
    }
    
    .contact-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
    
    .contact-grid input {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
    }
    
    .data-table .even-row {
        background-color: rgba(0, 112, 204, 0.02);
    }
    
    .data-table tr {
        transition: background-color 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .equipment-card {
        animation: fadeInUp 0.6s ease;
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = capabilitiesStyles;
document.head.appendChild(styleSheet);

// 工具函数：显示通知
function showNotification(message, type = 'info') {
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(message, type);
    } else {
        alert(message);
    }
}