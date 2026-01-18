// js/contact.js - 联系我们页面功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    initContactButtons();
    initWechatModal();
    initPrivacyLinks();
    initNewsletter();
    initFileUpload();
    initMapFunctions();
    initDepartmentContacts();
    initFormValidation();
});

// 初始化联系表单
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // 实时表单验证
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearError);
    });
    
    // 消息字数统计
    const messageTextarea = contactForm.querySelector('#message');
    const charCount = contactForm.querySelector('#charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 1000) {
                charCount.style.color = '#e74c3c';
            } else if (count > 800) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = 'var(--medium-gray)';
            }
        });
    }
    
    // 表单提交
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // 表单重置
    contactForm.addEventListener('reset', function() {
        // 清除所有错误状态
        clearAllErrors();
        
        // 重置字数统计
        if (charCount) {
            charCount.textContent = '0';
            charCount.style.color = 'var(--medium-gray)';
        }
        
        // 清空文件预览
        const filePreview = document.getElementById('filePreview');
        if (filePreview) {
            filePreview.innerHTML = '';
        }
    });
}

// 输入验证
function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    const fieldName = input.name || input.id;
    let isValid = true;
    let errorMessage = '';
    
    // 清除之前的错误
    clearError({ target: input });
    
    // 必填字段验证
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = '此字段为必填项';
    }
    
    // 邮箱验证
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = '请输入有效的邮箱地址';
        }
    }
    
    // 电话验证
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
        const cleanPhone = value.replace(/\D/g, '');
        
        if (cleanPhone.length < 10 || cleanPhone.length > 20) {
            isValid = false;
            errorMessage = '请输入有效的电话号码（10-20位数字）';
        }
    }
    
    // 消息长度验证
    if (input.id === 'message' && value.length > 1000) {
        isValid = false;
        errorMessage = '消息内容不能超过1000个字符';
    }
    
    // 显示错误信息
    if (!isValid) {
        showError(input, errorMessage);
    }
    
    return isValid;
}

// 显示错误信息
function showError(input, message) {
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.id = `${input.id}Error`;
    errorElement.textContent = message;
    
    // 插入错误信息
    const parent = input.parentElement;
    const existingError = parent.querySelector(`#${input.id}Error`);
    
    if (existingError) {
        existingError.textContent = message;
    } else {
        parent.appendChild(errorElement);
    }
}

