import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { orderService } from '../services/api';
import './Checkout.css';

export const CheckoutScreen = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    shippingAddress: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cartItems.map((item) => ({
          productId: item.id || item._id,
          quantity: item.quantity,
        })),
      };

      console.log('Submitting order:', orderData);

      // Guard against any missing productId just in case
      const missing = orderData.items.find((it) => !it.productId);
      if (missing) {
        throw new Error('One or more cart items are missing product IDs. Please re-add items to cart.');
      }

      const response = await orderService.create(orderData);
      console.log('Order response:', response.data);

      const orderId = response.data.order?._id || response.data.order?.id;
      console.log('Order ID for navigation:', orderId);

      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to create order');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>No items in cart</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const total = getTotalPrice() + 50;

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Shipping Details</h2>
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Shipping Address</label>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>₹50</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
