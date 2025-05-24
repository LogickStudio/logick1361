// Cart and Checkout Components for FreshCart
window.Components = window.Components || {};

// Search Screen Component
Components.SearchScreen = (params, query) => {
  const searchQuery = query.q || '';
  const results = searchQuery ? ProductData.searchProducts(searchQuery) : [];
  
  return `
    <div class="search-screen">
      <div class="container">
        <div class="search-header">
          <div class="search-form">
            <input 
              type="text" 
              class="search-input-large" 
              id="search-input-main"
              placeholder="Search for fresh groceries..."
              value="${searchQuery}"
            />
            <button class="search-btn-large" id="search-btn-main">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
          
          <div class="search-filters">
            <button class="btn btn-outline" onclick="Components.showAdvancedSearch()">
              Advanced Filters
            </button>
          </div>
        </div>
        
        ${searchQuery ? `
          <div class="search-results-header">
            <h2>Search Results for "${searchQuery}"</h2>
            <p>${results.length} products found</p>
          </div>
          
          <div class="search-results">
            ${results.length > 0 ? `
              <div class="products-grid">
                ${results.map(product => Components.ProductCard(product)).join('')}
              </div>
            ` : `
              <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3 class="empty-state-title">No products found</h3>
                <p class="empty-state-description">
                  Try adjusting your search terms or browse our categories.
                </p>
                <button class="btn btn-primary" onclick="router.navigate('home')">
                  Browse Categories
                </button>
              </div>
            `}
          </div>
        ` : `
          <div class="search-suggestions">
            <h3>Popular Categories</h3>
            <div class="categories-quick">
              ${Object.entries(ProductData.getAllCategories()).map(([key, category]) => `
                <button class="category-chip" onclick="router.navigate('category/${key}')">
                  ${category.icon} ${category.name}
                </button>
              `).join('')}
            </div>
            
            <h3>Popular Searches</h3>
            <div class="popular-searches">
              <button class="search-chip" onclick="Components.performSearch('organic')">Organic</button>
              <button class="search-chip" onclick="Components.performSearch('fresh')">Fresh</button>
              <button class="search-chip" onclick="Components.performSearch('apples')">Apples</button>
              <button class="search-chip" onclick="Components.performSearch('vegetables')">Vegetables</button>
              <button class="search-chip" onclick="Components.performSearch('dairy')">Dairy</button>
            </div>
          </div>
        `}
      </div>
    </div>
    
    <style>
      .search-screen {
        padding: var(--space-6) 0;
      }
      
      .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-8);
        gap: var(--space-4);
      }
      
      .search-form {
        flex: 1;
        position: relative;
        max-width: 600px;
      }
      
      .search-input-large {
        width: 100%;
        padding: var(--space-4) var(--space-6);
        padding-right: 60px;
        border: 2px solid var(--border-light);
        border-radius: var(--radius-xl);
        font-size: var(--font-size-lg);
        transition: border-color var(--transition-fast);
      }
      
      .search-input-large:focus {
        outline: none;
        border-color: var(--accent-orange);
      }
      
      .search-btn-large {
        position: absolute;
        right: var(--space-2);
        top: 50%;
        transform: translateY(-50%);
        background: var(--accent-orange);
        color: var(--white);
        border: none;
        border-radius: var(--radius-lg);
        padding: var(--space-3);
        cursor: pointer;
        transition: background var(--transition-fast);
      }
      
      .search-btn-large:hover {
        background: #e55a2b;
      }
      
      .search-results-header {
        margin-bottom: var(--space-6);
      }
      
      .search-results-header h2 {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
      }
      
      .search-results-header p {
        color: var(--text-secondary);
        margin: 0;
      }
      
      .search-suggestions h3 {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin: var(--space-8) 0 var(--space-4) 0;
        color: var(--text-primary);
      }
      
      .categories-quick,
      .popular-searches {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
      }
      
      .category-chip,
      .search-chip {
        background: var(--light-bg);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-full);
        padding: var(--space-2) var(--space-4);
        font-size: var(--font-size-sm);
        cursor: pointer;
        transition: all var(--transition-fast);
      }
      
      .category-chip:hover,
      .search-chip:hover {
        background: var(--accent-orange);
        color: var(--white);
        border-color: var(--accent-orange);
      }
      
      @media (max-width: 768px) {
        .search-header {
          flex-direction: column;
        }
        
        .search-form {
          max-width: none;
        }
      }
    </style>
  `;
};

