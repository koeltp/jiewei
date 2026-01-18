// js/cases.js - 成功案例页面功能

// 案例数据
const caseDetails = {
    case1: {
        title: "汽车发动机涡轮增压器核心零件",
        industry: "汽车行业",
        service: "零件加工",
        date: "2023年5月",
        complexity: "高精度",
        customer: "某知名汽车制造商",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        challenge: `客户需要加工发动机涡轮增压器的核心零件，该零件采用高温合金材料，具有复杂的曲面结构，精度要求达到±0.005mm，表面粗糙度要求Ra0.4μm。零件需要在高温高压环境下长期稳定工作。`,
        solution: `我们采用五轴联动加工中心进行加工，使用专业CAM软件进行编程，优化了刀具路径和切削参数。针对高温合金材料特性，选择了合适的刀具和切削液，并采用分阶段加工策略控制加工变形。`,
        specifications: [
            "零件材料：高温合金Inconel 718",
            "加工设备：五轴联动加工中心",
            "加工精度：±0.005mm",
            "表面粗糙度：Ra0.4μm",
            "加工时间：45小时",
            "零件尺寸：Φ120×80mm"
        ],
        results: [
            {
                icon: "fas fa-check-circle",
                value: "99.8%",
                label: "产品合格率"
            },
            {
                icon: "fas fa-bolt",
                value: "40%",
                label: "加工效率提升"
            },
            {
                icon: "fas fa-ruler-combined",
                value: "±0.003mm",
                label: "实际加工精度"
            },
            {
                icon: "fas fa-calendar-check",
                value: "提前5天",
                label: "交货时间"
            }
        ],
        testimonial: "精工模具的技术团队表现出色，不仅按时交付了高质量的产品，还在加工工艺上提出了创新性的改进建议，大大提高了我们的生产效率。"
    },
    
    case2: {
        title: "微创手术器械精密注塑模具",
        industry: "医疗器械",
        service: "模具制造",
        date: "2023年3月",
        complexity: "超高精度",
        customer: "某医疗器械公司",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        challenge: "医疗器械公司需要开发微创手术器械的精密注塑模具，模具要求具有复杂的内部流道和微细结构，表面需要达到医疗级的镜面抛光效果，且必须满足生物兼容性要求。",
        solution: "我们采用慢走丝线切割和精密电火花加工技术制造核心零件，使用专业的抛光设备进行镜面抛光。在模具设计阶段进行了模流分析和结构优化，确保模具性能和寿命。",
        specifications: [
            "模具材料：瑞典一胜百S136模具钢",
            "模具精度：±0.002mm",
            "表面抛光：医疗级镜面抛光",
            "模具寿命：100万次以上",
            "冷却系统：随形冷却水路",
            "交付周期：35天"
        ],
        results: [
            {
                icon: "fas fa-syringe",
                value: "100%",
                label: "生物兼容性测试通过"
            },
            {
                icon: "fas fa-tachometer-alt",
                value: "50%",
                label: "生产周期缩短"
            },
            {
                icon: "fas fa-percentage",
                value: "0.1%",
                label: "产品缺陷率"
            },
            {
                icon: "fas fa-user-md",
                value: "优秀",
                label: "医生使用评价"
            }
        ],
        testimonial: "精工模具在医疗器械模具制造方面展现出了极高的专业水准，他们的质量控制体系严格，为我们提供了完全符合医疗标准的产品。"
    },
    
    case3: {
        title: "智能手机精密结构件注塑模具",
        industry: "消费电子",
        service: "模具制造",
        date: "2023年1月",
        complexity: "中精度",
        customer: "某智能手机制造商",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        challenge: "需要开发智能手机精密结构件的注塑模具，产品壁厚仅0.5mm，具有复杂的卡扣结构和严格的装配要求，需要实现大批量稳定生产。",
        solution: "采用热流道系统和精密温控技术，优化了模具的冷却系统。使用高精度加工设备制造模具零件，确保尺寸稳定性。在生产过程中实施SPC质量控制。",
        specifications: [
            "产品材料：PBT+30%GF",
            "模具穴数：1出8",
            "模具寿命：200万次",
            "产品壁厚：0.5mm",
            "成型周期：25秒",
            "日产量：27,000件"
        ],
        results: [
            {
                icon: "fas fa-mobile-alt",
                value: "99.5%",
                label: "装配合格率"
            },
            {
                icon: "fas fa-industry",
                value: "30%",
                label: "生产效率提升"
            },
            {
                icon: "fas fa-balance-scale",
                value: "±0.8g",
                label: "产品重量稳定性"
            },
            {
                icon: "fas fa-chart-line",
                value: "CPK≥1.67",
                label: "过程能力指数"
            }
        ],
        testimonial: "精工模具的快速响应和专业解决方案，帮助我们成功实现了新产品的量产，模具性能稳定，产品品质优秀。"
    },
    
    case4: {
        title: "5G基站天线精密波导零件",
        industry: "通信设备",
        service: "零件加工",
        date: "2022年11月",
        complexity: "高精度",
        customer: "某5G设备制造商",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        challenge: "加工5G基站天线的精密波导零件，采用铝合金材料，具有复杂的曲面结构和严格的尺寸公差要求，需要保证信号的传输性能。",
        solution: "使用五轴联动加工中心进行精密加工，配合在线测量系统实时监控加工质量。采用特殊的刀具和切削参数控制铝合金的加工变形，确保零件精度。",
        specifications: [
            "零件材料：铝合金6061-T6",
            "加工精度：±0.008mm",
            "表面粗糙度：Ra0.8μm",
            "零件尺寸：200×150×80mm",
            "加工设备：五轴加工中心",
            "测量设备：三坐标测量机"
        ],
        results: [
            {
                icon: "fas fa-satellite",
                value: "99.9%",
                label: "信号传输效率"
            },
            {
                icon: "fas fa-ruler-combined",
                value: "±0.005mm",
                label: "实际加工精度"
            },
            {
                icon: "fas fa-bolt",
                value: "25%",
                label: "加工成本降低"
            },
            {
                icon: "fas fa-clock",
                value: "准时交付",
                label: "项目完成情况"
            }
        ],
        testimonial: "精工模具在精密零件加工方面具有明显的技术优势，他们提供的5G天线零件完全满足了我们的技术要求，质量稳定可靠。"
    },
    
    case5: {
        title: "航空发动机钛合金涡轮叶片",
        industry: "航空航天",
        service: "零件加工",
        date: "2022年8月",
        complexity: "超高精度",
        customer: "某航空发动机制造商",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        challenge: "加工航空发动机的钛合金涡轮叶片，叶片具有复杂的空间曲面和严格的空气动力学要求，加工难度大，材料去除率高，需要控制加工应力和变形。",
        solution: "采用先进的五轴联动加工中心，使用专门针对钛合金加工的刀具和切削参数。实施分阶段加工策略，结合应力释放热处理，控制加工变形。",
        specifications: [
            "零件材料：钛合金TC4",
            "加工精度：±0.01mm",
            "表面完整性：Ra0.4μm",
            "叶片长度：120mm",
            "加工时间：120小时",
            "材料去除率：85%"
        ],
        results: [
            {
                icon: "fas fa-plane",
                value: "100%",
                label: "航空标准符合"
            },
            {
                icon: "fas fa-wind",
                value: "优秀",
                label: "空气动力学性能"
            },
            {
                icon: "fas fa-temperature-high",
                value: "通过",
                label: "高温性能测试"
            },
            {
                icon: "fas fa-certificate",
                value: "AS9100",
                label: "质量体系认证"
            }
        ],
        testimonial: "精工模具在航空航天零件加工方面展现出了卓越的技术实力，他们加工的涡轮叶片完全满足了航空标准，质量无可挑剔。"
    },
    
    case6: {
        title: "汽车内饰件模具设计优化",
        industry: "汽车行业",
        service: "模具设计",
        date: "2022年6月",
        complexity: "中精度",
        customer: "某汽车内饰件制造商",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        challenge: "现有汽车内饰件模具存在生产效率低、产品质量不稳定、模具维护频繁等问题，需要进行全面的设计优化和改进。",
        solution: "我们对现有模具进行了全面的分析和评估，重新设计了模具的冷却系统、排气系统和顶出系统。采用模流分析软件优化了浇注系统，改进了模具结构。",
        specifications: [
            "优化项目：冷却系统改造",
            "设计软件：Moldflow分析",
            "优化目标：缩短成型周期",
            "预期效果：提高产品稳定性",
            "实施周期：20天",
            "投资回报：3个月内回收"
        ],
        results: [
            {
                icon: "fas fa-tachometer-alt",
                value: "35%",
                label: "成型周期缩短"
            },
            {
                icon: "fas fa-chart-line",
                value: "99.2%",
                label: "产品合格率提升"
            },
            {
                icon: "fas fa-tools",
                value: "60%",
                label: "维护频率降低"
            },
            {
                icon: "fas fa-dollar-sign",
                value: "40%",
                label: "生产成本降低"
            }
        ],
        testimonial: "精工模具的设计优化方案切实有效，不仅解决了我们长期困扰的质量问题，还显著提高了生产效率，投资回报超出预期。"
    }
};

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initCaseFilters();
    initCaseDetails();
    initTestimonials();
    initCaseModal();
    initIndustryFilters();
    initLoadMore();
});

