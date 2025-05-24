// Authentication Components for FreshCart
window.Components = window.Components || {};

// Login Screen Component
Components.LoginScreen = () => {
  return `
    <div class="auth-screen">
      <div class="auth-container">
        <div class="auth-header">
          <div class="auth-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
            </svg>
          </div>
          <h1>Welcome back!</h1>
          <p>Sign in to your FreshCart account</p>
        </div>
        
        <form class="auth-form" id="login-form">
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="form-input" 
              placeholder="Enter your email"
              required
            />
            <div class="form-error" id="email-error"></div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div class="password-input-container">
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="Enter your password"
                required
              />
              <button type="button" class="password-toggle" id="password-toggle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <div class="form-error" id="password-error"></div>
          </div>
          
          <div class="form-options">
            <label class="form-checkbox">
              <input type="checkbox" id="remember" name="remember" />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password" class="forgot-link">Forgot password?</a>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full" id="login-btn">
            <span class="btn-text">Sign In</span>
            <div class="btn-spinner hidden">
              <div class="loading-spinner"></div>
            </div>
          </button>
          
          <div class="form-divider">
            <span>or continue with</span>
          </div>
          
          <div class="social-login">
            <button type="button" class="btn btn-outline social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button" class="btn btn-outline social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
        </form>
        
        <div class="auth-footer">
          <p>Don't have an account? <a href="#register" onclick="router.navigate('register')">Sign up</a></p>
        </div>
      </div>
    </div>
    
    <style>
      .auth-screen {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--light-bg) 0%, #e2e8f0 100%);
        padding: var(--space-4);
      }
      
      .auth-container {
        background: var(--white);
        border-radius: var(--radius-2xl);
        box-shadow: var(--shadow-xl);
        padding: var(--space-8);
        width: 100%;
        max-width: 400px;
      }
      
      .auth-header {
        text-align: center;
        margin-bottom: var(--space-8);
      }
      
      .auth-logo {
        color: var(--accent-orange);
        margin-bottom: var(--space-4);
      }
      
      .auth-header h1 {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }
      
      .auth-header p {
        color: var(--text-secondary);
        margin-bottom: 0;
      }
      
      .password-input-container {
        position: relative;
      }
      
      .password-toggle {
        position: absolute;
        right: var(--space-3);
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: var(--space-1);
      }
      
      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
      }
      
      .forgot-link {
        color: var(--accent-orange);
        font-size: var(--font-size-sm);
        text-decoration: none;
      }
      
      .forgot-link:hover {
        text-decoration: underline;
      }
      
      .btn-spinner {
        width: 20px;
        height: 20px;
      }
      
      .btn-spinner .loading-spinner {
        width: 20px;
        height: 20px;
        border-width: 2px;
      }
      
      .form-divider {
        text-align: center;
        margin: var(--space-6) 0;
        position: relative;
        color: var(--text-muted);
        font-size: var(--font-size-sm);
      }
      
      .form-divider::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--border-light);
        z-index: 1;
      }
      
      .form-divider span {
        background: var(--white);
        padding: 0 var(--space-4);
        position: relative;
        z-index: 2;
      }
      
      .social-login {
        display: flex;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
      }
      
      .social-btn {
        flex: 1;
        justify-content: center;
      }
      
      .auth-footer {
        text-align: center;
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
      }
      
      .auth-footer a {
        color: var(--accent-orange);
        text-decoration: none;
        font-weight: var(--font-weight-medium);
      }
      
      .auth-footer a:hover {
        text-decoration: underline;
      }
    </style>
  `;
};

