import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';
import { SkeletonGrid } from '../components/Skeleton';
import './ProductList.css';

export const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const filters = ['All', 'Dark', 'Milk', 'Fruit', 'Nut', 'Bestseller'];

  // Mock products for demo/development
  const mockProducts = [
    {
      id: '1',
      name: 'Dark Chocolate Bliss',
      description: 'Rich 72% dark chocolate with notes of espresso and berries',
      price: 499,
      category: 'Dark',
      imageUrl: 'https://images.unsplash.com/photo-1599599810694-e5ffc5e0e8b4?w=400&h=400&fit=crop',
    },
    {
      id: '2',
      name: 'Milk Chocolate Dream',
      description: 'Smooth milk chocolate with creamy caramel filling',
      price: 399,
      category: 'Milk',
      imageUrl: 'https://images.unsplash.com/photo-1599599810694-e5ffc5e0e8b4?w=400&h=400&fit=crop',
    },
    {
      id: '3',
      name: 'Fruit & Nut Medley',
      description: 'Dark chocolate studded with dried fruits and roasted nuts',
      price: 599,
      category: 'Fruit',
      imageUrl: 'https://images.unsplash.com/photo-1599599810694-e5ffc5e0e8b4?w=400&h=400&fit=crop',
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await productService.getAll();
      // Handle different response formats
      let data = response.data;
      
      // If data is wrapped in another data property, unwrap it
      if (data && typeof data === 'object' && data.data && Array.isArray(data.data)) {
        data = data.data;
      }
      
      // Ensure data is always an array
      if (!Array.isArray(data) || data.length === 0) {
        console.warn('API response is not an array or empty:', data);
        // Use mock data as fallback
        setProducts(mockProducts);
        setError('Backend not connected. Showing demo products.');
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      // On error, show mock products
      setProducts(mockProducts);
      setError('Backend connection failed. Showing demo products. Please deploy backend to Railway.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart - product:', product);
    addToCart(product);
    showToast(`✓ ${product.name} added to cart`, 'success', 2500);
  };

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      console.warn('Products is not an array:', products);
      return [];
    }
    if (selectedFilter === 'All') return products;
    const term = selectedFilter.toLowerCase();
    return products.filter((p) =>
      [p.name, p.description, p.category]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    );
  }, [products, selectedFilter]);

  if (isLoading) {
    return <SkeletonGrid count={6} />;
  }

  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content animate-fade-up">
          <p className="hero-kicker">Bean-to-bar craftsmanship</p>
          <h1>Small-batch chocolates, crafted with care.</h1>
          <p className="hero-subtitle">
            Taste layered cocoa notes, slow roasting, and honest ingredients inspired by the finest chocolate boutiques.
          </p>
          <div className="hero-actions">
            <a className="hero-btn" href="#products">Shop Collection</a>
            <a className="hero-link" href="#story">Our Story</a>
          </div>
        </div>
      </section>

      <div className="container" id="products">
        <div className="section-header animate-fade-up">
          <div>
            <p className="section-kicker">Signature range</p>
            <h2>Explore our chocolates</h2>
          </div>
          <div className="section-note">{filteredProducts.length} items · Small batches, crafted with care.</div>
        </div>

        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-chip ${selectedFilter === f ? 'active' : ''}`}
              onClick={() => setSelectedFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {error && (
          <div className="alert alert-warning" style={{ marginBottom: '20px' }}>
            {error}
            <button onClick={fetchProducts} className="btn-primary" style={{ marginLeft: '10px', marginTop: '8px' }}>
              Retry
            </button>
          </div>
        )}

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <p>No products available</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.imageUrl && (
                  <div className="product-image-wrap">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                )}
                <div className="product-body">
                  <div className="product-top">
                    <h3>{product.name}</h3>
                    <span className="price">₹{parseFloat(product.price).toFixed(2)}</span>
                  </div>
                  {product.category && (
                    <p className="pill pill-muted">{product.category}</p>
                  )}
                  <p className="description">{product.description}</p>
                  <div className="product-actions">
                    <Link to={`/products/${product.id}`} className="ghost-btn">View Details</Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn-primary product-cta"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Our Story */}
      <section id="story" className="story-section">
        <div className="container">
          <div className="section-header animate-fade-up">
            <div>
              <p className="section-kicker">About us</p>
              <h2>Our Story</h2>
            </div>
          </div>
          <div className="story-content animate-fade-up">
            <p>
              Founded in 2015, our chocolate journey began with a passion for authentic, bean-to-bar craftsmanship. Inspired by the finest
              chocolatiers, we source single-origin cacao beans from sustainable farms around the world. Each bar is handcrafted in small batches,
              ensuring unparalleled flavor and quality.
            </p>
            <p>
              Our mission is to bring the art of chocolate-making back to its roots, celebrating the rich history and cultural significance of this beloved
              treat. From the careful selection of beans to the meticulous tempering process, every step is guided by tradition and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="craftsmanship-section">
        <div className="container">
          <div className="section-header animate-fade-up">
            <div>
              <p className="section-kicker">Our process</p>
              <h2>Craftsmanship</h2>
            </div>
          </div>
          <div className="craftsmanship-content">
            <div className="craftsmanship-grid">
              <div className="craftsmanship-item animate-fade-up">
                <h3>Bean Selection</h3>
                <p>
                  We carefully select premium cacao beans from regions known for their exceptional quality, ensuring the foundation of our chocolates is
                  second to none.
                </p>
              </div>
              <div className="craftsmanship-item animate-fade-up">
                <h3>Roasting</h3>
                <p>
                  Our beans are roasted slowly at low temperatures to develop complex flavor profiles, preserving the natural aromas and nuances of each
                  origin.
                </p>
              </div>
              <div className="craftsmanship-item animate-fade-up">
                <h3>Conching</h3>
                <p>
                  The conching process refines the chocolate for up to 72 hours, creating a smooth texture and allowing flavors to fully develop.
                </p>
              </div>
              <div className="craftsmanship-item animate-fade-up">
                <h3>Tempering</h3>
                <p>
                  Precise tempering ensures our chocolate has the perfect snap, shine, and mouthfeel that defines exceptional craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content animate-fade-up">
            <div className="footer-section">
              <h3>Chocolate App</h3>
              <p>Small-batch chocolates, crafted with care.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#products">Shop</a></li>
                <li><a href="#story">Our Story</a></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@chocolateapp.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Chocolate App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
