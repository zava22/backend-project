import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">MyApp</Link>
      
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <ul className="navbar-nav">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Home
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
              Profile
            </Link>
          </li>
        )}
      </ul>

      <div className="navbar-actions">
        {user ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <img
              src={user.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png"}
              alt="Profile"
              className="user-avatar"
              onClick={toggleDropdown}
            />
            <div className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
              <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                Profile
                <span className="dropdown-badge">New</span>
              </Link>
              <button className="dropdown-item">Settings</button>
              <button className="dropdown-item danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">Sign In</Link>
            <Link to="/register" className="btn btn-outline">Sign Up</Link>
          </>
        )}
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-nav">
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
            </li>
          )}
        </ul>
        {!user && (
          <div className="navbar-actions">
            <Link to="/login" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
              Sign In
            </Link>
            <Link to="/register" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;