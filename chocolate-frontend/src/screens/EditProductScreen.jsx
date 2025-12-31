import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { Modal } from '../components/Modal';
import {
  validateProductName,
  validatePrice,
  validateImageUrl,
  validateField,
} from '../utils/validation';
import './Admin.css';

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
    <div className="container">
      <div className="edit-product-header">
        <h1>Edit Product</h1>
        <button
          onClick={() => navigate('/admin')}
          className="btn-link"
        >
          ← Back to Admin
        </button>
      </div>

      <div className="add-product-form">
        {generalError && <div className="alert alert-error">{generalError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.name && errors.name && (
              <div className="form-error">{errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              required
            />
            {touched.description && errors.description && (
              <div className="form-error">{errors.description}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.price && errors.price && (
                <div className="form-error">{errors.price}</div>
              )}
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.imageUrl && errors.imageUrl && (
                <div className="form-error">{errors.imageUrl}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="2"
              placeholder="e.g., Chocolate, Sugar, Butter..."
            />
            {touched.ingredients && errors.ingredients && (
              <div className="form-error">{errors.ingredients}</div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              disabled={isSaving || isDeleting}
              className="btn-danger"
            >
              Delete Product
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

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
  );
};
