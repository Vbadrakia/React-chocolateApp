import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/api';
import { Navbar } from '../components/Navbar';

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
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '65px', minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '16px', color: '#666' }}>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '65px', minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', maxWidth: '500px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {/* Success Checkmark */}
          <div style={{ fontSize: '64px', color: '#34c759', marginBottom: '20px' }}>✓</div>
          <h1 style={{ fontSize: '28px', color: '#1d1d1f', marginBottom: '12px', fontWeight: '600' }}>Order Confirmed!</h1>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
            Thank you for your order. Your delicious chocolates will be delivered soon!
          </p>

          {order && (
            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '20px', marginBottom: '30px', textAlign: 'left' }}>
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e5ea', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Order ID:</span>
                <span style={{ color: '#1d1d1f', fontWeight: '600', fontSize: '14px' }}>{order.id || order._id}</span>
              </div>
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e5ea', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Customer Name:</span>
                <span style={{ color: '#1d1d1f', fontWeight: '600', fontSize: '14px' }}>{order.customerName}</span>
              </div>
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e5ea', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Shipping Address:</span>
                <span style={{ color: '#1d1d1f', fontWeight: '600', fontSize: '14px', textAlign: 'right', marginLeft: '10px' }}>{order.shippingAddress}</span>
              </div>
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e5ea', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Phone:</span>
                <span style={{ color: '#1d1d1f', fontWeight: '600', fontSize: '14px' }}>{order.phone}</span>
              </div>
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e5ea', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Estimated Delivery:</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#1d1d1f', fontWeight: '600', fontSize: '14px' }}>
                    {getDeliveryEstimate(order.deliveryOption).date}
                  </div>
                  <div style={{ color: '#666', fontSize: '12px' }}>
                    ({getDeliveryEstimate(order.deliveryOption).label})
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e5ea', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Payment Method:</span>
                <span style={{ color: '#1d1d1f', fontWeight: '600', fontSize: '14px', backgroundColor: '#f0f7ff', padding: '4px 8px', borderRadius: '4px' }}>
                  {(order.paymentMethod || 'card').toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Total Amount:</span>
                <span style={{ color: '#007aff', fontWeight: '600', fontSize: '16px' }}>
                  ₹{parseFloat(order.totalPrice || 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button 
              onClick={() => navigate('/products')} 
              style={{
                padding: '12px 20px',
                backgroundColor: '#007aff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0051d5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#007aff'}
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/profile')} 
              style={{
                padding: '12px 20px',
                backgroundColor: '#f5f5f5',
                color: '#007aff',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e5ea'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
