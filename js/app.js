// Main Application Controller for FreshCart
class FreshCartApp {
  constructor() {
    this.initialized = false;
    this.init();
  }
  
  async init() {
    if (this.initialized) return;
    
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }
      
      // Initialize application components
      this.setupGlobalEventListeners();
      this.setupStateSubscriptions();
      this.setupNavigationHandlers();
      this.updateCartCount();
      this.setupNotificationSystem();
      
      // Initialize router now that all components are loaded
      router.init();
      
      // Hide loading overlay
      setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
          loadingOverlay.classList.add('hidden');
        }
      }, 1000);
      
      this.initialized = true;
      console.log('FreshCart application initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize FreshCart application:', error);
    }
  }
  
  setupGlobalEventListeners() {
    // Global search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
      const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
          router.navigate('search', { q: query });
        } else {
          router.navigate('search');
        }
      };
      
      searchBtn.addEventListener('click', performSearch);
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
      
      // Clear search when navigating away from search pages
      AppState.subscribe((state) => {
        const currentRoute = state.currentRoute;
        if (!['search', 'advanced-search'].includes(currentRoute)) {
          searchInput.value = '';
        }
      });
    }
    
    // Cart button functionality
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        router.navigate('cart');
      });
    }
    
    // Profile button functionality
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        const isAuthenticated = AppState.get('user.isAuthenticated');
        if (isAuthenticated) {
          router.navigate('profile');
        } else {
          router.navigate('login');
        }
      });
    }
    
    // Bottom navigation
    const bottomNavBtns = document.querySelectorAll('.bottom-nav-btn');
    bottomNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const route = btn.getAttribute('data-route');
        if (route) {
          router.navigate(route);
        }
      });
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape key to close modals
      if (e.key === 'Escape') {
        const modal = document.getElementById('modal-overlay');
        if (modal) {
          Components.closeModal();
        }
      }
      
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
        }
      }
    });
    
    // Handle clicks outside of dropdowns/modals
    document.addEventListener('click', (e) => {
      // Close any open dropdowns
      const dropdowns = document.querySelectorAll('.dropdown.open');
      dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      });
    });
  }
  
  setupStateSubscriptions() {
    // Subscribe to cart changes
    AppState.subscribe((state, changedKeys) => {
      if (changedKeys.includes('cart')) {
        this.updateCartCount();
      }
      
      if (changedKeys.includes('user')) {
        this.updateUserInterface();
      }
    });
  }
  
  setupNavigationHandlers() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      router.handleRouteChange();
    });
    
    // Handle link clicks with data-route attributes
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        const params = link.getAttribute('data-params');
        
        if (route) {
          router.navigate(route, params ? JSON.parse(params) : {});
        }
      }
    });
  }
  
  updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const count = AppState.get('cart.itemCount') || 0;
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'block' : 'none';
    }
  }
  
  updateUserInterface() {
    const user = AppState.get('user');
    const profileBtn = document.getElementById('profile-btn');
    
    if (profileBtn && user.isAuthenticated) {
      // Update profile button to show user avatar or initials
      const userProfile = user.profile;
      if (userProfile) {
        profileBtn.innerHTML = `
          <img src="${userProfile.avatar}" alt="${userProfile.name}" 
               style="width: 24px; height: 24px; border-radius: 50%;" />
        `;
      }
    }
  }
  
  setupNotificationSystem() {
    // Subscribe to notifications in state
    AppState.subscribe((state) => {
      const notifications = state.ui.notifications || [];
      
      notifications.forEach(notification => {
        if (!notification.shown) {
          Components.showToast(notification.message, notification.type, notification.duration);
          notification.shown = true;
        }
      });
      
      // Clean up old notifications
      const now = Date.now();
      const activeNotifications = notifications.filter(n => 
        now - n.id < (n.duration || 3000)
      );
      
      if (activeNotifications.length !== notifications.length) {
        AppState.updateState('ui.notifications', activeNotifications);
      }
    });
  }
  
  // Utility methods
  showError(message) {
    Components.showToast(message, 'error');
  }
  
  showSuccess(message) {
    Components.showToast(message, 'success');
  }
  
  showInfo(message) {
    Components.showToast(message, 'info');
  }
  
  // Handle app-wide errors
  handleError(error, context = '') {
    console.error(`FreshCart Error ${context}:`, error);
    
    let userMessage = 'Something went wrong. Please try again.';
    
    if (error.message) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        userMessage = 'Network error. Please check your connection.';
      } else if (error.message.includes('auth')) {
        userMessage = 'Authentication error. Please sign in again.';
      }
    }
    
    this.showError(userMessage);
  }
  
  // Show fallback content if router fails
  showFallbackContent() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h1>🛒 FreshCart</h1>
          <p>Welcome to FreshCart! We're having some technical difficulties.</p>
          <button onclick="window.location.reload()" style="padding: 10px 20px; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Reload Page
          </button>
        </div>
      `;
    }
  }
}

// Additional Components for Checkout and Order Management
window.Components = window.Components || {};

// Checkout Address Screen
Components.CheckoutAddressScreen = () => {
  const user = AppState.get('user.profile');
  const addresses = user?.addresses || [];
  
  return `
    <div class="checkout-screen">
      <div class="container">
        <div class="checkout-header">
          <h1>Delivery Address</h1>
          <div class="checkout-progress">
            <div class="progress-steps">
              <div class="progress-step active">
                <div class="step-circle">1</div>
                <span class="step-label">Address</span>
              </div>
              <div class="progress-step">
                <div class="step-circle">2</div>
                <span class="step-label">Payment</span>
              </div>
              <div class="progress-step">
                <div class="step-circle">3</div>
                <span class="step-label">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="checkout-layout">
          <div class="checkout-main">
            ${addresses.length > 0 ? `
              <div class="address-selection">
                <h3>Select Delivery Address</h3>
                <div class="address-list">
                  ${addresses.map((address, index) => `
                    <label class="address-card">
                      <input type="radio" name="address" value="${address.id}" ${address.isDefault ? 'checked' : ''} />
                      <div class="address-content">
                        <div class="address-header">
                          <span class="address-type">${address.type}</span>
                          ${address.isDefault ? '<span class="badge badge-primary">Default</span>' : ''}
                        </div>
                        <div class="address-details">
                          <p>${address.street}</p>
                          <p>${address.city}, ${address.state} ${address.zip}</p>
                        </div>
                      </div>
                    </label>
                  `).join('')}
                </div>
                
                <button class="btn btn-outline" onclick="Components.showAddAddressForm()">
                  + Add New Address
                </button>
              </div>
            ` : `
              <div class="address-form-section">
                <h3>Add Delivery Address</h3>
                ${Components.AddressForm()}
              </div>
            `}
            
            <div class="delivery-options">
              <h3>Delivery Options</h3>
              <div class="delivery-list">
                <label class="delivery-option">
                  <input type="radio" name="delivery" value="standard" checked />
                  <div class="delivery-content">
                    <div class="delivery-header">
                      <span class="delivery-name">Standard Delivery</span>
                      <span class="delivery-price">FREE</span>
                    </div>
                    <p class="delivery-time">Delivery in 2-4 hours</p>
                  </div>
                </label>
                
                <label class="delivery-option">
                  <input type="radio" name="delivery" value="express" />
                  <div class="delivery-content">
                    <div class="delivery-header">
                      <span class="delivery-name">Express Delivery</span>
                      <span class="delivery-price">$4.99</span>
                    </div>
                    <p class="delivery-time">Delivery in 30-60 minutes</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <div class="order-summary">
            ${Components.OrderSummaryCard()}
          </div>
        </div>
        
        <div class="checkout-actions">
          <button class="btn btn-outline" onclick="router.navigate('cart')">
            Back to Cart
          </button>
          <button class="btn btn-primary" onclick="Components.proceedToPayment()">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
    
    <style>
      .checkout-screen {
        padding: var(--space-6) 0;
      }
      
      .checkout-header {
        margin-bottom: var(--space-8);
      }
      
      .checkout-header h1 {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-4);
        color: var(--text-primary);
      }
      
      .address-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        margin-bottom: var(--space-6);
      }
      
      .address-card {
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        padding: var(--space-4);
        border: 2px solid var(--border-light);
        border-radius: var(--radius-lg);
        cursor: pointer;
        transition: border-color var(--transition-fast);
      }
      
      .address-card:has(input:checked) {
        border-color: var(--accent-orange);
        background: rgba(255, 107, 53, 0.05);
      }
      
      .address-content {
        flex: 1;
      }
      
      .address-header {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-bottom: var(--space-2);
      }
      
      .address-type {
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
        text-transform: capitalize;
      }
      
      .address-details p {
        color: var(--text-secondary);
        margin: 0;
        line-height: var(--line-height-normal);
      }
      
      .delivery-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }
      
      .delivery-option {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-4);
        border: 2px solid var(--border-light);
        border-radius: var(--radius-lg);
        cursor: pointer;
        transition: border-color var(--transition-fast);
      }
      
      .delivery-option:has(input:checked) {
        border-color: var(--accent-orange);
        background: rgba(255, 107, 53, 0.05);
      }
      
      .delivery-content {
        flex: 1;
      }
      
      .delivery-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-1);
      }
      
      .delivery-name {
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
      }
      
      .delivery-price {
        font-weight: var(--font-weight-bold);
        color: var(--accent-orange);
      }
      
      .delivery-time {
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
        margin: 0;
      }
      
      .checkout-actions {
        display: flex;
        justify-content: space-between;
        margin-top: var(--space-8);
        padding-top: var(--space-6);
        border-top: 1px solid var(--border-light);
      }
      
      @media (max-width: 768px) {
        .checkout-layout {
          grid-template-columns: 1fr;
        }
        
        .checkout-actions {
          flex-direction: column;
          gap: var(--space-3);
        }
      }
    </style>
  `;
};

// Address Form Component
Components.AddressForm = () => {
  return `
    <form class="address-form" id="address-form">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="address-type">Address Type</label>
          <select class="form-select" id="address-type" name="type" required>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="street">Street Address</label>
        <input type="text" class="form-input" id="street" name="street" 
               placeholder="123 Main Street" required />
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="city">City</label>
          <input type="text" class="form-input" id="city" name="city" 
                 placeholder="San Francisco" required />
        </div>
        
        <div class="form-group">
          <label class="form-label" for="state">State</label>
          <select class="form-select" id="state" name="state" required>
            <option value="">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="zip">ZIP Code</label>
          <input type="text" class="form-input" id="zip" name="zip" 
                 placeholder="94102" required />
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-checkbox">
          <input type="checkbox" name="isDefault" />
          <span>Set as default address</span>
        </label>
      </div>
      
      <button type="submit" class="btn btn-primary">
        Save Address
      </button>
    </form>
  `;
};

// Order Summary Card Component
Components.OrderSummaryCard = () => {
  const summary = AppState.cart.getCartSummary();
  
  return `
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
      
      <div class="summary-total">
        <span>Total</span>
        <span>${ComponentUtils.formatPrice(summary.total)}</span>
      </div>
    </div>
  `;
};

// Initialize checkout components
Components.initCheckoutAddressScreen = () => {
  const addressForm = document.getElementById('address-form');
  if (addressForm) {
    addressForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Handle address form submission
      Components.showToast('Address saved successfully!', 'success');
    });
  }
};

Components.proceedToPayment = () => {
  router.navigate('checkout-payment');
};

Components.showAddAddressForm = () => {
  Components.showModal('Add New Address', Components.AddressForm(), [
    {
      text: 'Cancel',
      class: 'btn-outline',
      onclick: 'Components.closeModal()'
    },
    {
      text: 'Save Address',
      class: 'btn-primary',
      onclick: 'Components.saveNewAddress()'
    }
  ]);
};

Components.saveNewAddress = () => {
  // Handle saving new address
  Components.showToast('Address saved successfully!', 'success');
  Components.closeModal();
};

// Checkout Payment Screen
Components.CheckoutPaymentScreen = () => {
  const summary = AppState.cart.getCartSummary();
  
  return `
    <div class="checkout-screen">
      <div class="container">
        <div class="checkout-header">
          <h1>Payment & Confirmation</h1>
          <div class="checkout-progress">
            <div class="progress-steps">
              <div class="progress-step completed">
                <div class="step-circle">✓</div>
                <span class="step-label">Address</span>
              </div>
              <div class="progress-step active">
                <div class="step-circle">2</div>
                <span class="step-label">Payment</span>
              </div>
              <div class="progress-step">
                <div class="step-circle">3</div>
                <span class="step-label">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="checkout-layout">
          <div class="checkout-main">
            <div class="payment-methods">
              <h3>Payment Method</h3>
              <div class="payment-options">
                <label class="payment-option">
                  <input type="radio" name="payment" value="card" checked />
                  <div class="payment-content">
                    <div class="payment-icon">💳</div>
                    <span>Credit/Debit Card</span>
                  </div>
                </label>
                
                <label class="payment-option">
                  <input type="radio" name="payment" value="paypal" />
                  <div class="payment-content">
                    <div class="payment-icon">🏦</div>
                    <span>PayPal</span>
                  </div>
                </label>
                
                <label class="payment-option">
                  <input type="radio" name="payment" value="apple" />
                  <div class="payment-content">
                    <div class="payment-icon">📱</div>
                    <span>Apple Pay</span>
                  </div>
                </label>
              </div>
            </div>
            
            <div class="card-form" id="card-form">
              <h3>Card Information</h3>
              <form id="payment-form">
                <div class="form-group">
                  <label class="form-label" for="card-number">Card Number</label>
                  <input type="text" class="form-input" id="card-number" 
                         placeholder="1234 5678 9012 3456" maxlength="19" />
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label" for="expiry">Expiry Date</label>
                    <input type="text" class="form-input" id="expiry" 
                           placeholder="MM/YY" maxlength="5" />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label" for="cvv">CVV</label>
                    <input type="text" class="form-input" id="cvv" 
                           placeholder="123" maxlength="4" />
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="cardholder">Cardholder Name</label>
                  <input type="text" class="form-input" id="cardholder" 
                         placeholder="John Doe" />
                </div>
                
                <div class="form-group">
                  <label class="form-checkbox">
                    <input type="checkbox" name="save-card" />
                    <span>Save this card for future purchases</span>
                  </label>
                </div>
              </form>
            </div>
            
            <div class="order-notes">
              <h3>Special Instructions (Optional)</h3>
              <textarea class="form-textarea" placeholder="Add any special delivery instructions..."></textarea>
            </div>
          </div>
          
          <div class="order-summary">
            ${Components.OrderSummaryCard()}
            
            <div class="order-items">
              <h4>Items in your order</h4>
              <div class="order-items-list">
                ${AppState.get('cart.items').map(item => `
                  <div class="order-item">
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="order-item-info">
                      <span class="item-name">${item.name}</span>
                      <span class="item-quantity">Qty: ${item.quantity}</span>
                    </div>
                    <span class="item-total">${ComponentUtils.formatPrice(item.price * item.quantity)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
        
        <div class="checkout-actions">
          <button class="btn btn-outline" onclick="router.navigate('checkout-address')">
            Back to Address
          </button>
          <button class="btn btn-primary btn-lg" onclick="Components.placeOrder()">
            Place Order - ${ComponentUtils.formatPrice(summary.total)}
          </button>
        </div>
      </div>
    </div>
    
    <style>
      .payment-options {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
      }
      
      .payment-option {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-4);
        border: 2px solid var(--border-light);
        border-radius: var(--radius-lg);
        cursor: pointer;
        transition: border-color var(--transition-fast);
      }
      
      .payment-option:has(input:checked) {
        border-color: var(--accent-orange);
        background: rgba(255, 107, 53, 0.05);
      }
      
      .payment-content {
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }
      
      .payment-icon {
        font-size: var(--font-size-xl);
      }
      
      .order-items {
        margin-top: var(--space-6);
        padding-top: var(--space-6);
        border-top: 1px solid var(--border-light);
      }
      
      .order-items h4 {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-4);
        color: var(--text-primary);
      }
      
      .order-items-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }
      
      .order-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }
      
      .order-item img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: var(--radius-md);
      }
      
      .order-item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .item-name {
        font-weight: var(--font-weight-medium);
        color: var(--text-primary);
        font-size: var(--font-size-sm);
      }
      
      .item-quantity {
        color: var(--text-muted);
        font-size: var(--font-size-xs);
      }
      
      .item-total {
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
        font-size: var(--font-size-sm);
      }
    </style>
  `;
};

Components.initCheckoutPaymentScreen = () => {
  // Format card number input
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
  }
  
  // Format expiry date input
  const expiryInput = document.getElementById('expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }
  
  // CVV input validation
  const cvvInput = document.getElementById('cvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
};

Components.placeOrder = async () => {
  // Show loading state
  Components.showLoading('Processing your order...');
  
  try {
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order
    const orderData = {
      address: { /* selected address */ },
      paymentMethod: { /* selected payment method */ }
    };
    
    const order = AppState.orders.createOrder(orderData);
    
    Components.hideLoading();
    Components.showToast('Order placed successfully!', 'success');
    
    // Navigate to order confirmation
    router.navigate(`order-status/${order.id}`);
    
  } catch (error) {
    Components.hideLoading();
    Components.showToast('Failed to place order. Please try again.', 'error');
  }
};

// Order History Screen
Components.OrderHistoryScreen = () => {
  const orders = AppState.orders.getUserOrders();
  
  return `
    <div class="order-history-screen">
      <div class="container">
        <div class="page-header">
          <h1>Order History</h1>
          <p>Track your past and current orders</p>
        </div>
        
        ${orders.length > 0 ? `
          <div class="orders-list">
            ${orders.map(order => `
              <div class="order-card" onclick="router.navigate('order-status/${order.id}')">
                <div class="order-header">
                  <div class="order-info">
                    <h3 class="order-id">${order.id}</h3>
                    <p class="order-date">${ComponentUtils.formatDate(order.createdAt)}</p>
                  </div>
                  <div class="order-status">
                    <span class="badge badge-${order.status}">${order.status}</span>
                  </div>
                </div>
                
                <div class="order-items">
                  ${order.items.slice(0, 3).map(item => `
                    <div class="order-item-preview">
                      <img src="${item.image}" alt="${item.name}" />
                      <span>${item.name} x${item.quantity}</span>
                    </div>
                  `).join('')}
                  ${order.items.length > 3 ? `<span class="more-items">+${order.items.length - 3} more</span>` : ''}
                </div>
                
                <div class="order-footer">
                  <span class="order-total">${ComponentUtils.formatPrice(order.summary.total)}</span>
                  <button class="btn btn-outline btn-sm">View Details</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📦</div>
            <h2 class="empty-state-title">No orders yet</h2>
            <p class="empty-state-description">
              Start shopping to see your orders here.
            </p>
            <button class="btn btn-primary" onclick="router.navigate('home')">
              Start Shopping
            </button>
          </div>
        `}
      </div>
    </div>
    
    <style>
      .order-history-screen {
        padding: var(--space-6) 0;
      }
      
      .page-header {
        margin-bottom: var(--space-8);
      }
      
      .page-header h1 {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
      }
      
      .page-header p {
        color: var(--text-secondary);
        margin: 0;
      }
      
      .orders-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
      
      .order-card {
        background: var(--white);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        box-shadow: var(--shadow-card);
        cursor: pointer;
        transition: all var(--transition-normal);
      }
      
      .order-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }
      
      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-4);
      }
      
      .order-id {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-1);
        color: var(--text-primary);
      }
      
      .order-date {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
        margin: 0;
      }
      
      .order-items {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        margin-bottom: var(--space-4);
        flex-wrap: wrap;
      }
      
      .order-item-preview {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
      }
      
      .order-item-preview img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: var(--radius-md);
      }
      
      .more-items {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
      }
      
      .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .order-total {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--accent-orange);
      }
      
      .badge-confirmed { background: var(--success); }
      .badge-preparing { background: var(--warning); }
      .badge-delivered { background: var(--info); }
    </style>
  `;
};

// Order Status Screen
Components.OrderStatusScreen = (params) => {
  const order = AppState.orders.getOrder(params.id);
  
  if (!order) {
    return `
      <div class="container">
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <h2 class="empty-state-title">Order Not Found</h2>
          <p class="empty-state-description">
            The order you're looking for doesn't exist.
          </p>
          <button class="btn btn-primary" onclick="router.navigate('order-history')">
            View Order History
          </button>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="order-status-screen">
      <div class="container">
        <div class="order-header">
          <h1>Order ${order.id}</h1>
          <span class="badge badge-${order.status}">${order.status}</span>
        </div>
        
        <div class="order-timeline">
          <h3>Order Timeline</h3>
          <div class="timeline">
            ${order.timeline.map(event => `
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h4>${event.message}</h4>
                  <p>${ComponentUtils.formatDate(event.timestamp)} at ${ComponentUtils.formatTime(event.timestamp)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="order-details">
          <h3>Order Details</h3>
          <div class="order-items">
            ${order.items.map(item => `
              <div class="order-item">
                <img src="${item.image}" alt="${item.name}" />
                <div class="item-info">
                  <h4>${item.name}</h4>
                  <p>${ComponentUtils.formatPrice(item.price)}/${item.unit}</p>
                </div>
                <div class="item-quantity">Qty: ${item.quantity}</div>
                <div class="item-total">${ComponentUtils.formatPrice(item.price * item.quantity)}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="order-summary">
            <div class="summary-line">
              <span>Subtotal</span>
              <span>${ComponentUtils.formatPrice(order.summary.subtotal)}</span>
            </div>
            <div class="summary-line">
              <span>Delivery</span>
              <span>${order.summary.delivery === 0 ? 'FREE' : ComponentUtils.formatPrice(order.summary.delivery)}</span>
            </div>
            <div class="summary-line">
              <span>Tax</span>
              <span>${ComponentUtils.formatPrice(order.summary.tax)}</span>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>${ComponentUtils.formatPrice(order.summary.total)}</span>
            </div>
          </div>
        </div>
        
        <div class="order-actions">
          <button class="btn btn-outline" onclick="router.navigate('order-history')">
            Back to Orders
          </button>
          <button class="btn btn-primary" onclick="router.navigate('order-tracking')">
            Track Delivery
          </button>
        </div>
      </div>
    </div>
    
    <style>
      .order-status-screen {
        padding: var(--space-6) 0;
      }
      
      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-8);
      }
      
      .order-header h1 {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
      }
      
      .timeline {
        position: relative;
        padding-left: var(--space-8);
      }
      
      .timeline::before {
        content: '';
        position: absolute;
        left: 15px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--border-light);
      }
      
      .timeline-item {
        position: relative;
        margin-bottom: var(--space-6);
      }
      
      .timeline-marker {
        position: absolute;
        left: -23px;
        top: 0;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--accent-orange);
        border: 3px solid var(--white);
        box-shadow: 0 0 0 2px var(--accent-orange);
      }
      
      .timeline-content h4 {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-1);
        color: var(--text-primary);
      }
      
      .timeline-content p {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
        margin: 0;
      }
      
      .order-details {
        margin: var(--space-8) 0;
      }
      
      .order-details h3 {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-4);
        color: var(--text-primary);
      }
      
      .order-item {
        display: grid;
        grid-template-columns: 60px 1fr auto auto;
        gap: var(--space-4);
        align-items: center;
        padding: var(--space-4);
        border-bottom: 1px solid var(--border-light);
      }
      
      .order-item img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: var(--radius-lg);
      }
      
      .item-info h4 {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-1);
        color: var(--text-primary);
      }
      
      .item-info p {
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
        margin: 0;
      }
      
      .item-quantity {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
      }
      
      .item-total {
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
      }
      
      .order-actions {
        display: flex;
        gap: var(--space-4);
        justify-content: center;
        margin-top: var(--space-8);
      }
    </style>
  `;
};

// Placeholder components for remaining screens
Components.OrderTrackingScreen = () => {
  return `
    <div class="container">
      <div class="empty-state">
        <div class="empty-state-icon">🚚</div>
        <h2 class="empty-state-title">Order Tracking</h2>
        <p class="empty-state-description">
          Real-time delivery tracking coming soon!
        </p>
        <button class="btn btn-primary" onclick="router.navigate('order-history')">
          View Orders
        </button>
      </div>
    </div>
  `;
};

Components.LiveMapScreen = () => {
  return `
    <div class="container">
      <div class="empty-state">
        <div class="empty-state-icon">🗺️</div>
        <h2 class="empty-state-title">Live Map</h2>
        <p class="empty-state-description">
          Live delivery map integration coming soon!
        </p>
        <button class="btn btn-primary" onclick="router.navigate('order-history')">
          View Orders
        </button>
      </div>
    </div>
  `;
};

Components.ProfileScreen = () => {
  const user = AppState.get('user.profile');
  
  return `
    <div class="container">
      <div class="profile-screen">
        <div class="profile-header">
          <img src="${user?.avatar}" alt="${user?.name}" class="profile-avatar" />
          <div class="profile-info">
            <h1>${user?.name}</h1>
            <p>${user?.email}</p>
          </div>
          <button class="btn btn-outline" onclick="AppState.auth.logout(); router.navigate('home');">
            Sign Out
          </button>
        </div>
        
        <div class="profile-sections">
          <div class="profile-section">
            <h3>Quick Actions</h3>
            <div class="quick-actions">
              <button class="btn btn-ghost" onclick="router.navigate('order-history')">
                📦 Order History
              </button>
              <button class="btn btn-ghost" onclick="router.navigate('cart')">
                🛒 Shopping Cart
              </button>
              <button class="btn btn-ghost" onclick="router.navigate('home')">
                🏠 Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .profile-screen {
        padding: var(--space-6) 0;
      }
      
      .profile-header {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
        padding: var(--space-6);
        background: var(--white);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-card);
      }
      
      .profile-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .profile-info {
        flex: 1;
      }
      
      .profile-info h1 {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-1);
        color: var(--text-primary);
      }
      
      .profile-info p {
        color: var(--text-secondary);
        margin: 0;
      }
      
      .profile-section {
        background: var(--white);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        box-shadow: var(--shadow-card);
      }
      
      .profile-section h3 {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-4);
        color: var(--text-primary);
      }
      
      .quick-actions {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }
      
      .quick-actions .btn {
        justify-content: flex-start;
        text-align: left;
      }
    </style>
  `;
};

// Initialize the application
const app = new FreshCartApp();

// Export for global access
window.FreshCartApp = app;
