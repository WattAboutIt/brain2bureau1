// TrackProgress.jsx
import React from 'react';
import"../styles/TrackProgress.css";
import Profile from './Profile';
import { studyMaterials } from "../data/studyMaterials";

function humanTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) {
    return iso;
  }
}

export default function TrackProgress({ onNavigate, toggleDarkMode }) {
  const completedRaw = localStorage.getItem('completedStudy') || '[]';
  let completed = [];
  try { completed = JSON.parse(completedRaw); } catch(e) { completed = []; }
  const studyPercent = Math.round((completed.length / studyMaterials.length) * 100);

  const examRaw = localStorage.getItem('examHistory') || '[]';
  let exams = [];
  try { exams = JSON.parse(examRaw); } catch(e) { exams = []; }
  const examCount = exams.length;
  const examAvg = examCount ? Math.round(exams.reduce((s,x) => s + (x.percentage||0), 0) / examCount) : 0;

  // activities: combine activityLog and examHistory
  const logRaw = localStorage.getItem('activityLog') || '[]';
  let activityLog = [];
  try { activityLog = JSON.parse(logRaw); } catch(e) { activityLog = []; }

  const activities = [
    ...activityLog.map(a => ({ icon: a.type === 'completed' ? '✅' : (a.type === 'uncompleted' ? '↩️' : '•'), title: `${a.type === 'completed' ? 'Completed' : a.type === 'uncompleted' ? 'Uncompleted' : a.type}: ${a.title}`, time: a.time })),
    ...exams.map(e => ({ icon: '📝', title: `Exam: ${e.title ?? 'Mock'} - ${e.percentage}%`, time: e.time }))
  ].sort((a,b) => new Date(b.time) - new Date(a.time)).slice(0,10);

  const progressData = [
    { category: 'Study Resources', percentage: studyPercent, color: '#0284c7' },
    { category: 'Mock Exams (avg)', percentage: examAvg, color: '#8b5cf6' }
  ];

  return (
    <div className="track-progress-container">
      {/* Header */}
      <header className="track-header">
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
          className="nav-btn"
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
          className="nav-btn nav-btn-active"
          onClick={() => onNavigate && onNavigate('track-progress')}
        >
          Track Progress
        </button>
      </div>

      {/* Main Content */}
      <main className="track-main">
        {/* Your Progress Section */}
        <section className="progress-section">
          <h2 className="section-title">
            <span className="icon">📊</span>
            Your Progress
          </h2>

          {/* Progress Bars */}
          <div className="progress-list">
            {progressData.map((item, index) => (
              <div key={index} className="progress-item">
                <div className="progress-header">
                  <span className="progress-label">{item.category}</span>
                  <span className="progress-percentage">{item.percentage}%</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity Section */}
          <div className="recent-activity">
            <h3 className="activity-title">Recent Activity</h3>
            
            <div className="activity-list">
              {activities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p className="activity-title-text">{activity.title}</p>
                    <p className="activity-time">{humanTime(activity.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div><button className="back-btn" onClick={() => onNavigate && onNavigate("home")}>
          Back to Home
        </button></div>
        </section>
      </main>
    </div>
  );
}