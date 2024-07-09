import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="user-rectangle">
        <div className="user-picture"></div>
      </div>
      <div className="nav">
        <div className="nav-item">
          <Link to="/" className="nav-link">
            <button className="stats-button">
              <div className="bar-chart">
                <div className="bar-small"></div>
                <div className="bar-medium"></div>
                <div className="bar-large"></div>
              </div>
              <div className="bar-chart-separator"></div>
            </button>
          </Link>
        </div>
        <div className="nav-item">
        <Link to="/favorites" className="nav-link">
            <button className="vector-button">
              <i className="fas fa-heart icon"></i>
            </button>
            <div className="separator"></div>
          </Link>
        </div>
        <div className="nav-item">
          <button className="settings-button">
            <i className="fas fa-gear icon"></i>
          </button>
          <div className="separator"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
