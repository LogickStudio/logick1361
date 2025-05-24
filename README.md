# 🛒 FreshCart - Fresh Groceries Delivered

A fully functional, responsive grocery delivery web application built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

### 📱 16 Complete Screens/Sections
1. **Splash Screen** - Animated brand logo with loading
2. **Onboarding** - Welcome carousel with value propositions
3. **Registration** - Complete sign-up form with validation
4. **Login** - Sign-in with social login options
5. **Home/Browse** - Product grid with categories
6. **Product Detail** - Individual item pages with reviews
7. **Category View** - Filtered product listings
8. **Search Results** - Real-time product search
9. **Advanced Search** - Filter sidebar with price range
10. **Order History** - Past orders with tracking
11. **Order Tracking** - Real-time delivery status
12. **Live Map** - Delivery route visualization
13. **Order Status Detail** - Expanded tracking info
14. **Shopping Cart** - Item management with totals
15. **Checkout - Address** - Delivery address selection
16. **Checkout - Payment** - Payment form and confirmation

### 🎨 Design Features
- **Modern UI/UX** - Clean, contemporary design with card-based layouts
- **Responsive Design** - Mobile-first approach with breakpoints
- **Color Scheme** - Primary navy (#1a202c) and accent orange (#ff6b35)
- **Typography** - Inter font family with proper hierarchy
- **Animations** - Smooth transitions and micro-interactions
- **Accessibility** - Proper contrast, semantic HTML, keyboard navigation

### 🛍️ Shopping Features
- **Product Catalog** - 18+ sample products across 5 categories
- **Smart Search** - Real-time filtering and advanced search options
- **Shopping Cart** - Add/remove items with quantity controls
- **Price Calculations** - Running totals with tax and delivery fees
- **Mock Authentication** - User registration and login simulation
- **Order Management** - Order history and status tracking

### 📦 Product Categories
- **Fresh Fruits** - Apples, oranges, strawberries, grapefruits, bananas
- **Vegetables** - Carrots, spinach, bell peppers, broccoli
- **Citrus Collection** - Meyer lemons, key limes, blood oranges
- **Dairy Products** - Organic milk, Greek yogurt, artisan cheeses
- **Fresh Bakery** - Sourdough bread, croissants, blueberry muffins

## 🚀 Technical Architecture

### Frontend Stack
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with custom properties and grid/flexbox
- **Vanilla JavaScript** - ES6+ features with modular architecture
- **SPA Router** - Hash-based routing for seamless navigation
- **State Management** - Centralized state with localStorage persistence

### Project Structure
```
freshcart/
├── index.html                 # Main entry point
├── css/
│   ├── main.css              # Core styles & design system
│   ├── components.css        # Reusable UI components
│   └── responsive.css        # Mobile-first responsive design
├── js/
│   ├── app.js               # Main application controller
│   ├── router.js            # SPA routing system
│   ├── state.js             # State management
│   ├── components/          # UI component library
│   │   ├── ui-components.js
│   │   ├── auth-components.js
│   │   ├── product-components.js
│   │   └── cart-components.js
│   └── data/
│       └── products.js      # Sample product data
├── assets/
│   ├── images/              # Product images
│   └── icons/               # SVG icons
└── README.md
```

## 🎯 Key Functionality

### Shopping Cart
- Add/remove items with quantity controls
- Real-time price calculations
- Persistent storage across sessions
- Free delivery threshold ($35+)

### Search & Filtering
- Real-time product search
- Category-based filtering
- Price range sliders
- Rating filters
- Advanced search with multiple criteria

### User Experience
- Smooth page transitions
- Loading states and animations
- Toast notifications
- Form validation with error handling
- Mobile-optimized touch targets

### Mock Services
- User authentication simulation
- Order processing workflow
- Delivery tracking simulation
- Payment method handling

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 991px
- **Desktop**: 992px+

### Mobile Features
- Bottom navigation for easy thumb access
- Touch-friendly button sizes (44px minimum)
- Optimized product card layouts
- Collapsible filter sidebar
- Swipe-friendly carousels

## 🛠️ Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation
1. Clone or download the repository
2. Open `index.html` in a web browser
3. For best experience, serve via local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Demo Account
- **Email**: demo@freshcart.com
- **Password**: demo123

## 🎨 Design System

### Colors
```css
--primary-navy: #1a202c
--accent-orange: #ff6b35
--light-bg: #f7fafc
--text-primary: #2d3748
--success: #48bb78
--error: #f56565
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Sizes**: 0.75rem - 2.25rem
- **Weights**: 300, 400, 500, 600, 700

### Spacing
- **Scale**: 0.25rem - 5rem (4px - 80px)
- **Grid**: 4px base unit
- **Consistent**: Vertical rhythm maintained

## 🔧 Customization

### Adding Products
Edit `js/data/products.js` to add new products:
```javascript
{
  id: 19,
  name: "Product Name",
  price: 4.99,
  unit: "each",
  category: "fruits",
  description: "Product description",
  image: "image-url",
  inStock: true,
  rating: 4.5,
  reviews: 100
}
```

### Styling
- Modify CSS custom properties in `css/main.css`
- Add new components in `css/components.css`
- Adjust responsive breakpoints in `css/responsive.css`

### Functionality
- Add new routes in `js/router.js`
- Create new components in `js/components/`
- Extend state management in `js/state.js`

## 🌐 Browser Support
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support
For questions or support, please open an issue in the repository.

---

**Built with ❤️ for fresh grocery delivery experiences**