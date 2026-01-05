import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingBag, User, LogOut, Menu, X, Search, Heart } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
  ];

  return (
    <motion.nav
      style={{
        background: scrolled
          ? 'linear-gradient(135deg, rgba(45, 24, 16, 0.95) 0%, rgba(26, 15, 10, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(45, 24, 16, 0.8) 0%, rgba(26, 15, 10, 0.8) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(212, 165, 116, 0.2)' : 'none',
        padding: '0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenus}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#f5deb3',
            fontSize: '22px',
            fontWeight: '800',
            fontFamily: 'Georgia, serif',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#d4a574'}
          onMouseLeave={(e) => e.target.style.color = '#f5deb3'}
        >
          <span style={{ fontSize: '28px' }}>🍫</span>
          <span>Choco Paradise</span>
        </Link>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            '@media (max-width: 768px)': { display: 'none' }
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenus}
              style={{
                color: isActive(link.path) ? '#d4a574' : '#d2a679',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive(link.path) ? '700' : '600',
                transition: 'all 0.3s',
                borderBottom: isActive(link.path) ? '2px solid #d4a574' : 'none',
                paddingBottom: '4px'
              }}
              onMouseEnter={(e) => e.target.style.color = '#d4a574'}
              onMouseLeave={(e) => e.target.style.color = isActive(link.path) ? '#d4a574' : '#d2a679'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {/* Search Bar - Desktop */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(212, 165, 116, 0.1)',
              border: '1px solid rgba(212, 165, 116, 0.2)',
              borderRadius: '20px',
              padding: '6px 14px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 165, 116, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.2)';
            }}
          >
            <Search size={16} color="#d2a679" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#f5deb3',
                fontSize: '13px',
                width: '120px',
                placeholder: '#d2a679'
              }}
            />
          </div>

          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/wishlist')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#d2a679',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#d4a574'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#d2a679'}
          >
            <Heart size={20} />
          </motion.button>

          {/* Cart Icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/cart')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#d2a679',
              padding: '6px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#d4a574'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#d2a679'}
          >
            <ShoppingBag size={20} />
            {cartItems.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'linear-gradient(135deg, #d4a574 0%, #c9985a 100%)',
                  color: '#1a0f0a',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700'
                }}
              >
                {cartItems.length}
              </span>
            )}
          </motion.button>

          {/* User Menu */}
          <div
            style={{
              position: 'relative'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#d2a679',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#d4a574'}
              onMouseLeave={(e) => {
                if (!showUserMenu) e.currentTarget.style.color = '#d2a679';
              }}
            >
              <User size={20} />
            </motion.button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '12px',
                  background: 'linear-gradient(135deg, rgba(45, 24, 16, 0.95) 0%, rgba(26, 15, 10, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 165, 116, 0.2)',
                  borderRadius: '12px',
                  padding: '12px 0',
                  minWidth: '200px',
                  zIndex: 1001,
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                {user ? (
                  <>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(212, 165, 116, 0.1)' }}>
                      <p style={{ color: '#f5deb3', fontSize: '13px', fontWeight: '600', margin: 0 }}>
                        {user.name || user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowUserMenu(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        background: 'none',
                        border: 'none',
                        color: '#d2a679',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(212, 165, 116, 0.1)';
                        e.target.style.color = '#d4a574';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'none';
                        e.target.style.color = '#d2a679';
                      }}
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/orders');
                        setShowUserMenu(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        background: 'none',
                        border: 'none',
                        color: '#d2a679',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(212, 165, 116, 0.1)';
                        e.target.style.color = '#d4a574';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'none';
                        e.target.style.color = '#d2a679';
                      }}
                    >
                      My Orders
                    </button>
                    <div style={{ borderTop: '1px solid rgba(212, 165, 116, 0.1)', padding: '4px 0' }}>
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          width: '100%',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          color: '#d2a679',
                          cursor: 'pointer',
                          fontSize: '13px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)';
                          e.currentTarget.style.color = '#d4a574';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                          e.currentTarget.style.color = '#d2a679';
                        }}
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate('/login');
                        setShowUserMenu(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        background: 'none',
                        border: 'none',
                        color: '#d2a679',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(212, 165, 116, 0.1)';
                        e.target.style.color = '#d4a574';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'none';
                        e.target.style.color = '#d2a679';
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        navigate('/signup');
                        setShowUserMenu(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 16px',
                        background: 'none',
                        border: 'none',
                        color: '#d2a679',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(212, 165, 116, 0.1)';
                        e.target.style.color = '#d4a574';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'none';
                        e.target.style.color = '#d2a679';
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#d2a679',
              padding: '6px',
              display: 'none',
              '@media (max-width: 768px)': { display: 'flex' }
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            background: 'linear-gradient(135deg, rgba(45, 24, 16, 0.95) 0%, rgba(26, 15, 10, 0.95) 100%)',
            borderTop: '1px solid rgba(212, 165, 116, 0.2)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenus}
              style={{
                color: isActive(link.path) ? '#d4a574' : '#d2a679',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                padding: '8px 12px',
                borderRadius: '8px',
                background: isActive(link.path) ? 'rgba(212, 165, 116, 0.1)' : 'none',
                transition: 'all 0.3s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
