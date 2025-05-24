// Global application state management
class AppState {
  constructor() {
    this.state = {
      // User authentication
      user: {
        isAuthenticated: false,
        profile: null,
        preferences: {}
      },
      
      // Shopping cart
      cart: {
        items: [],
        total: 0,
        itemCount: 0
      },
      
      // Current view/route
      currentRoute: 'splash',
      routeParams: {},
      
      // Search and filters
      search: {
        query: '',
        filters: {
          category: '',
          priceRange: { min: 0, max: 100 },
          rating: 0,
          inStock: true
        },
        results: [],
        sortBy: 'popular'
      },
      
      // Order management
      orders: [],
      currentOrder: null,
      
      // UI state
      ui: {
        loading: false,
        sidebarOpen: false,
        modalOpen: false,
        notifications: []
      }
    };
    
    this.subscribers = [];
    this.loadFromStorage();
  }
  
  // Subscribe to state changes
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }
  
  // Notify all subscribers of state changes
  notify(changedKeys = []) {
    this.subscribers.forEach(callback => callback(this.state, changedKeys));
  }
  
  // Update state and notify subscribers
  setState(updates, changedKeys = []) {
    this.state = { ...this.state, ...updates };
    this.saveToStorage();
    this.notify(changedKeys);
  }
  
  // Deep update nested state
  updateState(path, value) {
    const keys = path.split('.');
    const newState = { ...this.state };
    let current = newState;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    this.state = newState;
    this.saveToStorage();
    this.notify([keys[0]]);
  }
  
  // Get current state
  getState() {
    return this.state;
  }
  
  // Get specific state value
  get(path) {
    const keys = path.split('.');
    let current = this.state;
    
    for (const key of keys) {
      if (current && typeof current === 'object') {
        current = current[key];
      } else {
        return undefined;
      }
    }
    
    return current;
  }
  
  // Save state to localStorage
  saveToStorage() {
    try {
      const persistentState = {
        user: this.state.user,
        cart: this.state.cart,
        orders: this.state.orders
      };
      localStorage.setItem('freshcart_state', JSON.stringify(persistentState));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  }
  
  // Load state from localStorage
  loadFromStorage() {
    try {
      const saved = localStorage.getItem('freshcart_state');
      if (saved) {
        const persistentState = JSON.parse(saved);
        this.state = { ...this.state, ...persistentState };
      }
    } catch (error) {
      console.warn('Failed to load state from localStorage:', error);
    }
  }
  
  // Clear all stored data
  clearStorage() {
    localStorage.removeItem('freshcart_state');
    this.state = {
      ...this.state,
      user: { isAuthenticated: false, profile: null, preferences: {} },
      cart: { items: [], total: 0, itemCount: 0 },
      orders: []
    };
    this.notify(['user', 'cart', 'orders']);
  }
}

// Cart management functions
class CartManager {
  constructor(appState) {
    this.state = appState;
  }
  
  // Add item to cart
  addItem(product, quantity = 1) {
    const cart = { ...this.state.get('cart') };
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        ...product,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    this.updateCartTotals(cart);
    this.state.updateState('cart', cart);
    
    // Show notification
    this.state.updateState('ui.notifications', [
      ...this.state.get('ui.notifications'),
      {
        id: Date.now(),
        type: 'success',
        message: `${product.name} added to cart`,
        duration: 3000
      }
    ]);
  }
  
  // Remove item from cart
  removeItem(productId) {
    const cart = { ...this.state.get('cart') };
    const item = cart.items.find(item => item.id === productId);
    
    if (item) {
      cart.items = cart.items.filter(item => item.id !== productId);
      this.updateCartTotals(cart);
      this.state.updateState('cart', cart);
      
      // Show notification
      this.state.updateState('ui.notifications', [
        ...this.state.get('ui.notifications'),
        {
          id: Date.now(),
          type: 'info',
          message: `${item.name} removed from cart`,
          duration: 3000
        }
      ]);
    }
  }
  
