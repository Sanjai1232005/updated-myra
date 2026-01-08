import React, { useState } from 'react';
import { ShoppingBag, Package, Sparkles, X } from 'lucide-react';
import OwnBoxItem, { OwnBoxItemData } from './OwnBoxItem';
import { useCart } from './CartProvider';

const OwnBox: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<Map<number, number>>(new Map());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showSummary, setShowSummary] = useState(false);

  // All available items
  const items: OwnBoxItemData[] = [
    // Desserts
    { id: 1, name: 'Choco Lava Cake', price: 50, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400', category: 'Desserts' },
    { id: 2, name: 'Chocolate Muffin', price: 45, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', category: 'Desserts' },
    { id: 3, name: 'Chocolate Cake', price: 100, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', category: 'Desserts' },
    { id: 4, name: 'Vanilla Chocochip Muffin', price: 65, image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400', category: 'Desserts' },
    { id: 5, name: 'Walnut Brownie', price: 45, image: 'https://images.unsplash.com/photo-1564355808853-1db98cae46ef?w=400', category: 'Desserts' },
    { id: 6, name: 'Chocolate Mousse', price: 75, image: 'https://images.unsplash.com/photo-1541599468227-f8e2ebcf3622?w=400', category: 'Desserts' },
    { id: 7, name: 'Homemade Chocolate', price: 35, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', category: 'Desserts' },
    
    // Beverages
    { id: 8, name: 'Paperboat Mango', price: 10, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', category: 'Beverages' },
    { id: 9, name: 'Frooti', price: 10, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', category: 'Beverages' },
    { id: 10, name: 'Bisleri Water Bottle', price: 10, image: 'https://images.unsplash.com/photo-1559839914-17aae19cf7a4?w=400', category: 'Beverages' },
    { id: 11, name: 'Tropicana Mango 200ml', price: 20, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', category: 'Beverages' },
    { id: 12, name: 'Tropicana Mixed Fruit', price: 20, image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400', category: 'Beverages' },
    { id: 13, name: 'Coke', price: 20, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', category: 'Beverages' },
    
    // Snacks
    { id: 14, name: 'Dairy Milk', price: 20, image: 'https://images.unsplash.com/photo-1606312619070-d48b4cdb0e63?w=400', category: 'Snacks' },
    { id: 15, name: 'Lays', price: 10, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', category: 'Snacks' },
    { id: 16, name: 'Potato Chips', price: 12, image: 'https://images.unsplash.com/photo-1613919341155-c71a6bc3a8c9?w=400', category: 'Snacks' },
    { id: 17, name: 'Veg Puff', price: 25, image: 'https://images.unsplash.com/photo-1626082910183-2e654a16193d?w=400', category: 'Snacks' },
    { id: 18, name: 'Dry Jamun', price: 30, image: 'https://images.unsplash.com/photo-1599909533730-d25a92f3c3e7?w=400', category: 'Snacks' },
    { id: 19, name: 'Popcorn', price: 35, image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400', category: 'Snacks' },
  ];

  const categories = ['all', 'Desserts', 'Beverages', 'Snacks'];

  const handleAddItem = (itemId: number) => {
    setSelectedItems(prev => {
      const newMap = new Map(prev);
      newMap.set(itemId, (newMap.get(itemId) || 0) + 1);
      return newMap;
    });
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems(prev => {
      const newMap = new Map(prev);
      const currentQty = newMap.get(itemId) || 0;
      if (currentQty > 1) {
        newMap.set(itemId, currentQty - 1);
      } else {
        newMap.delete(itemId);
      }
      return newMap;
    });
  };

  const getTotalItems = () => {
    return Array.from(selectedItems.values()).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Array.from(selectedItems.entries()).reduce((sum, [itemId, qty]) => {
      const item = items.find(i => i.id === itemId);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  };

  const handleAddToCart = () => {
    if (selectedItems.size === 0) return;

    const boxContents = Array.from(selectedItems.entries())
      .map(([itemId, qty]) => {
        const item = items.find(i => i.id === itemId);
        return `${item?.name} (${qty}x)`;
      })
      .join(', ');

    const customBox = {
      id: Date.now(),
      name: 'Custom Box',
      price: `₹${getTotalPrice()}`,
      image: '📦',
      description: `Your personalized box with ${getTotalItems()} items: ${boxContents}`,
      rating: 5
    };

    addToCart(customBox, 1);
    setSelectedItems(new Map());
    setShowSummary(false);

    // Show success message
    alert('Custom box added to cart successfully! 🎉');
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="own-box" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-green-600 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="inline h-4 w-4 mr-2" />
            NEW FEATURE
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Create Your Own Box
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your perfect snack box by selecting your favorite items. Mix and match desserts, beverages, and snacks to create a personalized experience!
          </p>
        </div>

        {/* Summary Bar */}
        {getTotalItems() > 0 && (
          <div className="sticky top-32 z-30 mb-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-2xl p-6 transform transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white rounded-full p-3">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Your Custom Box</h3>
                    <p className="text-sm text-green-100">
                      {getTotalItems()} items selected
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right text-white">
                    <div className="text-sm text-green-100">Total</div>
                    <div className="text-2xl font-bold">₹{getTotalPrice()}</div>
                  </div>
                  <button
                    onClick={() => setShowSummary(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>View & Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                activeCategory === cat
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {cat === 'all' ? 'All Items' : cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <OwnBoxItem
              key={item.id}
              item={item}
              quantity={selectedItems.get(item.id) || 0}
              onAdd={() => handleAddItem(item.id)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {getTotalItems() === 0 && (
          <div className="text-center mt-12 bg-white rounded-2xl p-12 shadow-lg">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your box is empty
            </h3>
            <p className="text-gray-500">
              Start adding items to create your perfect custom box!
            </p>
          </div>
        )}

        {/* Summary Modal */}
        {showSummary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <Package className="mr-3 h-6 w-6" />
                    Your Custom Box
                  </h3>
                  <button
                    onClick={() => setShowSummary(false)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {Array.from(selectedItems.entries()).map(([itemId, qty]) => {
                  const item = items.find(i => i.id === itemId);
                  if (!item) return null;

                  return (
                    <div key={itemId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="h-16 w-16 object-contain rounded-lg bg-white"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">₹{item.price} × {qty}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">
                          ₹{item.price * qty}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-semibold">{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{getTotalPrice()}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OwnBox;