// Product Components for FreshCart
window.Components = window.Components || {};

// Home Screen Component
Components.HomeScreen = () => {
  const featuredProducts = ProductData.getFeaturedProducts(8);
  const categories = ProductData.getAllCategories();
  
  return `
    <div class="home-screen">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1>Fresh groceries delivered to your door</h1>
              <p>Shop from the best local farms and get fresh produce delivered in as little as 30 minutes.</p>
              <div class="hero-actions">
                <button class="btn btn-primary btn-lg" onclick="router.navigate('search')">
                  Start Shopping
                </button>
                <button class="btn btn-outline btn-lg" onclick="router.navigate('category/fruits')">
                  Browse Categories
                </button>
              </div>
            </div>
            <div class="hero-image">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop" alt="Fresh Groceries" />
            </div>
          </div>
        </div>
      </section>
      
      <!-- Categories Section -->
      <section class="categories-section">
        <div class="container">
          <h2 class="section-title">Shop by Category</h2>
          <div class="categories-grid">
            ${Object.entries(categories).map(([key, category]) => `
              <div class="category-card" onclick="router.navigate('category/${key}')">
                <div class="category-icon">${category.icon}</div>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-description">${category.description}</p>
                <div class="category-count">${ProductData.getProductsByCategory(key).length} items</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      
      <!-- Featured Products Section -->
      <section class="featured-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured Products</h2>
            <button class="btn btn-outline" onclick="router.navigate('search')">View All</button>
          </div>
          <div class="products-grid">
            ${featuredProducts.map(product => Components.ProductCard(product)).join('')}
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your groceries delivered in 30 minutes or less</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌱</div>
              <h3>Fresh & Organic</h3>
              <p>Hand-picked fresh produce from local organic farms</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices with exclusive deals and discounts</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3>Easy Ordering</h3>
              <p>Simple and intuitive shopping experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <style>
      .hero-section {
        background: linear-gradient(135deg, var(--primary-navy) 0%, #2d3748 100%);
        color: var(--white);
        padding: var(--space-16) 0;
      }
      
      .hero-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-8);
        align-items: center;
      }
      
      .hero-text h1 {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-4);
        line-height: 1.2;
      }
      
      .hero-text p {
        font-size: var(--font-size-lg);
        color: #a0aec0;
        margin-bottom: var(--space-6);
        line-height: var(--line-height-relaxed);
      }
      
      .hero-actions {
        display: flex;
        gap: var(--space-4);
        flex-wrap: wrap;
      }
      
      .hero-image img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: var(--radius-xl);
      }
      
      .categories-section {
        padding: var(--space-16) 0;
        background: var(--white);
      }
      
      .section-title {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        text-align: center;
        margin-bottom: var(--space-8);
        color: var(--text-primary);
      }
      
      .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-6);
      }
      
      .category-card {
        background: var(--white);
        border: 2px solid var(--border-light);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        text-align: center;
        cursor: pointer;
        transition: all var(--transition-normal);
      }
      
      .category-card:hover {
        border-color: var(--accent-orange);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      .category-icon {
        font-size: 3rem;
        margin-bottom: var(--space-4);
      }
      
      .category-name {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
      }
      
      .category-description {
        color: var(--text-secondary);
        margin-bottom: var(--space-3);
      }
      
      .category-count {
        color: var(--accent-orange);
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-sm);
      }
      
      .featured-section {
        padding: var(--space-16) 0;
        background: var(--light-bg);
      }
      
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-8);
      }
      
      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--space-6);
      }
      
      .features-section {
        padding: var(--space-16) 0;
        background: var(--white);
      }
      
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-6);
      }
      
      .feature-card {
        text-align: center;
        padding: var(--space-6);
      }
      
      .feature-icon {
        font-size: 3rem;
        margin-bottom: var(--space-4);
      }
      
      .feature-card h3 {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-3);
        color: var(--text-primary);
      }
      
      .feature-card p {
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
      }
      
      @media (max-width: 768px) {
        .hero-content {
          grid-template-columns: 1fr;
          text-align: center;
        }
        
        .hero-text h1 {
          font-size: var(--font-size-3xl);
        }
        
        .hero-actions {
          justify-content: center;
        }
        
        .section-header {
          flex-direction: column;
          gap: var(--space-4);
          text-align: center;
        }
      }
    </style>
  `;
};

Components.initHomeScreen = () => {
  // Initialize any interactive elements
  console.log('Home screen initialized');
};

// Product Card Component
Components.ProductCard = (product) => {
  const isInCart = AppState.get('cart.items').some(item => item.id === product.id);
  
  return `
    <div class="product-card" onclick="router.navigate('product/${product.id}')">
      <div class="product-card-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${product.badges?.map(badge => `
          <span class="product-badge ${badge}">${badge}</span>
        `).join('') || ''}
      </div>
      
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${ComponentUtils.truncateText(product.description, 80)}</p>
        
        <div class="product-rating">
          <div class="stars">
            ${ComponentUtils.generateStars(product.rating)}
          </div>
          <span class="rating-text">(${product.reviews})</span>
        </div>
        
        <div class="product-price">
          <span class="price-current">${ComponentUtils.formatPrice(product.price)}</span>
          <span class="price-unit">/${product.unit}</span>
        </div>
        
        <div class="product-actions" onclick="event.stopPropagation()">
          ${isInCart ? `
            <button class="btn btn-outline btn-sm" onclick="router.navigate('cart')">
              View in Cart
            </button>
          ` : `
            <button class="btn btn-primary btn-sm" onclick="Components.addToCart(${product.id})">
              Add to Cart
            </button>
          `}
          <button class="btn btn-ghost btn-sm" onclick="Components.toggleWishlist(${product.id})">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
};

// Product Detail Screen Component
Components.ProductDetailScreen = (params) => {
  const product = ProductData.getProductById(params.id);
  
  if (!product) {
    return `
      <div class="container">
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <h2 class="empty-state-title">Product Not Found</h2>
          <p class="empty-state-description">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button class="btn btn-primary" onclick="router.navigate('home')">
            Back to Home
          </button>
        </div>
      </div>
    `;
  }
  
  const relatedProducts = ProductData.getRelatedProducts(product.id, 4);
  const cartItem = AppState.get('cart.items').find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  return `
    <div class="product-detail-screen">
      <div class="container">
        <nav class="breadcrumb">
          <a href="#home" onclick="router.navigate('home')">Home</a>
          <span>/</span>
          <a href="#category/${product.category}" onclick="router.navigate('category/${product.category}')">
            ${ProductData.getCategoryInfo(product.category)?.name}
          </a>
          <span>/</span>
          <span>${product.name}</span>
        </nav>
        
        <div class="product-detail-layout">
          <div class="product-images">
            <div class="main-image">
              <img src="${product.image}" alt="${product.name}" />
            </div>
          </div>
          
          <div class="product-details">
            <div class="product-header">
              <h1 class="product-title">${product.name}</h1>
              <div class="product-rating">
                <div class="stars">
                  ${ComponentUtils.generateStars(product.rating)}
                </div>
                <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
              </div>
            </div>
            
            <div class="product-price-section">
              <div class="price-main">
                <span class="price-current">${ComponentUtils.formatPrice(product.price)}</span>
                <span class="price-unit">/${product.unit}</span>
              </div>
              <div class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                ${product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </div>
            </div>
            
            <div class="product-description">
              <h3>Description</h3>
              <p>${product.description}</p>
            </div>
            
            ${product.nutrition ? `
              <div class="nutrition-info">
                <h3>Nutrition Facts</h3>
                <div class="nutrition-grid">
                  ${Object.entries(product.nutrition).map(([key, value]) => `
                    <div class="nutrition-item">
                      <span class="nutrition-label">${key.replace('_', ' ').toUpperCase()}</span>
                      <span class="nutrition-value">${value}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            <div class="product-actions">
              ${quantity > 0 ? `
                <div class="quantity-section">
                  <label>Quantity in Cart:</label>
                  <div class="quantity-selector">
                    <button class="quantity-btn" onclick="Components.updateCartQuantity(${product.id}, ${quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${quantity}" readonly />
                    <button class="quantity-btn" onclick="Components.updateCartQuantity(${product.id}, ${quantity + 1})">+</button>
                  </div>
                </div>
                <button class="btn btn-outline btn-full" onclick="router.navigate('cart')">
                  View Cart
                </button>
              ` : `
                <div class="quantity-section">
                  <label>Quantity:</label>
                  <div class="quantity-selector">
                    <button class="quantity-btn" onclick="Components.decreaseQuantity()">-</button>
                    <input type="number" class="quantity-input" id="product-quantity" value="1" min="1" max="10" />
                    <button class="quantity-btn" onclick="Components.increaseQuantity()">+</button>
                  </div>
                </div>
                <button class="btn btn-primary btn-full" onclick="Components.addToCartWithQuantity(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                  ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              `}
              
              <button class="btn btn-ghost btn-full" onclick="Components.toggleWishlist(${product.id})">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        
        ${relatedProducts.length > 0 ? `
          <section class="related-products">
            <h2>Related Products</h2>
            <div class="products-grid">
              ${relatedProducts.map(product => Components.ProductCard(product)).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    </div>
    
    <style>
      .product-detail-screen {
        padding: var(--space-6) 0;
      }
      
      .breadcrumb {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-bottom: var(--space-6);
        font-size: var(--font-size-sm);
        color: var(--text-muted);
      }
      
      .breadcrumb a {
        color: var(--accent-orange);
        text-decoration: none;
      }
      
      .breadcrumb a:hover {
        text-decoration: underline;
      }
      
      .product-detail-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-8);
        margin-bottom: var(--space-12);
      }
      
      .main-image img {
        width: 100%;
        height: 500px;
        object-fit: cover;
        border-radius: var(--radius-xl);
      }
      
      .product-header {
        margin-bottom: var(--space-6);
      }
      
      .product-title {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-3);
        color: var(--text-primary);
      }
      
      .product-price-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
        padding: var(--space-4);
        background: var(--light-bg);
        border-radius: var(--radius-lg);
      }
      
      .price-main {
        display: flex;
        align-items: baseline;
        gap: var(--space-2);
      }
      
      .price-current {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--accent-orange);
      }
      
      .price-unit {
        font-size: var(--font-size-lg);
        color: var(--text-muted);
      }
      
      .stock-status {
        font-weight: var(--font-weight-medium);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-md);
      }
      
      .stock-status.in-stock {
        color: var(--success);
        background: rgba(72, 187, 120, 0.1);
      }
      
      .stock-status.out-of-stock {
        color: var(--error);
        background: rgba(245, 101, 101, 0.1);
      }
      
      .product-description,
      .nutrition-info {
        margin-bottom: var(--space-6);
      }
      
      .product-description h3,
      .nutrition-info h3 {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-3);
        color: var(--text-primary);
      }
      
      .nutrition-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-3);
      }
      
      .nutrition-item {
        display: flex;
        justify-content: space-between;
        padding: var(--space-2);
        background: var(--light-bg);
        border-radius: var(--radius-md);
      }
      
      .nutrition-label {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
      }
      
      .nutrition-value {
        font-weight: var(--font-weight-medium);
        color: var(--text-primary);
      }
      
      .quantity-section {
        margin-bottom: var(--space-4);
      }
      
      .quantity-section label {
        display: block;
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
      }
      
      .product-actions {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }
      
      .related-products {
        margin-top: var(--space-12);
      }
      
      .related-products h2 {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-6);
        color: var(--text-primary);
      }
      
      @media (max-width: 768px) {
        .product-detail-layout {
          grid-template-columns: 1fr;
        }
        
        .main-image img {
          height: 300px;
        }
        
        .product-title {
          font-size: var(--font-size-2xl);
        }
        
        .price-current {
          font-size: var(--font-size-2xl);
        }
        
        .nutrition-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
};

Components.initProductDetailScreen = () => {
  // Initialize quantity controls
  window.Components.increaseQuantity = () => {
    const input = document.getElementById('product-quantity');
    if (input) {
      const current = parseInt(input.value);
      const max = parseInt(input.getAttribute('max'));
      if (current < max) {
        input.value = current + 1;
      }
    }
  };
  
  window.Components.decreaseQuantity = () => {
    const input = document.getElementById('product-quantity');
    if (input) {
      const current = parseInt(input.value);
      const min = parseInt(input.getAttribute('min'));
      if (current > min) {
        input.value = current - 1;
      }
    }
  };
};

// Category Screen Component
Components.CategoryScreen = (params) => {
  const categoryKey = params.name;
  const category = ProductData.getCategoryInfo(categoryKey);
  const products = ProductData.getProductsByCategory(categoryKey);
  
  if (!category) {
    return `
      <div class="container">
        <div class="empty-state">
          <div class="empty-state-icon">📂</div>
          <h2 class="empty-state-title">Category Not Found</h2>
          <p class="empty-state-description">
            The category you're looking for doesn't exist.
          </p>
          <button class="btn btn-primary" onclick="router.navigate('home')">
            Back to Home
          </button>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="category-screen">
      <div class="container">
        <div class="category-header">
          <div class="category-info">
            <div class="category-icon">${category.icon}</div>
            <div>
              <h1 class="category-title">${category.name}</h1>
              <p class="category-description">${category.description}</p>
              <div class="category-stats">
                <span>${products.length} products available</span>
              </div>
            </div>
          </div>
          
          <div class="category-actions">
            <select class="form-select" id="sort-select">
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
        
        <div class="category-content">
          <div class="products-grid" id="products-grid">
            ${products.map(product => Components.ProductCard(product)).join('')}
          </div>
          
          ${products.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">📦</div>
              <h2 class="empty-state-title">No Products Found</h2>
              <p class="empty-state-description">
                There are no products in this category yet.
              </p>
              <button class="btn btn-primary" onclick="router.navigate('home')">
                Browse Other Categories
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
    
    <style>
      .category-screen {
        padding: var(--space-6) 0;
      }
      
      .category-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-8);
        padding: var(--space-6);
        background: var(--white);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-card);
      }
      
      .category-info {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }
      
      .category-icon {
        font-size: 4rem;
      }
      
      .category-title {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
      }
      
      .category-description {
        color: var(--text-secondary);
        margin-bottom: var(--space-2);
      }
      
      .category-stats {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
      }
      
      .category-actions {
        display: flex;
        gap: var(--space-3);
      }
      
      @media (max-width: 768px) {
        .category-header {
          flex-direction: column;
          gap: var(--space-4);
        }
        
        .category-info {
          flex-direction: column;
          text-align: center;
        }
        
        .category-actions {
          width: 100%;
        }
        
        .category-actions select {
          width: 100%;
        }
      }
    </style>
  `;
};

Components.initCategoryScreen = (params) => {
  const categoryKey = params.name;
  const sortSelect = document.getElementById('sort-select');
  const productsGrid = document.getElementById('products-grid');
  
  if (sortSelect && productsGrid) {
    sortSelect.addEventListener('change', (e) => {
      const sortBy = e.target.value;
      const products = ProductData.getProductsByCategory(categoryKey);
      const sortedProducts = ProductData.sortProducts(products, sortBy);
      
      productsGrid.innerHTML = sortedProducts.map(product => Components.ProductCard(product)).join('');
    });
  }
};

// Add to cart functionality
Components.addToCart = (productId) => {
  const product = ProductData.getProductById(productId);
  if (product) {
    AppState.cart.addItem(product, 1);
    Components.showToast(`${product.name} added to cart!`, 'success');
    
    // Update cart count in header
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = AppState.get('cart.itemCount');
    }
  }
};

Components.addToCartWithQuantity = (productId) => {
  const product = ProductData.getProductById(productId);
  const quantityInput = document.getElementById('product-quantity');
  const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
  
  if (product) {
    AppState.cart.addItem(product, quantity);
    Components.showToast(`${quantity} ${product.name} added to cart!`, 'success');
    
    // Update cart count in header
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = AppState.get('cart.itemCount');
    }
    
    // Refresh the page to show updated state
    setTimeout(() => {
      router.handleRouteChange();
    }, 500);
  }
};

Components.updateCartQuantity = (productId, newQuantity) => {
  AppState.cart.updateQuantity(productId, newQuantity);
  
  // Update cart count in header
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = AppState.get('cart.itemCount');
  }
  
  // Refresh the page to show updated state
  setTimeout(() => {
    router.handleRouteChange();
  }, 100);
};

Components.toggleWishlist = (productId) => {
  // Placeholder for wishlist functionality
  Components.showToast('Wishlist feature coming soon!', 'info');
};