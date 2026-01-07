// StudyResources.jsx
import React, { useEffect, useState } from 'react';
import "../styles/StudyResources.css";
import Profile from "./Profile";
import { studyMaterials } from "../data/studyMaterials";

export default function StudyResources({ onNavigate, toggleDarkMode }) {
  const [completed, setCompleted] = useState(new Set());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('completedStudy') || '[]';
    try {
      const arr = JSON.parse(raw);
      setCompleted(new Set(arr));
    } catch (e) {
      setCompleted(new Set());
    }
  }, []);

  useEffect(() => {
    const total = studyMaterials.length;
    setProgress(Math.round((completed.size / total) * 100));
  }, [completed]);

  const toggleComplete = (id) => {
    const newSet = new Set(completed);
    let action;
    if (newSet.has(id)) {
      newSet.delete(id);
      action = 'uncompleted';
    } else {
      newSet.add(id);
      action = 'completed';
    }
    setCompleted(newSet);
    localStorage.setItem('completedStudy', JSON.stringify(Array.from(newSet)));

    // record activity
    const activityRaw = localStorage.getItem('activityLog') || '[]';
    const activity = JSON.parse(activityRaw);
    activity.unshift({ type: action, title: studyMaterials.find(m => m.id === id)?.title || id, time: new Date().toISOString() });
    localStorage.setItem('activityLog', JSON.stringify(activity.slice(0, 50)));
  };

  return (
    <div className="study-resources-container">
      {/* Header */}
      <header className="study-header">
        <div className="header-content">
          <div className="logo-icon">
            <span>🎓</span>
          </div>
          <div className="header-text">
            <h1>Brain2Bureau - Loksewa Prep</h1>
            <p>Your Complete Preparation Companion</p>
          </div>
          {/* Profile Component */}
          <Profile onNavigate={onNavigate} toggleDarkMode={toggleDarkMode} />
        </div>
      </header>

      {/* Navigation Buttons */}
      <div className="nav-container">
        <button 
          className="nav-btn"
          onClick={() => onNavigate && onNavigate('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className="nav-btn nav-btn-active"
          onClick={() => onNavigate && onNavigate('study-resources')}
        >
          Study Resources
        </button>
        <button 
          className="nav-btn"
          onClick={() => onNavigate && onNavigate('mock-exams')}
        >
          Mock Exams
        </button>
        <button 
          className="nav-btn"
          onClick={() => onNavigate && onNavigate('track-progress')}
        >
          Track Progress
        </button>
      </div>

      {/* Main Content */}
      <main className="study-main">
        {/* Study Materials Section */}
        <section className="study-materials-section">
          <h2 className="section-title">
            <span className="icon">📚</span>
            Study Materials
          </h2>

          <div className="materials-overview">
            <div className="materials-progress">
              <div className="progress-pill">{completed.size} / {studyMaterials.length} completed</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="materials-list">
            {studyMaterials.map((material) => (
              <div key={material.id} className={`material-card ${completed.has(material.id) ? 'completed' : ''}`}>
                <div className="material-main">
                  <div>
                    <h3 className="material-title">{material.title}</h3>
                    <p className="material-description">{material.description}</p>
                  </div>
                  <div className="material-actions">
                    <button
                      className={`complete-btn ${completed.has(material.id) ? 'done' : ''}`}
                      onClick={() => toggleComplete(material.id)}
                    >
                      {completed.has(material.id) ? 'Completed ✅' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div><button className="back-btn" onClick={() => onNavigate && onNavigate("home")}>
          Back to Home
        </button></div>
        </section>
      </main>
    </div>
  );
}