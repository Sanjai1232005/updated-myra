// src/components/products/ProductCard.tsx

import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../CartProvider';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product as any, 1);
  };

  if (viewMode === 'list') {
    return (
      <div className="rounded-xl shadow-lg p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow">
        <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
          {product.image.startsWith('http') ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-4xl">{product.image}</span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating || 4.5}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-green-100 to-yellow-100 flex items-center justify-center">
        {product.image.startsWith('http') ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">{product.image}</span>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-xl text-gray-900">{product.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating || 4.5}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;