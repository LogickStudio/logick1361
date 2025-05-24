// Single Page Application Router
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.defaultRoute = 'splash';
    
    // Bind event handlers
    this.handleHashChange = this.handleHashChange.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    
    // Listen for route changes
    window.addEventListener('hashchange', this.handleHashChange);
    window.addEventListener('popstate', this.handlePopState);
    
    // Initialize routes
    this.initializeRoutes();
  }
  
  // Define all application routes
  initializeRoutes() {
    this.addRoute('splash', {
      component: 'SplashScreen',
      title: 'FreshCart - Fresh Groceries Delivered',
      requiresAuth: false
    });
    
    this.addRoute('onboarding', {
      component: 'OnboardingScreen',
      title: 'Welcome to FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('register', {
      component: 'RegisterScreen',
      title: 'Sign Up - FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('login', {
      component: 'LoginScreen',
      title: 'Sign In - FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('home', {
      component: 'HomeScreen',
      title: 'Shop Fresh Groceries - FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('product/:id', {
      component: 'ProductDetailScreen',
      title: 'Product Details - FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('category/:name', {
      component: 'CategoryScreen',
      title: 'Browse Category - FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('search', {
      component: 'SearchScreen',
      title: 'Search Products - FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('advanced-search', {
      component: 'AdvancedSearchScreen',
      title: 'Advanced Search - FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('cart', {
      component: 'CartScreen',
      title: 'Shopping Cart - FreshCart',
      requiresAuth: false
    });
    
    this.addRoute('checkout-address', {
      component: 'CheckoutAddressScreen',
      title: 'Delivery Address - FreshCart',
      requiresAuth: true
    });
    
    this.addRoute('checkout-payment', {
      component: 'CheckoutPaymentScreen',
      title: 'Payment & Confirmation - FreshCart',
      requiresAuth: true
    });
    
    this.addRoute('order-history', {
      component: 'OrderHistoryScreen',
      title: 'Order History - FreshCart',
      requiresAuth: true
    });
    
    this.addRoute('order-tracking', {
      component: 'OrderTrackingScreen',
      title: 'Track Your Order - FreshCart',
      requiresAuth: true
    });
    
    this.addRoute('live-map', {
      component: 'LiveMapScreen',
      title: 'Live Delivery Tracking - FreshCart',
      requiresAuth: true
    });
    
    this.addRoute('order-status/:id', {
      component: 'OrderStatusScreen',
      title: 'Order Status - FreshCart',
      requiresAuth: true
    });
    
    this.addRoute('profile', {
      component: 'ProfileScreen',
      title: 'My Profile - FreshCart',
      requiresAuth: true
    });
  }
  
  // Add a new route
  addRoute(path, config) {
    this.routes.set(path, config);
  }
  
  // Navigate to a route
  navigate(path, params = {}) {
    const hash = this.buildHash(path, params);
    window.location.hash = hash;
  }
  
  // Build hash string from path and parameters
  buildHash(path, params = {}) {
    let hash = path;
    
    // Replace path parameters
    Object.keys(params).forEach(key => {
      hash = hash.replace(`:${key}`, params[key]);
    });
    
    return hash;
  }
  
  // Parse current hash
  parseHash() {
    const hash = window.location.hash.slice(1) || this.defaultRoute;
    const [path, ...queryParts] = hash.split('?');
    const query = this.parseQuery(queryParts.join('?'));
    
    // Extract route parameters
    const { route, params } = this.matchRoute(path);
    
    return { route, params, query, fullPath: hash };
  }
  
  // Match path to route pattern
  matchRoute(path) {
    for (const [routePattern, config] of this.routes) {
      const params = this.extractParams(routePattern, path);
      if (params !== null) {
        return { route: routePattern, params, config };
      }
    }
    
    // Default route if no match
    return { 
      route: this.defaultRoute, 
      params: {}, 
      config: this.routes.get(this.defaultRoute) 
    };
  }
  
  // Extract parameters from route pattern
  extractParams(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    
    if (patternParts.length !== pathParts.length) {
      return null;
    }
    
    const params = {};
    
    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];
      
      if (patternPart.startsWith(':')) {
        // Parameter
        const paramName = patternPart.slice(1);
        params[paramName] = decodeURIComponent(pathPart);
      } else if (patternPart !== pathPart) {
        // Literal part doesn't match
        return null;
      }
    }
    
    return params;
  }
  
  // Parse query string
  parseQuery(queryString) {
    const query = {};
    if (!queryString) return query;
    
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        query[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    });
    
    return query;
  }
  
  // Handle hash change events
  handleHashChange() {
    this.handleRouteChange();
  }
  
  // Handle popstate events
  handlePopState() {
    this.handleRouteChange();
  }
  
  // Handle route changes
  async handleRouteChange() {
    const { route, params, query, config } = this.parseHash();
    
    // Check authentication requirements
    if (config?.requiresAuth && !AppState.get('user.isAuthenticated')) {
      this.navigate('login');
      return;
    }
    
    // Update application state
    AppState.updateState('currentRoute', route);
    AppState.updateState('routeParams', params);
    
    // Update page title
    if (config?.title) {
      document.title = config.title;
    }
    
    // Update navigation state
    this.updateNavigation(route);
    
    // Render the component
    await this.renderComponent(config?.component, params, query);
    
    this.currentRoute = { route, params, query, config };
  }
  
  // Update navigation active states
  updateNavigation(route) {
    // Update bottom navigation
    const bottomNavBtns = document.querySelectorAll('.bottom-nav-btn');
    bottomNavBtns.forEach(btn => {
      btn.classList.remove('active');
      const btnRoute = btn.getAttribute('data-route');
      if (btnRoute === route || (btnRoute === 'home' && route === 'splash')) {
        btn.classList.add('active');
      }
    });
    
    // Show/hide navigation based on route
    const header = document.getElementById('main-header');
    const bottomNav = document.getElementById('bottom-nav');
    
    const hideNavRoutes = ['splash', 'onboarding', 'login', 'register'];
    
    if (hideNavRoutes.includes(route)) {
      header?.classList.add('hidden');
      bottomNav?.classList.add('hidden');
    } else {
      header?.classList.remove('hidden');
      bottomNav?.classList.remove('hidden');
    }
  }
  
  // Render component for current route
  async renderComponent(componentName, params, query) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    // Show loading state
    AppState.updateState('ui.loading', true);
    
    try {
      // Get component renderer
      const renderer = window.Components?.[componentName];
      
      if (renderer && typeof renderer === 'function') {
        const html = await renderer(params, query);
        mainContent.innerHTML = html;
        
        // Initialize component-specific functionality
        const initFunction = window.Components?.[`init${componentName}`];
        if (initFunction && typeof initFunction === 'function') {
          initFunction(params, query);
        }
      } else {
        // Fallback for missing components
        mainContent.innerHTML = `
          <div class="container">
            <div class="empty-state">
              <div class="empty-state-icon">🚧</div>
              <h2 class="empty-state-title">Coming Soon</h2>
              <p class="empty-state-description">
                This feature is currently under development.
              </p>
              <button class="btn btn-primary" onclick="router.navigate('home')">
                Go Home
              </button>
            </div>
          </div>
        `;
      }
    } catch (error) {
      console.error('Error rendering component:', error);
      mainContent.innerHTML = `
        <div class="container">
          <div class="empty-state">
            <div class="empty-state-icon">❌</div>
            <h2 class="empty-state-title">Something went wrong</h2>
            <p class="empty-state-description">
              We encountered an error while loading this page.
            </p>
            <button class="btn btn-primary" onclick="router.navigate('home')">
              Go Home
            </button>
          </div>
        </div>
      `;
    } finally {
      AppState.updateState('ui.loading', false);
    }
  }
  
  // Get current route information
  getCurrentRoute() {
    return this.currentRoute;
  }
  
  // Check if current route matches pattern
  isCurrentRoute(pattern) {
    return this.currentRoute?.route === pattern;
  }
  
  // Go back in history
  goBack() {
    window.history.back();
  }
  
  // Go forward in history
  goForward() {
    window.history.forward();
  }
  
  // Replace current route without adding to history
  replace(path, params = {}) {
    const hash = this.buildHash(path, params);
    window.location.replace(`#${hash}`);
  }
  
  // Initialize router
  init() {
    // Handle initial route
    this.handleRouteChange();
  }
}

// Create global router instance
const router = new Router();

// Export for use in other modules
window.router = router;

// Router initialization moved to app.js to ensure components are loaded first
