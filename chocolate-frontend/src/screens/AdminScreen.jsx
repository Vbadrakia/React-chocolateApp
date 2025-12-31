import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService, orderService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import './Admin.css';

export const AdminScreen = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/products');
      return;
    }

    fetchOrders();
    fetchProducts();

    // Auto-refresh every 5 seconds for real-time updates
    const interval = setInterval(() => {
      if (activeTab === 'orders') fetchOrders(true);
      else fetchProducts(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [user, navigate, activeTab]);

  const fetchOrders = async (silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      const response = await orderService.getAll();
      console.log('Admin - Fetched orders:', response.data);
      setOrders(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Admin - Error fetching orders:', err);
      if (!silent) setError(err.response?.data?.error || 'Failed to load orders');
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const fetchProducts = async (silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      const response = await productService.getAll();
      setProducts(response.data || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Admin - Error fetching products:', err);
      if (!silent) setError(err.response?.data?.error || 'Failed to load products');
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      
      // Optimistic update
      setOrders((prev) =>
        prev.map((o) => ((o._id || o.id) === orderId ? { ...o, status: newStatus } : o))
      );
      setSelectedStatus((prev) => ({ ...prev, [orderId]: newStatus }));
      
      // Show success feedback
      showToast(`✓ Order status updated to ${newStatus}`, 'success', 3000);
      
      // Refresh to sync with server
      await fetchOrders(true);
    } catch (err) {
      showToast('Failed to update order status: ' + (err.response?.data?.error || err.message), 'error', 4000);
      console.error('Status update error:', err);
      // Revert on error
      await fetchOrders(true);
    }
  };

  if (isLoading) {
    return <div className="container"><p>Loading admin panel...</p></div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ fontSize: '12px', color: '#888' }}>
          Last updated: {lastUpdated.toLocaleTimeString()} 
          <span style={{ marginLeft: '8px', color: '#28a745' }}>● Live</span>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/admin/dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="orders-section">
          <h2>All Customer Orders</h2>

          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <div className="admin-orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const orderId = order._id || order.id;
                    return (
                      <tr key={orderId}>
                        <td>{orderId.substring(0, 8)}</td>
                        <td>
                          <div>
                            <p className="customer-name">{order.customerName}</p>
                            <p className="customer-phone">{order.phone}</p>
                          </div>
                        </td>
                        <td>
                          <div className="order-items-list">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, idx) => (
                                <p key={idx}>
                                  {item.productId?.name || 'Unknown Product'} x {item.quantity}
                                </p>
                              ))
                            ) : (
                              <p>No items</p>
                            )}
                          </div>
                        </td>
                        <td className="total-cell">
                          ₹{parseFloat(order.totalPrice || 0).toFixed(2)}
                        </td>
                        <td>
                          <select
                            value={selectedStatus[orderId] || order.status}
                            onChange={(e) =>
                              handleStatusChange(orderId, e.target.value)
                            }
                            className="status-select"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <button className="btn-secondary">View Details</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="products-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Manage Products</h2>
            <button onClick={() => navigate('/admin/add-product')} className="btn-primary">
              + Add New Product
            </button>
          </div>

          {products.length === 0 ? (
            <p>No products yet.</p>
          ) : (
            <div className="admin-products-grid">
              {products.map((product) => (
                <div key={product._id || product.id} className="product-card-admin">
                  <div className="product-image-admin">
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} />
                    )}
                  </div>
                  <div className="product-info-admin">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">₹{parseFloat(product.price).toFixed(2)}</p>
                  </div>
                  <div className="product-actions-admin">
                    <button
                      onClick={() => navigate(`/admin/edit-product/${product._id || product.id}`)}
                      className="btn-secondary"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
