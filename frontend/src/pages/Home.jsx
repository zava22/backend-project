import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to MyApp</h1>
        <p className="hero-subtitle">
          {user 
            ? `Hello ${user.username || user.email}! Ready to explore amazing features?`
            : 'Discover amazing features and connect with our community. Join us today!'
          }
        </p>
        
        {user ? (
          <div className="welcome-back">
            <div className="user-info">
              <img
                src={user.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png"}
                alt="Profile"
                className="user-avatar-large"
              />
              <div className="user-details">
                <h3>{user.username || 'User'}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/profile" className="btn btn-primary">
                Manage Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;