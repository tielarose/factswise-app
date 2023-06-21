import { useLocation, useNavigate, Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context';
import './EducatorSignup.css';

export default function EducatorSignup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentUser, setIsEducator } = useContext(AppContext);
  const [educatorFirstName, setEducatorFirstName] = useState('');
  const [educatorLastName, setEducatorLastName] = useState('');
  const [educatorDisplayName, setEducatorDisplayName] = useState('');
  const [educatorPassword, setEducatorPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    const formInputs = {
      educator_email: location.state.emailEntered,
      educator_first_name: educatorFirstName,
      educator_last_name: educatorLastName,
      educator_display_name: educatorDisplayName,
      educator_password: educatorPassword,
    };

    console.log(formInputs);

    fetch('/api/educator/signup', {
      method: 'POST',
      body: JSON.stringify(formInputs),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.signup_successful) {
          localStorage.setItem('userId', data.user_id);
          setCurrentUser(data.user_info);
          setIsEducator(data.is_educator);
          navigate('/educator/home');
        }
      });
  }

  return (
    <div className="EducatorSignup">
      <h2>Educators:</h2>
      <h4>Sign up for an account</h4>
      <p>
        Not an educator?
        {' '}
        <Link to="/">Go back</Link>
      </p>
      <p>
        Already have an account?
        {' '}
        <Link to="/educator/login">Sign in</Link>
      </p>
      <div>
        <form className="EducatorSignup-form" onSubmit={handleSubmit}>
          <p>
            {' '}
            Email:
            {' '}
            {location.state.emailEntered}
          </p>
          {/* First Name Field */}
          <label htmlFor="EducatorSignup-educator-first-name">
            First Name:
            {' '}
            <input
              type="text"
              placeholder="first name"
              value={educatorFirstName}
              onChange={(evt) => setEducatorFirstName(evt.target.value)}
              name="EducatorSignup-educator-first-name"
              id="EducatorSignup-educator-first-name"
              required
            />
          </label>

          {/* Last Name Field */}
          <label htmlFor="EducatorSignup-educator-last-name">
            Last Name:
            {' '}
            <input
              type="text"
              placeholder="last name"
              value={educatorLastName}
              onChange={(evt) => setEducatorLastName(evt.target.value)}
              name="EducatorSignup-educator-last-name"
              id="EducatorSignup-educator-last-name"
              required
            />

          </label>

          {/* Display Name Field */}
          <label htmlFor="EducatorSignup-educator-display-name">
            How would you like your name to appear to your students?
            {' '}
            <input
              type="text"
              placeholder="display name"
              value={educatorDisplayName}
              onChange={(evt) => setEducatorDisplayName(evt.target.value)}
              name="EducatorSignup-educator-display-name"
              id="EducatorSignup-educator-display-name"
              required
            />
          </label>

          {/* Password Field */}
          <label htmlFor="EducatorSignup-educator-password">
            Password:
            {' '}
            <input
              type="password"
              placeholder="password"
              value={educatorPassword}
              onChange={(evt) => setEducatorPassword(evt.target.value)}
              name="EducatorSignup-educator-password"
              id="EducatorSignup-educator-password"
              required
            />

          </label>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
