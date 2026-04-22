// ===== PRODUCT DATABASE =====
const products = [
    { id: 1, name: 'Men Shirt', category: 'mens', price: 29.99, image: '👕', description: 'Comfortable cotton shirt for everyday wear' },
    { id: 2, name: 'Women Dress', category: 'womens', price: 49.99, image: '👗', description: 'Elegant dress perfect for any occasion' },
    { id: 3, name: 'Kids T-Shirt', category: 'kids', price: 19.99, image: '👕', description: 'Fun and colorful t-shirt for kids' },
    { id: 4, name: 'Men Jeans', category: 'mens', price: 59.99, image: '👖', description: 'Classic blue jeans for a timeless look' },
    { id: 5, name: 'Women Coat', category: 'womens', price: 89.99, image: '🧥', description: 'Warm winter coat for cold weather' },
    { id: 6, name: 'Kids Jacket', category: 'kids', price: 39.99, image: '🧥', description: 'Cozy jacket for kids' },
    { id: 7, name: 'Men Sweater', category: 'mens', price: 44.99, image: '🧶', description: 'Soft and warm sweater' },
    { id: 8, name: 'Women Skirt', category: 'womens', price: 39.99, image: '👗', description: 'Stylish skirt for different seasons' },
];

// ===== SHOPPING CART =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== LOAD FEATURED PRODUCTS =====
function loadFeaturedProducts() {
    const featured = document.getElementById('featuredProducts');
    if (!featured) return;
    
    featured.innerHTML = '';
    products.slice(0, 4).forEach(product => {
        featured.innerHTML += createProductCard(product);
    });
    
    attachProductCardListeners();
}

// ===== LOAD ALL PRODUCTS =====
function loadProducts(filter = '') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    let filteredProducts = products;
    
    if (filter) {
        filteredProducts = products.filter(p => p.category === filter);
    }
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        productsGrid.innerHTML += createProductCard(product);
    });
    
    attachProductCardListeners();
}

// ===== CREATE PRODUCT CARD =====
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <button class="btn-view" onclick="viewProduct(${product.id})">View</button>
                    <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// ===== VIEW PRODUCT DETAILS =====
function viewProduct(productId) {
    localStorage.setItem('currentProductId', productId);
    window.location.href = 'product-details.html';
}

// ===== LOAD PRODUCT DETAILS =====
function loadProductDetails() {
    const container = document.getElementById('productDetailsContainer');
    if (!container) return;
    
    const productId = parseInt(localStorage.getItem('currentProductId'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    container.innerHTML = `
        <div class="details-container">
            <div class="detail-image">${product.image}</div>
            <div class="detail-info">
                <h1>${product.name}</h1>
                <div class="detail-category">Category: ${product.category}</div>
                <div class="detail-price">$${product.price}</div>
                <div class="detail-description">
                    <strong>Description:</strong><br>
                    ${product.description}
                </div>
                <div class="quantity-selector">
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" value="1" min="1" max="10">
                </div>
                <button class="btn btn-primary" onclick="addToCartFromDetail(${productId})">Add to Cart</button>
            </div>
        </div>
    `;
}

// ===== ADD TO CART FROM DETAIL PAGE =====
function addToCartFromDetail(productId) {
    const quantity = parseInt(document.getElementById('quantity').value);
    const product = products.find(p => p.id === productId);
    
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// ===== ADD TO CART =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// ===== LOAD CART =====
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        document.getElementById('checkoutBtn').style.display = 'none';
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="decreaseQuantity(${index})">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
                <div>
                    <div>$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    
    updateCartSummary();
}

// ===== UPDATE CART SUMMARY =====
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    
    if (document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
}

// ===== INCREASE QUANTITY =====
function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// ===== DECREASE QUANTITY =====
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

// ===== REMOVE FROM CART =====
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// ===== LOAD CHECKOUT PAGE =====
function loadCheckout() {
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!orderItems || !orderTotal) return;
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsHTML += `
            <div class="order-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    const tax = total * 0.10;
    const grandTotal = total + tax;
    
    orderItems.innerHTML = itemsHTML + `
        <div class="order-item" style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px;">
            <span>Tax (10%)</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
    `;
    
    orderTotal.textContent = `$${grandTotal.toFixed(2)}`;
}

// ===== HANDLE CHECKOUT FORM SUBMISSION =====
function handleCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Generate order number
        const orderNumber = '#' + Math.floor(Math.random() * 1000000);
        const orderDate = new Date().toLocaleDateString();
        const orderAmount = document.getElementById('orderTotal').textContent;
        
        // Store order info
        localStorage.setItem('orderNumber', orderNumber);
        localStorage.setItem('orderDate', orderDate);
        localStorage.setItem('orderAmount', orderAmount);
        
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Redirect to success page
        window.location.href = 'order-success.html';
    });
}

// ===== LOAD ORDER SUCCESS PAGE =====
function loadOrderSuccess() {
    const orderNumber = localStorage.getItem('orderNumber') || '#12345';
    const orderDate = localStorage.getItem('orderDate') || new Date().toLocaleDateString();
    const orderAmount = localStorage.getItem('orderAmount') || '$0.00';
    
    if (document.getElementById('orderNumber')) {
        document.getElementById('orderNumber').textContent = orderNumber;
        document.getElementById('orderDate').textContent = orderDate;
        document.getElementById('orderAmount').textContent = orderAmount;
    }
}

// ===== HANDLE LOGIN FORM =====
function handleLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        localStorage.setItem('userEmail', email);
        alert('Login successful!');
        window.location.href = 'index.html';
    });
}

// ===== HANDLE REGISTER FORM =====
function handleRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        
        alert('Registration successful! You can now login.');
        window.location.href = 'login.html';
    });
}

// ===== ATTACH PRODUCT CARD LISTENERS =====
function attachProductCardListeners() {
    // Listeners already attached via onclick
}

// ===== SEARCH PRODUCTS =====
function setupSearch() {
    const searchBox = document.getElementById('searchBox');
    if (!searchBox) return;
    
    searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm)
        );
        
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '';
        filtered.forEach(product => {
            productsGrid.innerHTML += createProductCard(product);
        });
    });
}

// ===== FILTER PRODUCTS BY CATEGORY =====
function setupCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    categoryFilter.addEventListener('change', function() {
        loadProducts(this.value);
    });
}

// ===== INITIALIZE PAGE =====
function initPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        loadFeaturedProducts();
    } else if (currentPage === 'products.html') {
        loadProducts();
        setupSearch();
        setupCategoryFilter();
    } else if (currentPage === 'product-details.html') {
        loadProductDetails();
    } else if (currentPage === 'cart.html') {
        loadCart();
    } else if (currentPage === 'checkout.html') {
        loadCheckout();
        handleCheckoutForm();
    } else if (currentPage === 'order-success.html') {
        loadOrderSuccess();
    } else if (currentPage === 'login.html') {
        handleLoginForm();
    } else if (currentPage === 'register.html') {
        handleRegisterForm();
    }
}

// ===== RUN ON DOCUMENT LOAD =====
document.addEventListener('DOMContentLoaded', initPage);
