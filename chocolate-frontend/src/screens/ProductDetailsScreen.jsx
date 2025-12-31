import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';

export const ProductDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await productService.getById(id);
        setProduct(res.data);
      } catch (err) {
        setError('Unable to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    }
  };

  if (isLoading) {
    return <div className="container"><p>Loading product...</p></div>;
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="alert alert-error">{error || 'Product not found'}</div>
        <button className="btn-primary" onClick={() => navigate('/products')}>Back to products</button>
      </div>
    );
  }

  const notes = product.description ? product.description.split('.') : [];

  return (
    <div className="container product-details">
      <div className="pd-hero">
        <div className="pd-info">
          <p className="pd-kicker">Signature Tablet</p>
          <h1>{product.name}</h1>
          <p className="pd-subtitle">Crafted in small batches with honest ingredients and slow-roasted cocoa.</p>

          <div className="pd-price-row">
            <span className="pd-price">₹{parseFloat(product.price).toFixed(2)}</span>
            {product.category && <span className="pill pill-muted">{product.category}</span>}
          </div>

          <p className="pd-desc">{product.description}</p>

          <div className="pd-actions">
            <button className="btn-primary" onClick={handleAdd}>Add to Cart</button>
            <button className="ghost-btn" onClick={() => navigate('/products')}>Back to Collection</button>
          </div>

          {notes.length > 1 && (
            <div className="pd-notes">
              <h4>Tasting notes</h4>
              <ul>
                {notes.filter((n) => n.trim().length > 0).map((n, idx) => (
                  <li key={idx}>{n.trim()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pd-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="pd-image-placeholder">No image</div>
          )}
        </div>
      </div>
    </div>
  );
};