// 清除错误
function clearError(event) {
    const input = event.target;
    input.classList.remove('error');
    
    const errorElement = document.querySelector(`#${input.id}Error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// 清除所有错误
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// 处理表单提交
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    let isValid = true;
    
    // 验证所有必填字段
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    // 验证复选框
    const agreeCheckbox = form.querySelector('#agreeTerms');
    if (agreeCheckbox && !agreeCheckbox.checked) {
        isValid = false;
        showError(agreeCheckbox, '请同意隐私政策');
    }
    
    if (!isValid) {
        if (window.PrecisionMold && window.PrecisionMold.showNotification) {
            window.PrecisionMold.showNotification('请正确填写所有必填字段', 'error');
        }
        return;
    }
    
    // 显示加载状态
    const submitBtn = form.querySelector('#submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
    submitBtn.disabled = true;
    
    // 收集表单数据
    const formObject = {};
    for (let [key, value] of formData.entries()) {
        if (key === 'files') continue;
        formObject[key] = value;
    }
    
    // 获取文件信息
    const fileInput = form.querySelector('#fileUpload');
    const files = fileInput.files;
    const fileInfo = [];
    
    for (let i = 0; i < files.length; i++) {
        fileInfo.push({
            name: files[i].name,
            size: formatFileSize(files[i].size),
            type: files[i].type
        });
    }
    
    if (fileInfo.length > 0) {
        formObject.files = fileInfo;
    }
    
    // 模拟提交到服务器
    setTimeout(() => {
        // 显示成功消息
        if (window.PrecisionMold && window.PrecisionMold.showNotification) {
            window.PrecisionMold.showNotification('咨询已成功提交！我们的专业团队将在24小时内与您联系。', 'success');
        }
        
        // 重置表单
        form.reset();
        
        // 清空文件预览
        const filePreview = document.getElementById('filePreview');
        if (filePreview) {
            filePreview.innerHTML = '';
        }
        
        // 恢复按钮状态
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // 记录提交数据（实际应用中应该发送到服务器）
        console.log('表单提交数据:', formObject);
        
        // 发送到服务器的示例代码（在实际应用中取消注释并配置）
        // sendToServer(formData);
    }, 2000);
}

// 发送数据到服务器（示例）
function sendToServer(formData) {
    // 在实际应用中，这里应该发送数据到服务器
    // 例如使用fetch API
    /*
    fetch('/api/contact', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('服务器响应:', data);
    })
    .catch(error => {
        console.error('提交错误:', error);
    });
    */
}

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
    
    // FAQ联系链接
    const faqContactLink = document.querySelector('.faq-contact-link');
    if (faqContactLink) {
        faqContactLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#contactForm').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// 初始化联系按钮
function initContactButtons() {
    // 查看地图按钮
    const viewMapBtn = document.getElementById('viewMap');
    if (viewMapBtn) {
        viewMapBtn.addEventListener('click', showMapDetail);
    }
    
    // 发送邮件按钮
    const sendEmailBtn = document.getElementById('sendEmail');
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', composeEmail);
    }
    
    // 预约拜访按钮
    const scheduleBtn = document.getElementById('scheduleVisit');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', scheduleFactoryVisit);
    }
    
    // 打开地图按钮
    const openMapBtn = document.getElementById('openMap');
    if (openMapBtn) {
        openMapBtn.addEventListener('click', openExternalMap);
    }
}

// 显示地图详情
function showMapDetail() {
    const mapHTML = `
        <div class="map-detail">
            <h3>工厂位置详情</h3>
            <div class="address-info">
                <p><strong>完整地址：</strong>东莞市石碣镇金滩路24号102室，邮编：215000</p>
                <p><strong>导航坐标：</strong>经度 113.92225608324155，纬度 23.105835978761775</p>
                <p><strong>周边地标：</strong>豪威纸品厂厂区内</p>
            </div>
            <div class="map-actions">
                <button class="btn btn-primary" onclick="navigateToFactory()">
                    <i class="fas fa-directions"></i> 开始导航
                </button>
                <button class="btn btn-secondary" onclick="saveAddress()">
                    <i class="fas fa-bookmark"></i> 保存地址
                </button>
            </div>
        </div>
    `;
    
    showModal(mapHTML, '工厂位置');
}

// 导航到工厂
function navigateToFactory() {
    const address = encodeURIComponent('东莞市石碣镇金滩路24号102室');
    
    // 百度地图URL
    const baiduMapUrl = `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${address}`;
    
    // 高德地图URL
    const amapUrl = `https://uri.amap.com/navigation?to=${address}&callnative=1`;
    
    // 显示选择对话框
    const navigationHTML = `
        <div class="navigation-options">
            <h3>选择导航方式</h3>
            <div class="nav-buttons">
                <a href="${baiduMapUrl}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-map"></i> 百度地图
                </a>
                <a href="${amapUrl}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-map-marked-alt"></i> 高德地图
                </a>
                <button class="btn btn-secondary" onclick="copyAddress()">
                    <i class="fas fa-copy"></i> 复制地址
                </button>
            </div>
        </div>
    `;
    
    showModal(navigationHTML, '导航到工厂');
}

// 复制地址
function copyAddress() {
    const address = '东莞市石碣镇金滩路24号102室';
    
    navigator.clipboard.writeText(address).then(() => {
        if (window.PrecisionMold && window.PrecisionMold.showNotification) {
            window.PrecisionMold.showNotification('地址已复制到剪贴板！', 'success');
        }
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 保存地址
function saveAddress() {
    const address = {
        name: '东莞市杰威精密模具配件有限公司',
        address: '东莞市石碣镇金滩路24号102室',
        phone: '15916852298',
        coordinates: '113.92225608324155,23.105835978761775'
    };
    
    // 在实际应用中，这里可以保存到本地存储或通讯录
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification('地址已保存！您可以在导航应用中搜索"精工模具制造"找到我们。', 'info');
    }
}

// 编写邮件
function composeEmail() {
    const emailHTML = `
        <div class="email-composer">
            <h3>发送邮件给我们</h3>
            <p>您可以选择以下邮箱地址发送邮件，或使用下方的表单直接发送</p>
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
            <div class="email-form">
                <h4>或直接发送邮件</h4>
                <form id="directEmailForm">
                    <div class="form-group">
                        <label for="emailSubject">邮件主题</label>
                        <input type="text" id="emailSubject" name="subject" required 
                               placeholder="例如：模具制造咨询">
                    </div>
                    <div class="form-group">
                        <label for="emailContent">邮件内容</label>
                        <textarea id="emailContent" name="content" rows="5" required 
                                  placeholder="请详细描述您的需求..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="emailRecipient">收件人</label>
                        <select id="emailRecipient" name="recipient" required>
                            <option value="sales@jiewei.top">销售部</option>
                            <option value="support@jiewei.top">技术部</option>
                            <option value="quality@jiewei.top">质量部</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i> 发送邮件
                    </button>
                </form>
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
                });
            });
        });
        
        // 处理直接邮件表单
        const emailForm = document.getElementById('directEmailForm');
        if (emailForm) {
            emailForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 构建邮件链接
                const mailtoLink = `mailto:${data.recipient}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.content)}`;
                
                // 打开邮件客户端
                window.location.href = mailtoLink;
                
                // 关闭模态框
                closeModal();
            });
        }
    }, 100);
}

// 预约工厂拜访
function scheduleFactoryVisit() {
    const scheduleHTML = `
        <div class="visit-scheduler">
            <h3>预约工厂拜访</h3>
            <p>请填写拜访申请信息，我们将为您安排合适的拜访时间</p>
            <form id="visitScheduleForm">
                <div class="form-group">
                    <label for="visitCompany">公司名称 *</label>
                    <input type="text" id="visitCompany" name="company" required>
                </div>
                <div class="form-group">
                    <label for="visitContact">联系人 *</label>
                    <input type="text" id="visitContact" name="contact" required>
                </div>
                <div class="form-group">
                    <label for="visitPhone">联系电话 *</label>
                    <input type="tel" id="visitPhone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="visitEmail">电子邮箱 *</label>
                    <input type="email" id="visitEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="visitDate">期望拜访日期 *</label>
                    <input type="date" id="visitDate" name="date" required 
                           min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label for="visitTime">期望时间</label>
                    <select id="visitTime" name="time">
                        <option value="morning">上午 (9:00-12:00)</option>
                        <option value="afternoon">下午 (14:00-17:00)</option>
                        <option value="full_day">全天 (9:00-17:00)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="visitParticipants">参与人数</label>
                    <input type="number" id="visitParticipants" name="participants" min="1" max="10" value="2">
                </div>
                <div class="form-group">
                    <label for="visitPurpose">拜访目的 *</label>
                    <textarea id="visitPurpose" name="purpose" rows="3" required 
                              placeholder="请说明拜访目的，例如：供应商审核、技术交流、项目洽谈等"></textarea>
                </div>
                <div class="form-group">
                    <label for="visitRequirements">特殊要求</label>
                    <textarea id="visitRequirements" name="requirements" rows="2" 
                              placeholder="如有特殊要求请说明，例如：需要特定技术人员参与、需要现场演示等"></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-calendar-check"></i> 提交预约申请
                    </button>
                </div>
            </form>
        </div>
    `;
    
    showModal(scheduleHTML, '预约工厂拜访');
    
    // 处理预约表单
    setTimeout(() => {
        const visitForm = document.getElementById('visitScheduleForm');
        if (visitForm) {
            visitForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('拜访预约已提交！我们将在24小时内与您确认安排。', 'success');
                }
                
                // 关闭模态框
                closeModal();
                
                console.log('拜访预约:', data);
            });
        }
    }, 100);
}

// 打开外部地图
function openExternalMap() {
    // 在实际应用中，这里应该打开百度地图或Google地图
    const address = encodeURIComponent('东莞市石碣镇金滩路24号102室');
    const baiduMapUrl = `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${address}`;
    
    window.open(baiduMapUrl, '_blank');
}

// 初始化微信模态框
function initWechatModal() {
    const wechatBtn = document.getElementById('wechatBtn');
    const wechatModal = document.getElementById('wechatModal');
    
    if (!wechatBtn || !wechatModal) return;
    
    wechatBtn.addEventListener('click', function() {
        wechatModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    const closeBtn = wechatModal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        wechatModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    wechatModal.addEventListener('click', function(e) {
        if (e.target === wechatModal) {
            wechatModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wechatModal.classList.contains('show')) {
            wechatModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// 初始化隐私政策链接
function initPrivacyLinks() {
    const privacyLinks = document.querySelectorAll('#privacyPolicyLink, #privacyLink');
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
                <button class="btn btn-primary" onclick="acceptPrivacyPolicy()">
                    <i class="fas fa-check-circle"></i> 同意并关闭
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
                <p>如有任何问题，请通过以下方式联系我们：info@jiewei.taop</p>
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

// 同意隐私政策
function acceptPrivacyPolicy() {
    // 在实际应用中，这里可以记录用户同意
    localStorage.setItem('privacyPolicyAccepted', 'true');
    
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification('感谢您同意我们的隐私政策！', 'success');
    }
    
    closeModal();
}

// 初始化新闻订阅
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email || !validateEmail(email)) {
            if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                window.PrecisionMold.showNotification('请输入有效的邮箱地址', 'error');
            }
            return;
        }
        
        // 显示加载状态
        const submitBtn = this.querySelector('button');
        const originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // 模拟订阅
        setTimeout(() => {
            // 显示成功消息
            if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                window.PrecisionMold.showNotification('订阅成功！感谢您关注我们的技术资讯。', 'success');
            }
            
            // 重置表单
            emailInput.value = '';
            
            // 恢复按钮状态
            submitBtn.innerHTML = originalHtml;
            
            // 记录订阅
            console.log('新闻订阅:', email);
        }, 1500);
    });
}

// 初始化文件上传
function initFileUpload() {
    const fileInput = document.getElementById('fileUpload');
    const filePreview = document.getElementById('filePreview');
    
    if (!fileInput || !filePreview) return;
    
    const uploadLabel = document.querySelector('.upload-label');
    const fileUploadArea = document.querySelector('.file-upload');
    
    // 点击上传
    uploadLabel.addEventListener('click', function(e) {
        fileInput.click();
    });
    
    // 拖放上传
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        fileUploadArea.classList.add('dragover');
    }
    
    function unhighlight() {
        fileUploadArea.classList.remove('dragover');
    }
    
    // 处理文件选择
    fileInput.addEventListener('change', handleFileSelect);
    fileUploadArea.addEventListener('drop', handleDrop);
    
    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    function handleFiles(files) {
        filePreview.innerHTML = '';
        
        Array.from(files).forEach((file, index) => {
            // 文件大小检查（10MB限制）
            if (file.size > 10 * 1024 * 1024) {
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification(`文件 ${file.name} 超过10MB大小限制`, 'error');
                }
                return;
            }
            
            // 文件类型检查
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 
                                 'application/pdf', 'application/msword',
                                 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            
            if (!allowedTypes.includes(file.type) && !file.name.match(/\.(dwg|dxf|step|stp|igs|iges)$/i)) {
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification(`文件 ${file.name} 类型不被支持`, 'error');
                }
                return;
            }
            
            displayFile(file, index);
        });
    }
    
    function displayFile(file, index) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileIcon = getFileIcon(file);
        const fileSize = formatFileSize(file.size);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">
                    <i class="${fileIcon}"></i>
                </div>
                <div class="file-details">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${fileSize}</span>
                </div>
            </div>
            <button class="file-remove" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        filePreview.appendChild(fileItem);
        
        // 添加删除功能
        const removeBtn = fileItem.querySelector('.file-remove');
        removeBtn.addEventListener('click', function() {
            removeFile(index);
        });
    }
    
    function removeFile(index) {
        // 创建新的FileList
        const dt = new DataTransfer();
        const files = fileInput.files;
        
        for (let i = 0; i < files.length; i++) {
            if (i !== index) {
                dt.items.add(files[i]);
            }
        }
        
        fileInput.files = dt.files;
        handleFileSelect({ target: fileInput });
    }
}

// 获取文件图标
function getFileIcon(file) {
    if (file.type.startsWith('image/')) {
        return 'fas fa-file-image';
    } else if (file.type === 'application/pdf') {
        return 'fas fa-file-pdf';
    } else if (file.type.includes('word') || file.type.includes('document')) {
        return 'fas fa-file-word';
    } else if (file.type.includes('excel') || file.type.includes('spreadsheet')) {
        return 'fas fa-file-excel';
    } else if (file.name.match(/\.(dwg|dxf)$/i)) {
        return 'fas fa-drafting-compass';
    } else if (file.name.match(/\.(step|stp|igs|iges)$/i)) {
        return 'fas fa-cube';
    } else {
        return 'fas fa-file';
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 初始化地图功能
function initMapFunctions() {
    // 在地图占位符上添加点击事件
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    if (mapPlaceholder) {
        mapPlaceholder.style.cursor = 'pointer';
        mapPlaceholder.addEventListener('click', showMapDetail);
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
            hours: '周一至周五 8:00-18:00，紧急支持：24小时'
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
            <div class="dept-description">
                <h4>服务范围</h4>
                ${getDeptDescription(dept)}
            </div>
        </div>
    `;
    
    showModal(contactHTML, `联系${deptInfo.name}`);
}

// 获取部门描述
function getDeptDescription(dept) {
    const descriptions = {
        sales: `
            <ul>
                <li>客户开发与维护</li>
                <li>项目报价与合同管理</li>
                <li>客户关系管理</li>
                <li>市场信息收集与分析</li>
                <li>商务谈判与签约</li>
            </ul>
        `,
        technical: `
            <ul>
                <li>技术咨询与方案设计</li>
                <li>模具设计优化</li>
                <li>工艺指导与技术支持</li>
                <li>技术问题解决</li>
                <li>新产品开发支持</li>
            </ul>
        `,
        quality: `
            <ul>
                <li>质量控制与检验</li>
                <li>质量体系管理</li>
                <li>检测服务安排</li>
                <li>质量问题处理</li>
                <li>供应商质量审核</li>
            </ul>
        `,
        production: `
            <ul>
                <li>生产计划制定</li>
                <li>生产进度跟踪</li>
                <li>生产资源协调</li>
                <li>生产过程控制</li>
                <li>交付安排与协调</li>
            </ul>
        `
    };
    
    return descriptions[dept] || '';
}

// 初始化表单验证
function initFormValidation() {
    // 电话输入格式化
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 7) {
                    value = value.replace(/^(\d{3})(\d{0,4})/, '$1 $2');
                } else {
                    value = value.replace(/^(\d{3})(\d{4})(\d{0,4})/, '$1 $2 $3');
                }
            }
            
            e.target.value = value.trim();
        });
    }
}

