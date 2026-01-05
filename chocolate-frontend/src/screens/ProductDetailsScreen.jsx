import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { CartContext } from '../context/CartContext';
import { Navbar } from '../components/Navbar';

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
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: '18px', color: '#6e6e73' }}>Loading product...</p>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', paddingTop: '100px', padding: '40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ padding: '14px 16px', background: '#ffe5e5', color: '#c41e3a', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', border: '1px solid #ff3b30' }}>
            {error || 'Product not found'}
          </div>
          <button 
            onClick={() => navigate('/products')}
            style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #007aff, #0051d5)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}
          >
            Back to Products
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
          <button 
            onClick={() => navigate('/products')}
            style={{ padding: '8px 16px', background: '#f5f5f7', color: '#1d1d1f', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', marginBottom: '40px' }}
          >
            ← Back to Products
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            {/* Product Image */}
            <div style={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#f5f5f7', aspectRatio: '1' }}>
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6e6e73', fontSize: '18px' }}>
                  No image available
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.category && (
                <span style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(0, 122, 255, 0.1)', color: '#007aff', borderRadius: '100px', fontSize: '13px', fontWeight: '600', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  {product.category}
                </span>
              )}

              <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', color: '#1d1d1f', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                {product.name}
              </h1>

              <p style={{ fontSize: '18px', color: '#6e6e73', marginBottom: '32px', lineHeight: '1.6', letterSpacing: '-0.01em' }}>
                {product.description || 'Premium artisan chocolate crafted with care'}
              </p>

              <div style={{ fontSize: '40px', fontWeight: '700', color: '#1d1d1f', marginBottom: '40px', letterSpacing: '-0.03em' }}>
                ${parseFloat(product.price).toFixed(2)}
              </div>

              <button 
                onClick={handleAdd}
                style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #007aff, #0051d5)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px', boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)', transition: 'all 0.2s', letterSpacing: '-0.01em' }}
                onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 16px rgba(0, 122, 255, 0.4)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)'; }}
              >
                Add to Cart
              </button>

              <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
                  Why You'll Love It
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ fontSize: '15px', color: '#6e6e73', display: 'flex', gap: '8px', letterSpacing: '-0.01em' }}>
                    <span>✓</span> Handcrafted with premium Belgian chocolate
                  </li>
                  <li style={{ fontSize: '15px', color: '#6e6e73', display: 'flex', gap: '8px', letterSpacing: '-0.01em' }}>
                    <span>✓</span> Small-batch, slow-roasted for perfect flavor
                  </li>
                  <li style={{ fontSize: '15px', color: '#6e6e73', display: 'flex', gap: '8px', letterSpacing: '-0.01em' }}>
                    <span>✓</span> Made with honest, sustainably-sourced ingredients
                  </li>
                  <li style={{ fontSize: '15px', color: '#6e6e73', display: 'flex', gap: '8px', letterSpacing: '-0.01em' }}>
                    <span>✓</span> Free shipping on orders over $50
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
