import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/api';
import './OrderConfirmation.css';

export const OrderConfirmationScreen = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orders = await orderService.getMyOrders();
        const foundOrder = orders.data.find((o) => o.id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        }
      } catch (err) {
        console.error('Failed to fetch order:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (isLoading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for your order. Your delicious chocolates will be delivered soon!
        </p>

        {order && (
          <div className="order-details">
            <div className="detail-row">
              <span className="label">Order ID:</span>
              <span className="value">{order.id}</span>
            </div>
            <div className="detail-row">
              <span className="label">Customer Name:</span>
              <span className="value">{order.customerName}</span>
            </div>
            <div className="detail-row">
              <span className="label">Shipping Address:</span>
              <span className="value">{order.shippingAddress}</span>
            </div>
            <div className="detail-row">
              <span className="label">Phone:</span>
              <span className="value">{order.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">Total Amount:</span>
              <span className="value">₹{parseFloat(order.totalPrice).toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className="value status">{order.status}</span>
            </div>
          </div>
        )}

        <div className="confirmation-actions">
          <button onClick={() => navigate('/products')} className="btn-primary">
            Continue Shopping
          </button>
          <button onClick={() => navigate('/profile')} className="btn-secondary">
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};
