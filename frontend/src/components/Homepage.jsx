import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-icon">
            <span>🎓</span>
          </div>
          <div className="header-text">
            <h1>Brain2Bureau - Loksewa Prep</h1>
            <p>Your Complete Preparation Companion</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button 
            className="nav-btn nav-btn-primary"
            onClick={() => handleNavigation('/dashboard')}
          >
            Dashboard
          </button>
          <button 
            className="nav-btn nav-btn-secondary"
            onClick={() => handleNavigation('/study-resources')}
          >
            Study Resources
          </button>
          <button 
            className="nav-btn nav-btn-secondary"
            onClick={() => handleNavigation('/mock-exams')}
          >
            Mock Exams
          </button>
          <button 
            className="nav-btn nav-btn-secondary"
            onClick={() => handleNavigation('/track-progress')}
          >
            Track Progress
          </button>
        </div>

        {/* Welcome Card */}
        <div className="welcome-card">
          <h2 className="welcome-title">Welcome Back! 👋</h2>
          <p className="welcome-subtitle">Continue your Loksewa preparation journey</p>

          {/* Stats Cards */}
          <div className="stats-container">
            {/* Resources Read */}
            <div className="stat-card">
              <div className="stat-number">8</div>
              <div className="stat-label">Resources Read</div>
            </div>

            {/* Exams Taken */}
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Exams Taken</div>
            </div>

            {/* Average Score */}
            <div className="stat-card">
              <div className="stat-number stat-number-large">78%</div>
              <div className="stat-label">Average Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}