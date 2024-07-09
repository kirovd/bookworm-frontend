import React from 'react';
import './TopBar.css';

const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <div className="logo">
        <span className="rad">RAD</span>
        <span className="ical">ICAL</span>
      </div>
    </div>
  );
};

export default TopBar;
