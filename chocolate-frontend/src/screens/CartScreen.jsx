import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { Trash2, Plus, Minus, ShoppingBag, Heart, Tag, TrendingUp, Lock, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 1000 ? 0 : 50;
  const discount = subtotal > 1500 ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  if (cartItems.length === 0) {
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
                ease: "easeInOut"
              }}
              style={{
                display: 'inline-flex',
                padding: '30px',
                background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.15) 0%, rgba(160, 82, 45, 0.1) 100%)',
                borderRadius: '24px',
                marginBottom: '32px'
              }}
            >
              <ShoppingBag size={80} color="#d4a574" strokeWidth={1.5} />
            </motion.div>
            
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '16px',
              color: '#f5deb3',
              letterSpacing: '-0.03em',
              fontFamily: 'Georgia, serif'
            }}>Your Cart is Empty</h2>
            
            <p style={{
              fontSize: '18px',
              color: '#d2a679',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Discover our premium collection of handcrafted chocolates
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')} 
              style={{
                padding: '18px 40px',
                background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                color: '#1a0f0a',
                border: 'none',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s'
              }}
            >
              Continue Shopping
              <ArrowRight size={20} />
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
        paddingTop: '100px',
        paddingBottom: '60px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 20px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 400px',
          gap: '40px',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '800',
              marginBottom: '40px',
              color: '#f5deb3',
              fontFamily: 'Georgia, serif'
            }}>
              Your Cart
            </h1>

            <AnimatePresence mode="wait">
              {cartItems.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#d2a679'
                  }}
                >
                  No items in cart
                </motion.div>
              ) : (
                <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(212, 165, 116, 0.15)' }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 1fr',
                        gap: '24px',
                        padding: '24px',
                        background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(101, 50, 15, 0.08) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(212, 165, 116, 0.2)',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Product Image */}
                      <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'rgba(0, 0, 0, 0.2)'
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#f5deb3',
                            marginBottom: '8px',
                            fontFamily: 'Georgia, serif'
                          }}>
                            {item.name}
                          </h3>
                          <p style={{
                            color: '#d2a679',
                            fontSize: '14px',
                            marginBottom: '12px'
                          }}>
                            {item.description}
                          </p>
                          <p style={{
                            background: 'linear-gradient(135deg, #d4a574 0%, #d2a679 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: '16px',
                            fontWeight: '700'
                          }}>
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginTop: '16px'
                        }}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              background: 'rgba(212, 165, 116, 0.1)',
                              border: '1px solid rgba(212, 165, 116, 0.2)',
                              color: '#d4a574',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s'
                            }}
                          >
                            <Minus size={16} />
                          </motion.button>

                          <span style={{
                            width: '40px',
                            textAlign: 'center',
                            color: '#f5deb3',
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>
                            {item.quantity}
                          </span>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              background: 'rgba(212, 165, 116, 0.1)',
                              border: '1px solid rgba(212, 165, 116, 0.2)',
                              color: '#d4a574',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s'
                            }}
                          >
                            <Plus size={16} />
                          </motion.button>

                          <div style={{ flex: 1 }} />

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              padding: '8px 12px',
                              background: 'rgba(212, 165, 116, 0.1)',
                              border: '1px solid rgba(212, 165, 116, 0.2)',
                              color: '#d4a574',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Trash2 size={16} />
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(101, 50, 15, 0.08) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 165, 116, 0.2)',
              borderRadius: '20px',
              padding: '32px',
              height: 'fit-content',
              position: 'sticky',
              top: '120px'
            }}
          >
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#f5deb3',
              marginBottom: '24px',
              fontFamily: 'Georgia, serif'
            }}>
              Order Summary
            </h2>

            {/* Summary Items */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '24px',
              paddingBottom: '24px',
              borderBottom: '1px solid rgba(212, 165, 116, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#d2a679',
                fontSize: '14px'
              }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#d2a679',
                  fontSize: '14px'
                }}>
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              )}

              {discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#d4a574',
                    fontSize: '14px',
                    fontWeight: '600',
                    padding: '12px',
                    background: 'rgba(212, 165, 116, 0.1)',
                    borderRadius: '8px',
                    gap: '8px'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={16} />
                    Discount (10%)
                  </span>
                  <span>-${discount.toFixed(2)}</span>
                </motion.div>
              )}
            </div>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#d2a679'
              }}>
                Total
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #d4a574 0%, #d2a679 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '28px',
                fontWeight: '800'
              }}>
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid rgba(212, 165, 116, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#d2a679',
                fontSize: '12px'
              }}>
                <Lock size={16} color="#d4a574" />
                Secure checkout
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#d2a679',
                fontSize: '12px'
              }}>
                <TrendingUp size={16} color="#d4a574" />
                100% authenticity
              </div>
            </motion.div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/checkout')}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                color: '#1a0f0a',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)',
                transition: 'all 0.3s',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </motion.button>

            {/* Continue Shopping */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/products')}
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(212, 165, 116, 0.1)',
                color: '#d4a574',
                border: '2px solid rgba(212, 165, 116, 0.2)',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
};
