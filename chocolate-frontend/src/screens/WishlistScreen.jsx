import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { Trash2, ShoppingBag, Heart, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WishlistScreen = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #2d1810 0%, #1a0f0a 50%, #0d0603 100%)',
          paddingTop: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 20px 40px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              maxWidth: '600px',
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(101, 50, 15, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
              padding: '80px 60px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(212, 165, 116, 0.2)'
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                type: 'smooth'
              }}
              style={{
                marginBottom: '30px',
                fontSize: '80px'
              }}
            >
              <Heart color="#d4a574" fill="#d4a574" size={80} />
            </motion.div>
            <h2 style={{
              color: '#f5deb3',
              fontSize: '32px',
              fontFamily: 'Georgia, serif',
              marginBottom: '15px',
              fontWeight: 600
            }}>
              Your Wishlist is Empty
            </h2>
            <p style={{
              color: '#d2a679',
              fontSize: '16px',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Add your favorite chocolate products to your wishlist and save them for later. Start exploring our delicious collection!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              style={{
                background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                color: '#0d0603',
                border: 'none',
                padding: '14px 40px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}
            >
              <ShoppingBag size={20} />
              Explore Products
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
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
        paddingTop: '120px',
        paddingBottom: '60px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '50px',
              gap: '15px'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              style={{
                background: 'rgba(212, 165, 116, 0.1)',
                border: '1px solid rgba(212, 165, 116, 0.3)',
                color: '#d4a574',
                padding: '10px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <div>
              <h1 style={{
                color: '#f5deb3',
                fontSize: '42px',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                margin: '0'
              }}>
                My Wishlist
              </h1>
              <p style={{
                color: '#d2a679',
                fontSize: '14px',
                margin: '5px 0 0 0'
              }}>
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </motion.div>

          {/* Wishlist Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '30px'
              }}
            >
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(`/products/${item.id}`)}
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(101, 50, 15, 0.08) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(212, 165, 116, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image Section */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '280px',
                    backgroundColor: 'rgba(45, 24, 16, 0.5)',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(item.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(139, 69, 19, 0.9)',
                        border: '1px solid rgba(212, 165, 116, 0.5)',
                        borderRadius: '50%',
                        width: '45px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#f5deb3'
                      }}
                    >
                      <Trash2 size={22} />
                    </motion.button>
                  </div>

                  {/* Content Section */}
                  <div style={{
                    padding: '20px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <h3 style={{
                      color: '#f5deb3',
                      fontSize: '18px',
                      fontWeight: '600',
                      margin: '0 0 8px 0',
                      fontFamily: 'Georgia, serif'
                    }}>
                      {item.name}
                    </h3>

                    {item.category && (
                      <p style={{
                        color: '#d4a574',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        margin: '0 0 8px 0'
                      }}>
                        {item.category}
                      </p>
                    )}

                    {item.description && (
                      <p style={{
                        color: '#d2a679',
                        fontSize: '13px',
                        lineHeight: '1.4',
                        margin: '0 0 15px 0',
                        flex: 1
                      }}>
                        {item.description.substring(0, 60)}...
                      </p>
                    )}

                    {item.rating && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '15px'
                      }}>
                        <span style={{
                          color: '#ffd700',
                          fontSize: '16px'
                        }}>
                          ★
                        </span>
                        <span style={{
                          color: '#f5deb3',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '24px',
                        fontWeight: '700'
                      }}>
                        ${item.price.toFixed(2)}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                          color: '#0d0603',
                          border: 'none',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <ShoppingBag size={16} />
                        Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
