import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there!</h1>
            <p className="py-6">
              {user 
                ? `Welcome back, ${user.username || user.email}! Manage your profile and explore our features.`
                : 'Welcome to our amazing app! Sign up or sign in to get started.'
              }
            </p>
            {user ? (
              <Link to="/profile" className="btn btn-primary">
                Go to Profile
              </Link>
            ) : (
              <div className="flex gap-4 justify-center">
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
      </div>
    </div>
  );
};

export default Home;