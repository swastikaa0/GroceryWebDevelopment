import React from 'react';
import { Edit3, Trash2, Eye, Package } from 'lucide-react';

const AdminProductCard = ({ product, onEdit, onDelete, onView }) => {
  const primaryImage = product.image_urls?.[0] || '/api/placeholder/300/300';
  const hasMultipleImages = product.image_urls?.length > 1;
  const hasDiscount = product.discounted_price && parseFloat(product.discounted_price) < parseFloat(product.price);

  const getStockColor = (stock, minLevel = 5) => {
    if (stock <= 0) return 'bg-red-100 text-red-800';
    if (stock <= minLevel) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusBadge = () => {
    if (!product.is_active) {
      return 'bg-gray-100 text-gray-800';
    }
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/api/placeholder/300/300';
          }}
        />
        
        {/* Multiple Images Indicator */}
        {hasMultipleImages && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
            +{product.image_urls.length - 1} more
          </div>
        )}
        
        {/* Featured Badge */}
        {product.is_featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Featured
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge()}`}>
            {product.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
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
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* SKU */}
        {product.sku && (
          <p className="text-xs text-gray-500 mb-2">
            SKU: {product.sku}
          </p>
        )}

        {/* Category */}
        <p className="text-sm text-gray-600 mb-2">
          {product.category_name || 'No Category'}
        </p>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-green-600">
                ${parseFloat(product.discounted_price || 0).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${parseFloat(product.price || 0).toFixed(2)}
              </span>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Sale
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${parseFloat(product.price || 0).toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock & Unit */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStockColor(product.stock_quantity, product.min_stock_level)}`}>
            {product.stock_quantity || 0} {product.unit || 'units'}
          </span>
          
          {product.stock_quantity <= (product.min_stock_level || 5) && product.stock_quantity > 0 && (
            <span className="text-xs text-orange-600 font-medium">
              Low Stock!
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{product.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Weight */}
        {product.weight && (
          <p className="text-xs text-gray-500 mb-3">
            Weight: {product.weight} {product.weight_unit || 'kg'}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onView(product)}
            className="flex-1 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
          >
            <Eye className="h-4 w-4" />
            <span>View</span>
          </button>
          
          <button
            onClick={() => onEdit(product)}
            className="flex-1 py-2 px-3 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit</span>
          </button>
          
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
