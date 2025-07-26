import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Package, Calendar, MapPin, CreditCard, Eye, Clock } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
    
    // Show success message if redirected from checkout
    if (location.state?.orderCreated) {
      toast.success('🎉 Your order has been placed successfully! You can track it below.');
    }
  }, [location.state]);

  const fetchOrders = async () => {
    try {
      console.log('Fetching user orders...');
      const response = await ordersAPI.getMyOrders();
      console.log('Orders API response:', response.data);
      
      if (response.data.success) {
        const ordersList = response.data.data || []; // Backend returns orders in 'data' field
        console.log('Fetched orders:', ordersList);
        console.log('Sample order structure:', ordersList[0]); // Debug: see order structure
        setOrders(ordersList);
      } else {
        console.error('Failed to fetch orders:', response.data.message);
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDeliveryAddress = (deliveryAddress) => {
    if (!deliveryAddress) return 'Not specified';
    
    // If it's already a string, return it
    if (typeof deliveryAddress === 'string') {
      try {
        // Try to parse as JSON in case it's stored as JSON string
        const parsed = JSON.parse(deliveryAddress);
        return parsed.address || deliveryAddress;
      } catch {
        // If parsing fails, return the string as is
        return deliveryAddress;
      }
    }
    
    // If it's an object, extract the address
    if (typeof deliveryAddress === 'object' && deliveryAddress.address) {
      return deliveryAddress.address;
    }
    
    return 'Not specified';
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'cash_on_delivery':
        return 'Cash on Delivery';
      case 'credit_card':
        return 'Credit Card';
      case 'debit_card':
        return 'Debit Card';
      case 'upi':
        return 'UPI Payment';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {/* Success Banner for new orders */}
        {location.state?.orderCreated && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Order Placed Successfully!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Your order has been received and is being processed. You can track its progress below.
                  {location.state?.newOrderId && (
                    <span className="font-medium"> Order ID: #{location.state.newOrderId}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <Link
                      to={`/orders/${order.id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                      <p className="text-sm text-gray-600">{getDeliveryAddress(order.delivery_address)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Method</p>
                      <p className="text-sm text-gray-600">{getPaymentMethodLabel(order.payment_method)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delivery Slot</p>
                      <p className="text-sm text-gray-600">
                        {order.delivery_date} - {order.delivery_time_slot}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {order.order_items?.length || 0} item(s)
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{parseFloat(order.final_amount || order.total_amount || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