Components.initSearchScreen = () => {
  const searchInput = document.getElementById('search-input-main');
  const searchBtn = document.getElementById('search-btn-main');
  
  const performSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      router.navigate('search', { q: query });
    }
  };
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Focus search input
  searchInput.focus();
};

Components.performSearch = (query) => {
  router.navigate('search', { q: query });
};

Components.showAdvancedSearch = () => {
  router.navigate('advanced-search');
};

// Advanced Search Screen Component
Components.AdvancedSearchScreen = () => {
  const categories = ProductData.getAllCategories();
  
  return `
    <div class="advanced-search-screen">
      <div class="container">
        <div class="search-layout">
          <div class="filters-sidebar">
            <div class="filters-header">
              <h2>Advanced Filters</h2>
              <button class="btn btn-ghost" onclick="Components.clearFilters()">Clear All</button>
            </div>
            
            <div class="filter-section">
              <h3 class="filter-title">Search</h3>
              <input 
                type="text" 
                class="form-input" 
                id="advanced-search-input"
                placeholder="Search products..."
              />
            </div>
            
            <div class="filter-section">
              <h3 class="filter-title">Categories</h3>
              <div class="filter-options">
                ${Object.entries(categories).map(([key, category]) => `
                  <label class="form-checkbox">
                    <input type="checkbox" name="category" value="${key}" />
                    <span>${category.icon} ${category.name}</span>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <div class="filter-section">
              <h3 class="filter-title">Price Range</h3>
              <div class="price-range">
                <input 
                  type="range" 
                  class="price-range-slider" 
                  id="price-min"
                  min="0" 
                  max="50" 
                  value="0"
                />
                <input 
                  type="range" 
                  class="price-range-slider" 
                  id="price-max"
                  min="0" 
                  max="50" 
                  value="50"
                />
                <div class="price-range-values">
                  <span id="price-min-value">$0</span>
                  <span id="price-max-value">$50</span>
                </div>
              </div>
            </div>
            
            <div class="filter-section">
              <h3 class="filter-title">Rating</h3>
              <div class="filter-options">
                <label class="form-checkbox">
                  <input type="radio" name="rating" value="4" />
                  <span>4+ Stars</span>
                </label>
                <label class="form-checkbox">
                  <input type="radio" name="rating" value="3" />
                  <span>3+ Stars</span>
                </label>
                <label class="form-checkbox">
                  <input type="radio" name="rating" value="0" checked />
                  <span>All Ratings</span>
                </label>
              </div>
            </div>
            
            <div class="filter-section">
              <h3 class="filter-title">Availability</h3>
              <div class="filter-options">
                <label class="form-checkbox">
                  <input type="checkbox" name="inStock" checked />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
            
            <button class="btn btn-primary btn-full" onclick="Components.applyAdvancedFilters()">
              Apply Filters
            </button>
          </div>
          
          <div class="search-results">
            <div class="search-results-header">
              <h2>All Products</h2>
              <select class="form-select" id="sort-select">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
            
            <div class="products-grid" id="filtered-products">
              ${ProductData.getAllProducts().map(product => Components.ProductCard(product)).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .advanced-search-screen {
        padding: var(--space-6) 0;
      }
      
      .search-layout {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: var(--space-8);
      }
      
      .filters-sidebar {
        background: var(--white);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        box-shadow: var(--shadow-card);
        height: fit-content;
        position: sticky;
        top: 100px;
      }
      
      .filters-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
        padding-bottom: var(--space-4);
        border-bottom: 1px solid var(--border-light);
      }
      
      .filters-header h2 {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin: 0;
        color: var(--text-primary);
      }
      
      .search-results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
      }
      
      .search-results-header h2 {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        margin: 0;
        color: var(--text-primary);
      }
      
      @media (max-width: 992px) {
        .search-layout {
          grid-template-columns: 1fr;
        }
        
        .filters-sidebar {
          position: static;
        }
      }
    </style>
  `;
};

Components.initAdvancedSearchScreen = () => {
  const priceMinSlider = document.getElementById('price-min');
  const priceMaxSlider = document.getElementById('price-max');
  const priceMinValue = document.getElementById('price-min-value');
  const priceMaxValue = document.getElementById('price-max-value');
  const sortSelect = document.getElementById('sort-select');
  
  // Update price range display
  const updatePriceRange = () => {
    const min = parseInt(priceMinSlider.value);
    const max = parseInt(priceMaxSlider.value);
    
    if (min >= max) {
      priceMinSlider.value = max - 1;
    }
    
    priceMinValue.textContent = `$${priceMinSlider.value}`;
    priceMaxValue.textContent = `$${priceMaxSlider.value}`;
  };
  
  priceMinSlider.addEventListener('input', updatePriceRange);
  priceMaxSlider.addEventListener('input', updatePriceRange);
  
  // Sort functionality
  sortSelect.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const products = ProductData.getAllProducts();
    const sortedProducts = ProductData.sortProducts(products, sortBy);
    
    const productsGrid = document.getElementById('filtered-products');
    productsGrid.innerHTML = sortedProducts.map(product => Components.ProductCard(product)).join('');
  });
  
  // Auto-apply filters on input change
  const filterInputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"], #advanced-search-input');
  filterInputs.forEach(input => {
    input.addEventListener('change', () => {
      setTimeout(() => Components.applyAdvancedFilters(), 100);
    });
  });
  
  const searchInput = document.getElementById('advanced-search-input');
  searchInput.addEventListener('input', ComponentUtils.debounce(() => {
    Components.applyAdvancedFilters();
  }, 300));
};

Components.applyAdvancedFilters = () => {
  const searchQuery = document.getElementById('advanced-search-input').value.trim();
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
  const minPrice = parseInt(document.getElementById('price-min').value);
  const maxPrice = parseInt(document.getElementById('price-max').value);
  const minRating = parseInt(document.querySelector('input[name="rating"]:checked').value);
  const inStockOnly = document.querySelector('input[name="inStock"]').checked;
  
  let products = ProductData.getAllProducts();
  
  // Apply search filter
  if (searchQuery) {
    products = ProductData.searchProducts(searchQuery);
  }
  
  // Apply category filter
  if (selectedCategories.length > 0) {
    products = products.filter(product => selectedCategories.includes(product.category));
  }
  
  // Apply price filter
  products = ProductData.filterByPriceRange(products, minPrice, maxPrice);
  
  // Apply rating filter
  if (minRating > 0) {
    products = products.filter(product => product.rating >= minRating);
  }
  
  // Apply stock filter
  if (inStockOnly) {
    products = products.filter(product => product.inStock);
  }
  
  // Update results
  const productsGrid = document.getElementById('filtered-products');
  const resultsHeader = document.querySelector('.search-results-header h2');
  
  resultsHeader.textContent = `${products.length} Products Found`;
  
  if (products.length > 0) {
    productsGrid.innerHTML = products.map(product => Components.ProductCard(product)).join('');
  } else {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No products match your filters</h3>
        <p class="empty-state-description">
          Try adjusting your search criteria or clearing some filters.
        </p>
        <button class="btn btn-primary" onclick="Components.clearFilters()">
          Clear Filters
        </button>
      </div>
    `;
  }
};