Components.initLoginScreen = () => {
  const form = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');
  const btnText = loginBtn.querySelector('.btn-text');
  const btnSpinner = loginBtn.querySelector('.btn-spinner');
  const passwordToggle = document.getElementById('password-toggle');
  const passwordInput = document.getElementById('password');
  
  // Password visibility toggle
  passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = type === 'password' ? 
      '<path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle>' :
      '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    
    passwordToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icon}</svg>`;
  });
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => error.textContent = '');
    document.querySelectorAll('.form-input').forEach(input => input.classList.remove('error'));
    
    // Validate form
    let hasErrors = false;
    
    if (!email) {
      document.getElementById('email-error').textContent = 'Email is required';
      document.getElementById('email').classList.add('error');
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email';
      document.getElementById('email').classList.add('error');
      hasErrors = true;
    }
    
    if (!password) {
      document.getElementById('password-error').textContent = 'Password is required';
      document.getElementById('password').classList.add('error');
      hasErrors = true;
    } else if (password.length < 6) {
      document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
      document.getElementById('password').classList.add('error');
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Show loading state
    loginBtn.disabled = true;
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    
    try {
      const result = await AppState.auth.login(email, password);
      
      if (result.success) {
        Components.showToast('Welcome back! Logged in successfully.', 'success');
        
        // Redirect to intended page or home
        const intendedRoute = sessionStorage.getItem('intended_route') || 'home';
        sessionStorage.removeItem('intended_route');
        router.navigate(intendedRoute);
      } else {
        Components.showToast('Invalid email or password. Please try again.', 'error');
      }
    } catch (error) {
      Components.showToast('Login failed. Please try again.', 'error');
    } finally {
      // Reset button state
      loginBtn.disabled = false;
      btnText.classList.remove('hidden');
      btnSpinner.classList.add('hidden');
    }
  });
  
  // Demo login button
  const demoBtn = document.createElement('button');
  demoBtn.type = 'button';
  demoBtn.className = 'btn btn-ghost btn-full';
  demoBtn.textContent = 'Try Demo Account';
  demoBtn.style.marginTop = 'var(--space-4)';
  
  demoBtn.addEventListener('click', () => {
    document.getElementById('email').value = 'demo@freshcart.com';
    document.getElementById('password').value = 'demo123';
  });
  
  form.appendChild(demoBtn);
};

// Register Screen Component
Components.RegisterScreen = () => {
  return `
    <div class="auth-screen">
      <div class="auth-container">
        <div class="auth-header">
          <div class="auth-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
            </svg>
          </div>
          <h1>Join FreshCart</h1>
          <p>Create your account to start shopping</p>
        </div>
        
        <form class="auth-form" id="register-form">
          <div class="form-group">
            <label class="form-label" for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              class="form-input" 
              placeholder="Enter your full name"
              required
            />
            <div class="form-error" id="name-error"></div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="form-input" 
              placeholder="Enter your email"
              required
            />
            <div class="form-error" id="email-error"></div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div class="password-input-container">
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="Create a password"
                required
              />
              <button type="button" class="password-toggle" id="password-toggle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <div class="form-help">Must be at least 8 characters with numbers and letters</div>
            <div class="form-error" id="password-error"></div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="confirm-password">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirmPassword" 
              class="form-input" 
              placeholder="Confirm your password"
              required
            />
            <div class="form-error" id="confirm-password-error"></div>
          </div>
          
          <div class="form-group">
            <label class="form-checkbox">
              <input type="checkbox" id="terms" name="terms" required />
              <span>I agree to the <a href="#terms" class="link">Terms of Service</a> and <a href="#privacy" class="link">Privacy Policy</a></span>
            </label>
            <div class="form-error" id="terms-error"></div>
          </div>
          
          <div class="form-group">
            <label class="form-checkbox">
              <input type="checkbox" id="newsletter" name="newsletter" />
              <span>Send me updates about new products and special offers</span>
            </label>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full" id="register-btn">
            <span class="btn-text">Create Account</span>
            <div class="btn-spinner hidden">
              <div class="loading-spinner"></div>
            </div>
          </button>
          
          <div class="form-divider">
            <span>or sign up with</span>
          </div>
          
          <div class="social-login">
            <button type="button" class="btn btn-outline social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button" class="btn btn-outline social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
        </form>
        
        <div class="auth-footer">
          <p>Already have an account? <a href="#login" onclick="router.navigate('login')">Sign in</a></p>
        </div>
      </div>
    </div>
  `;
};

Components.initRegisterScreen = () => {
  const form = document.getElementById('register-form');
  const registerBtn = document.getElementById('register-btn');
  const btnText = registerBtn.querySelector('.btn-text');
  const btnSpinner = registerBtn.querySelector('.btn-spinner');
  const passwordToggle = document.getElementById('password-toggle');
  const passwordInput = document.getElementById('password');
  
  // Password visibility toggle
  passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = type === 'password' ? 
      '<path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle>' :
      '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    
    passwordToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icon}</svg>`;
  });
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => error.textContent = '');
    document.querySelectorAll('.form-input').forEach(input => input.classList.remove('error'));
    
    // Validate form
    let hasErrors = false;
    
    if (!name || name.trim().length < 2) {
      document.getElementById('name-error').textContent = 'Please enter your full name';
      document.getElementById('name').classList.add('error');
      hasErrors = true;
    }
    
    if (!email) {
      document.getElementById('email-error').textContent = 'Email is required';
      document.getElementById('email').classList.add('error');
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email';
      document.getElementById('email').classList.add('error');
      hasErrors = true;
    }
    
    if (!password) {
      document.getElementById('password-error').textContent = 'Password is required';
      document.getElementById('password').classList.add('error');
      hasErrors = true;
    } else if (password.length < 8) {
      document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
      document.getElementById('password').classList.add('error');
      hasErrors = true;
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      document.getElementById('password-error').textContent = 'Password must contain both letters and numbers';
      document.getElementById('password').classList.add('error');
      hasErrors = true;
    }
    
    if (password !== confirmPassword) {
      document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
      document.getElementById('confirm-password').classList.add('error');
      hasErrors = true;
    }
    
    if (!terms) {
      document.getElementById('terms-error').textContent = 'You must agree to the terms and conditions';
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Show loading state
    registerBtn.disabled = true;
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    
    try {
      const result = await AppState.auth.register({
        name: name.trim(),
        email: email.trim(),
        password
      });
      
      if (result.success) {
        Components.showToast('Account created successfully! Welcome to FreshCart.', 'success');
        router.navigate('home');
      } else {
        Components.showToast('Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      Components.showToast('Registration failed. Please try again.', 'error');
    } finally {
      // Reset button state
      registerBtn.disabled = false;
      btnText.classList.remove('hidden');
      btnSpinner.classList.add('hidden');
    }
  });
};