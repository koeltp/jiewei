// js/contact.js - 联系我们页面功能（精简版）

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initContactButtons();
    initPrivacyLinks();
    initMapFunctions();
    initDepartmentContacts();
    initAddressCopy();
});

// 初始化常见问题
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // 关闭所有其他FAQ
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // 切换当前FAQ
            if (!isActive) {
                faqItem.classList.add('active');
            } else {
                faqItem.classList.remove('active');
            }
        });
    });
}

// 初始化联系按钮
function initContactButtons() {
    // 复制地址按钮
    const copyAddressBtn = document.getElementById('copyAddressBtn');
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', copyAddressFromMap);
    }
    
    // 发送邮件按钮
    const sendEmailBtn = document.getElementById('sendEmail');
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', composeEmail);
    }
    
    // 打开地图按钮
    const openMapBtn = document.getElementById('openMap');
    if (openMapBtn) {
        openMapBtn.addEventListener('click', openExternalMap);
    }
}

// 初始化地址复制功能
function initAddressCopy() {
    const copyIcon = document.getElementById('copyAddressIcon');
    if (!copyIcon) return;
    
    copyIcon.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止触发地图点击事件
        copyAddressFromMap();
    });
}

// 从地图区域复制地址
function copyAddressFromMap() {
    const address = '东莞市石碣镇金滩路24号102室';
    
    navigator.clipboard.writeText(address).then(() => {
        // 显示成功反馈
        const copyIcon = document.getElementById('copyAddressIcon');
        copyIcon.classList.add('copied');
        copyIcon.title = '已复制！';
        
        // 显示临时通知
        if (window.PrecisionMold && window.PrecisionMold.showNotification) {
            window.PrecisionMold.showNotification('地址已复制到剪贴板！', 'success');
        } else {
            // 如果通知系统不可用，使用简单的视觉反馈
            const originalIcon = copyIcon.classList.contains('fa-copy') ? 'fa-copy' : 'fa-check';
            copyIcon.classList.remove('fa-copy');
            copyIcon.classList.add('fa-check');
            
            setTimeout(() => {
                copyIcon.classList.remove('fa-check');
                copyIcon.classList.add('fa-copy');
                copyIcon.classList.remove('copied');
                copyIcon.title = '点击复制地址';
            }, 2000);
        }
        
    }).catch(err => {
        console.error('复制失败:', err);
        // 如果剪贴板API不可用，使用备选方案
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            
            // 显示成功反馈
            const copyIcon = document.getElementById('copyAddressIcon');
            copyIcon.classList.add('copied');
            copyIcon.title = '已复制！';
            
            if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                window.PrecisionMold.showNotification('地址已复制到剪贴板！', 'success');
            }
            
        } catch (err) {
            if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                window.PrecisionMold.showNotification('无法复制地址，请手动复制。', 'error');
            }
        }
        document.body.removeChild(textArea);
    });
}

// 打开外部地图
function openExternalMap() {
    const address = encodeURIComponent('东莞市石碣镇金滩路24号102室');
    const baiduMapUrl = `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${address}`;
    
    window.open(baiduMapUrl, '_blank');
}

// 编写邮件
function composeEmail() {
    const emailHTML = `
        <div class="email-composer">
            <h3>发送邮件给我们</h3>
            <p>您可以选择以下邮箱地址发送邮件</p>
            <div class="email-options">
                <div class="email-option">
                    <strong>销售咨询：</strong>
                    <a href="mailto:sales@jiewei.top">sales@jiewei.top</a>
                    <button class="btn-copy" data-email="sales@jiewei.top">
                        <i class="fas fa-copy"></i> 复制
                    </button>
                </div>
                <div class="email-option">
                    <strong>技术支持：</strong>
                    <a href="mailto:support@jiewei.top">support@jiewei.top</a>
                    <button class="btn-copy" data-email="support@jiewei.top">
                        <i class="fas fa-copy"></i> 复制
                    </button>
                </div>
                <div class="email-option">
                    <strong>人力资源：</strong>
                    <a href="mailto:hr@jiewei.top">hr@jiewei.top</a>
                    <button class="btn-copy" data-email="hr@jiewei.top">
                        <i class="fas fa-copy"></i> 复制
                    </button>
                </div>
            </div>
        </div>
    `;
    
    showModal(emailHTML, '发送邮件');
    
    // 初始化复制按钮
    setTimeout(() => {
        const copyButtons = document.querySelectorAll('.btn-copy');
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const email = this.getAttribute('data-email');
                navigator.clipboard.writeText(email).then(() => {
                    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                        window.PrecisionMold.showNotification(`邮箱地址 ${email} 已复制到剪贴板！`, 'success');
                    }
                }).catch(err => {
                    console.error('复制失败:', err);
                });
            });
        });
    }, 100);
}

// 初始化隐私政策链接
function initPrivacyLinks() {
    const privacyLinks = document.querySelectorAll('#privacyLink');
    const termsLink = document.getElementById('termsLink');
    
    privacyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPrivacyPolicy();
        });
    });
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTermsOfService();
        });
    }
}