  // Update item quantity
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    
    const cart = { ...this.state.get('cart') };
    const item = cart.items.find(item => item.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.updateCartTotals(cart);
      this.state.updateState('cart', cart);
    }
  }
  
  // Clear entire cart
  clearCart() {
    this.state.updateState('cart', {
      items: [],
      total: 0,
      itemCount: 0
    });
  }
  
  // Calculate cart totals
  updateCartTotals(cart) {
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.total = Math.round(cart.total * 100) / 100; // Round to 2 decimal places
  }
  
  // Get cart summary
  getCartSummary() {
    const cart = this.state.get('cart');
    const subtotal = cart.total;
    const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
    const delivery = subtotal > 35 ? 0 : 4.99; // Free delivery over $35
    const total = Math.round((subtotal + tax + delivery) * 100) / 100;
    
    return {
      subtotal,
      tax,
      delivery,
      total,
      itemCount: cart.itemCount
    };
  }
}

// User authentication functions
class AuthManager {
  constructor(appState) {
    this.state = appState;
  }
  
  // Mock login
  login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate authentication
        const user = {
          id: 1,
          email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=ff6b35&color=fff`,
          addresses: [
            {
              id: 1,
              type: 'home',
              street: '123 Main St',
              city: 'San Francisco',
              state: 'CA',
              zip: '94102',
              isDefault: true
            }
          ],
          paymentMethods: [
            {
              id: 1,
              type: 'card',
              last4: '4242',
              brand: 'visa',
              isDefault: true
            }
          ]
        };
        
        this.state.updateState('user', {
          isAuthenticated: true,
          profile: user,
          preferences: {}
        });
        
        resolve({ success: true, user });
      }, 1000);
    });
  }
  
  // Mock registration
  register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: Date.now(),
          ...userData,
          avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=ff6b35&color=fff`,
          addresses: [],
          paymentMethods: []
        };
        
        this.state.updateState('user', {
          isAuthenticated: true,
          profile: user,
          preferences: {}
        });
        
        resolve({ success: true, user });
      }, 1000);
    });
  }
  
  // Logout
  logout() {
    this.state.updateState('user', {
      isAuthenticated: false,
      profile: null,
      preferences: {}
    });
  }
  
  // Update user profile
  updateProfile(updates) {
    const currentProfile = this.state.get('user.profile');
    this.state.updateState('user.profile', {
      ...currentProfile,
      ...updates
    });
  }
}

// Order management functions
class OrderManager {
  constructor(appState) {
    this.state = appState;
  }
  
  // Create new order
  createOrder(orderData) {
    const cart = this.state.get('cart');
    const user = this.state.get('user.profile');
    const summary = this.state.cart.getCartSummary();
    
    const order = {
      id: `ORD-${Date.now()}`,
      userId: user?.id,
      items: [...cart.items],
      summary,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'confirmed',
          timestamp: new Date().toISOString(),
          message: 'Order confirmed'
        }
      ]
    };
    
    const orders = [...this.state.get('orders'), order];
    this.state.updateState('orders', orders);
    this.state.updateState('currentOrder', order);
    
    // Clear cart after order
    this.state.cart.clearCart();
    
    return order;
  }
  
  // Update order status
  updateOrderStatus(orderId, status, message) {
    const orders = this.state.get('orders').map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          timeline: [
            ...order.timeline,
            {
              status,
              timestamp: new Date().toISOString(),
              message
            }
          ]
        };
      }
      return order;
    });
    
    this.state.updateState('orders', orders);
  }
  
  // Get order by ID
  getOrder(orderId) {
    return this.state.get('orders').find(order => order.id === orderId);
  }
  
  // Get user orders
  getUserOrders() {
    const userId = this.state.get('user.profile')?.id;
    return this.state.get('orders').filter(order => order.userId === userId);
  }
}

// Create global state instance
const appState = new AppState();

// Create manager instances
appState.cart = new CartManager(appState);
appState.auth = new AuthManager(appState);
appState.orders = new OrderManager(appState);

// Export for use in other modules
window.AppState = appState;