import React from 'react';
import { Star, Plus } from 'lucide-react';
import { useCart } from './CartProvider';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  rating?: number;
  description: string;
}

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  onProductClick?: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  products, 
  onProductClick 
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent product modal from opening
    addToCart(product, 1);
    
    // Show a brief success message
    const button = e.target as HTMLElement;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.classList.add('bg-green-700');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-green-700');
    }, 1000);
  };

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  if (products.length === 0) {
    return (
      <section id={id} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-green-100 to-yellow-100 flex items-center justify-center overflow-hidden">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Plus className="h-5 w-5 text-green-600" />
                </div>
                {product.rating && product.rating >= 4.5 && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Bestseller
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600">
                      {product.rating || 4.5}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <div className="text-xs text-gray-500">Inclusive of taxes</div>
                  </div>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;