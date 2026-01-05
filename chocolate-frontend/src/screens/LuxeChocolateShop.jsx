import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ShoppingBag, Heart, Star, TrendingUp, Gift, Truck, Shield, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const LuxeChocolateShop = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: 'Dark Chocolate Truffles',
      price: 599,
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500',
      badge: 'Bestseller',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Milk Chocolate Delights',
      price: 449,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500',
      badge: 'New',
      rating: 4.8
    },
    {
      id: 3,
      name: 'White Chocolate Dreams',
      price: 529,
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500',
      badge: 'Premium',
      rating: 4.7
    }
  ];

  const categories = [
    { name: 'Dark Chocolate', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300' },
    { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300' },
    { name: 'White Chocolate', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300' },
    { name: 'Gift Boxes', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300' }
  ];

  return (
    <>
      <Navbar />
      <div style={{
        background: 'linear-gradient(180deg, #2d1810 0%, #1a0f0a 50%, #0d0603 100%)',
        minHeight: '100vh',
        paddingTop: '70px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Chocolate Liquid Background */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, 
              rgba(139, 69, 19, 0.15) 0%, 
              transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.3s ease-out'
        }} />

        {/* Hero Section */}
        <motion.section
          style={{ opacity }}
          className="hero"
        >
          <div style={{
            minHeight: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(160, 82, 45, 0.05) 100%)'
          }}>
            <div style={{ maxWidth: '900px' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 28px',
                  background: 'rgba(184, 115, 51, 0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '50px',
                  border: '1px solid rgba(210, 140, 80, 0.3)',
                  marginBottom: '30px'
                }}
              >
                <span style={{ fontSize: '24px' }}>🍫</span>
                <span style={{ color: '#d2a679', fontWeight: '600', fontSize: '14px' }}>
                  Crafted with Love
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #f5deb3 0%, #daa520 50%, #d2a679 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Georgia', serif"
                }}
              >
                Indulge in Premium Chocolate
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontSize: '1.3rem',
                  color: '#d2a679',
                  marginBottom: '40px',
                  fontWeight: '300',
                  lineHeight: '1.6'
                }}
              >
                Artisan chocolates handcrafted with the finest ingredients from around the world
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/products')}
                  style={{
                    padding: '16px 48px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                    color: '#1a0f0a',
                    cursor: 'pointer',
                    boxShadow: '0 15px 40px rgba(212, 165, 116, 0.3)',
                    transition: 'all 0.3s'
                  }}
                >
                  Explore Collection
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '16px 48px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: '2px solid #d2a679',
                    borderRadius: '12px',
                    background: 'transparent',
                    color: '#d2a679',
                    cursor: 'pointer',
                    boxShadow: '0 15px 40px rgba(212, 165, 116, 0.15)',
                    transition: 'all 0.3s'
                  }}
                >
                  View Gift Sets
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Categories Section */}
        <section style={{
          padding: '80px 20px',
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '60px',
              background: 'linear-gradient(135deg, #f5deb3 0%, #daa520 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Georgia', serif"
            }}
          >
            Chocolate Categories
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate('/products')}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  height: '300px',
                  position: 'relative',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                  background: `url(${cat.image}) center/cover`,
                  border: '1px solid rgba(212, 165, 116, 0.2)'
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#f5deb3',
                      marginBottom: '8px'
                    }}>
                      {cat.name}
                    </h3>
                    <p style={{
                      color: '#d2a679',
                      fontSize: '14px'
                    }}>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section style={{
          padding: '80px 20px',
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #f5deb3 0%, #daa520 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Georgia', serif"
            }}
          >
            Bestselling Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              textAlign: 'center',
              color: '#d2a679',
              marginBottom: '60px',
              fontSize: '1.1rem'
            }}
          >
            Handpicked selections loved by chocolate enthusiasts worldwide
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
                onClick={() => navigate(`/products/${product.id}`)}
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(101, 50, 15, 0.2) 100%)',
                  border: '1px solid rgba(212, 165, 116, 0.2)',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                  color: '#1a0f0a',
                  padding: '8px 16px',
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: '700',
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)'
                }}>
                  {product.badge}
                </div>

                {/* Image */}
                <div style={{
                  height: '280px',
                  background: `url(${product.image}) center/cover`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'rgba(26, 15, 10, 0.7)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '1px solid rgba(212, 165, 116, 0.2)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart size={20} color="#d4a574" fill="#d4a574" />
                  </motion.div>
                </div>

                {/* Info */}
                <div style={{ padding: '30px' }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '12px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(product.rating) ? '#daa520' : 'none'}
                        stroke="#daa520"
                      />
                    ))}
                    <span style={{ fontSize: '12px', color: '#a0864d', marginLeft: '8px' }}>
                      ({product.rating})
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#f5deb3',
                    marginBottom: '12px'
                  }}>
                    {product.name}
                  </h3>

                  <p style={{
                    fontSize: '14px',
                    color: '#d2a679',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    Premium artisan chocolates crafted with single-origin cocoa
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '28px',
                      fontWeight: '800',
                      color: '#d4a574'
                    }}>
                      ₹{product.price}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                        color: '#1a0f0a',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)'
                      }}
                    >
                      <ShoppingBag size={14} />
                      Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section style={{
          padding: '80px 20px',
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              { icon: TrendingUp, title: '500+', subtitle: 'Happy Customers' },
              { icon: Truck, title: 'FREE', subtitle: 'Shipping on Orders >₹1000' },
              { icon: Shield, title: '100%', subtitle: 'Quality Guarantee' },
              { icon: Gift, title: '24/7', subtitle: 'Gift Wrapping Available' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  textAlign: 'center',
                  padding: '40px 30px',
                  background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(101, 50, 15, 0.1) 100%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(212, 165, 116, 0.2)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <item.icon size={40} color="#d4a574" style={{ marginBottom: '16px', margin: '0 auto 16px' }} />
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#f5deb3',
                  marginBottom: '8px'
                }}>
                  {item.title}
                </h3>
                <p style={{ color: '#d2a679' }}>
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section style={{
          padding: '60px 20px',
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '80px auto 0',
          textAlign: 'center'
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#f5deb3',
              marginBottom: '16px',
              fontFamily: "'Georgia', serif"
            }}
          >
            Receive Exclusive Offers
          </motion.h2>
          <p style={{
            color: '#d2a679',
            marginBottom: '30px',
            fontSize: '1.1rem'
          }}>
            Subscribe to our newsletter for special discounts and new launches
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: '14px 20px',
                background: 'rgba(139, 69, 19, 0.2)',
                border: '1px solid rgba(212, 165, 116, 0.3)',
                borderRadius: '10px',
                color: '#f5deb3',
                outline: 'none',
                fontSize: '15px',
                fontFamily: 'inherit',
                backdropFilter: 'blur(10px)'
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 30px',
                background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                color: '#1a0f0a',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Mail size={16} />
              Subscribe
            </motion.button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '60px 20px 30px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
          borderTop: '1px solid rgba(212, 165, 116, 0.1)',
          position: 'relative',
          zIndex: 1,
          marginTop: '80px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {[
              {
                title: 'Shop',
                links: ['All Products', 'Dark Chocolate', 'Milk Chocolate', 'Gift Sets']
              },
              {
                title: 'Company',
                links: ['About Us', 'Our Story', 'Sustainability', 'Press']
              },
              {
                title: 'Support',
                links: ['Contact Us', 'FAQ', 'Shipping Info', 'Returns']
              }
            ].map((col, idx) => (
              <div key={idx}>
                <h4 style={{ color: '#f5deb3', fontWeight: '700', marginBottom: '16px' }}>
                  {col.title}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map((link, i) => (
                    <a
                      key={i}
                      href="#"
                      style={{
                        color: '#d2a679',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#f5deb3'}
                      onMouseLeave={(e) => e.target.style.color = '#d2a679'}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid rgba(212, 165, 116, 0.1)',
            paddingTop: '30px',
            textAlign: 'center',
            color: '#a0864d',
            fontSize: '14px'
          }}>
            <p>© 2024 Luxe Chocolate. All rights reserved. | Crafted with 🍫 and Love</p>
          </div>
        </footer>
      </div>
    </>
  );
};
