/* eslint-disable react/prop-types */
import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({ currentQuestion, totalQuestions }) {
  const percentComplete = Math.floor((currentQuestion / totalQuestions) * 100);

  const fillerStyle = {
    width: `${percentComplete}%`,
  };

  return (
    <div className="ProgressBarContainer">
      <div className="progress-bar" style={fillerStyle}>
        <span className="percent-complete">{percentComplete > 10 ? `${percentComplete}%` : ''}</span>
      </div>
    </div>
  );
}
