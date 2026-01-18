// js/quality.js - 质量体系页面功能

// 证书数据
const certificateDetails = {
    iso9001: {
        title: "ISO 9001:2015 质量管理体系认证",
        subtitle: "质量管理体系认证证书",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        details: {
            "证书编号": "TÜV 123456789",
            "认证范围": "精密模具的设计、制造和销售",
            "认证机构": "德国莱茵TÜV集团",
            "颁发日期": "2022年5月15日",
            "有效期至": "2025年5月14日",
            "认证标准": "ISO 9001:2015",
            "审核方式": "年度监督审核",
            "体系状态": "持续有效"
        },
        description: "ISO 9001:2015是国际标准化组织发布的质量管理体系标准，我们通过该认证表明公司建立了完善的质量管理体系，能够持续提供满足客户和法规要求的产品和服务。",
        benefits: [
            "系统化的质量管理",
            "持续改进的机制",
            "客户满意度提升",
            "过程效率优化",
            "风险管理控制"
        ]
    },
    
    iatf16949: {
        title: "IATF 16949:2016 汽车行业质量管理体系",
        subtitle: "汽车行业质量管理体系认证证书",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        details: {
            "证书编号": "SGS 987654321",
            "认证范围": "汽车零部件精密模具的设计和制造",
            "认证机构": "SGS通标标准技术服务有限公司",
            "颁发日期": "2023年1月20日",
            "有效期至": "2026年1月19日",
            "认证标准": "IATF 16949:2016",
            "审核方式": "年度监督审核 + 特殊过程审核",
            "客户特定要求": "已纳入体系管理"
        },
        description: "IATF 16949:2016是汽车行业质量管理体系标准，结合了ISO 9001的要求和汽车行业的特定要求。通过该认证表明我们能够满足汽车行业对供应链的严格要求。",
        benefits: [
            "满足汽车行业要求",
            "供应链管理优化",
            "缺陷预防机制",
            "制造过程控制",
            "客户特殊要求管理"
        ]
    },
    
    iso13485: {
        title: "ISO 13485:2016 医疗器械质量管理体系",
        subtitle: "医疗器械质量管理体系认证证书",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        details: {
            "证书编号": "TÜV 567890123",
            "认证范围": "医疗器械用精密模具的设计和制造",
            "认证机构": "德国莱茵TÜV集团",
            "颁发日期": "2023年3月10日",
            "有效期至": "2026年3月9日",
            "认证标准": "ISO 13485:2016",
            "法规要求": "符合医疗器械指令要求",
            "风险管理": "已建立风险管理体系"
        },
        description: "ISO 13485:2016是医疗器械质量管理体系标准，特别强调风险管理、可追溯性和监管要求。通过该认证表明我们能够满足医疗器械行业对质量和安全的严格要求。",
        benefits: [
            "医疗器械合规性",
            "风险管理体系",
            "可追溯性管理",
            "灭菌过程控制",
            "生物兼容性保证"
        ]
    }
};

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initCertificateViewer();
    initDocumentLinks();
    initQualityForms();
    initProcessAnimation();
    initStatsAnimation();
});

// 初始化证书查看功能
function initCertificateViewer() {
    const viewButtons = document.querySelectorAll('.view-certificate');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certId = this.getAttribute('data-cert');
            showCertificateDetail(certId);
        });
    });
}