Components.clearFilters = () => {
  document.getElementById('advanced-search-input').value = '';
  document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
  document.getElementById('price-min').value = 0;
  document.getElementById('price-max').value = 50;
  document.querySelector('input[name="rating"][value="0"]').checked = true;
  document.querySelector('input[name="inStock"]').checked = true;
  
  // Update price display
  document.getElementById('price-min-value').textContent = '$0';
  document.getElementById('price-max-value').textContent = '$50';
  
  // Reapply filters
  Components.applyAdvancedFilters();
};

// Shopping Cart Screen Component
Components.CartScreen = () => {
  const cart = AppState.get('cart');
  const summary = AppState.cart.getCartSummary();
  
  if (cart.items.length === 0) {
    return `
      <div class="cart-screen">
        <div class="container">
          <div class="empty-state">
            <div class="empty-state-icon">🛒</div>
            <h2 class="empty-state-title">Your cart is empty</h2>
            <p class="empty-state-description">
              Add some fresh groceries to get started!
            </p>
            <button class="btn btn-primary" onclick="router.navigate('home')">
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="cart-screen">
      <div class="container">
        <div class="cart-header">
          <h1>Shopping Cart</h1>
          <p>${cart.itemCount} items in your cart</p>
        </div>
        
        <div class="cart-layout">
          <div class="cart-items">
            ${cart.items.map(item => `
              <div class="cart-item">
                <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}" />
                </div>
                
                <div class="cart-item-info">
                  <h3 class="cart-item-name">${item.name}</h3>
                  <p class="cart-item-price">${ComponentUtils.formatPrice(item.price)}/${item.unit}</p>
                  <div class="cart-item-rating">
                    <div class="stars">
                      ${ComponentUtils.generateStars(item.rating)}
                    </div>
                    <span class="rating-text">(${item.reviews})</span>
                  </div>
                </div>
                
                <div class="cart-item-controls">
                  <div class="quantity-selector">
                    <button class="quantity-btn" onclick="Components.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" readonly />
                    <button class="quantity-btn" onclick="Components.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                  </div>
                  
                  <div class="cart-item-total">
                    ${ComponentUtils.formatPrice(item.price * item.quantity)}
                  </div>
                  
                  <button class="btn btn-ghost btn-sm" onclick="Components.removeFromCart(${item.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="M19,6V20C19,20.5304 18.7893,21.0391 18.4142,21.4142C18.0391,21.7893 17.5304,22 17,22H7C6.46957,22 5.96086,21.7893 5.58579,21.4142C5.21071,21.0391 5,20.5304 5,20V6M8,6V4C8,3.46957 8.21071,2.96086 8.58579,2.58579C8.96086,2.21071 9.46957,2 10,2H14C14.5304,2 15.0391,2.21071 15.4142,2.58579C15.7893,2.96086 16,3.46957 16,4V6"></path>
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            `).join('')}
            
            <div class="cart-actions">
              <button class="btn btn-outline" onclick="AppState.cart.clearCart(); router.handleRouteChange();">
                Clear Cart
              </button>
              <button class="btn btn-ghost" onclick="router.navigate('home')">
                Continue Shopping
              </button>
            </div>
          </div>
          
          <div class="cart-summary">
            <div class="summary-card">
              <h3>Order Summary</h3>
              
              <div class="summary-line">
                <span>Subtotal (${summary.itemCount} items)</span>
                <span>${ComponentUtils.formatPrice(summary.subtotal)}</span>
              </div>
              
              <div class="summary-line">
                <span>Delivery Fee</span>
                <span>${summary.delivery === 0 ? 'FREE' : ComponentUtils.formatPrice(summary.delivery)}</span>
              </div>
              
              <div class="summary-line">
                <span>Tax</span>
                <span>${ComponentUtils.formatPrice(summary.tax)}</span>
              </div>
              
              ${summary.delivery === 0 ? '' : `
                <div class="delivery-notice">
                  <p>💡 Add ${ComponentUtils.formatPrice(35 - summary.subtotal)} more for free delivery!</p>
                </div>
              `}
              
              <div class="summary-total">
                <span>Total</span>
                <span>${ComponentUtils.formatPrice(summary.total)}</span>
              </div>
              
              <button class="btn btn-primary btn-full" onclick="Components.proceedToCheckout()">
                Proceed to Checkout
              </button>
              
              <div class="payment-methods">
                <p>We accept:</p>
                <div class="payment-icons">
                  <span>💳</span>
                  <span>🏦</span>
                  <span>📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .cart-screen {
        padding: var(--space-6) 0;
      }
      
      .cart-header {
        margin-bottom: var(--space-8);
      }
      
      .cart-header h1 {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
      }
      
      .cart-header p {
        color: var(--text-secondary);
        margin: 0;
      }
      
      .cart-layout {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: var(--space-8);
      }
      
      .cart-item {
        display: grid;
        grid-template-columns: 100px 1fr auto;
        gap: var(--space-4);
        padding: var(--space-6);
        background: var(--white);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-card);
        margin-bottom: var(--space-4);
      }
      
      .cart-item-image img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: var(--radius-lg);
      }
      
      .cart-item-name {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
      }
      
      .cart-item-price {
        color: var(--accent-orange);
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-2);
      }
      
      .cart-item-controls {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-3);
      }
      
      .cart-item-total {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      
      .cart-actions {
        display: flex;
        gap: var(--space-4);
        justify-content: center;
        margin-top: var(--space-6);
      }
      
      .summary-card {
        background: var(--white);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        box-shadow: var(--shadow-card);
        position: sticky;
        top: 100px;
      }
      
      .summary-card h3 {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-6);
        color: var(--text-primary);
      }
      
      .summary-line {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--space-3);
        color: var(--text-secondary);
      }
      
      .summary-total {
        display: flex;
        justify-content: space-between;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
        padding-top: var(--space-4);
        border-top: 2px solid var(--border-light);
        margin: var(--space-4) 0 var(--space-6) 0;
      }
      
      .delivery-notice {
        background: rgba(255, 107, 53, 0.1);
        border: 1px solid var(--accent-orange);
        border-radius: var(--radius-lg);
        padding: var(--space-3);
        margin: var(--space-4) 0;
      }
      
      .delivery-notice p {
        color: var(--accent-orange);
        font-size: var(--font-size-sm);
        margin: 0;
      }
      
      .payment-methods {
        text-align: center;
        margin-top: var(--space-6);
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-light);
      }
      
      .payment-methods p {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
        margin-bottom: var(--space-2);
      }
      
      .payment-icons {
        display: flex;
        justify-content: center;
        gap: var(--space-2);
        font-size: var(--font-size-lg);
      }
      
      @media (max-width: 768px) {
        .cart-layout {
          grid-template-columns: 1fr;
        }
        
        .cart-item {
          grid-template-columns: 80px 1fr;
          grid-template-rows: auto auto;
        }
        
        .cart-item-controls {
          grid-column: 1 / -1;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        
        .summary-card {
          position: static;
        }
      }
    </style>
  `;
};

Components.initCartScreen = () => {
  // Update cart count in header
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = AppState.get('cart.itemCount');
  }
};

Components.removeFromCart = (productId) => {
  AppState.cart.removeItem(productId);
  
  // Update cart count in header
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = AppState.get('cart.itemCount');
  }
  
  // Refresh the page
  router.handleRouteChange();
};

Components.proceedToCheckout = () => {
  const isAuthenticated = AppState.get('user.isAuthenticated');
  
  if (!isAuthenticated) {
    sessionStorage.setItem('intended_route', 'checkout-address');
    Components.showToast('Please sign in to continue with checkout', 'info');
    router.navigate('login');
  } else {
    router.navigate('checkout-address');
  }
};