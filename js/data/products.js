// Sample product data for FreshCart
const PRODUCTS_DATA = {
  fruits: [
    {
      id: 1,
      name: "Royal Gala Apples",
      price: 3.20,
      unit: "lb",
      category: "fruits",
      description: "Crisp, sweet apples perfect for snacking or baking. Grown in premium orchards.",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.5,
      reviews: 128,
      badges: ["fresh", "popular"],
      nutrition: {
        calories: 95,
        fiber: "4g",
        sugar: "19g",
        vitamin_c: "14%"
      }
    },
    {
      id: 2,
      name: "Navel Oranges",
      price: 2.85,
      unit: "lb",
      category: "fruits",
      description: "Juicy, seedless oranges bursting with vitamin C. Perfect for fresh juice.",
      image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.3,
      reviews: 95,
      badges: ["vitamin-c"],
      nutrition: {
        calories: 62,
        fiber: "3g",
        sugar: "12g",
        vitamin_c: "92%"
      }
    },
    {
      id: 3,
      name: "Fresh Strawberries",
      price: 4.50,
      unit: "container",
      category: "fruits",
      description: "Sweet, ripe strawberries picked at peak freshness. Great for desserts and smoothies.",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.7,
      reviews: 203,
      badges: ["fresh", "seasonal"],
      nutrition: {
        calories: 49,
        fiber: "3g",
        sugar: "7g",
        vitamin_c: "149%"
      }
    },
    {
      id: 4,
      name: "Ruby Red Grapefruits",
      price: 2.10,
      unit: "lb",
      category: "fruits",
      description: "Tangy and refreshing ruby red grapefruits. Rich in antioxidants and vitamin C.",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.2,
      reviews: 67,
      badges: ["antioxidants"],
      nutrition: {
        calories: 52,
        fiber: "2g",
        sugar: "9g",
        vitamin_c: "64%"
      }
    },
    {
      id: 5,
      name: "Organic Bananas",
      price: 1.95,
      unit: "bunch",
      category: "fruits",
      description: "Organic bananas perfect for smoothies, baking, or a quick energy boost.",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.4,
      reviews: 156,
      badges: ["organic", "energy"],
      nutrition: {
        calories: 105,
        fiber: "3g",
        sugar: "14g",
        potassium: "12%"
      }
    }
  ],
  
  vegetables: [
    {
      id: 6,
      name: "Organic Carrots",
      price: 1.95,
      unit: "bunch",
      category: "vegetables",
      description: "Fresh organic carrots with vibrant color and sweet flavor. Perfect for roasting or snacking.",
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.6,
      reviews: 89,
      badges: ["organic", "vitamin-a"],
      nutrition: {
        calories: 25,
        fiber: "2g",
        sugar: "3g",
        vitamin_a: "184%"
      }
    },
    {
      id: 7,
      name: "Fresh Spinach",
      price: 3.40,
      unit: "bag",
      category: "vegetables",
      description: "Tender baby spinach leaves, perfect for salads, smoothies, or cooking.",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.5,
      reviews: 134,
      badges: ["superfood", "iron"],
      nutrition: {
        calories: 7,
        fiber: "1g",
        sugar: "0g",
        iron: "15%"
      }
    },
    {
      id: 8,
      name: "Bell Pepper Mix",
      price: 2.75,
      unit: "lb",
      category: "vegetables",
      description: "Colorful mix of red, yellow, and green bell peppers. Sweet and crunchy.",
      image: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.3,
      reviews: 76,
      badges: ["colorful", "vitamin-c"],
      nutrition: {
        calories: 31,
        fiber: "3g",
        sugar: "7g",
        vitamin_c: "190%"
      }
    },
    {
      id: 9,
      name: "Organic Broccoli",
      price: 2.95,
      unit: "head",
      category: "vegetables",
      description: "Fresh organic broccoli crowns, packed with nutrients and perfect for steaming.",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.4,
      reviews: 92,
      badges: ["organic", "superfood"],
      nutrition: {
        calories: 25,
        fiber: "3g",
        sugar: "1g",
        vitamin_k: "116%"
      }
    }
  ],
  
  citrus: [
    {
      id: 10,
      name: "Meyer Lemons",
      price: 3.15,
      unit: "lb",
      category: "citrus",
      description: "Sweet and fragrant Meyer lemons, perfect for cooking and cocktails.",
      image: "https://images.unsplash.com/photo-1590502593747-42a4e2dc46ab?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.6,
      reviews: 45,
      badges: ["premium", "aromatic"],
      nutrition: {
        calories: 17,
        fiber: "2g",
        sugar: "1g",
        vitamin_c: "51%"
      }
    },
    {
      id: 11,
      name: "Key Limes",
      price: 4.20,
      unit: "lb",
      category: "citrus",
      description: "Authentic Key limes with intense flavor, perfect for pies and marinades.",
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.7,
      reviews: 38,
      badges: ["authentic", "intense"],
      nutrition: {
        calories: 20,
        fiber: "2g",
        sugar: "1g",
        vitamin_c: "32%"
      }
    },
    {
      id: 12,
      name: "Blood Oranges",
      price: 3.80,
      unit: "lb",
      category: "citrus",
      description: "Distinctive blood oranges with deep red flesh and complex sweet-tart flavor.",
      image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.5,
      reviews: 62,
      badges: ["unique", "antioxidants"],
      nutrition: {
        calories: 70,
        fiber: "3g",
        sugar: "14g",
        vitamin_c: "92%"
      }
    }
  ],
  
  dairy: [
    {
      id: 13,
      name: "Organic Whole Milk",
      price: 4.99,
      unit: "gallon",
      category: "dairy",
      description: "Fresh organic whole milk from grass-fed cows. Rich and creamy.",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.8,
      reviews: 234,
      badges: ["organic", "grass-fed"],
      nutrition: {
        calories: 150,
        protein: "8g",
        calcium: "28%",
        vitamin_d: "25%"
      }
    },
    {
      id: 14,
      name: "Greek Yogurt",
      price: 5.49,
      unit: "container",
      category: "dairy",
      description: "Thick and creamy Greek yogurt with live probiotics. High in protein.",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.6,
      reviews: 187,
      badges: ["probiotics", "protein"],
      nutrition: {
        calories: 100,
        protein: "17g",
        calcium: "20%",
        probiotics: "live cultures"
      }
    },
    {
      id: 15,
      name: "Artisan Cheese Selection",
      price: 12.99,
      unit: "package",
      category: "dairy",
      description: "Curated selection of artisan cheeses from local creameries.",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.9,
      reviews: 156,
      badges: ["artisan", "local"],
      nutrition: {
        calories: 113,
        protein: "7g",
        calcium: "20%",
        fat: "9g"
      }
    }
  ],
  
  bakery: [
    {
      id: 16,
      name: "Artisan Sourdough Bread",
      price: 4.50,
      unit: "loaf",
      category: "bakery",
      description: "Handcrafted sourdough bread with a perfect crust and tangy flavor.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.7,
      reviews: 98,
      badges: ["handcrafted", "traditional"],
      nutrition: {
        calories: 80,
        fiber: "3g",
        protein: "4g",
        carbs: "15g"
      }
    },
    {
      id: 17,
      name: "Fresh Croissants",
      price: 6.99,
      unit: "6-pack",
      category: "bakery",
      description: "Buttery, flaky croissants baked fresh daily. Perfect for breakfast.",
      image: "https://images.unsplash.com/photo-1555507036-ab794f4ade2a?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.8,
      reviews: 145,
      badges: ["fresh", "buttery"],
      nutrition: {
        calories: 231,
        fat: "12g",
        protein: "5g",
        carbs: "27g"
      }
    },
    {
      id: 18,
      name: "Blueberry Muffins",
      price: 8.99,
      unit: "6-pack",
      category: "bakery",
      description: "Moist blueberry muffins made with real blueberries and a hint of lemon.",
      image: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=400&h=300&fit=crop",
      inStock: true,
      rating: 4.5,
      reviews: 89,
      badges: ["real-fruit", "moist"],
      nutrition: {
        calories: 265,
        fiber: "2g",
        protein: "4g",
        sugar: "18g"
      }
    }
  ]
};

