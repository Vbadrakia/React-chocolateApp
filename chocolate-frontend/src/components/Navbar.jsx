import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          🍫 Chocolate Paradise
        </Link>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/products" className="nav-link" onClick={closeMenu}>
            Products
          </Link>

          {user && user.role === 'admin' && (
            <>
              <Link to="/admin" className="nav-link" onClick={closeMenu}>
                Admin Panel
              </Link>
              <Link to="/admin/add-product" className="nav-link" onClick={closeMenu}>
                Add Product
              </Link>
            </>
          )}

          {user ? (
            <>
              <Link to="/cart" className="nav-link nav-cart" onClick={closeMenu}>
                🛒 Cart
                {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
              </Link>
              <Link to="/profile" className="nav-link" onClick={closeMenu}>
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-btn">
                Logout
              </button>
              <span className="nav-user">({user.email})</span>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="nav-link" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
