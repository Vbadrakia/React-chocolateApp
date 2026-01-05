import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

export const AddProductScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    ingredients: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user?.role !== 'admin') {
    navigate('/products');
    return null;
  }

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
    setSuccess('');
    setIsLoading(true);

    try {
      if (!formData.name || !formData.description || !formData.price) {
        throw new Error('Name, description, and price are required');
      }

      await productService.create(formData);
      setSuccess('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        ingredients: '',
      });

      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '65px', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', color: '#1d1d1f', marginBottom: '30px', fontWeight: '600' }}>Add New Product</h1>

          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px' }}>
            {error && <div style={{ backgroundColor: '#fee', color: '#c33', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}
            {success && <div style={{ backgroundColor: '#f0f9ff', color: '#0051d5', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{success}</div>}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d2d2d7',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d2d2d7',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d2d2d7',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d2d2d7',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Ingredients</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d2d2d7',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button 
                type="submit" 
                disabled={isLoading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: isLoading ? '#d2d2d7' : '#007aff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? 'Adding...' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f5f5f5',
                  color: '#007aff',
                  border: '1px solid #d2d2d7',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
