import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Heart, 
  Star, 
  Menu, 
  X, 
  Truck, 
  Leaf, 
  Award,
  Home,
  Store,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Shield,
  Clock,
  Package,
  CheckCircle,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Mock fruit data
  const fruits = [
    {
      id: 1,
      name: 'Organic Strawberries',
      price: 4.99,
      originalPrice: 6.99,
      image: 'https://placehold.co/300x300/ff6b8b/ffffff?text=Strawberries',
      rating: 4.8,
      reviews: 124,
      category: 'berries',
      description: 'Fresh organic strawberries, hand-picked at peak ripeness. Perfect for smoothies, desserts, or eating fresh.',
      weight: '1 lb container'
    },
    {
      id: 2,
      name: 'Premium Avocados',
      price: 2.49,
      originalPrice: 3.29,
      image: 'https://placehold.co/300x300/4ade80/ffffff?text=Avocados',
      rating: 4.6,
      reviews: 89,
      category: 'tropical',
      description: 'Creamy Hass avocados, perfect for guacamole or toast. Rich in healthy fats and nutrients.',
      weight: 'Each'
    },
    {
      id: 3,
      name: 'Sweet Cherries',
      price: 5.99,
      originalPrice: 7.99,
      image: 'https://placehold.co/300x300/f97316/ffffff?text=Cherries',
      rating: 4.9,
      reviews: 156,
      category: 'berries',
      description: 'Juicy Bing cherries with a perfect sweet-tart balance. Great for snacking or baking.',
      weight: '1 lb bag'
    },
    {
      id: 4,
      name: 'Golden Pineapple',
      price: 3.99,
      originalPrice: 4.99,
      image: 'https://placehold.co/300x300/facc15/ffffff?text=Pineapple',
      rating: 4.7,
      reviews: 203,
      category: 'tropical',
      description: 'Sweet and tangy pineapple, ready to eat. High in vitamin C and bromelain.',
      weight: 'Whole'
    },
    {
      id: 5,
      name: 'Crisp Apples',
      price: 1.99,
      originalPrice: 2.49,
      image: 'https://placehold.co/300x300/ef4444/ffffff?text=Apples',
      rating: 4.5,
      reviews: 312,
      category: 'orchard',
      description: 'Crunchy Honeycrisp apples, perfect for snacking. Sweet with a hint of tartness.',
      weight: 'Each'
    },
    {
      id: 6,
      name: 'Ripe Bananas',
      price: 0.49,
      originalPrice: 0.69,
      image: 'https://placehold.co/300x300/fbbf24/ffffff?text=Bananas',
      rating: 4.4,
      reviews: 427,
      category: 'tropical',
      description: 'Naturally sweet bananas, great for smoothies, baking, or eating fresh.',
      weight: 'Each'
    },
    {
      id: 7,
      name: 'Fresh Blueberries',
      price: 3.99,
      originalPrice: 4.99,
      image: 'https://placehold.co/300x300/6366f1/ffffff?text=Blueberries',
      rating: 4.7,
      reviews: 189,
      category: 'berries',
      description: 'Antioxidant-rich blueberries, perfect for breakfast bowls or baking.',
      weight: '6 oz container'
    },
    {
      id: 8,
      name: 'Juicy Oranges',
      price: 1.29,
      originalPrice: 1.59,
      image: 'https://placehold.co/300x300/f97316/ffffff?text=Oranges',
      rating: 4.6,
      reviews: 267,
      category: 'citrus',
      description: 'Sweet and juicy navel oranges, perfect for fresh juice or eating.',
      weight: 'Each'
    }
  ];

  const categories = ['All', 'Berries', 'Tropical', 'Orchard', 'Citrus'];

  const filteredFruits = fruits.filter(fruit => 
    fruit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fruit.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setCartItems([]);
    setTimeout(() => {
      setOrderPlaced(false);
      setCurrentPage('home');
    }, 3000);
  };

  // Navigation component
  const Navigation = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">FreshFruit</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-1 ${currentPage === 'home' ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600'}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className={`flex items-center space-x-1 ${currentPage === 'shop' ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600'}`}
            >
              <Store className="h-4 w-4" />
              <span>Shop</span>
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`flex items-center space-x-1 ${currentPage === 'about' ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600'}`}
            >
              <User className="h-4 w-4" />
              <span>About</span>
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`flex items-center space-x-1 ${currentPage === 'contact' ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600'}`}
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search fruits..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button 
              className="relative p-2 text-gray-700 hover:text-green-600"
              onClick={() => setCurrentPage('favorites')}
            >
              <Heart className="h-6 w-6" />
            </button>
            
            <button 
              className="relative p-2 text-gray-700 hover:text-green-600"
              onClick={() => setShowCart(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <button 
              onClick={() => {setCurrentPage('home'); setIsMenuOpen(false);}}
              className="block py-2 text-gray-900 hover:text-green-600 w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => {setCurrentPage('shop'); setIsMenuOpen(false);}}
              className="block py-2 text-gray-700 hover:text-green-600 w-full text-left"
            >
              Shop
            </button>
            <button 
              onClick={() => {setCurrentPage('about'); setIsMenuOpen(false);}}
              className="block py-2 text-gray-700 hover:text-green-600 w-full text-left"
            >
              About
            </button>
            <button 
              onClick={() => {setCurrentPage('contact'); setIsMenuOpen(false);}}
              className="block py-2 text-gray-700 hover:text-green-600 w-full text-left"
            >
              Contact
            </button>
            <div className="pt-2">
              <input
                type="text"
                placeholder="Search fruits..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );

  // Cart Sidebar
  const CartSidebar = () => (
    <div className={`fixed inset-0 z-50 ${showCart ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Your Cart ({getTotalItems()})</h2>
            <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-green-600 font-semibold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full border hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full border hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-600">${getTotalPrice()}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Home Page
  const HomePage = () => (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fresh Fruits Delivered Daily
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Farm-fresh, organic fruits delivered straight to your door. Taste the difference of quality and freshness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('shop')}
                className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Next-day delivery available in most areas</p>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Organic Quality</h3>
              <p className="text-gray-600">Certified organic and sustainably grown</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fresh Guarantee</h3>
              <p className="text-gray-600">100% satisfaction or your money back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular fruits, loved by customers nationwide
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {fruits.slice(0, 4).map((fruit) => (
              <div key={fruit.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={fruit.image} 
                    alt={fruit.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => {setSelectedProduct(fruit); setCurrentPage('product')}}
                  />
                  <button 
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => addToCart(fruit)}
                  >
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{fruit.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(fruit.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({fruit.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600">${fruit.price}</span>
                      <span className="text-sm text-gray-500 line-through">${fruit.originalPrice}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(fruit)}
                      className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Fresh with Our Newsletter</h2>
          <p className="text-green-100 mb-6">
            Get weekly updates on new arrivals, special offers, and seasonal recipes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );

  // Shop Page
  const ShopPage = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Fresh Selection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of the finest seasonal fruits
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFruits.map((fruit) => (
            <div key={fruit.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={fruit.image} 
                  alt={fruit.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => {setSelectedProduct(fruit); setCurrentPage('product')}}
                />
                <button 
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  onClick={() => addToCart(fruit)}
                >
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{fruit.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{fruit.weight}</p>
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(fruit.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({fruit.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600">${fruit.price}</span>
                    <span className="text-sm text-gray-500 line-through">${fruit.originalPrice}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(fruit)}
                    className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Product Detail Page
  const ProductDetailPage = () => {
    if (!selectedProduct) return null;
    
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => setCurrentPage('shop')}
            className="mb-6 text-green-600 hover:text-green-700 flex items-center"
          >
            ← Back to Shop
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
              <p className="text-gray-600 mb-6">{selectedProduct.weight}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">({selectedProduct.reviews} reviews)</span>
              </div>
              
              <p className="text-gray-700 mb-8 leading-relaxed">{selectedProduct.description}</p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-green-600">${selectedProduct.price}</span>
                  <span className="text-lg text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                </div>
              </div>
              
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // About Page
  const AboutPage = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About FreshFruit</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're passionate about bringing you the freshest, highest quality fruits possible
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2020, FreshFruit started as a small family farm with a simple mission: 
              to provide the community with access to fresh, organic fruits that are grown with care and respect for the environment.
            </p>
            <p className="text-gray-700 mb-4">
              Today, we work directly with over 50 local farms across the country, ensuring that every piece of fruit 
              that reaches your door is harvested at peak ripeness and delivered within 24 hours.
            </p>
            <p className="text-gray-700">
              Our commitment to sustainability means we use eco-friendly packaging and support farming practices 
              that protect our planet for future generations.
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <Leaf className="h-24 w-24 text-green-600" />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">We prioritize eco-friendly farming and packaging practices</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">Every fruit is hand-selected for freshness and flavor</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Freshness</h3>
              <p className="text-gray-600">Harvested and delivered within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Contact Page
  const ContactPage = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Get in touch with our team
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Fresh Street<br />Fruitville, CA 90210</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@freshfruit.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Hours</h3>
                  <p className="text-gray-600">Monday-Friday: 9am-6pm<br />Saturday: 10am-4pm<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  // Order Confirmation
  const OrderConfirmation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-600 mb-6">Thank you for your order. Your fruits will be delivered soon!</p>
        <button 
          onClick={() => setOrderPlaced(false)}
          className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-2xl font-bold">FreshFruit</span>
            </div>
            <p className="text-gray-400">
              Your trusted source for fresh, organic fruits delivered to your doorstep.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">All Fruits</a></li>
              <li><a href="#" className="hover:text-white">Seasonal Specials</a></li>
              <li><a href="#" className="hover:text-white">Organic Collection</a></li>
              <li><a href="#" className="hover:text-white">Gift Boxes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Our Farms</a></li>
              <li><a href="#" className="hover:text-white">Sustainability</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 FreshFruit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {orderPlaced && <OrderConfirmation />}
      <CartSidebar />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'product' && <ProductDetailPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />
    </div>
  );
};

export default App;
