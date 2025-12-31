import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import './Profile.css';

export const ProfileScreen = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchOrders();

    // Auto-refresh every 5 seconds for real-time updates
    const interval = setInterval(() => {
      fetchOrders(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async (silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      const response = await orderService.getMyOrders();
      setOrders(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      if (!silent) setError('Failed to load orders');
      console.error(err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container"><p>Loading your orders...</p></div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Orders</h1>
        <div style={{ fontSize: '12px', color: '#888' }}>
          Last updated: {lastUpdated.toLocaleTimeString()} 
          <span style={{ marginLeft: '8px', color: '#28a745' }}>● Live</span>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const orderId = order._id || order.id;
            return (
              <div key={orderId} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{orderId.substring(0, 8)}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-body">
                  <div className="order-info">
                    <p>
                      <strong>Customer:</strong> {order.customerName}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingAddress}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.phone}
                    </p>
                  </div>

                  <div className="order-items">
                    <h4>Items:</h4>
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, idx) => (
                        <div key={idx} className="item-line">
                          <span>
                            {item.productId?.name || 'Unknown Product'} x {item.quantity}
                          </span>
                          <span>
                            ₹{(parseFloat(item.price || 0) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p>No items</p>
                    )}
                  </div>

                  <div className="order-total">
                    <strong>Total:</strong>{' '}
                    <strong className="total-amount">
                      ₹{parseFloat(order.totalPrice || 0).toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
