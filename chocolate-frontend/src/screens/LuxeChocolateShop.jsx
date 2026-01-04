import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronRight, Facebook, Award, Shield, Truck, Users, Sparkles, Package } from 'lucide-react';

const ChocolateShop = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #f3e8ff 100%)',
        overflow: 'hidden',
        position: 'relative',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', zIndex: 10, width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'linear-gradient(90deg, #d97706, #dc2626)', color: 'white', padding: '12px 24px', borderRadius: '9999px', marginBottom: '32px', fontSize: '14px', fontWeight: '600' }}>
              <Sparkles style={{ width: 20, height: 20, marginRight: 8 }} />
              Premium Artisan Chocolates
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 'bold', marginBottom: '24px', background: 'linear-gradient(135deg, #78350f, #991b1b, #6b21a8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Indulge in Luxury
            </h1>
            
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#374151', maxWidth: '800px', margin: '0 auto 48px', lineHeight: '1.6' }}>
              Handcrafted Belgian chocolates made with the finest ingredients from around the world
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <button onClick={() => navigate('/products')} style={{ padding: '16px 32px', fontSize: '16px', background: 'linear-gradient(90deg, #d97706, #dc2626)', color: 'white', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontWeight: '600', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: '8px', minWidth: '200px', justifyContent: 'center' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                Shop Collection <ChevronRight style={{ width: 20, height: 20 }} />
              </button>
              <button onClick={() => navigate('/login')} style={{ padding: '16px 32px', fontSize: '16px', border: '2px solid #78350f', color: '#78350f', backgroundColor: 'transparent', borderRadius: '9999px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', minWidth: '200px' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#fef3c7'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                Sign In
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(90deg, #78350f, #991b1b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Trusted Worldwide
            </h2>
            <p style={{ fontSize: '18px', color: '#4b5563' }}>Excellence in every bite, proven by our achievements</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            {[{ icon: Award, value: '50+', label: 'Awards' }, { icon: Users, value: '100K+', label: 'Customers' }, { icon: Truck, value: '25+', label: 'Years' }, { icon: Shield, value: '100%', label: 'Quality' }].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #fef3c7, #fecaca)', marginBottom: '20px' }}>
                    <Icon style={{ width: 40, height: 40, color: '#78350f' }} />
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#78350f', marginBottom: '8px' }}>{stat.value}</div>
                  <div style={{ fontSize: '16px', color: '#4b5563' }}>{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section style={{ padding: '60px 20px', background: 'linear-gradient(135deg, #f3f4f6, #fef3c7)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(90deg, #78350f, #991b1b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Featured Collection
            </h2>
            <p style={{ fontSize: '18px', color: '#4b5563' }}>Discover our handcrafted masterpieces</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '40px' }}>
            {[{ name: 'Dark Chocolate Truffles', price: 24.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&h=500&fit=crop' }, { name: 'Milk Chocolate Assortment', price: 29.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500&h=500&fit=crop' }, { name: 'Luxury Gift Box', price: 49.99, rating: 5.0, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&h=500&fit=crop' }].map((product, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'} onClick={() => navigate('/products')}>
                <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                  <button style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <Heart style={{ width: 20, height: 20, color: '#4b5563' }} />
                  </button>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>{product.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Star style={{ width: 16, height: 16, fill: '#d97706', color: '#d97706' }} />
                      <span style={{ marginLeft: '4px', fontSize: '14px', fontWeight: '500' }}>{product.rating}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>(200+ reviews)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#78350f' }}>${product.price}</span>
                    <button style={{ padding: '8px 16px', background: 'linear-gradient(90deg, #d97706, #dc2626)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                      <ShoppingCart style={{ width: 16, height: 16 }} />
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={() => navigate('/products')} style={{ padding: '16px 32px', background: 'linear-gradient(90deg, #d97706, #dc2626)', color: 'white', border: 'none', borderRadius: '9999px', fontSize: '18px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              View All Products
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(90deg, #78350f, #991b1b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Why Choose Us
            </h2>
            <p style={{ fontSize: '18px', color: '#4b5563' }}>Experience the difference of true craftsmanship</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            {[{ icon: Shield, title: 'Premium Quality', desc: 'Only the finest Belgian chocolate' }, { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' }, { icon: Package, title: 'Fresh Daily', desc: 'Handcrafted every morning' }, { icon: Award, title: 'Award Winning', desc: 'Recognized globally' }].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} style={{ background: 'linear-gradient(135deg, #fef3c7, #fecaca)', padding: '32px', borderRadius: '16px', transition: 'all 0.3s' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
                    <Icon style={{ width: 32, height: 32, color: '#78350f' }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>{feature.title}</h3>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 20px', background: 'linear-gradient(135deg, #78350f, #991b1b, #6b21a8)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>Ready to Experience Luxury?</h2>
            <p style={{ fontSize: '18px', color: '#fef3c7', marginBottom: '32px', lineHeight: '1.6' }}>Join thousands of satisfied customers and discover why our chocolates are rated 5 stars</p>
            <button onClick={() => navigate('/signup')} style={{ padding: '16px 32px', backgroundColor: 'white', color: '#78350f', border: 'none', borderRadius: '9999px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#fef3c7'} onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}>
              Get Started Today <ChevronRight style={{ width: 20, height: 20 }} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111827', color: '#d1d5db', padding: '48px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '32px' }}>
            <div>
              <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginBottom: '16px' }}>Luxe Chocolate</h3>
              <p style={{ fontSize: '14px' }}>Premium artisan chocolates crafted with passion and expertise.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>Shop</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <li><button onClick={() => navigate('/products')} style={{ background: 'none', border: 'none', color: '#d1d5db', cursor: 'pointer', padding: 0, textAlign: 'left' }} onMouseEnter={(e) => e.target.style.color = '#fcd34d'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>All Products</button></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <li><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>Connect</h4>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ width: '40px', height: '40px', backgroundColor: '#1f2937', color: '#d1d5db', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1f2937'}>
                  <Facebook style={{ width: 20, height: 20 }} />
                </button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #374151', paddingTop: '32px', textAlign: 'center', fontSize: '14px' }}>
            <p>&copy; 2026 Luxe Chocolate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { ChocolateShop };
export default ChocolateShop;
