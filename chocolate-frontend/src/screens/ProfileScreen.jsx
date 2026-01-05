import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { Modal } from '../components/Modal';
import { Navbar } from '../components/Navbar';
import { validateField, validateEmail, validatePhone } from '../utils/validation';

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Profile edit state
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [profileTouched, setProfileTouched] = useState({});
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Address management state
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [addressErrors, setAddressErrors] = useState({});

  useEffect(() => {
    fetchOrders();

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

  const validateProfileField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        const nameVal = validateField(value, 'Name', 2, 50);
        error = nameVal.valid ? '' : nameVal.message;
        break;
      case 'email':
        const emailVal = validateEmail(value);
        error = emailVal.valid ? '' : emailVal.message;
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (profileTouched[name]) {
      const error = validateProfileField(name, value);
      setProfileErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleProfileBlur = (e) => {
    const { name } = e.target;
    setProfileTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateProfileField(name, profileData[name]);
    setProfileErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSaveProfile = async () => {
    const newErrors = {};
    for (const field of ['name', 'email', 'phone']) {
      const error = validateProfileField(field, profileData[field]);
      if (error) newErrors[field] = error;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setProfileErrors(newErrors);
      showToast('Please fix the errors', 'error');
      return;
    }

    setIsUpdatingProfile(true);
    try {
      if (updateProfile) {
        await updateProfile(profileData);
      }
      showToast('✓ Profile updated successfully!', 'success', 3000);
      setEditMode(false);
    } catch (err) {
      showToast('Error updating profile', 'error');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleAddAddress = () => {
    setAddressForm({ label: '', street: '', city: '', state: '', postalCode: '' });
    setEditingAddressId(null);
    setShowAddressForm(true);
  };

  const handleSaveAddress = () => {
    const newErrors = {};
    if (!addressForm.label) newErrors.label = 'Label is required';
    if (!addressForm.street) newErrors.street = 'Street address is required';
    if (!addressForm.city) newErrors.city = 'City is required';
    if (!addressForm.state) newErrors.state = 'State is required';
    if (!addressForm.postalCode || addressForm.postalCode.length < 5) newErrors.postalCode = 'Valid postal code required';

    if (Object.keys(newErrors).length > 0) {
      setAddressErrors(newErrors);
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddressId ? { ...addressForm, id: editingAddressId } : addr))
      );
      showToast('✓ Address updated!', 'success', 2000);
    } else {
      setAddresses((prev) => [...prev, { ...addressForm, id: Date.now() }]);
      showToast('✓ Address added!', 'success', 2000);
    }

    setShowAddressForm(false);
    setAddressForm({ label: '', street: '', city: '', state: '', postalCode: '' });
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    showToast('✓ Address deleted!', 'success', 2000);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: '18px', color: '#6e6e73' }}>Loading your profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '40px', fontWeight: '700', color: '#1d1d1f', letterSpacing: '-0.03em' }}>My Profile</h1>
            <button onClick={() => logout()} style={{ padding: '10px 20px', background: '#ff3b30', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Logout
            </button>
          </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Info
        </button>
        <button
          className={`tab-button ${activeTab === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          Addresses
        </button>
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {activeTab === 'profile' && (
        <div className="profile-section">
          <div className="section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Account Information</h2>
              {!editMode && (
                <button onClick={() => setEditMode(true)} className="btn-secondary">
                  Edit Profile
                </button>
              )}
            </div>

            {editMode ? (
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    onBlur={handleProfileBlur}
                  />
                  {profileTouched.name && profileErrors.name && (
                    <div className="form-error">{profileErrors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    onBlur={handleProfileBlur}
                  />
                  {profileTouched.email && profileErrors.email && (
                    <div className="form-error">{profileErrors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    onBlur={handleProfileBlur}
                  />
                  {profileTouched.phone && profileErrors.phone && (
                    <div className="form-error">{profileErrors.phone}</div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isUpdatingProfile}
                    className="btn-primary"
                  >
                    {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setProfileData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
                      setProfileErrors({});
                      setProfileTouched({});
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{profileData.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{profileData.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Phone:</span>
                  <span className="value">{profileData.phone}</span>
                </div>
                <div className="info-row">
                  <span className="label">Member Since:</span>
                  <span className="value">December 2024</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="addresses-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>My Addresses</h2>
            {!showAddressForm && (
              <button onClick={handleAddAddress} className="btn-primary">
                + Add New Address
              </button>
            )}
          </div>

          {showAddressForm && (
            <div className="section-card address-form">
              <h3>{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
              <div className="form-group">
                <label>Label (e.g., Home, Office)</label>
                <input
                  type="text"
                  value={addressForm.label}
                  onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                  placeholder="e.g., Home"
                />
                {addressErrors.label && <div className="form-error">{addressErrors.label}</div>}
              </div>

              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  placeholder="123 Main Street"
                />
                {addressErrors.street && <div className="form-error">{addressErrors.street}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    placeholder="Mumbai"
                  />
                  {addressErrors.city && <div className="form-error">{addressErrors.city}</div>}
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    placeholder="Maharashtra"
                  />
                  {addressErrors.state && <div className="form-error">{addressErrors.state}</div>}
                </div>

                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    placeholder="400001"
                  />
                  {addressErrors.postalCode && <div className="form-error">{addressErrors.postalCode}</div>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button onClick={handleSaveAddress} className="btn-primary">
                  Save Address
                </button>
                <button
                  onClick={() => {
                    setShowAddressForm(false);
                    setAddressForm({ label: '', street: '', city: '', state: '', postalCode: '' });
                    setAddressErrors({});
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="addresses-list">
            {addresses.length === 0 ? (
              <p className="no-data">No addresses added yet. Add one to make checkout faster!</p>
            ) : (
              addresses.map((address) => (
                <div key={address.id} className="address-card">
                  <h4>{address.label}</h4>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.postalCode}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                      onClick={() => {
                        setAddressForm(address);
                        setEditingAddressId(address.id);
                        setShowAddressForm(true);
                      }}
                      className="btn-secondary"
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="btn-danger"
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="orders-section">
          <h2>My Orders</h2>

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
      )}
        </div>
      </div>
    </>
  );
};

