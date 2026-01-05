import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { orderService } from '../services/api';
import { Navbar } from '../components/Navbar';
import {
  validateField,
  validateAddress,
  validatePhone,
} from '../utils/validation';

export const CheckoutScreen = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    shippingAddress: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'card',
    deliveryOption: 'standard',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);

  const validateCheckoutField = (name, value) => {
    let error = '';
    switch (name) {
      case 'customerName':
        const nameVal = validateField(value, 'Name', 2, 50);
        error = nameVal.valid ? '' : nameVal.message;
        break;
      case 'shippingAddress':
        const addrVal = validateAddress(value);
        error = addrVal.valid ? '' : addrVal.message;
        break;
      case 'city':
        const cityVal = validateField(value, 'City', 2, 50);
        error = cityVal.valid ? '' : cityVal.message;
        break;
      case 'state':
        const stateVal = validateField(value, 'State', 2, 50);
        error = stateVal.valid ? '' : stateVal.message;
        break;
      case 'postalCode':
        const postalVal = validateField(value, 'Postal Code', 5, 10);
        error = postalVal.valid ? '' : postalVal.message;
        break;
      case 'phone':
        const phoneVal = validatePhone(value);
        error = phoneVal.valid ? '' : phoneVal.message;
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateCheckoutField(name, value);
      if (error) {
        setErrors({ ...errors, [name]: error });
      } else {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateCheckoutField(name, formData[name]);
    if (error) {
      setErrors({ ...errors, [name]: error });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateCheckoutField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        customerName: true,
        shippingAddress: true,
        city: true,
        state: true,
        postalCode: true,
        phone: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        customerName: formData.customerName,
        shippingAddress: `${formData.shippingAddress}, ${formData.city}, ${formData.state} - ${formData.postalCode}`,
        phone: formData.phone,
        items: cartItems.map((item) => ({
          productId: item.id || item._id,
          quantity: item.quantity,
        })),
      };

      const response = await orderService.create(orderData);
      const orderId = response.data.order?._id || response.data.order?.id;

      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      setGeneralError(err.response?.data?.error || 'Failed to create order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '65px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            <h2 style={{ fontSize: '24px', color: '#1d1d1f' }}>No items in cart</h2>
            <button 
              onClick={() => navigate('/products')} 
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: '#007aff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0051d5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#007aff'}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  const subtotal = getTotalPrice();
  
  // Calculate shipping based on delivery option
  const getShippingCost = () => {
    switch (formData.deliveryOption) {
      case 'express': return 150;
      case 'overnight': return 300;
      default: return 50; // standard
    }
  };
  
  const getDeliveryDays = () => {
    switch (formData.deliveryOption) {
      case 'express': return '2-3 days';
      case 'overnight': return '1 day';
      default: return '5-7 days'; // standard
    }
  };

  const shipping = getShippingCost();
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '65px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <h1 style={{ fontSize: '32px', color: '#1d1d1f', marginBottom: '30px' }}>Checkout</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px' }}>
              <h2 style={{ fontSize: '20px', color: '#1d1d1f', marginBottom: '20px' }}>Shipping Details</h2>
              {generalError && <div style={{ backgroundColor: '#fee', color: '#c33', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{generalError}</div>}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="customerName" style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Full Name</label>
                  <input
                    id="customerName"
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.customerName && touched.customerName ? '2px solid #c33' : '1px solid #d2d2d7',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.customerName && touched.customerName && (
                    <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.customerName}</div>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="shippingAddress" style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Street Address</label>
                  <input
                    id="shippingAddress"
                    type="text"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., 123 Main Street"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.shippingAddress && touched.shippingAddress ? '2px solid #c33' : '1px solid #d2d2d7',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
              />
              {errors.shippingAddress && touched.shippingAddress && (
                <div className="form-error">{errors.shippingAddress}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., Mumbai"
                  className={errors.city && touched.city ? 'input-error' : ''}
                />
                {errors.city && touched.city && (
                  <div className="form-error">{errors.city}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., Maharashtra"
                  className={errors.state && touched.state ? 'input-error' : ''}
                />
                {errors.state && touched.state && (
                  <div className="form-error">{errors.state}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., 400001"
                className={errors.postalCode && touched.postalCode ? 'input-error' : ''}
              />
              {errors.postalCode && touched.postalCode && (
                <div className="form-error">{errors.postalCode}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., 9876543210"
                className={errors.phone && touched.phone ? 'input-error' : ''}
              />
              {errors.phone && touched.phone && (
                <div className="form-error">{errors.phone}</div>
              )}
            </div>

            <div className="form-divider"></div>

            <h3>Delivery Options</h3>
            <div className="delivery-options">
              {[
                { value: 'standard', label: 'Standard (5-7 days)', cost: 50 },
                { value: 'express', label: 'Express (2-3 days)', cost: 150 },
                { value: 'overnight', label: 'Overnight (1 day)', cost: 300 },
              ].map((option) => (
                <label key={option.value} className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value={option.value}
                    checked={formData.deliveryOption === option.value}
                    onChange={handleChange}
                  />
                  <span className="option-label">
                    <strong>{option.label}</strong>
                    <span className="option-cost">₹{option.cost}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="form-divider"></div>

            <h3>Payment Method</h3>
            <div className="payment-options">
              {[
                { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
                { value: 'upi', label: 'UPI (Google Pay, PhonePe, etc.)', icon: '📱' },
                { value: 'netbanking', label: 'Net Banking', icon: '🏦' },
                { value: 'wallet', label: 'Digital Wallet', icon: '👛' },
                { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
              ].map((method) => (
                <label key={method.value} className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={formData.paymentMethod === method.value}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <span className="payment-icon">{method.icon}</span>
                    <strong>{method.label}</strong>
                  </span>
                </label>
              ))}
            </div>

            <button 
              type="submit" 
              className="btn-primary btn-lg" 
              disabled={isLoading || Object.keys(errors).length > 0}
            >
              {isLoading ? 'Processing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <button 
            className="summary-toggle"
            onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
          >
            <span>Order Summary ({cartItems.length} items)</span>
            <span>{orderSummaryOpen ? '▼' : '▶'}</span>
          </button>

          {orderSummaryOpen && (
            <>
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
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping ({getDeliveryDays()}):</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="summary-row">
                  <span>Payment:</span>
                  <span className="payment-badge">{formData.paymentMethod.toUpperCase()}</span>
                </div>
                <div className="summary-total">
                  <span>Total:</span>
                  <span className="total-amount">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};
