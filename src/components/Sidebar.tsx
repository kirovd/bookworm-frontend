import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('stats');

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/favorites') {
      setActiveButton('vector');
    } else {
      setActiveButton('stats');
    }
  }, [location]);

  useEffect(() => {
    // Save active button state to local storage
    localStorage.setItem('activeButton', activeButton);
  }, [activeButton]);

  return (
    <div className="sidebar">
      <div className="user-rectangle">
        <div className="user-picture"></div>
      </div>
      <div className="nav">
        <div className="nav-item">
          <NavLink to="/" className="nav-link" onClick={() => setActiveButton('stats')}>
            <button className={activeButton === 'stats' ? 'stats-button active' : 'stats-button inactive'}>
              <div className="bar-chart">
                <div className="bar-small"></div>
                <div className="bar-medium"></div>
                <div className="bar-large"></div>
              </div>
              <div className="separator"></div>
            </button>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/favorites" className="nav-link" onClick={() => setActiveButton('vector')}>
            <button className={activeButton === 'vector' ? 'vector-button active' : 'vector-button inactive'}>
              <i className="fas fa-heart icon"></i>
              <div className="separator"></div>
            </button>
          </NavLink>
        </div>
        <div className="nav-item">
          <button className="settings-button">
            <i className="fas fa-gear icon"></i>
            <div className="separator"></div>
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
