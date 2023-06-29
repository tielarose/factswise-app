import { useLocation, useNavigate, Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context';

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
    <div className="form-container">
      <h4>Create an educator account for</h4>
      <h2 className="educator-dark bold">{location.state.emailEntered}</h2>
      <p>
        Already have an account?
        {' '}
        <Link className="link-blue" to="/educator/login">Sign in</Link>
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <label htmlFor="EducatorSignup-educator-first-name">
            First Name:
          </label>
          <input
            type="text"
            placeholder="first name"
            value={educatorFirstName}
            onChange={(evt) => setEducatorFirstName(evt.target.value)}
            name="EducatorSignup-educator-first-name"
            id="EducatorSignup-educator-first-name"
            required
          />

          {/* Last Name Field */}
          <label htmlFor="EducatorSignup-educator-last-name">
            Last Name:
          </label>
          <input
            type="text"
            placeholder="last name"
            value={educatorLastName}
            onChange={(evt) => setEducatorLastName(evt.target.value)}
            name="EducatorSignup-educator-last-name"
            id="EducatorSignup-educator-last-name"
            required
          />

          {/* Display Name Field */}
          <label htmlFor="EducatorSignup-educator-display-name">
            How would you like your name to appear to your students?
          </label>
          <input
            type="text"
            placeholder="display name"
            value={educatorDisplayName}
            onChange={(evt) => setEducatorDisplayName(evt.target.value)}
            name="EducatorSignup-educator-display-name"
            id="EducatorSignup-educator-display-name"
            required
          />

          {/* Password Field */}
          <label htmlFor="EducatorSignup-educator-password">
            Password:
          </label>
          <input
            type="password"
            placeholder="password"
            value={educatorPassword}
            onChange={(evt) => setEducatorPassword(evt.target.value)}
            name="EducatorSignup-educator-password"
            id="EducatorSignup-educator-password"
            required
          />

          <button className="button-blue" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