// 显示证书详情
function showCertificateDetail(certId) {
    const certData = certificateDetails[certId];
    if (!certData) return;
    
    // 构建证书详情HTML
    const certHTML = `
        <div class="certificate-detail">
            <div class="certificate-header">
                <h2>${certData.title}</h2>
                <p>${certData.subtitle}</p>
            </div>
            
            <div class="certificate-image">
                <img src="${certData.image}" alt="${certData.title}">
            </div>
            
            <div class="certificate-description">
                <h3>证书说明</h3>
                <p>${certData.description}</p>
            </div>
            
            <div class="certificate-info">
                <h3>证书信息</h3>
                <div class="info-grid">
                    ${Object.entries(certData.details).map(([key, value]) => `
                        <div class="info-item">
                            <strong>${key}</strong>
                            <p>${value}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="certificate-benefits">
                <h3>认证带来的益处</h3>
                <div class="benefits-list">
                    <ul>
                        ${certData.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="certificate-actions">
                <button class="btn btn-primary" onclick="downloadCertificate('${certId}')">
                    <i class="fas fa-download"></i> 下载证书副本
                </button>
                <button class="btn btn-secondary" onclick="requestCertificationCopy()">
                    <i class="fas fa-envelope"></i> 申请纸质副本
                </button>
            </div>
        </div>
    `;
    
    // 显示模态框
    const modal = document.getElementById('certificateModal');
    const modalBody = document.getElementById('certificateBody');
    
    modalBody.innerHTML = certHTML;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // 添加关闭事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeCertificateModal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeCertificateModal();
        }
    });
}

// 关闭证书模态框
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // 移除ESC键监听
    document.removeEventListener('keydown', arguments.callee);
}

// 下载证书
function downloadCertificate(certId) {
    // 在实际应用中，这里应该链接到真实的证书文件
    // 这里使用模拟下载
    const certData = certificateDetails[certId];
    if (!certData) return;
    
    // 显示下载提示
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(`正在下载${certData.title}...`, 'info');
    }
    
    // 模拟下载过程
    setTimeout(() => {
        if (window.PrecisionMold && window.PrecisionMold.showNotification) {
            window.PrecisionMold.showNotification('证书下载完成！', 'success');
        }
        
        // 在实际应用中，这里应该触发文件下载
        // window.open(`certificates/${certId}.pdf`, '_blank');
    }, 1500);
}

// 申请纸质副本
function requestCertificationCopy() {
    const formHTML = `
        <h3>申请证书纸质副本</h3>
        <p>请填写申请信息，我们将通过快递为您寄送证书纸质副本</p>
        <form id="certificateCopyForm">
            <div class="form-group">
                <label for="applicantName">申请人姓名 *</label>
                <input type="text" id="applicantName" name="applicantName" required>
            </div>
            <div class="form-group">
                <label for="company">公司名称 *</label>
                <input type="text" id="company" name="company" required>
            </div>
            <div class="form-group">
                <label for="address">邮寄地址 *</label>
                <textarea id="address" name="address" rows="3" required 
                          placeholder="请填写详细的邮寄地址，包括邮政编码"></textarea>
            </div>
            <div class="form-group">
                <label for="phone">联系电话 *</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="email">电子邮箱 *</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="purpose">申请目的 *</label>
                <select id="purpose" name="purpose" required>
                    <option value="">请选择申请目的</option>
                    <option value="supplier_audit">供应商审核</option>
                    <option value="customer_requirement">客户要求</option>
                    <option value="internal_use">内部使用</option>
                    <option value="other">其他</option>
                </select>
            </div>
            <div class="form-group">
                <label for="quantity">申请数量</label>
                <input type="number" id="quantity" name="quantity" min="1" max="5" value="1">
                <small class="form-text">最多可申请5份副本</small>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane"></i> 提交申请
                </button>
            </div>
        </form>
    `;
    
    showDetailModal(formHTML, '申请证书纸质副本');
    
    // 处理表单提交
    setTimeout(() => {
        const form = document.getElementById('certificateCopyForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('申请已提交！证书副本将在3-5个工作日内寄出。', 'success');
                }
                
                // 关闭模态框
                const modal = document.querySelector('.detail-modal.show');
                if (modal) {
                    closeDetailModal(modal);
                }
                
                // 关闭证书详情模态框
                closeCertificateModal();
                
                console.log('证书副本申请:', data);
            });
        }
    }, 100);
}

// 初始化文档链接
function initDocumentLinks() {
    const documentLinks = document.querySelectorAll('.document-link');
    
    documentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const fileName = this.textContent;
            
            // 显示文档预览或下载提示
            if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                window.PrecisionMold.showNotification(`正在加载 ${fileName}...`, 'info');
            }
            
            // 模拟文档加载
            setTimeout(() => {
                showDocumentPreview(fileName);
            }, 1000);
        });
    });
    
    // 质量文件申请按钮
    const requestBtn = document.getElementById('requestDocuments');
    if (requestBtn) {
        requestBtn.addEventListener('click', requestQualityDocuments);
    }
}

// 显示文档预览
function showDocumentPreview(fileName) {
    // 在实际应用中，这里应该显示PDF预览或下载文档
    // 这里使用模拟预览
    
    const previewHTML = `
        <div class="document-preview">
            <h3>${fileName}</h3>
            <div class="preview-content">
                <div class="pdf-preview">
                    <div class="pdf-placeholder">
                        <i class="fas fa-file-pdf"></i>
                        <p>PDF文档预览</p>
                    </div>
                </div>
                <div class="document-info">
                    <p><strong>文件类型：</strong>PDF文档</p>
                    <p><strong>文件大小：</strong>约2.5 MB</p>
                    <p><strong>最后更新：</strong>2023年10月</p>
                    <p><strong>版本：</strong>V2.1</p>
                </div>
            </div>
            <div class="preview-actions">
                <button class="btn btn-primary" onclick="downloadDocument('${fileName}')">
                    <i class="fas fa-download"></i> 下载文档
                </button>
                <button class="btn btn-secondary" onclick="printDocument('${fileName}')">
                    <i class="fas fa-print"></i> 打印
                </button>
            </div>
        </div>
    `;
    
    showDetailModal(previewHTML, '文档预览');
}

// 下载文档
function downloadDocument(fileName) {
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(`正在下载 ${fileName}...`, 'info');
    }
    
    // 模拟下载
    setTimeout(() => {
        if (window.PrecisionMold && window.PrecisionMold.showNotification) {
            window.PrecisionMold.showNotification('文档下载完成！', 'success');
        }
    }, 1500);
}

// 打印文档
function printDocument(fileName) {
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(`正在准备打印 ${fileName}...`, 'info');
    }
    
    // 在实际应用中，这里应该触发打印功能
    // window.print();
    
    setTimeout(() => {
        if (window.PrecisionMold && window.PrecisionMold.showNotification) {
            window.PrecisionMold.showNotification('打印任务已发送到打印机', 'success');
        }
    }, 1000);
}

// 申请质量文件
function requestQualityDocuments() {
    const formHTML = `
        <h3>申请质量文件</h3>
        <p>请填写申请信息，我们将为您提供完整的质量文件包</p>
        <form id="qualityDocumentsForm">
            <div class="form-group">
                <label for="requestorName">申请人姓名 *</label>
                <input type="text" id="requestorName" name="requestorName" required>
            </div>
            <div class="form-group">
                <label for="requestorCompany">公司名称 *</label>
                <input type="text" id="requestorCompany" name="requestorCompany" required>
            </div>
            <div class="form-group">
                <label for="requestorPosition">职务 *</label>
                <input type="text" id="requestorPosition" name="requestorPosition" required>
            </div>
            <div class="form-group">
                <label for="requestorEmail">电子邮箱 *</label>
                <input type="email" id="requestorEmail" name="requestorEmail" required>
            </div>
            <div class="form-group">
                <label for="documentsNeeded">需要的文件类型</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="docTypes" value="quality_manual"> 质量手册</label>
                    <label><input type="checkbox" name="docTypes" value="procedures"> 程序文件</label>
                    <label><input type="checkbox" name="docTypes" value="work_instructions"> 作业指导书</label>
                    <label><input type="checkbox" name="docTypes" value="records"> 记录表格</label>
                </div>
            </div>
            <div class="form-group">
                <label for="purposeReason">申请目的 *</label>
                <textarea id="purposeReason" name="purposeReason" rows="3" required 
                          placeholder="请详细说明申请质量文件的目的和用途"></textarea>
            </div>
            <div class="form-group">
                <label for="formatPreference">文件格式偏好</label>
                <select id="formatPreference" name="formatPreference">
                    <option value="pdf">PDF电子版</option>
                    <option value="printed">纸质版</option>
                    <option value="both">电子版和纸质版</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane"></i> 提交申请
                </button>
            </div>
        </form>
    `;
    
    showDetailModal(formHTML, '申请质量文件');
    
    // 处理表单提交
    setTimeout(() => {
        const form = document.getElementById('qualityDocumentsForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('申请已提交！我们将在2个工作日内与您联系确认。', 'success');
                }
                
                // 关闭模态框
                const modal = document.querySelector('.detail-modal.show');
                if (modal) {
                    closeDetailModal(modal);
                }
                
                console.log('质量文件申请:', data);
            });
        }
    }, 100);
}

// 初始化质量表单
function initQualityForms() {
    // 工厂审核申请按钮
    const auditBtn = document.getElementById('requestAudit');
    if (auditBtn) {
        auditBtn.addEventListener('click', requestFactoryAudit);
    }
}

// 申请工厂审核
function requestFactoryAudit() {
    const formHTML = `
        <h3>申请工厂审核</h3>
        <p>请填写审核申请信息，我们将为您安排工厂审核日程</p>
        <form id="factoryAuditForm">
            <div class="form-group">
                <label for="auditorName">审核员姓名 *</label>
                <input type="text" id="auditorName" name="auditorName" required>
            </div>
            <div class="form-group">
                <label for="auditorCompany">审核公司 *</label>
                <input type="text" id="auditorCompany" name="auditorCompany" required>
            </div>
            <div class="form-group">
                <label for="auditorPosition">职务 *</label>
                <input type="text" id="auditorPosition" name="auditorPosition" required>
            </div>
            <div class="form-group">
                <label for="auditType">审核类型 *</label>
                <select id="auditType" name="auditType" required>
                    <option value="">请选择审核类型</option>
                    <option value="supplier_audit">供应商审核</option>
                    <option value="quality_system">质量体系审核</option>
                    <option value="process_audit">过程审核</option>
                    <option value="product_audit">产品审核</option>
                    <option value="customer_audit">客户特定要求审核</option>
                </select>
            </div>
            <div class="form-group">
                <label for="preferredDates">期望审核日期 *</label>
                <input type="text" id="preferredDates" name="preferredDates" required 
                       placeholder="例如：2024年1月15日-1月16日">
            </div>
            <div class="form-group">
                <label for="auditDuration">预计审核天数</label>
                <select id="auditDuration" name="auditDuration">
                    <option value="1">1天</option>
                    <option value="2" selected>2天</option>
                    <option value="3">3天</option>
                    <option value="4">4天</option>
                    <option value="5">5天</option>
                </select>
            </div>
            <div class="form-group">
                <label for="auditScope">审核范围</label>
                <textarea id="auditScope" name="auditScope" rows="3" 
                          placeholder="请说明需要审核的具体范围和要求"></textarea>
            </div>
            <div class="form-group">
                <label for="participants">预计参与人数</label>
                <input type="number" id="participants" name="participants" min="1" max="10" value="2">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-calendar-check"></i> 提交审核申请
                </button>
            </div>
        </form>
    `;
    
    showDetailModal(formHTML, '申请工厂审核');
    
    // 处理表单提交
    setTimeout(() => {
        const form = document.getElementById('factoryAuditForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('审核申请已提交！我们将在24小时内与您联系确认审核安排。', 'success');
                }
                
                // 关闭模态框
                const modal = document.querySelector('.detail-modal.show');
                if (modal) {
                    closeDetailModal(modal);
                }
                
                console.log('工厂审核申请:', data);
            });
        }
    }, 100);
}

// 初始化流程动画
function initProcessAnimation() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '50px'
    });
    
    processSteps.forEach(step => {
        observer.observe(step);
    });
}

// 初始化统计动画
function initStatsAnimation() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    animateCounter(entry.target);
                }, index * 100);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statItems.forEach(item => {
        observer.observe(item);
    });
}

// 数字计数器动画
function animateCounter(statItem) {
    const valueElement = statItem.querySelector('.stat-value');
    if (!valueElement) return;
    
    const originalText = valueElement.textContent;
    const value = parseFloat(originalText.replace('%', ''));
    const isPercentage = originalText.includes('%');
    
    // 如果已经是动画状态，跳过
    if (valueElement.classList.contains('animating')) return;
    
    valueElement.classList.add('animating');
    
    let current = 0;
    const increment = value / 50; // 50帧完成动画
    const duration = 1500; // 1.5秒
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
            current = value;
            clearInterval(timer);
            valueElement.classList.remove('animating');
        }
        
        if (isPercentage) {
            valueElement.textContent = current.toFixed(1) + '%';
        } else {
            valueElement.textContent = current.toFixed(2);
        }
    }, duration / 50);
}

// 显示详情模态框
function showDetailModal(content, title) {
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
}

// 关闭详情模态框
function closeDetailModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.body.style.overflow = 'auto';
    }, 300);
}

// 添加CSS样式
const qualityStyles = `
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
        max-width: 600px;
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
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 1rem;
        font-family: inherit;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--accent-blue);
    }
    
    .checkbox-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    
    .checkbox-group label {
        display: flex;
        align-items: center;
        font-weight: normal;
        font-size: 0.95rem;
        margin: 0;
    }
    
    .checkbox-group input {
        width: auto;
        margin-right: 8px;
    }
    
    .form-text {
        display: block;
        margin-top: 5px;
        color: var(--medium-gray);
        font-size: 0.85rem;
    }
    
    .form-actions {
        text-align: center;
        margin-top: 30px;
    }
    
    .document-preview {
        text-align: center;
    }
    
    .pdf-preview {
        height: 400px;
        background: #f8f9fa;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .pdf-placeholder {
        text-align: center;
    }
    
    .pdf-placeholder i {
        font-size: 4rem;
        color: #e74c3c;
        margin-bottom: 15px;
    }
    
    .pdf-placeholder p {
        color: var(--medium-gray);
        font-size: 1.1rem;
    }
    
    .document-info {
        text-align: left;
        background: var(--light-gray);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
    }
    
    .document-info p {
        margin-bottom: 8px;
        color: var(--dark-gray);
        font-size: 0.95rem;
    }
    
    .document-info strong {
        color: var(--primary-blue);
        font-weight: 600;
    }
    
    .preview-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
    }
    
    .benefits-list ul {
        list-style: none;
        text-align: left;
    }
    
    .benefits-list li {
        padding: 10px 0;
        padding-left: 30px;
        position: relative;
        color: var(--dark-gray);
        border-bottom: 1px dashed var(--border-color);
    }
    
    .benefits-list li:last-child {
        border-bottom: none;
    }
    
    .benefits-list li::before {
        content: '✓';
        position: absolute;
        left: 10px;
        color: var(--accent-blue);
        font-weight: bold;
        font-size: 1.1rem;
    }
    
    .process-step {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .process-step.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stat-item {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .stat-item.animate-in {
        opacity: 1;
        transform: scale(1);
    }
    
    .stat-value.animating {
        transition: none;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .certification-card,
    .equipment-card,
    .method-card {
        animation: fadeInUp 0.6s ease;
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = qualityStyles;
document.head.appendChild(styleSheet);

// 工具函数：显示通知
function showNotification(message, type = 'info') {
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(message, type);
    } else {
        alert(message);
    }
}