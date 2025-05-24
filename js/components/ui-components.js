// UI Component Library for FreshCart
window.Components = window.Components || {};

// Utility functions for components
const ComponentUtils = {
  // Format price with currency
  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  },
  
  // Format date
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  },
  
  // Format time
  formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  },
  
  // Generate star rating HTML
  generateStars(rating, maxStars = 5) {
    let starsHtml = '';
    for (let i = 1; i <= maxStars; i++) {
      const filled = i <= rating;
      starsHtml += `
        <svg class="star ${filled ? 'filled' : ''}" width="16" height="16" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
      `;
    }
    return starsHtml;
  },
  
  // Truncate text
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
  
  // Debounce function
  debounce(func, wait) {
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
};

// Splash Screen Component
Components.SplashScreen = () => {
  return `
    <div class="splash-screen">
      <div class="splash-content">
        <div class="splash-logo">
          <div class="logo-animation">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
            </svg>
          </div>
          <h1 class="brand-title">FreshCart</h1>
          <p class="brand-tagline">Fresh groceries delivered to your door</p>
        </div>
        
        <div class="splash-loading">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading fresh products...</p>
        </div>
      </div>
    </div>
    
    <style>
      .splash-screen {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--primary-navy) 0%, #2d3748 100%);
        color: var(--white);
        text-align: center;
      }
      
      .splash-content {
        max-width: 400px;
        padding: var(--space-8);
      }
      
      .logo-animation {
        color: var(--accent-orange);
        margin-bottom: var(--space-4);
        animation: bounce 2s infinite;
      }
      
      .brand-title {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-2);
        color: var(--white);
      }
      
      .brand-tagline {
        font-size: var(--font-size-lg);
        color: #a0aec0;
        margin-bottom: var(--space-8);
      }
      
      .splash-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-4);
      }
      
      .loading-text {
        color: #a0aec0;
        font-size: var(--font-size-base);
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }
    </style>
  `;
};

Components.initSplashScreen = () => {
  // Auto-navigate to onboarding after 3 seconds
  setTimeout(() => {
    const isFirstVisit = !localStorage.getItem('freshcart_visited');
    if (isFirstVisit) {
      localStorage.setItem('freshcart_visited', 'true');
      router.navigate('onboarding');
    } else {
      router.navigate('home');
    }
  }, 3000);
};

// Onboarding Screen Component
Components.OnboardingScreen = () => {
  return `
    <div class="onboarding-screen">
      <div class="onboarding-container">
        <div class="onboarding-slides">
          <div class="slide active" data-slide="0">
            <div class="slide-image">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop" alt="Fresh Produce" />
            </div>
            <div class="slide-content">
              <h2>Fresh & Quality</h2>
              <p>Hand-picked fresh produce delivered straight from local farms to your doorstep.</p>
            </div>
          </div>
          
          <div class="slide" data-slide="1">
            <div class="slide-image">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" alt="Fast Delivery" />
            </div>
            <div class="slide-content">
              <h2>Fast Delivery</h2>
              <p>Get your groceries delivered in as little as 30 minutes with our express delivery service.</p>
            </div>
          </div>
          
          <div class="slide" data-slide="2">
            <div class="slide-image">
              <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop" alt="Best Prices" />
            </div>
            <div class="slide-content">
              <h2>Best Prices</h2>
              <p>Enjoy competitive prices and exclusive deals on all your favorite grocery items.</p>
            </div>
          </div>
        </div>
        
        <div class="slide-indicators">
          <button class="indicator active" data-slide="0"></button>
          <button class="indicator" data-slide="1"></button>
          <button class="indicator" data-slide="2"></button>
        </div>
        
        <div class="onboarding-actions">
          <button class="btn btn-outline" onclick="router.navigate('home')">Skip</button>
          <button class="btn btn-primary" id="next-btn">Next</button>
        </div>
      </div>
    </div>
    
    <style>
      .onboarding-screen {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--light-bg);
        padding: var(--space-4);
      }
      
      .onboarding-container {
        max-width: 400px;
        width: 100%;
        text-align: center;
      }
      
      .onboarding-slides {
        position: relative;
        height: 500px;
        margin-bottom: var(--space-6);
      }
      
      .slide {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transform: translateX(100%);
        transition: all var(--transition-normal);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .slide.active {
        opacity: 1;
        transform: translateX(0);
      }
      
      .slide-image {
        height: 300px;
        margin-bottom: var(--space-6);
        border-radius: var(--radius-xl);
        overflow: hidden;
      }
      
      .slide-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .slide-content h2 {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
        margin-bottom: var(--space-3);
      }
      
      .slide-content p {
        font-size: var(--font-size-base);
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
      }
      
      .slide-indicators {
        display: flex;
        justify-content: center;
        gap: var(--space-2);
        margin-bottom: var(--space-8);
      }
      
      .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        background: var(--border-medium);
        cursor: pointer;
        transition: background var(--transition-fast);
      }
      
      .indicator.active {
        background: var(--accent-orange);
      }
      
      .onboarding-actions {
        display: flex;
        gap: var(--space-4);
        justify-content: center;
      }
    </style>
  `;
};

Components.initOnboardingScreen = () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const nextBtn = document.getElementById('next-btn');
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    if (index === slides.length - 1) {
      nextBtn.textContent = 'Get Started';
      nextBtn.onclick = () => router.navigate('home');
    } else {
      nextBtn.textContent = 'Next';
      nextBtn.onclick = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      };
    }
  }
  
  // Add click handlers to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Auto-advance slides
  setInterval(() => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  }, 5000);
};

// Toast Notification Component
Components.showToast = (message, type = 'info', duration = 3000) => {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <p>${message}</p>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto-remove toast
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
};

// Modal Component
Components.showModal = (title, content, actions = []) => {
  const modalHtml = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" onclick="Components.closeModal()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        ${actions.length > 0 ? `
          <div class="modal-footer">
            ${actions.map(action => `
              <button class="btn ${action.class || 'btn-secondary'}" onclick="${action.onclick}">
                ${action.text}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  AppState.updateState('ui.modalOpen', true);
};

Components.closeModal = () => {
  const modal = document.getElementById('modal-overlay');
  if (modal) {
    modal.remove();
    AppState.updateState('ui.modalOpen', false);
  }
};

// Loading Component
Components.showLoading = (message = 'Loading...') => {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.innerHTML = `
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">${message}</p>
      </div>
    `;
    loadingOverlay.classList.remove('hidden');
  }
};

Components.hideLoading = () => {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
};

// Export utilities
window.ComponentUtils = ComponentUtils;