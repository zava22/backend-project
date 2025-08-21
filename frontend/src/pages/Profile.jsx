import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    profileImage: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        profileImage: user.profileImage || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.updateUser(user._id, formData);
      updateUser(response.data.user);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmMessage = 'Are you sure you want to delete your account? This action cannot be undone. Type "DELETE" to confirm.';
    const userInput = prompt(confirmMessage);
    
    if (userInput === 'DELETE') {
      try {
        await authAPI.deleteUser(user._id);
        logout();
        navigate('/');
      } catch (error) {
        setError('Failed to delete account');
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    // Reset form data to original user data
    setFormData({
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      profileImage: user.profileImage || '',
    });
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-title-section">
              <h1 className="profile-title">My Profile</h1>
              <div className="profile-actions">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={handleCancel}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="profile-avatar-section">
              <img
                src={formData.profileImage || user.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png"}
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-badge">{user.role || 'Customer'}</div>
            </div>
          </div>

          <div className="profile-body">
            {error && (
              <div className="profile-alert error">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="profile-alert success">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{success}</span>
              </div>
            )}

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className={`form-input ${!isEditing ? 'readonly' : ''}`}
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-input ${!isEditing ? 'readonly' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-input ${!isEditing ? 'readonly' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Profile Image URL</label>
                  <input
                    type="url"
                    name="profileImage"
                    className={`form-input ${!isEditing ? 'readonly' : ''}`}
                    value={formData.profileImage}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="submit-section">
                  <button 
                    type="submit" 
                    className={`submit-btn ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Updating Profile...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>

            <div className="profile-divider"></div>

            <div className="danger-zone">
              <h3 style={{ marginBottom: '1rem', color: '#dc2626' }}>Danger Zone</h3>
              <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button 
                onClick={handleDeleteAccount}
                className="danger-btn"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;