// Category information
const CATEGORIES = {
  fruits: {
    name: "Fresh Fruits",
    description: "Hand-picked fresh fruits at peak ripeness",
    icon: "🍎",
    color: "#ff6b35"
  },
  vegetables: {
    name: "Vegetables",
    description: "Farm-fresh vegetables for healthy meals",
    icon: "🥕",
    color: "#48bb78"
  },
  citrus: {
    name: "Citrus Collection",
    description: "Zesty citrus fruits bursting with flavor",
    icon: "🍊",
    color: "#ed8936"
  },
  dairy: {
    name: "Dairy Products",
    description: "Fresh dairy from trusted local farms",
    icon: "🥛",
    color: "#4299e1"
  },
  bakery: {
    name: "Fresh Bakery",
    description: "Artisan baked goods made fresh daily",
    icon: "🥖",
    color: "#9f7aea"
  }
};

// Helper functions for product data
const ProductData = {
  // Get all products as a flat array
  getAllProducts() {
    return Object.values(PRODUCTS_DATA).flat();
  },
  
  // Get products by category
  getProductsByCategory(category) {
    return PRODUCTS_DATA[category] || [];
  },
  
  // Get a single product by ID
  getProductById(id) {
    return this.getAllProducts().find(product => product.id === parseInt(id));
  },
  
  // Search products by name or description
  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return this.getAllProducts().filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  },
  
  // Filter products by price range
  filterByPriceRange(products, minPrice, maxPrice) {
    return products.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  },
  
  // Sort products
  sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'popular':
        return sorted.sort((a, b) => b.reviews - a.reviews);
      default:
        return sorted;
    }
  },
  
  // Get featured products (high rating and popular)
  getFeaturedProducts(limit = 8) {
    return this.getAllProducts()
      .filter(product => product.rating >= 4.5 && product.reviews >= 50)
      .slice(0, limit);
  },
  
  // Get related products (same category, excluding current product)
  getRelatedProducts(productId, limit = 4) {
    const product = this.getProductById(productId);
    if (!product) return [];
    
    return this.getProductsByCategory(product.category)
      .filter(p => p.id !== productId)
      .slice(0, limit);
  },
  
  // Get category information
  getCategoryInfo(category) {
    return CATEGORIES[category];
  },
  
  // Get all categories
  getAllCategories() {
    return CATEGORIES;
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS_DATA, CATEGORIES, ProductData };
}