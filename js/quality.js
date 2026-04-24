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
            "有效期至": "2029年5月14日",
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
            "有效期至": "2029年1月19日",
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
            "有效期至": "2029年3月9日",
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