// 显示隐私政策
function showPrivacyPolicy() {
    const privacyHTML = `
        <div class="policy-document">
            <h3>隐私政策</h3>
            <div class="policy-content">
                <p><strong>生效日期：</strong>2023年10月1日</p>
                
                <h4>1. 信息收集</h4>
                <p>我们收集您主动提供的信息，包括但不限于：姓名、公司名称、联系方式、项目需求等。</p>
                
                <h4>2. 信息使用</h4>
                <p>我们使用您提供的信息来：回应您的咨询、提供产品和服务、改进我们的服务、发送重要通知等。</p>
                
                <h4>3. 信息共享</h4>
                <p>我们不会向第三方出售、交易或转让您的个人信息，除非获得您的明确同意或法律要求。</p>
                
                <h4>4. 数据安全</h4>
                <p>我们采取适当的安全措施来保护您的个人信息，防止未经授权的访问、修改、披露或销毁。</p>
                
                <h4>5. 您的权利</h4>
                <p>您有权访问、更正或删除您的个人信息，如需帮助，请联系我们的隐私专员。</p>
                
                <h4>6. 政策更新</h4>
                <p>我们可能不时更新本隐私政策，更新后的政策将在网站上公布。</p>
                
                <div class="policy-contact">
                    <p><strong>隐私问题联系：</strong>privacy@jiewei.top</p>
                </div>
            </div>
            <div class="policy-actions">
                <button class="btn btn-primary" onclick="closeModal()">
                    <i class="fas fa-times-circle"></i> 关闭
                </button>
            </div>
        </div>
    `;
    
    showModal(privacyHTML, '隐私政策');
}

// 显示服务条款
function showTermsOfService() {
    const termsHTML = `
        <div class="terms-document">
            <h3>服务条款</h3>
            <div class="terms-content">
                <p><strong>生效日期：</strong>2023年10月1日</p>
                
                <h4>1. 服务说明</h4>
                <p>东莞市杰威精密模具配件有限公司（以下简称"我们"）提供精密模具设计、制造和零件加工服务。</p>
                
                <h4>2. 用户责任</h4>
                <p>用户应提供准确、完整的信息，并对其提供的信息的真实性、合法性负责。</p>
                
                <h4>3. 知识产权</h4>
                <p>除非另有约定，模具设计和制造过程中产生的知识产权归客户所有。</p>
                
                <h4>4. 保密条款</h4>
                <p>双方应对在合作过程中获知的对方商业秘密和技术信息承担保密义务。</p>
                
                <h4>5. 责任限制</h4>
                <p>在适用法律允许的最大范围内，我们对因使用服务引起的任何间接损失不承担责任。</p>
                
                <h4>6. 法律适用</h4>
                <p>本条款受中华人民共和国法律管辖，并依据其解释。</p>
                
                <h4>7. 联系信息</h4>
                <p>如有任何问题，请通过以下方式联系我们：info@jiewei.top</p>
            </div>
            <div class="terms-actions">
                <button class="btn btn-primary" onclick="closeModal()">
                    <i class="fas fa-times-circle"></i> 关闭
                </button>
            </div>
        </div>
    `;
    
    showModal(termsHTML, '服务条款');
}

// 初始化地图功能 - 简化版本
function initMapFunctions() {
    // 在地图占位符上添加点击事件，直接打开外部地图
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    if (mapPlaceholder) {
        mapPlaceholder.style.cursor = 'pointer';
        mapPlaceholder.addEventListener('click', function(e) {
            // 如果点击的是复制图标，则不触发地图打开
            if (e.target.closest('.copy-icon')) {
                return;
            }
            openExternalMap();
        });
    }
}

// 初始化部门联系
function initDepartmentContacts() {
    const deptButtons = document.querySelectorAll('.contact-department');
    
    deptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dept = this.getAttribute('data-dept');
            contactDepartment(dept);
        });
    });
}

// 联系部门
function contactDepartment(dept) {
    const departments = {
        sales: {
            name: '销售部',
            contact: '张经理',
            phone: '0512-8888 8888',
            email: 'sales@jiewei.top',
            hours: '周一至周五 8:00-18:00'
        },
        technical: {
            name: '技术部',
            contact: '李总工程师',
            phone: '0512-8888 7777',
            email: 'support@jiewei.top',
            hours: '周一至周五 8:00-18:00'
        },
        quality: {
            name: '质量部',
            contact: '王质量经理',
            phone: '0512-8888 6666',
            email: 'quality@jiewei.top',
            hours: '周一至周五 8:00-18:00'
        },
        production: {
            name: '生产部',
            contact: '刘生产总监',
            phone: '0512-8888 5555',
            email: 'production@jiewei.top',
            hours: '周一至周六 8:00-20:00'
        }
    };
    
    const deptInfo = departments[dept];
    if (!deptInfo) return;
    
    const contactHTML = `
        <div class="department-contact-detail">
            <h3>联系${deptInfo.name}</h3>
            <div class="dept-info">
                <p><strong>负责人：</strong>${deptInfo.contact}</p>
                <p><strong>电话：</strong><a href="tel:${deptInfo.phone}">${deptInfo.phone}</a></p>
                <p><strong>邮箱：</strong><a href="mailto:${deptInfo.email}">${deptInfo.email}</a></p>
                <p><strong>工作时间：</strong>${deptInfo.hours}</p>
            </div>
            <div class="contact-options">
                <h4>联系方式</h4>
                <div class="option-buttons">
                    <a href="tel:${deptInfo.phone}" class="btn btn-primary">
                        <i class="fas fa-phone"></i> 拨打电话
                    </a>
                    <a href="mailto:${deptInfo.email}" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i> 发送邮件
                    </a>
                </div>
            </div>
        </div>
    `;
    
    showModal(contactHTML, `联系${deptInfo.name}`);
}

// 显示模态框
function showModal(content, title = '') {
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
        closeModal(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// 关闭模态框
function closeModal(modal) {
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

// 显示通知
function showNotification(message, type = 'info') {
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(message, type);
    } else {
        // 如果main.js中的通知系统不可用，使用简单的alert
        alert(message);
    }
}