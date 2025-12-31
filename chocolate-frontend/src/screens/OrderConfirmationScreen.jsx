import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/api';
import './OrderConfirmation.css';

const getDeliveryEstimate = (deliveryOption = 'standard') => {
  const today = new Date();
  let daysToAdd;
  let label;
  
  switch (deliveryOption) {
    case 'express':
      daysToAdd = 2;
      label = '2-3 days';
      break;
    case 'overnight':
      daysToAdd = 1;
      label = '1 day';
      break;
    default:
      daysToAdd = 5;
      label = '5-7 days';
  }
  
  const deliveryDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return {
    date: deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    label,
  };
};

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
              <span className="label">Estimated Delivery:</span>
              <span className="value delivery-date">
                {getDeliveryEstimate(order.deliveryOption).date}
                <span className="delivery-label">({getDeliveryEstimate(order.deliveryOption).label})</span>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Payment Method:</span>
              <span className="value payment-method">{(order.paymentMethod || 'card').toUpperCase()}</span>
            </div>
            <div className="detail-row">
              <span className="label">Total Amount:</span>
              <span className="value total-amount">₹{parseFloat(order.totalPrice).toFixed(2)}</span>
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
