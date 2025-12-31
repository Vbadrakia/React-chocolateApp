import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍫 Chocolate Paradise
        </Link>

        <div className="navbar-menu">
          <Link to="/products" className="nav-link">
            Products
          </Link>

          {user && user.role === 'admin' && (
            <>
              <Link to="/admin" className="nav-link">
                Admin Panel
              </Link>
              <Link to="/admin/add-product" className="nav-link">
                Add Product
              </Link>
            </>
          )}

          {user ? (
            <>
              <Link to="/cart" className="nav-link nav-cart">
                🛒 Cart
                {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-btn">
                Logout
              </button>
              <span className="nav-user">({user.email})</span>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
