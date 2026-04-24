document.addEventListener('DOMContentLoaded', function() {
    // 加载产品数据
    loadProducts();
});

function loadProducts() {
    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            renderCategories(data.categories);
            renderProducts(data.categories);
            initCategorySwitch(data.categories);
            
            // 检查URL参数，选择对应分类
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get('category');
            if (categoryParam) {
                selectCategory(categoryParam, data.categories);
            } else {
                // 默认显示汽车类产品
                selectCategory('automotive', data.categories);
            }
        })
        .catch(error => console.error('Error loading products:', error));
}

function selectCategory(categoryId, categories) {
    // 查找分类名称
    const category = categories.find(cat => cat.id === categoryId);
    const categoryName = category ? category.name : '汽车类';
    
    // 更新左侧导航选中状态
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        if (item.getAttribute('data-category') === categoryId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // 更新面包屑导航
    const currentCategoryElement = document.getElementById('current-category');
    if (currentCategoryElement) {
        currentCategoryElement.textContent = categoryName;
    }
    
    // 显示对应分类的产品
    showCategory(categoryId);
}

function renderCategories(categories) {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';
    
    categories.forEach((category, index) => {
        const li = document.createElement('li');
        li.className = 'category-item' + (index === 0 ? ' active' : '');
        li.setAttribute('data-category', category.id);
        li.innerHTML = `<a href="#">${category.name}</a>`;
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

function renderProducts(categories) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    categories.forEach(category => {
        category.products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.setAttribute('data-category', category.id);
            productItem.style.display = 'none';
            
            productItem.innerHTML = `
                <a href="product-detail.html?id=${product.id}" class="product-link">
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="product-name">${product.name}</div>
                </a>
            `;
            
            productGrid.appendChild(productItem);
        });
    });
}

function initCategorySwitch(categories) {
    const categoryItems = document.querySelectorAll('.category-item');
    const currentCategoryElement = document.getElementById('current-category');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有分类的active类
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // 添加当前分类的active类
            this.classList.add('active');
            
            // 获取当前分类
            const category = this.getAttribute('data-category');
            // 更新面包屑导航
            currentCategoryElement.textContent = this.querySelector('a').textContent;
            
            // 显示对应分类的产品
            showCategory(category);
        });
    });
}

function showCategory(category) {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(product => {
        if (product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}