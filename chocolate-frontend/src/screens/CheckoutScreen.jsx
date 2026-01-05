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
        <div style={{ paddingTop: '65px', minHeight: '100vh', background: 'linear-gradient(180deg, #2d1810 0%, #1a0f0a 50%, #0d0603 100%)' }}>
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
  const getShippingCost = () => {
    switch (formData.deliveryOption) {
      case 'express': return 150;
      case 'overnight': return 300;
      default: return 50;
    }
  };
  
  const getDeliveryDays = () => {
    switch (formData.deliveryOption) {
      case 'express': return '2-3 days';
      case 'overnight': return '1 day';
      default: return '5-7 days';
    }
  };

  const shipping = getShippingCost();
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '65px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <h1 style={{ fontSize: '32px', color: '#1d1d1f', marginBottom: '30px', fontWeight: '600' }}>Checkout</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px' }}>
            {/* Main Form */}
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px' }}>
              <h2 style={{ fontSize: '20px', color: '#1d1d1f', marginBottom: '20px', fontWeight: '600' }}>Shipping Details</h2>
              {generalError && (
                <div style={{ backgroundColor: '#fee', color: '#c33', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                  {generalError}
                </div>
              )}

              {/* Full Name */}
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="customerName" style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500', fontSize: '14px' }}>
                  Full Name
                </label>
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
                    boxSizing: 'border-box',
                    backgroundColor: '#fff',
                    transition: 'border-color 0.3s'
                  }}
                />
                {errors.customerName && touched.customerName && (
                  <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.customerName}</div>
                )}
              </div>

              {/* Address */}
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="shippingAddress" style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500', fontSize: '14px' }}>
                  Street Address
                </label>
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
                    boxSizing: 'border-box',
                    backgroundColor: '#fff',
                    transition: 'border-color 0.3s'
                  }}
                />
                {errors.shippingAddress && touched.shippingAddress && (
                  <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.shippingAddress}</div>
                )}
              </div>

              {/* City & State */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label htmlFor="city" style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500', fontSize: '14px' }}>
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Mumbai"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.city && touched.city ? '2px solid #c33' : '1px solid #d2d2d7',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fff',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  {errors.city && touched.city && (
                    <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.city}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="state" style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500', fontSize: '14px' }}>
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Maharashtra"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.state && touched.state ? '2px solid #c33' : '1px solid #d2d2d7',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fff',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  {errors.state && touched.state && (
                    <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.state}</div>
                  )}
                </div>
              </div>

              {/* Postal Code & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label htmlFor="postalCode" style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500', fontSize: '14px' }}>
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., 400001"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.postalCode && touched.postalCode ? '2px solid #c33' : '1px solid #d2d2d7',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fff',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  {errors.postalCode && touched.postalCode && (
                    <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.postalCode}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500', fontSize: '14px' }}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., 9876543210"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.phone && touched.phone ? '2px solid #c33' : '1px solid #d2d2d7',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fff',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  {errors.phone && touched.phone && (
                    <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</div>
                  )}
                </div>
              </div>

              {/* Delivery Options */}
              <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e5e5ea' }}>
                <h3 style={{ fontSize: '16px', color: '#1d1d1f', marginBottom: '15px', fontWeight: '600' }}>Delivery Options</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { value: 'standard', label: 'Standard (5-7 days)', cost: 50 },
                    { value: 'express', label: 'Express (2-3 days)', cost: 150 },
                    { value: 'overnight', label: 'Overnight (1 day)', cost: 300 },
                  ].map((option) => (
                    <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', borderRadius: '8px', backgroundColor: formData.deliveryOption === option.value ? '#f0f7ff' : 'transparent', transition: 'background-color 0.2s' }}>
                      <input
                        type="radio"
                        name="deliveryOption"
                        value={option.value}
                        checked={formData.deliveryOption === option.value}
                        onChange={handleChange}
                        style={{ cursor: 'pointer', marginRight: '12px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500', color: '#1d1d1f' }}>{option.label}</div>
                      </div>
                      <div style={{ fontWeight: '600', color: '#007aff' }}>₹{option.cost}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e5e5ea' }}>
                <h3 style={{ fontSize: '16px', color: '#1d1d1f', marginBottom: '15px', fontWeight: '600' }}>Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { value: 'card', label: 'Credit/Debit Card' },
                    { value: 'upi', label: 'UPI (Google Pay, PhonePe, etc.)' },
                    { value: 'netbanking', label: 'Net Banking' },
                    { value: 'wallet', label: 'Digital Wallet' },
                    { value: 'cod', label: 'Cash on Delivery' },
                  ].map((method) => (
                    <label key={method.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', borderRadius: '8px', backgroundColor: formData.paymentMethod === method.value ? '#f0f7ff' : 'transparent', transition: 'background-color 0.2s' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleChange}
                        style={{ cursor: 'pointer', marginRight: '12px' }}
                      />
                      <span style={{ color: '#1d1d1f', fontWeight: '500' }}>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading || Object.keys(errors).length > 0}
                style={{
                  width: '100%',
                  marginTop: '30px',
                  padding: '14px 24px',
                  backgroundColor: isLoading || Object.keys(errors).length > 0 ? '#d2d2d7' : '#007aff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isLoading || Object.keys(errors).length > 0 ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => !isLoading && !Object.keys(errors).length > 0 && (e.target.style.backgroundColor = '#0051d5')}
                onMouseLeave={(e) => !isLoading && !Object.keys(errors).length > 0 && (e.target.style.backgroundColor = '#007aff')}
              >
                {isLoading ? 'Processing Order...' : 'Place Order'}
              </button>
            </form>

            {/* Order Summary Sidebar */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', height: 'fit-content', position: 'sticky', top: '85px' }}>
              <button 
                onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e5ea'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              >
                <span>Order Summary</span>
                <span style={{ fontSize: '12px' }}>{orderSummaryOpen ? '▼' : '▶'}</span>
              </button>

              {orderSummaryOpen && (
                <>
                  <div style={{ marginTop: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e5ea' }}>
                    {cartItems.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                        <span>{item.name} x{item.quantity}</span>
                        <span style={{ fontWeight: '500', color: '#1d1d1f' }}>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#666' }}>
                      <span>Shipping ({getDeliveryDays()})</span>
                      <span>₹{shipping}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #e5e5ea', fontSize: '16px', fontWeight: '600', color: '#1d1d1f' }}>
                      <span>Total</span>
                      <span style={{ color: '#007aff' }}>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