// 验证邮箱格式
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

// 添加CSS样式
const contactStyles = `
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
    
    .map-detail,
    .email-composer,
    .visit-scheduler,
    .department-contact-detail {
        text-align: center;
    }
    
    .address-info {
        text-align: left;
        margin-bottom: 25px;
    }
    
    .address-info p {
        margin-bottom: 10px;
        color: var(--dark-gray);
        line-height: 1.5;
    }
    
    .map-actions,
    .policy-actions,
    .terms-actions,
    .form-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 25px;
    }
    
    .navigation-options {
        text-align: center;
    }
    
    .nav-buttons {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 25px;
    }
    
    .nav-buttons .btn {
        width: 100%;
        justify-content: center;
    }
    
    .email-options {
        text-align: left;
        margin-bottom: 30px;
    }
    
    .email-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 15px;
        background: var(--light-gray);
        border-radius: 6px;
        margin-bottom: 10px;
    }
    
    .email-option strong {
        color: var(--primary-blue);
        min-width: 100px;
    }
    
    .email-option a {
        color: var(--accent-blue);
        text-decoration: none;
        flex-grow: 1;
        margin: 0 15px;
    }
    
    .email-option a:hover {
        text-decoration: underline;
    }
    
    .btn-copy {
        background: var(--accent-blue);
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.3s;
    }
    
    .btn-copy:hover {
        background: var(--secondary-blue);
    }
    
    .email-form {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);
    }
    
    .email-form h4 {
        color: var(--primary-blue);
        margin-bottom: 20px;
        text-align: center;
    }
    
    .policy-document,
    .terms-document {
        text-align: left;
    }
    
    .policy-content,
    .terms-content {
        max-height: 60vh;
        overflow-y: auto;
        padding-right: 10px;
    }
    
    .policy-content h4,
    .terms-content h4 {
        color: var(--primary-blue);
        margin: 20px 0 10px;
        font-size: 1.1rem;
    }
    
    .policy-content p,
    .terms-content p {
        color: var(--dark-gray);
        line-height: 1.6;
        margin-bottom: 10px;
    }
    
    .policy-contact {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);
    }
    
    .dept-info {
        text-align: left;
        margin-bottom: 25px;
        padding: 20px;
        background: var(--light-gray);
        border-radius: 8px;
    }
    
    .dept-info p {
        margin-bottom: 10px;
        color: var(--dark-gray);
    }
    
    .dept-info a {
        color: var(--accent-blue);
        text-decoration: none;
    }
    
    .dept-info a:hover {
        text-decoration: underline;
    }
    
    .contact-options {
        margin-bottom: 25px;
    }
    
    .contact-options h4 {
        color: var(--primary-blue);
        margin-bottom: 15px;
    }
    
    .option-buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
    }
    
    .dept-description {
        text-align: left;
        padding: 20px;
        background: var(--light-gray);
        border-radius: 8px;
    }
    
    .dept-description h4 {
        color: var(--primary-blue);
        margin-bottom: 15px;
    }
    
    .dept-description ul {
        list-style: none;
    }
    
    .dept-description li {
        padding: 8px 0;
        padding-left: 25px;
        position: relative;
        color: var(--dark-gray);
    }
    
    .dept-description li::before {
        content: '•';
        position: absolute;
        left: 10px;
        color: var(--accent-blue);
        font-size: 1.2rem;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .file-item {
        animation: fadeIn 0.3s ease;
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet);

// 工具函数：显示通知
function showNotification(message, type = 'info') {
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(message, type);
    } else {
        alert(message);
    }
}