// 初始化案例筛选
function initCaseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    if (filterButtons.length === 0 || caseCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // 更新激活的筛选按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选案例卡片
            caseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const industry = card.getAttribute('data-industry');
                    const service = card.getAttribute('data-service');
                    
                    if (industry === filterValue || service === filterValue) {
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
            updateFilterURL(filterValue);
        });
    });
}

// 更新筛选URL
function updateFilterURL(filterValue) {
    if (history.pushState) {
        const url = new URL(window.location);
        url.searchParams.set('filter', filterValue);
        history.pushState(null, '', url.toString());
    }
}

// 初始化案例详情
function initCaseDetails() {
    const detailButtons = document.querySelectorAll('.case-detail-btn');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const caseId = this.getAttribute('data-case');
            showCaseDetail(caseId);
        });
    });
}

// 显示案例详情
function showCaseDetail(caseId) {
    const caseData = caseDetails[caseId];
    if (!caseData) return;
    
    // 构建详情HTML
    const detailHTML = `
        <div class="case-detail-header">
            <h2>${caseData.title}</h2>
            <div class="case-detail-meta">
                <span><i class="far fa-calendar"></i> ${caseData.date}</span>
                <span><i class="fas fa-industry"></i> ${caseData.industry}</span>
                <span><i class="fas fa-cogs"></i> ${caseData.service}</span>
                <span><i class="fas fa-tachometer-alt"></i> ${caseData.complexity}</span>
            </div>
            <div class="case-detail-badges">
                <span class="badge industry">${caseData.industry}</span>
                <span class="badge service">${caseData.service}</span>
            </div>
        </div>
        
        <div class="case-detail-content">
            <div class="case-detail-image">
                <img src="${caseData.image}" alt="${caseData.title}">
            </div>
            <div class="case-detail-info">
                <h3>项目概述</h3>
                <p><strong>客户：</strong>${caseData.customer}</p>
                <p>${caseData.challenge}</p>
                
                <div class="case-detail-solution">
                    <h4>解决方案</h4>
                    <p>${caseData.solution}</p>
                </div>
            </div>
        </div>
        
        <div class="case-detail-specs">
            <h4>技术规格</h4>
            <ul>
                ${caseData.specifications.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
        </div>
        
        <div class="case-detail-results">
            <h4>项目成果</h4>
            <div class="results-grid">
                ${caseData.results.map(result => `
                    <div class="result-item">
                        <i class="${result.icon}"></i>
                        <div class="result-value">${result.value}</div>
                        <div class="result-label">${result.label}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${caseData.testimonial ? `
        <div class="case-detail-testimonial">
            <h4>客户评价</h4>
            <div class="testimonial-content">
                <div class="quote-icon">
                    <i class="fas fa-quote-left"></i>
                </div>
                <p>"${caseData.testimonial}"</p>
            </div>
        </div>
        ` : ''}
        
        <div class="case-detail-actions" style="margin-top: 30px; text-align: center;">
            <button class="btn btn-primary" onclick="requestSimilarProject('${caseId}')">
                <i class="fas fa-project-diagram"></i> 咨询类似项目
            </button>
        </div>
    `;
    
    // 显示模态框
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = detailHTML;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // 添加关闭事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeCaseModal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCaseModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeCaseModal();
        }
    });
}

// 关闭案例详情模态框
function closeCaseModal() {
    const modal = document.getElementById('caseModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // 移除ESC键监听
    document.removeEventListener('keydown', arguments.callee);
}

// 初始化客户评价
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    testimonials.forEach((card, index) => {
        // 添加动画延迟
        card.style.animationDelay = `${index * 0.1}s`;
        
        // 点击查看更多评价
        card.addEventListener('click', function() {
            const clientName = this.querySelector('h4').textContent;
            const testimonialText = this.querySelector('p').textContent;
            
            showTestimonialDetail(clientName, testimonialText);
        });
    });
}

// 显示评价详情
function showTestimonialDetail(name, text) {
    const detailHTML = `
        <div class="testimonial-detail">
            <h3>${name}的评价</h3>
            <div class="quote-icon">
                <i class="fas fa-quote-left"></i>
            </div>
            <p>${text}</p>
            <div class="testimonial-actions">
                <button class="btn btn-primary" onclick="contactClientReference()">
                    <i class="fas fa-handshake"></i> 联系客户参考
                </button>
            </div>
        </div>
    `;
    
    showDetailModal(detailHTML, '客户评价详情');
}

// 初始化行业筛选链接
function initIndustryFilters() {
    const industryLinks = document.querySelectorAll('a[data-filter]');
    
    industryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            
            // 找到对应的筛选按钮并点击
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
            if (filterBtn) {
                filterBtn.click();
                
                // 滚动到案例区域
                document.querySelector('.cases-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 初始化加载更多
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    let currentPage = 1;
    const casesPerPage = 3;
    
    loadMoreBtn.addEventListener('click', function() {
        // 显示加载状态
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
        this.disabled = true;
        
        // 模拟加载更多案例
        setTimeout(() => {
            // 模拟加载新案例
            loadMoreCases(currentPage, casesPerPage);
            currentPage++;
            
            // 恢复按钮状态
            this.innerHTML = originalText;
            this.disabled = false;
            
            // 如果已经是最后一页，隐藏按钮
            if (currentPage >= 3) { // 假设只有3页数据
                this.style.display = 'none';
                
                // 显示无更多数据提示
                const loadMoreDiv = this.parentElement;
                const noMoreMsg = document.createElement('p');
                noMoreMsg.className = 'no-more-cases';
                noMoreMsg.innerHTML = '<i class="fas fa-check-circle"></i> 已显示所有案例';
                noMoreMsg.style.textAlign = 'center';
                noMoreMsg.style.color = 'var(--medium-gray)';
                noMoreMsg.style.marginTop = '20px';
                loadMoreDiv.appendChild(noMoreMsg);
            }
        }, 1500);
    });
}

// 加载更多案例
function loadMoreCases(page, perPage) {
    // 在实际应用中，这里应该从服务器加载数据
    // 这里使用模拟数据
    
    const casesGrid = document.getElementById('casesGrid');
    if (!casesGrid) return;
    
    // 创建新的案例卡片
    const newCases = [
        {
            id: 'case' + (page * perPage + 1),
            title: "新能源电池壳体模具",
            industry: "automotive",
            service: "mold",
            excerpt: "为新能源汽车电池系统开发精密壳体模具，要求良好的密封性和结构强度...",
            challenge: "大型模具制造、薄壁注塑、密封结构设计"
        },
        {
            id: 'case' + (page * perPage + 2),
            title: "机器人关节零件加工",
            industry: "electronics",
            service: "machining",
            excerpt: "加工工业机器人关节部位的精密零件，要求高精度和高耐磨性...",
            challenge: "复杂曲面加工、高硬度材料、严格的配合公差"
        },
        {
            id: 'case' + (page * perPage + 3),
            title: "光学仪器零件检测",
            industry: "medical",
            service: "testing",
            excerpt: "为光学仪器制造商提供精密零件的全面检测服务...",
            challenge: "微米级精度检测、复杂形状测量、材料分析"
        }
    ];
    
    newCases.forEach(caseData => {
        const caseCard = document.createElement('div');
        caseCard.className = 'case-card';
        caseCard.setAttribute('data-industry', caseData.industry);
        caseCard.setAttribute('data-service', caseData.service);
        caseCard.setAttribute('data-complexity', 'medium');
        caseCard.style.opacity = '0';
        caseCard.style.transform = 'translateY(20px)';
        
        caseCard.innerHTML = `
            <div class="case-image">
                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="${caseData.title}">
                <div class="case-badge">
                    <span class="badge industry">${getIndustryName(caseData.industry)}</span>
                    <span class="badge service">${getServiceName(caseData.service)}</span>
                </div>
            </div>
            <div class="case-content">
                <h3>${caseData.title}</h3>
                <div class="case-meta">
                    <span><i class="far fa-calendar"></i> 近期完成</span>
                    <span><i class="fas fa-industry"></i> ${getIndustryName(caseData.industry)}</span>
                    <span><i class="fas fa-tachometer-alt"></i> 中精度</span>
                </div>
                <p class="case-excerpt">${caseData.excerpt}</p>
                <div class="case-challenge">
                    <h4>技术挑战</h4>
                    <p>${caseData.challenge}</p>
                </div>
                <button class="btn btn-secondary case-detail-btn" data-case="${caseData.id}">查看详情</button>
            </div>
        `;
        
        casesGrid.appendChild(caseCard);
        
        // 添加动画效果
        setTimeout(() => {
            caseCard.style.opacity = '1';
            caseCard.style.transform = 'translateY(0)';
        }, 100);
        
        // 绑定详情按钮事件
        const detailBtn = caseCard.querySelector('.case-detail-btn');
        detailBtn.addEventListener('click', function() {
            // 这里可以添加模拟的案例详情数据
            showNotification('更多案例详情正在完善中...', 'info');
        });
    });
}

// 获取行业名称
function getIndustryName(code) {
    const industries = {
        automotive: '汽车行业',
        medical: '医疗器械',
        electronics: '消费电子',
        communication: '通信设备',
        aerospace: '航空航天'
    };
    return industries[code] || code;
}

// 获取服务名称
function getServiceName(code) {
    const services = {
        mold: '模具制造',
        machining: '零件加工',
        design: '模具设计',
        testing: '检测服务'
    };
    return services[code] || code;
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
}

// 关闭模态框
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// 咨询类似项目
function requestSimilarProject(caseId) {
    const caseData = caseDetails[caseId];
    if (!caseData) return;
    
    const formHTML = `
        <h3>咨询类似项目：${caseData.title}</h3>
        <p>请填写您的项目需求，我们将为您提供定制化的解决方案</p>
        <form id="projectInquiryForm">
            <div class="form-group">
                <label for="projectName">项目名称 *</label>
                <input type="text" id="projectName" name="projectName" required 
                       value="类似${caseData.title}项目">
            </div>
            <div class="form-group">
                <label for="company">公司名称 *</label>
                <input type="text" id="company" name="company" required>
            </div>
            <div class="form-group">
                <label for="contact">联系人 *</label>
                <input type="text" id="contact" name="contact" required>
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
                <label for="requirements">项目具体要求</label>
                <textarea id="requirements" name="requirements" rows="4" 
                          placeholder="请详细描述您的项目需求、技术要求、预算和时间要求等"></textarea>
            </div>
            <input type="hidden" name="referenceCase" value="${caseId}">
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane"></i> 提交咨询
                </button>
            </div>
        </form>
    `;
    
    showDetailModal(formHTML, '项目咨询');
    
    // 处理表单提交
    setTimeout(() => {
        const form = document.getElementById('projectInquiryForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('项目咨询已提交！我们的技术专家将在24小时内与您联系。', 'success');
                }
                
                // 关闭模态框
                const modal = document.querySelector('.detail-modal.show');
                if (modal) {
                    closeModal(modal);
                }
                
                console.log('项目咨询:', data);
            });
        }
    }, 100);
}

// 联系客户参考
function contactClientReference() {
    const formHTML = `
        <h3>申请客户参考</h3>
        <p>请填写申请信息，我们将联系相关客户并取得同意后，为您提供参考联系方式</p>
        <form id="referenceRequestForm">
            <div class="form-group">
                <label for="applicantName">申请人姓名 *</label>
                <input type="text" id="applicantName" name="applicantName" required>
            </div>
            <div class="form-group">
                <label for="applicantCompany">所在公司 *</label>
                <input type="text" id="applicantCompany" name="applicantCompany" required>
            </div>
            <div class="form-group">
                <label for="applicantPosition">职务 *</label>
                <input type="text" id="applicantPosition" name="applicantPosition" required>
            </div>
            <div class="form-group">
                <label for="applicantPhone">联系电话 *</label>
                <input type="tel" id="applicantPhone" name="applicantPhone" required>
            </div>
            <div class="form-group">
                <label for="purpose">申请目的 *</label>
                <textarea id="purpose" name="purpose" rows="3" required 
                          placeholder="请说明您希望联系客户参考的目的和具体问题"></textarea>
            </div>
            <div class="form-group">
                <div class="checkbox-group">
                    <input type="checkbox" id="agreeTerms" name="agreeTerms" required>
                    <label for="agreeTerms">我同意遵守客户隐私保护协议，并仅将参考信息用于项目评估</label>
                </div>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-user-check"></i> 提交申请
                </button>
            </div>
        </form>
    `;
    
    showDetailModal(formHTML, '客户参考申请');
    
    // 处理表单提交
    setTimeout(() => {
        const form = document.getElementById('referenceRequestForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // 显示成功消息
                if (window.PrecisionMold && window.PrecisionMold.showNotification) {
                    window.PrecisionMold.showNotification('申请已提交！我们将在3个工作日内与您联系确认。', 'success');
                }
                
                // 关闭模态框
                const modal = document.querySelector('.detail-modal.show');
                if (modal) {
                    closeModal(modal);
                }
            });
        }
    }, 100);
}

// 显示通知
function showNotification(message, type = 'info') {
    if (window.PrecisionMold && window.PrecisionMold.showNotification) {
        window.PrecisionMold.showNotification(message, type);
    } else {
        alert(message);
    }
}

// 添加CSS样式
const caseStyles = `
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
    
    .checkbox-group {
        display: flex;
        align-items: flex-start;
    }
    
    .checkbox-group input {
        width: auto;
        margin-right: 10px;
        margin-top: 5px;
    }
    
    .checkbox-group label {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .form-actions {
        text-align: center;
        margin-top: 30px;
    }
    
    .testimonial-detail {
        text-align: center;
    }
    
    .testimonial-detail .quote-icon {
        margin: 20px auto;
    }
    
    .testimonial-detail p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--dark-gray);
        font-style: italic;
    }
    
    .testimonial-actions {
        margin-top: 30px;
    }
    
    .no-more-cases {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = caseStyles;
document.head.appendChild(styleSheet);