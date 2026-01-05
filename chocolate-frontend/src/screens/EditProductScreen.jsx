import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { Modal } from '../components/Modal';
import { Navbar } from '../components/Navbar';
import {
  validateProductName,
  validatePrice,
  validateImageUrl,
  validateField,
} from '../utils/validation';

export const EditProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    ingredients: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/products');
      return;
    }

    fetchProduct();
  }, [user, navigate, id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getById(id);
      setFormData({
        name: response.data.name || '',
        description: response.data.description || '',
        price: response.data.price || '',
        imageUrl: response.data.imageUrl || '',
        ingredients: response.data.ingredients || '',
      });
      setGeneralError('');
    } catch (err) {
      setGeneralError(err.response?.data?.error || 'Failed to load product');
      showToast('Error loading product', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        const nameVal = validateProductName(value);
        error = nameVal.valid ? '' : nameVal.message;
        break;
      case 'description':
        const descVal = validateField(value, 'Description', 10, 500);
        error = descVal.valid ? '' : descVal.message;
        break;
      case 'price':
        const priceVal = validatePrice(value);
        error = priceVal.valid ? '' : priceVal.message;
        break;
      case 'imageUrl':
        const imgVal = validateImageUrl(value);
        error = imgVal.valid ? '' : imgVal.message;
        break;
      case 'ingredients':
        const ingVal = validateField(value, 'Ingredients', 5, 200);
        error = ingVal.valid ? '' : ingVal.message;
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
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'description', 'price'];
    
    for (const field of requiredFields) {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      showToast('Please fix the form errors', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await productService.update(id, formData);
      showToast('✓ Product updated successfully!', 'success', 3000);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to update product';
      setGeneralError(errorMsg);
      showToast('Error: ' + errorMsg, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await productService.delete(id);
      showToast('✓ Product deleted successfully!', 'success', 3000);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to delete product';
      showToast('Error: ' + errorMsg, 'error');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return <div className="container"><p>Loading product...</p></div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '65px', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '32px', color: '#1d1d1f', fontWeight: '600', margin: '0' }}>Edit Product</h1>
            <button
              onClick={() => navigate('/admin')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#007aff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              ← Back to Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px' }}>
            {generalError && <div style={{ backgroundColor: '#fee', color: '#c33', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>{generalError}</div>}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: touched.name && errors.name ? '2px solid #c33' : '1px solid #d2d2d7',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {touched.name && errors.name && (
                <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.name}</div>
              )}
            </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: touched.description && errors.description ? '2px solid #c33' : '1px solid #d2d2d7',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
            {touched.description && errors.description && (
              <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.description}</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Price (₹) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: touched.price && errors.price ? '2px solid #c33' : '1px solid #d2d2d7',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {touched.price && errors.price && (
                <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.price}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: touched.imageUrl && errors.imageUrl ? '2px solid #c33' : '1px solid #d2d2d7',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {touched.imageUrl && errors.imageUrl && (
                <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.imageUrl}</div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#1d1d1f', fontWeight: '500' }}>Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="2"
              placeholder="e.g., Chocolate, Sugar, Butter..."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: touched.ingredients && errors.ingredients ? '2px solid #c33' : '1px solid #d2d2d7',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
            {touched.ingredients && errors.ingredients && (
              <div style={{ color: '#c33', fontSize: '12px', marginTop: '4px' }}>{errors.ingredients}</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                padding: '12px 24px',
                backgroundColor: isSaving ? '#d2d2d7' : '#007aff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isSaving ? 'not-allowed' : 'pointer'
              }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              disabled={isSaving || isDeleting}
              style={{
                padding: '12px 24px',
                backgroundColor: '#fee2e2',
                color: '#c33',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isSaving || isDeleting ? 'not-allowed' : 'pointer',
                opacity: isSaving || isDeleting ? 0.5 : 1
              }}
            >
              Delete Product
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

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Product"
          size="small"
          actions={[
            {
              label: 'Cancel',
              onClick: () => setShowDeleteModal(false),
              variant: 'secondary',
            },
            {
              label: isDeleting ? 'Deleting...' : 'Delete',
              onClick: handleDelete,
              variant: 'danger',
              disabled: isDeleting,
            },
          ]}
        >
          <p>Are you sure you want to delete this product? This action cannot be undone.</p>
        </Modal>
      </div>
    </div>
    </>
  );
};
