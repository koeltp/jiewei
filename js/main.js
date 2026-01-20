// js/main.js - 通用JavaScript功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {

    // 初始化所有组件
    initNav(); // 动态生成导航栏
    initNavigation();
    initAnimations();
    initForms();
    initImageLazyLoading();
    
    // 设置当前年份（页脚版权信息）
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

// 初始化页面动画
function initAnimations() {
    // 观察器配置
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 初始化表单
function initForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // 初始化文件上传预览
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', handleFileSelect);
    });
}

// 表单提交处理
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // 显示加载状态
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 收集表单数据
    const formData = new FormData(form);
    
    // 这里应该发送到服务器
    // 暂时使用模拟发送
    setTimeout(() => {
        // 显示成功消息
        showNotification('消息发送成功！我们将尽快与您联系。', 'success');
        
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }, 2000);
}

// 文件选择处理
function handleFileSelect(event) {
    const input = event.target;
    const previewContainer = input.parentNode.querySelector('.file-preview');
    
    if (!previewContainer) return;
    
    previewContainer.innerHTML = '';
    
    Array.from(input.files).forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'file-item';
        fileElement.innerHTML = `
            <i class="fas fa-file"></i>
            <span>${file.name} (${formatFileSize(file.size)})</span>
        `;
        previewContainer.appendChild(fileElement);
    });
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // 自动关闭
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

// 关闭通知
function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// 初始化图片懒加载
function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 工具函数：防抖
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

// 导出函数供其他模块使用
window.PrecisionMold = {
    showNotification,
    debounce,
    throttle
};