import React, { useState, useEffect } from 'react';
import { CartProvider } from './components/CartProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import OwnBox from './components/OwnBox';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating?: number;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  deliveryTime?: string;
}

interface SearchFilters {
  priceRange: [number, number];
  category: string;
  sortBy: string;
}

// Main App Component - Wrapped inside CartProvider
const AppContent = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    priceRange: [0, 2000],
    category: 'all',
    sortBy: 'relevance'
  });

  // Handle URL changes
  useEffect(() => {
    const updatePageFromURL = () => {
      const path = window.location.pathname;
      if (path === '/cart') {
        setCurrentPage('cart');
      } else {
        setCurrentPage('home');
      }
    };

    // Set initial page
    updatePageFromURL();

    // Listen for navigation changes
    const handlePopState = () => {
      updatePageFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    
    // Custom event for programmatic navigation
    window.addEventListener('navigate', handlePopState as any);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate', handlePopState as any);
    };
  }, []);

  const snackBoxes = [
    {
      id: 1,
      name: ' Box_1',
      price: '₹399',
      image: '🥨',
      description: 'A delightful mix of traditional snacks including pretzels, crackers, and nuts.',
      rating: 4.5,
      ingredients: ['Samosa', 'soft drink', 'Roasted Makhana/chips', 'chocolate Muffin'],
      deliveryTime: '25-35 mins'
    },
    {
      id: 2,
      name: 'box_2',
      price: '₹499',
      image: '🥗',
      description: 'Healthy and tasty snack box featuring a variety of nutritious options.',
      rating: 4.7,
      ingredients: ['Samosa/Rolls', 'soft drink', 'Rasagulla', 'Bananachips/HealthyChips','Cookies'],
      deliveryTime: '30-40 mins'
    },
    {
      id: 3,
      name: 'Box_3',
      price: '₹449',
      image: '🍪',
      description: 'Indulgent selection of cookies, chocolates, and sweet delicacies.',
      rating: 4.6,
      ingredients: ['Samosa/Puff/Rolls', 'Paper Boad Chikki', 'Popcorn', 'Millet cookies'],
      deliveryTime: '20-30 mins'
    }
  ];

  const eventBoxes = [
   
    {
      id: 5,
      name: 'Christmas treat',
      price: '₹899',
      image: '🌸',
      description: 'Festive Christmas snack box filled with holiday goodies and treats.',
      rating: 4.9,
      ingredients: ['Mini Candy', 'Roasted Nuts', 'Holiday Cookies', 'plum Cake'],
      deliveryTime: '40-50 mins'
    },
    {
      id: 6,
      name: 'New Year Treat',
      price: '₹799',
      image: '🕌',
      description: 'Specially curated Iftar items perfect for breaking the fast.',
      rating: 4.7,
      ingredients: ['Dried fruits', 'Energy Bars', 'Small Goal Setting Note Pad/sticky Notes'],
      deliveryTime: '30-40 mins'
    },
    {
      id: 7,
      name: "Valentine's Day Box ",
      price: '₹799',
      image: '🕌',
      description: 'Specially curated Iftar items perfect for breaking the fast.',
      rating: 4.7,
      ingredients: ['Sweet & Savory love', 'Chocolate', 'Red Velvet Cake', 'Heartshape Candles(2)& Piller Shape Candeles','Mini Planted Seed Packet' ],
      deliveryTime: '30-40 mins'
    }, 
    {
      id: 8,
      name: "Women's Day Special",
      price: '₹799',
      image: '🕌',
      description: 'woman day special snack box with delightful treats and surprises.',
      rating: 4.7,
      ingredients: ['Rose(1)', 'chocolate(1)', 'chips(!)/Waffers'],
      deliveryTime: '30-40 mins'
    },
    {
      id: 9,
      name: "Women's Day Special",
      price: '₹799',
      image: '🕌',
      description: 'woman day special snack box with delightful treats and surprises.',
      rating: 4.7,
      ingredients: ['Cookie & Chocolate Box', 'Small teddy bear'],
      deliveryTime: '30-40 mins'
    }    
  ];

  const catering = [
    {
      id: 10,
      name: 'Small Event Catering',
      price: '₹1799',
      image: '🍽',
      description: 'Complete catering solution for events up to 20 people.',
      rating: 4.6,
      ingredients: ['Main Course', 'Appetizers', 'Desserts', 'Beverages'],
      deliveryTime: '60-90 mins'
    },
    {
      id: 11,
      name: 'Large Event Catering',
      price: '₹3999',
      image: '🏢',
      description: 'Full-service catering for corporate events and large gatherings.',
      rating: 4.8,
      ingredients: ['Multiple Courses', 'Variety Pack', 'Premium Items', 'Complete Service'],
      deliveryTime: '90-120 mins'
    },
    {
      id: 12,
      name: 'Custom Menu Planning',
      price: '₹2999',
      image: '📋',
      description: 'Personalized catering with custom menu design and planning.',
      rating: 4.7,
      ingredients: ['Custom Items', 'Personalized Menu', 'Special Requests', 'Premium Service'],
      deliveryTime: '75-105 mins'
    }
  ];

  const otherProducts = [
    {
      id: 13,
      name: 'Box_1',
      price: '₹319',
      image: '🎂',
      description: 'kids friendly snack box with delightful treats and surprises.',
      rating: 4.9,
      ingredients: ['Whole Grain Cookies', 'Dry Fruits', 'Millets CupCake', 'Colouring sheets/Smile Ball','Camera Key Chain', 'Mini Toy Cars', 'Story Books/Comics'],
      deliveryTime: '45-60 mins'
    },
    {
      id: 14,
      name: 'Box_2',
      price: '₹579',
      image: '🥤',
      description: 'Handcrafted drinks and specialty beverages from local artisans.',
      rating: 4.4,
      ingredients: ['Mini Chocolate Square', 'Fun Flavored Popcorn ', 'Millets CupCake', 'Small Puzzle','Paint(non toxic)', 'Fridge Magnets'],
      deliveryTime: '15-25 mins'
    },

  ];

  const allProducts = [...snackBoxes, ...eventBoxes, ...catering, ...otherProducts];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string, filters: SearchFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  const filterProducts = (products: Product[]) => {
    if (!searchQuery && searchFilters.category === 'all') return products;
    
    return products.filter(product => {
      const matchesQuery = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const price = parseInt(product.price.replace('₹', ''));
      const matchesPrice = price >= searchFilters.priceRange[0] && price <= searchFilters.priceRange[1];
      
      const matchesCategory = searchFilters.category === 'all' || 
        (searchFilters.category === 'corporate' && snackBoxes.includes(product as any)) ||
        (searchFilters.category === 'festive' && eventBoxes.includes(product as any)) ||
        (searchFilters.category === 'birthday' && otherProducts.includes(product as any)) ||
        (searchFilters.category === 'catering' && catering.includes(product as any));
      
      return matchesQuery && matchesPrice && matchesCategory;
    });
  };

  // Render current page
  if (currentPage === 'cart') {
    return <Cart />;
  }

  return (
    <>
      <Header />
      <Hero />
      <SearchBar onSearch={handleSearch} products={allProducts} />
      
      <ProductSection
        id="snack-boxes"
        title="Corporate"
        subtitle="Curated snack collections specially designed for businesses, meetings, and corporate events."
        products={filterProducts(snackBoxes)}
        onProductClick={handleProductClick}
      />
      <ProductSection
        id="event-boxes"
        title="Festive & Other Events"
        subtitle="Thoughtfully crafted snack boxes perfect for celebrations, festivals, corporate meetings, and special occasions."
        products={filterProducts(eventBoxes)}
        onProductClick={handleProductClick}
      />
      <ProductSection
        id="catering"
        title="kids friendly snack boxs"
        subtitle="Tasty and nutritious snack boxes designed specifically for children, featuring fun and healthy options."
        products={filterProducts(otherProducts)}
        onProductClick={handleProductClick}
      />
      <OwnBox />
      <ProductSection
        id="other-products"
        title="Catering"
        subtitle="Delicious dishes and special foods for every occasion, from small gatherings to big celebrations."
        products={filterProducts(catering)}
        onProductClick={handleProductClick}
      />
    
      <Testimonials />
      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// Main App Component with CartProvider wrapper
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen app-background">
        <AppContent />
      </div>
    </CartProvider>
  );
}

export default App;
