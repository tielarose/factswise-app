import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from './Context';
import './Homepage.css';

export default function Homepage() {
  const allContext = useContext(AppContext);
  const { isEducator } = allContext;
  const { isStudent } = allContext;

  if (isEducator) {
    return <Navigate replace to="/educator/home" />;
  } if (isStudent) {
    return <Navigate replace to="/student/home" />;
  }
  return (
    <div className="Homepage">
      <h1>Welcome to MathFacts!</h1>
      <p>Designed for educators, by an educator.</p>
      <p>
        Easily assess your students on their FactsWise goals, view detailed
        data about their progress, and more!
      </p>
      <div className="Homepage-login-buttons">
        <Link to="/educator/login">
          <button
            type="button"
            className="Homepage-login-button-educator"
          >
            <h3>I&#39;m an Educator</h3>
            <p>Sign in to your account or sign up for one</p>
          </button>
        </Link>
        <Link to="/student/login">
          <button
            type="button"
            className="Homepage-login-button-student"
          >
            <h3>I&#39;m a Student</h3>
            <p>Sign in to your account (created by your teacher)</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
