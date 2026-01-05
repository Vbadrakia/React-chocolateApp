import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { products as allProducts } from '../services/api';

const ProductListScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const categories = ['All', 'Dark Chocolate', 'Milk Chocolate', 'White Chocolate', 'Truffles', 'Gift Boxes'];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      filterProducts();
      setIsLoading(false);
    }, 300);
  }, [searchTerm, selectedCategory, sortBy]);

  const filterProducts = () => {
    let filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(filtered);
  };

  if (isLoading && filteredProducts.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #2d1810 0%, #1a0f0a 50%, #0d0603 100%)',
          paddingTop: '70px'
        }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              background: 'rgba(212, 165, 116, 0.2)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 165, 116, 0.3)'
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #2d1810 0%, #1a0f0a 50%, #0d0603 100%)',
        paddingTop: '70px',
        paddingBottom: '60px'
      }}>
        {/* Header Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(101, 50, 15, 0.1) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212, 165, 116, 0.1)',
          padding: '50px 20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-100px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(139,69,19,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #f5deb3 0%, #d2a679 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '16px',
                textAlign: 'center',
                letterSpacing: '-0.02em',
                fontFamily: 'Georgia, serif'
              }}
            >
              Discover Premium Chocolates
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '1.1rem',
                color: '#d2a679',
                textAlign: 'center',
                marginBottom: '40px',
                maxWidth: '600px',
                margin: '20px auto'
              }}
            >
              Explore our curated collection of luxury chocolate selections
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}
            >
              <Search size={20} style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#d2a679'
              }} />
              <input
                type="text"
                placeholder="Search chocolates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 50px',
                  fontSize: '16px',
                  border: '2px solid rgba(212, 165, 116, 0.3)',
                  borderRadius: '16px',
                  background: 'rgba(212, 165, 116, 0.08)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontFamily: 'inherit',
                  color: '#f5deb3'
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 15px 60px rgba(212, 165, 116, 0.15)';
                  e.target.style.borderColor = '#d4a574';
                  e.target.style.background = 'rgba(212, 165, 116, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
                  e.target.style.borderColor = 'rgba(212, 165, 116, 0.3)';
                  e.target.style.background = 'rgba(212, 165, 116, 0.08)';
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Filters & Controls */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(101, 50, 15, 0.08) 100%)',
          backdropFilter: 'blur(20px)',
          padding: '25px 20px',
          position: 'sticky',
          top: '70px',
          zIndex: 100,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid rgba(212, 165, 116, 0.1)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
              {/* Categories */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: 1, minWidth: '300px' }}>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '10px 20px',
                      fontSize: '13px',
                      fontWeight: '600',
                      borderRadius: '50px',
                      border: selectedCategory === category ? '2px solid #d4a574' : '2px solid rgba(212, 165, 116, 0.2)',
                      background: selectedCategory === category
                        ? 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)'
                        : 'rgba(212, 165, 116, 0.05)',
                      color: selectedCategory === category ? '#1a0f0a' : '#d2a679',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: selectedCategory === category
                        ? '0 4px 12px rgba(212, 165, 116, 0.3)'
                        : 'none'
                    }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '10px 15px',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: '2px solid rgba(212, 165, 116, 0.2)',
                  background: 'rgba(212, 165, 116, 0.05)',
                  color: '#d2a679',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Mode Toggle */}
              <div style={{ display: 'flex', gap: '8px', borderRadius: '8px', background: 'rgba(212, 165, 116, 0.05)', padding: '6px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 12px',
                    background: viewMode === 'grid' ? '#d4a574' : 'transparent',
                    color: viewMode === 'grid' ? '#1a0f0a' : '#d2a679',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Grid size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px 12px',
                    background: viewMode === 'list' ? '#d4a574' : 'transparent',
                    color: viewMode === 'list' ? '#1a0f0a' : '#d2a679',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <List size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Display */}
        <section style={{
          maxWidth: '1400px',
          margin: '60px auto 0',
          padding: '0 20px'
        }}>
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#d2a679'
                }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🍫</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#f5deb3' }}>No Chocolates Found</h3>
                <p>Try adjusting your search or filters to discover more delicious options.</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                style={{
                  display: viewMode === 'grid'
                    ? 'grid'
                    : 'flex',
                  gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : 'none',
                  flexDirection: viewMode === 'list' ? 'column' : 'row',
                  gap: viewMode === 'grid' ? '30px' : '20px',
                  width: '100%'
                }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(212, 165, 116, 0.15)' }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(101, 50, 15, 0.08) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(212, 165, 116, 0.2)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      padding: viewMode === 'list' ? '20px' : '0',
                      display: viewMode === 'list' ? 'flex' : 'flex-direction',
                      gap: viewMode === 'list' ? '20px' : '0'
                    }}
                  >
                    {/* Badge */}
                    {index < 3 && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: viewMode === 'list' ? 'auto' : '15px',
                        left: viewMode === 'list' ? '15px' : 'auto',
                        background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                        color: '#1a0f0a',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        zIndex: 10,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {index === 0 ? 'Trending' : index === 1 ? 'New' : 'Premium'}
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: isInWishlist(product.id) 
                          ? 'rgba(212, 165, 116, 0.3)'
                          : 'rgba(139, 69, 19, 0.2)',
                        border: `1px solid ${isInWishlist(product.id) ? 'rgba(212, 165, 116, 0.5)' : 'rgba(212, 165, 116, 0.2)'}`,
                        borderRadius: '50%',
                        width: '45px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: isInWishlist(product.id) ? '#f5deb3' : '#d4a574',
                        zIndex: 15,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Heart 
                        size={22} 
                        fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                      />
                    </motion.button>

                    {/* Image */}
                    <div style={{
                      position: 'relative',
                      width: viewMode === 'list' ? '200px' : '100%',
                      height: viewMode === 'list' ? '200px' : '250px',
                      minWidth: viewMode === 'list' ? '200px' : 'auto',
                      overflow: 'hidden',
                      background: 'rgba(0, 0, 0, 0.2)'
                    }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>

                    {/* Content */}
                    <div style={{
                      padding: viewMode === 'list' ? '0' : '20px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        {/* Rating */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#d4a574', fontSize: '14px', fontWeight: '600' }}>
                            {'⭐'.repeat(Math.round(product.rating || 4.5))}
                          </span>
                          <span style={{ color: '#d2a679', fontSize: '12px' }}>
                            {product.rating || 4.5}
                          </span>
                        </div>

                        {/* Name */}
                        <h3 style={{
                          color: '#f5deb3',
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '6px',
                          lineHeight: '1.4',
                          fontFamily: 'Georgia, serif'
                        }}>
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                          color: '#d2a679',
                          fontSize: '13px',
                          marginBottom: '12px',
                          lineHeight: '1.4',
                          opacity: 0.9
                        }}>
                          {product.description}
                        </p>
                      </div>

                      {/* Price & Button */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px',
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(212, 165, 116, 0.1)'
                      }}>
                        <div>
                          <p style={{ color: '#d2a679', fontSize: '12px', marginBottom: '4px' }}>Price</p>
                          <p style={{
                            background: 'linear-gradient(135deg, #d4a574 0%, #d2a679 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: '18px',
                            fontWeight: '700'
                          }}>
                            ${product.price}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          style={{
                            padding: '10px 16px',
                            background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                            color: '#1a0f0a',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 15px rgba(212, 165, 116, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <ShoppingBag size={16} />
                          Add
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
};

export default ProductListScreen;
