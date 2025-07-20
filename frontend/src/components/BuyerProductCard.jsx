import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuyerProductCard = ({ product, onAddToCart, onAddToWishlist, showQuantitySelector = false }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const primaryImage = product.image_urls?.[0] || '/api/placeholder/300/300';
  const price = parseFloat(product.price || 0);
  const discountedPrice = parseFloat(product.discounted_price || 0);
  const hasDiscount = discountedPrice > 0 && discountedPrice < price;
  const finalPrice = hasDiscount ? discountedPrice : price;
  const discountPercentage = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  const handleAddToCart = () => {
    setIsLoading(true);
    try {
      onAddToCart(product, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (product.max_order_quantity || 10)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity <= (product.min_stock_level || 5) && product.stock_quantity > 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/api/placeholder/300/300';
            }}
          />
        </Link>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Stock Status */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Featured Badge */}
        {product.is_featured && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Featured
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={() => onAddToWishlist && onAddToWishlist(product)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}
        
        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.review_count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
          <span className="text-sm text-gray-600">
            / {product.unit}
          </span>
        </div>

        {/* Stock Indicator */}
        {isLowStock && !isOutOfStock && (
          <p className="text-xs text-orange-600 mb-2">
            Only {product.stock_quantity} left in stock!
          </p>
        )}

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center space-x-2">
          {showQuantitySelector && !isOutOfStock && (
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={decrementQuantity}
                className="p-1 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-1 hover:bg-gray-100 transition-colors"
                disabled={quantity >= (product.max_order_quantity || 10)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isLoading}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
              isOutOfStock
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{isLoading ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerProductCard;
