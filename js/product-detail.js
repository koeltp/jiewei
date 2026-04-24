document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取产品ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // 加载产品数据
    loadProducts(productId);
});

function loadProducts(productId) {
    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            // 渲染分类导航
            renderCategories(data.categories);
            
            // 加载产品数据
            let product = null;
            let categoryName = '';
            
            // 遍历所有分类查找产品
            for (const category of data.categories) {
                const foundProduct = category.products.find(p => p.id === parseInt(productId));
                if (foundProduct) {
                    product = foundProduct;
                    categoryName = category.name;
                    break;
                }
            }
            
            if (product) {
                displayProduct(product, categoryName);
            }
        })
        .catch(error => console.error('Error loading products:', error));
}

function renderCategories(categories) {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';
    
    categories.forEach((category, index) => {
        const li = document.createElement('li');
        li.className = 'category-item';
        li.setAttribute('data-category', category.id);
        li.innerHTML = `<a href="product.html?category=${category.id}">${category.name}</a>`;
        categoryList.appendChild(li);
    });
    
    renderFooterCategories(categories);
}

function renderFooterCategories(categories) {
    const footerCategoryList = document.getElementById('footer-category-list');
    if (!footerCategoryList) return;
    
    footerCategoryList.innerHTML = '';
    
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="product.html?category=${category.id}">${category.name}</a>`;
        footerCategoryList.appendChild(li);
    });
}

function displayProduct(product, categoryName) {
    // 更新面包屑导航
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = `
        <a href="index.html">首页</a> &gt; 
        <a href="product.html">产品展示</a> &gt; 
        <span>${categoryName}</span> &gt; 
        <span>${product.name}</span>
    `;
    
    // 更新产品标题
    document.querySelector('.product-info h1').textContent = product.name;
    
    // 更新产品描述
    const descriptionDiv = document.querySelector('.product-description');
    descriptionDiv.innerHTML = `<p>${product.description}</p>`;
    
    // 更新产品规格
    const specsList = document.querySelector('.product-specs ul');
    specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');
    
    // 更新幻灯片图片
    const slider = document.getElementById('productSlider');
    const sliderIndicators = document.getElementById('sliderIndicators');
    
    // 清空现有内容
    slider.innerHTML = '';
    sliderIndicators.innerHTML = '';
    
    // 重新创建幻灯片图片
    product.images.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${product.name} 图片${index + 1}`;
        img.className = 'slider-image' + (index === 0 ? ' active' : '');
        img.style.display = index === 0 ? 'block' : 'none';
        slider.appendChild(img);
    });
    
    // 添加导航按钮
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'slider-controls';
    controlsDiv.innerHTML = `
        <button class="slider-btn" id="prevBtn"><i class="fas fa-chevron-left"></i></button>
        <button class="slider-btn" id="nextBtn"><i class="fas fa-chevron-right"></i></button>
    `;
    slider.appendChild(controlsDiv);
    
    // 添加指示器
    product.images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicator.setAttribute('data-index', index);
        sliderIndicators.appendChild(indicator);
    });
    
    // 重新添加指示器到滑块
    slider.appendChild(sliderIndicators);
    
    // 重新初始化幻灯片
    initSlider();
    
    // 重新初始化图片放大功能
    initImageZoom();
}

function initSlider() {
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    
    function showImage(index) {
        sliderImages.forEach((img, i) => {
            if (i === index) {
                img.style.display = 'block';
                img.classList.add('active');
            } else {
                img.style.display = 'none';
                img.classList.remove('active');
            }
        });
        
        // 更新指示器状态
        if (indicators.length > 0) {
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
        showImage(currentIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % sliderImages.length;
        showImage(currentIndex);
    });
    
    // 指示器点击事件
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                showImage(currentIndex);
            });
        });
    }
    
    // 自动轮播
    setInterval(function() {
        currentIndex = (currentIndex + 1) % sliderImages.length;
        showImage(currentIndex);
    }, 3000);
}

function initImageZoom() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalPrevBtn = document.getElementById('modalPrevBtn');
    const modalNextBtn = document.getElementById('modalNextBtn');
    const modalIndicators = document.getElementById('modalIndicators');
    const sliderImages = document.querySelectorAll('.slider-image');
    let currentModalIndex = 0;
    let currentProductImages = [];
    
    // 存储当前产品的图片
    sliderImages.forEach(img => {
        currentProductImages.push(img.src);
    });
    
    // 生成模态框指示器
    function generateModalIndicators() {
        modalIndicators.innerHTML = '';
        currentProductImages.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'modal-indicator' + (index === currentModalIndex ? ' active' : '');
            indicator.setAttribute('data-index', index);
            modalIndicators.appendChild(indicator);
        });
        
        // 绑定指示器点击事件
        const modalIndicatorElements = document.querySelectorAll('.modal-indicator');
        modalIndicatorElements.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentModalIndex = index;
                updateModalImage();
            });
        });
    }
    
    // 更新模态框图片
    function updateModalImage() {
        modalImg.src = currentProductImages[currentModalIndex];
        
        // 更新指示器状态
        const modalIndicatorElements = document.querySelectorAll('.modal-indicator');
        modalIndicatorElements.forEach((indicator, index) => {
            if (index === currentModalIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    sliderImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentModalIndex = index;
            currentProductImages = [];
            sliderImages.forEach(sliderImg => {
                currentProductImages.push(sliderImg.src);
            });
            modal.classList.add('active');
            updateModalImage();
            generateModalIndicators();
        });
    });
    
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // 模态框上一张按钮
    modalPrevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentModalIndex = (currentModalIndex - 1 + currentProductImages.length) % currentProductImages.length;
        updateModalImage();
    });
    
    // 模态框下一张按钮
    modalNextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentModalIndex = (currentModalIndex + 1) % currentProductImages.length;
        updateModalImage();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        } else if (e.key === 'ArrowLeft' && modal.classList.contains('active')) {
            currentModalIndex = (currentModalIndex - 1 + currentProductImages.length) % currentProductImages.length;
            updateModalImage();
        } else if (e.key === 'ArrowRight' && modal.classList.contains('active')) {
            currentModalIndex = (currentModalIndex + 1) % currentProductImages.length;
            updateModalImage();
        }
    });
}